---
description: Authenticate with the iFunny API using Basic Tokens or OAuth2 Bearer Tokens
---

# Connecting and Authenticating

Every interaction with the iFunny API starts with authentication. iFunny supports two token types: **Basic Tokens** for public operations, and **Bearer Tokens** for authenticated user operations. This guide shows you how to generate, prime, and use both.

## Understanding Token Types

**Basic Token** — Stateless, client-credentials style:

- Generated locally from a UUID plus a hard-coded client ID and secret
- No user login required
- Must be "primed" against the API before use (server-side ~15 s activation)
- Limited to public operations (featured feeds, user search, etc.)

**Bearer Token** — OAuth 2.0 style:

- Obtained by exchanging a primed Basic Token plus username/password
- Represents an authenticated user's account
- Required for personalized operations (home feed, creating content, account settings)
- Long-lived (`expires_in` is on the order of years) but treat it as revocable

## Step 1: Get a Primed Basic Token

A Basic Token is:

1. **Generated** locally from a random UUID and a fixed client ID + secret.
2. **Primed** by making one request to any authenticated endpoint (the SDKs use `/counters`) and then waiting ~15 seconds for the server to activate it.

Both official-adjacent SDKs bundle these two steps into a single call.

=== "cURL"

    A self-contained script lives in the repo at
    [`scripts/prime-basic-token.sh`](https://github.com/Open-iFunny/open-ifunny.github.io/blob/main/scripts/prime-basic-token.sh).
    It generates the token, primes it, waits, and echoes the token to
    stdout so you can capture it in a variable:

    ```bash
    BASIC=$(./scripts/prime-basic-token.sh)
    echo "$BASIC"
    ```

    For reference, this is what the script does end-to-end (requires
    `openssl`, `base64`, and `curl`):

    ```bash
    CLIENT_ID="MsOIJ39Q28"
    CLIENT_SECRET="PTDc3H8a)Vi=UYap"
    UA="iFunny/8.15.1(1130736) Android/14 (google; Pixel 8; google)"

    # 1. Generate the token: base64(<UUID>_<id>: || hex(sha1(<UUID>:<id>:<secret>)))
    UUID=$(openssl rand -hex 16 | tr '[:lower:]' '[:upper:]')
    PREFIX="${UUID}_${CLIENT_ID}:"
    SUFFIX=$(printf '%s' "${UUID}:${CLIENT_ID}:${CLIENT_SECRET}" \
             | openssl dgst -sha1 -hex | awk '{print $NF}')
    BASIC=$(printf '%s%s' "$PREFIX" "$SUFFIX" | base64 | tr -d '\n')

    # 2. Prime it with any authenticated GET.
    curl --fail -sS -o /dev/null \
      -H "Authorization: Basic $BASIC" \
      -H "Ifunny-Project-Id: iFunny" \
      -H "User-Agent: $UA" \
      https://api.ifunny.mobi/v4/counters

    # 3. Wait for the server to finish activating the token.
    sleep 15
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient();
    // The client generates its own Basic Token; primeBasic() waits 15 s.
    await client.primeBasic();

    console.log(client.basic);
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      ifunny "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      basic, err := ifunny.GenerateBasic()
      if err != nil {
        panic(err)
      }

      ua := ifunny.Android{Version: "14"}.UserAgent()
      client, err := ifunny.MakeClientBasic(basic, ua)
      if err != nil {
        panic(err)
      }

      // PrimeBasic hits /counters and then waits 15 seconds.
      if err := client.PrimeBasic(); err != nil {
        panic(err)
      }
      fmt.Println(basic)
    }
    ```

The primed Basic Token can be used on its own for public operations like browsing featured feeds or searching users. To access authenticated operations, exchange it for a Bearer Token.

## Step 2: Log In and Get a Bearer Token

Exchange username and password for a **Bearer Token** by POSTing to `/oauth2/token` with your primed Basic Token in the `Authorization` header.

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/v4/oauth2/token \
      -H "Authorization: Basic $BASIC" \
      -H "Ifunny-Project-Id: iFunny" \
      -H "User-Agent: iFunny/8.15.1(1130736) Android/14 (google; Pixel 8; google)" \
      -H "Content-Type: application/x-www-form-urlencoded" \
      -d "grant_type=password&username=your_email@example.com&password=your_password"
    ```

=== "TypeScript"

    ```typescript
    await client.login("your@email.com", "password");
    console.log(`Logged in — bearer: ${client.bearer}`);
    ```

=== "Go"

    `ifunny-go` doesn't ship a `Login` helper yet — do the exchange
    directly and then hand the bearer to `MakeClient`:

    ```go
    import (
      "encoding/json"
      "net/http"
      "net/url"
      "strings"
    )

    func login(basic, ua, email, password string) (string, error) {
      body := url.Values{
        "grant_type": {"password"},
        "username":   {email},
        "password":   {password},
      }.Encode()

      req, _ := http.NewRequest("POST",
        "https://api.ifunny.mobi/v4/oauth2/token",
        strings.NewReader(body))
      req.Header.Set("Authorization", "Basic "+basic)
      req.Header.Set("Ifunny-Project-Id", "iFunny")
      req.Header.Set("User-Agent", ua)
      req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

      resp, err := http.DefaultClient.Do(req)
      if err != nil {
        return "", err
      }
      defer resp.Body.Close()

      var out struct{ AccessToken string `json:"access_token"` }
      if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
        return "", err
      }
      return out.AccessToken, nil
    }
    ```

**Response (200 OK)**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 315360000
}
```

