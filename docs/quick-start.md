---
description: Quick start in understanding the API
---

# 📍 Quick Start

Get up and running with the iFunny API in minutes. This guide shows you how to authenticate, retrieve feeds, and access account information using the most popular libraries and tools.

## Basic Token Generation

Before you can authenticate with the iFunny API, you need a **Basic Token**. This token is generated from your client credentials and primed against the API.

### Generating a Basic Token

Use one of the examples below to generate a Basic Token. You'll need:

- **Client ID:** `MsOIJ39Q28`
- **Client Secret:** `PTDc3H8a)Vi=UYap`
- **Token length:** 112 or 156 (check which your API version uses)

=== "cURL"

    ```bash
    # For a 112-character token, use openssl and base64:
    UUID=$(python3 -c "import uuid; print(uuid.uuid4().hex.upper())")
    PREFIX="${UUID}_MsOIJ39Q28:"
    SUFFIX=$(echo -n "${UUID}:MsOIJ39Q28:PTDc3H8a)Vi=UYap" | \
      openssl dgst -sha1 -hex | cut -d' ' -f2 | tr 'a-z' 'A-Z')
    BASIC_TOKEN=$(echo -n "${PREFIX}${SUFFIX}" | base64)
    echo $BASIC_TOKEN
    ```

=== "TypeScript"

    ```typescript
    import crypto from "crypto";

    function createBasicAuth(length: 112 | 156): string {
      const clientId = "MsOIJ39Q28";
      const clientSecret = "PTDc3H8a)Vi=UYap";
      
      // Step 1: Generate UUID v4
      const uuid = crypto.randomUUID().replace(/\-/g, "");

      // Step 2: Generate hex string
      let hex: string;
      if (length === 112) {
        hex = uuid;
      } else {
        hex = crypto
          .createHash("sha256")
          .update(uuid)
          .digest("hex");
      }
      hex = hex.toUpperCase();

      // Step 3: Create prefix
      const prefix = `${hex}_${clientId}:`;

      // Step 4: Create suffix (SHA1 hash)
      const suffix = crypto
        .createHash("sha1")
        .update(`${hex}:${clientId}:${clientSecret}`)
        .digest("hex");

      // Step 5: Combine and base64 encode
      const token = prefix + suffix;
      return Buffer.from(token).toString("base64");
    }

    const basicToken = createBasicAuth(112);
    console.log(basicToken);
    ```

=== "Go"

    ```go
    package main

    import (
      "crypto/sha1"
      "crypto/sha256"
      "encoding/base64"
      "encoding/hex"
      "fmt"
      "strings"
      "github.com/google/uuid"
    )

    func createBasicToken(length uint8) string {
      clientId := "MsOIJ39Q28"
      clientSecret := "PTDc3H8a)Vi=UYap"
      
      // Step 1: Generate UUID v4
      id := uuid.New().String()
      id = strings.ReplaceAll(id, "-", "")
      
      // Step 2: Generate hex string
      var hexString string
      if length == 112 {
        hexString = strings.ToUpper(id)
      } else {
        hash := sha256.Sum256([]byte(id))
        hexString = strings.ToUpper(hex.EncodeToString(hash[:]))
      }
      
      // Step 3: Create prefix
      prefix := fmt.Sprintf("%s_%s:", hexString, clientId)
      
      // Step 4: Create suffix (SHA1 hash)
      suffix := fmt.Sprintf("%x", sha1.Sum([]byte(fmt.Sprintf(
        "%s:%s:%s", hexString, clientId, clientSecret))))
      
      // Step 5: Combine and base64 encode
      token := base64.StdEncoding.EncodeToString(
        []byte(prefix + suffix))
      return token
    }

    func main() {
      token := createBasicToken(112)
      fmt.Println(token)
    }
    ```

### Priming Your Token

Once generated, your Basic Token needs to be primed before use. Any API request will prime it; the server takes ~15 seconds to process.

