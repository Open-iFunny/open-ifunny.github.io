---
description: Authenticate with the iFunny API using Basic Tokens or OAuth2 Bearer Tokens
---

# Connecting and Authenticating

Every interaction with the iFunny API starts with authentication. iFunny supports two token types: **Basic Tokens** for public operations, and **Bearer Tokens** for authenticated user operations. This guide shows you how to generate, prime, and use both.

## Understanding Token Types

**Basic Token** — Stateless, client-credentials style:
- Generated locally using UUID, client ID, and client secret
- No user login required
- Must be "primed" by making any API request (takes ~15 seconds)
- Limited to public operations (featured feeds, user search, etc.)

**Bearer Token** — OAuth 2.0 style:
- Obtained by logging in with username and password
- Represents an authenticated user's account
- Required for personalized operations (home feed, creating content, account settings)
- Can be refreshed before expiration

## Step 1: Generate a Basic Token

Before you can authenticate with the iFunny API, generate a **Basic Token** using your client credentials:

- **Client ID:** `MsOIJ39Q28`
- **Client Secret:** `PTDc3H8a)Vi=UYap`
- **Token length:** 112 or 156 characters (check which your API version uses)

=== "cURL"

    ```bash
    # Generate a UUID
    UUID=$(python3 -c "import uuid; print(uuid.uuid4().hex.upper())")
    
    # Build the prefix
    PREFIX="${UUID}_MsOIJ39Q28:"
    
    # Compute SHA1 hash for suffix
    SUFFIX=$(echo -n "${UUID}:MsOIJ39Q28:PTDc3H8a)Vi=UYap" | \
      openssl dgst -sha1 -hex | cut -d' ' -f2 | tr 'a-z' 'A-Z')
    
    # Combine and base64 encode
    BASIC_TOKEN=$(echo -n "${PREFIX}${SUFFIX}" | base64)
    echo $BASIC_TOKEN
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";
    import crypto from "crypto";

    // The iFunnyClient generates a Basic Token automatically
    const client = new iFunnyClient();
    
    // Or manually generate one:
    function createBasicToken(): string {
      const clientId = "MsOIJ39Q28";
      const clientSecret = "PTDc3H8a)Vi=UYap";
      
      const uuid = crypto.randomUUID().replace(/\-/g, "");
      const hex = uuid.toUpperCase();
      const prefix = `${hex}_${clientId}:`;
      const suffix = crypto
        .createHash("sha1")
        .update(`${hex}:${clientId}:${clientSecret}`)
        .digest("hex");
      
      return Buffer.from(prefix + suffix).toString("base64");
    }

    const basicToken = createBasicToken();
    console.log(basicToken);
    ```

=== "Go"

    ```go
    package main

    import (
      "crypto/sha1"
      "encoding/base64"
      "encoding/hex"
      "fmt"
      "strings"
      "github.com/google/uuid"
    )

    func createBasicToken() string {
      clientId := "MsOIJ39Q28"
      clientSecret := "PTDc3H8a)Vi=UYap"
      
      id := strings.ToUpper(uuid.New().String())
      id = strings.ReplaceAll(id, "-", "")
      
      prefix := fmt.Sprintf("%s_%s:", id, clientId)
      suffix := fmt.Sprintf("%x", sha1.Sum([]byte(fmt.Sprintf(
        "%s:%s:%s", id, clientId, clientSecret))))
      
      return base64.StdEncoding.EncodeToString([]byte(prefix + suffix))
    }

    func main() {
      token := createBasicToken()
      fmt.Println(token)
    }
    ```

## Step 2: Prime Your Basic Token

Once generated, your Basic Token must be primed before use. Make any API request to trigger priming; the server takes ~15 seconds to activate the token.

=== "cURL"

    ```bash
    curl -H "authorization: Basic $BASIC_TOKEN" \
      https://api.ifunny.mobi/account
    
    # Wait ~15 seconds for the server to process
    sleep 15
    
    # Now the token is primed and ready to use
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
    });

    // This request primes the token
    await client.primeBasic();
    console.log("Basic token primed and ready");
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      basic := createBasicToken()
      ua := ifunny.Android{Version: "14"}.UserAgent()
      client, err := ifunny.MakeClientBasic(basic, ua)
      if err != nil {
        panic(err)
      }
      
      // Prime the token (~15 seconds)
      if err := client.PrimeBasic(); err != nil {
        panic(err)
      }
      fmt.Println("Token primed successfully")
    }
    ```

Now your Basic Token is primed and can be used for public operations like browsing featured feeds or searching users. To access authenticated operations, you need a Bearer Token.

## Step 3: Log In and Get a Bearer Token

Exchange your username and password for a **Bearer Token**. This unlocks personalized feeds, account operations, and content creation.

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/oauth2/login \
      -H "authorization: Basic $BASIC_TOKEN" \
      -H "content-type: application/x-www-form-urlencoded" \
      -d "grant_type=password&username=your_email@example.com&password=your_password" \
      | jq '.access_token'
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
    });

    // Log in with email and password
    await client.login("your@email.com", "password");
    
    console.log(`Logged in! Bearer token: ${client.bearer}`);
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      basic := createBasicToken()
      ua := ifunny.Android{Version: "14"}.UserAgent()
      
      // Create a basic-authenticated client
      client, err := ifunny.MakeClientBasic(basic, ua)
      if err != nil {
        panic(err)
      }
      
      // Login to get a bearer token
      // Note: ifunny-go requires a bearer token constructor; see MakeClient()
      // For now, use the HTTP client to authenticate and extract the token manually,
      // or use a credential store to retrieve a pre-authenticated bearer token.
    }
    ```

**Response (200 OK)**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "Bearer",
  "expires_in": 2592000
}
```

Store the `access_token` — you'll use it in the `authorization: Bearer <token>` header for all authenticated requests.

## Step 4: Get Your Account Profile

Now that you have a Bearer Token, fetch your authenticated account information:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/account \
      -H "authorization: Bearer $BEARER_TOKEN" \
      | jq '{nick: .nick, email: .email, followers: .follower_count}'
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
      bearer: bearerToken,
    });

    // Fetch your account data
    await client.fetch();
    const user = await client.user();
    
    console.log(`Nick: ${user.nick}`);
    console.log(`Followers: ${user.followers}`);
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      ua := ifunny.Android{Version: "14"}.UserAgent()
      
      // MakeClient fetches /account automatically
      client, err := ifunny.MakeClient(bearerToken, ua)
      if err != nil {
        panic(err)
      }
      
      // Your account data is now in client.Self
      fmt.Printf("Nick: %s\n", client.Self.Nick)
      fmt.Printf("Followers: %d\n", client.Self.Followers)
    }
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

    // Fully authenticated client
    const client = new iFunnyClient({
      basic: basicToken,
      bearer: bearerToken,
    });

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
      "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      ua := ifunny.Android{Version: "14"}.UserAgent()
      
      client, err := ifunny.MakeClient(bearerToken, ua)
      if err != nil {
        panic(err)
      }
      
      // Now you can access personalized feeds, create content, etc.
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