Store the `access_token` — you'll send it as `Authorization: Bearer <token>` on every subsequent authenticated request.

## Step 3: Get Your Account Profile

With a Bearer Token, fetch your authenticated account information:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/v4/account \
      -H "Authorization: Bearer $BEARER_TOKEN" \
      -H "Ifunny-Project-Id: iFunny" \
      -H "User-Agent: iFunny/8.15.1(1130736) Android/14 (google; Pixel 8; google)" \
      | jq '{nick, email, followers: .follower_count}'
    ```

=== "TypeScript"

    ```typescript
    // client.login() already populated the account payload.
    const user = await client.user();
    console.log(`Nick: ${user.nick}`);
    console.log(`Followers: ${user.followers}`);
    ```

=== "Go"

    ```go
    ua := ifunny.Android{Version: "14"}.UserAgent()

    // MakeClient fetches /account automatically and stashes it in client.Self.
    client, err := ifunny.MakeClient(bearer, ua)
    if err != nil {
      panic(err)
    }

    fmt.Printf("Nick: %s\n", client.Self.Nick)
    fmt.Printf("Followers: %d\n", client.Self.Followers)
    ```

**Response excerpt (200 OK)**

```json
{
  "nick": "your_username",
  "email": "you@example.com",
  "follower_count": 42,
  "following_count": 100,
  "id": "user_123",
  "is_banned": false,
  "safe_mode": false
}
```

## Understanding Your Account Profile

The `Account` response contains several important fields:

- **nick** — Your display name on iFunny
- **email** — Your account email
- **follower_count** / **following_count** — Your social stats
- **is_banned** — Whether you currently have active bans
- **safe_mode** — Whether content filtering is enabled
- **need_account_setup** — Whether your profile is incomplete
- **is_blocked_in_messenger** — Whether you're blocked from chat

Always check **is_banned** before making requests; if true, many operations will be blocked.

## Working with Authenticated Clients

Once you have a Bearer Token, use it to create authenticated clients:

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({ bearer: bearerToken });

    // Now you can access personalized feeds, create content, etc.
    for await (const post of client.feeds.home.scroll()) {
      console.log(`Post: ${post.id}`);
    }
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      ifunny "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      ua := ifunny.Android{Version: "14"}.UserAgent()

      client, err := ifunny.MakeClient(bearerToken, ua)
      if err != nil {
        panic(err)
      }

      for post := range client.IterFeed("home") {
        if post.Err != nil {
          panic(post.Err)
        }
        fmt.Printf("Post: %s\n", post.V.ID)
      }
    }
    ```

## Next Steps

- **Browse feeds:** [Exploring Feeds and Curations](exploring-feeds-and-curations.md)
- **Connect with users:** [Making Friends and Foes](making-friends-and-foes.md)
- **Chat and messaging:** [Chats and Channels](chats-and-channels.md)
- **Full API Reference:** [OAuth2 Reference](../reference/api/rest/oauth2.md)