=== "cURL"

    ```bash
    curl -H "authorization: Basic $BASIC_TOKEN" \
      https://api.ifunny.mobi/account \
      | jq '.nick'
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
    });

    // First request primes the token
    const account = await client.account.getSelf();
    console.log(account.nick);
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      basic := createBasicToken(112)
      ua := ifunny.Android{Version: "14"}.UserAgent()
      client, _ := ifunny.MakeClientBasic(basic, ua)
      
      // Prime the token
      if err := client.PrimeBasic(); err != nil {
        panic(err)
      }
      fmt.Println("Token primed successfully")
    }
    ```

## Logging In

Exchange your credentials for a **Bearer Token** to unlock authenticated endpoints like personalized feeds and account settings.

Call `POST /oauth2/login` with your username and password:

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/oauth2/login \
      -H "authorization: Basic $BASIC_TOKEN" \
      -H "content-type: application/json" \
      -d '{
        "username": "your_username",
        "password": "your_password"
      }' \
      | jq '.access_token'
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
    });

    // Login and get bearer token
    await client.login("your@email.com", "password");
    console.log(`Bearer token: ${client.bearer}`);
    ```

=== "Go"

    ```go
    import "github.com/open-ifunny/ifunny-go/compose"

    // For authenticated access with a bearer token obtained via cURL:
    client, err := ifunny.MakeClient(bearerToken, ua)
    if err != nil {
      panic(err)
    }
    fmt.Printf("Logged in as: %s\n", client.Self.Nick)
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

## Getting the Featured Feed

Retrieve the curated home feed. Only a Basic Token is required.

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/feeds/featured \
      -H "authorization: Basic $BASIC_TOKEN" \
      | jq '.data | length'
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({ basic: basicToken });
    const feed = client.feeds.features;

    // Scroll through featured feed (async generator)
    for await (const post of feed.scroll()) {
      console.log(`Post ${post.id}: ${post.likes} likes`);
      break; // Show first post only
    }
    ```

=== "Go"

    ```go
    import "github.com/open-ifunny/ifunny-go"

    client, _ := ifunny.MakeClientBasic(basic, ua)
    client.PrimeBasic()

    // Iterate featured feed
    for i := 0; i < 1; i++ {
      result := <-client.IterFeed("featured")
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Post: %s (%d smiles)\n", result.V.ID, result.V.Num.Smiles)
    }
    ```

**Response excerpt (200 OK)**

```json
{
  "data": [
    {
      "id": "abcdef123456",
      "url": "https://example.ifunny.co/...",
      "likes": 1234,
      "created_at": "2024-07-01T12:34:56Z"
    }
  ],
  "pagination": {
    "cursor": "next_page_token"
  }
}
```

## Getting Your Account Information

Retrieve details for the authenticated user. Requires a Bearer Token.

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

    // Fetch authenticated user's account info
    await client.fetch();
    const user = await client.user();
    console.log(`Nick: ${user.nick}, Followers: ${client.get("follower_count")}`);
    ```

=== "Go"

    ```go
    import "github.com/open-ifunny/ifunny-go"

    client, _ := ifunny.MakeClient(bearerToken, ua)
    
    // client.Self is populated automatically by MakeClient
    fmt.Printf("Nick: %s, Followers: %d\n", 
      client.Self.Nick, client.Self.Followers)
    ```

**Response excerpt (200 OK)**

```json
{
  "nick": "your_username",
  "email": "you@example.com",
  "follower_count": 42,
  "following_count": 100,
  "id": "user_123"
}
```

---

## Next Steps

- **Full API Reference:** Browse all endpoints at [API Reference → OAuth2](reference/api/oauth2.md)
- **Data Types:** Learn the shape of objects like `User`, `Post`, and `Comment` at [Data Types](reference/data-types/index.md)
- **Libraries:**
  - TypeScript: [makeshiftartist/ifunny.ts](https://github.com/makeshiftartist/ifunny.ts) ([docs](https://makeshiftartist.github.io/iFunny.ts/))
  - Go: [open-ifunny/ifunny-go](https://github.com/open-ifunny/ifunny-go)
