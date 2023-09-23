---
description: A complete guide on generating Basic tokens for iFunny with examples
---

# 🔐 Basic Token Generation

## Pre-requisites

You'll need a client id, client secret, and desired length to generate your Basic Tokens. Below are ones mined from the app files that you are free to use and distribute. The length depends on the version of the API you're using, but known existing lengths are 112 and 156.

**Client ID:** `MsOIJ39Q28`\
**Client Secret:** `PTDc3H8a)Vi=UYap`\


## How to Generate

The following is a step by step guide on generating basic authentication tokens used in iFunny. But we also provide working examples in multiple programming languages here: [#basic-token-examples](basic-token-generation.md#basic-token-examples "mention")

### Step 1. Generate a UUID v4

Generate a UUID (Universally Unique Identifier) of version 4. Remove all hyphens (`-`) from the UUID.

### Step 2. Generate Hexadecimal String

#### 112 Character Tokens

Convert the UUID (with hyphens removed) obtained in Step 1 to UPPERCASE and use this as your Hexadecimal value

#### 156 Character Tokens

Hash your UUID (with hyphens removed) with SHA256 and convert it to uppercase

{% hint style="info" %}
Choosing which token to generate depends on the API version being used as iFunny has altered their Basic Token generation across API versions. It's recommended you check what length the latest version is using.
{% endhint %}

### Step 3. Create your Basic Prefix

Create your Basic Prefix in this format -> `{hex_string}_{client_id}`

* `hex_string` -> Hex String generated in Step 2
* `client_id` -> Client ID obtained as a pre-requisite

{% hint style="info" %}
Do not include the braces in strings
{% endhint %}

### Step 4. Create your Basic Suffix

Create your Basic suffix in this format -> `{hex_string}:{client_id}:{client_secret}`

* `hex_string` -> Hex String generated in Step 2.
* `client_id` -> Client ID obtained as a pre-requisite
* `client_secret` -> Client Secret obtained as a pre-requisite

Then hash that value using SHA1 hashing algorithm

### Step 5. Create Basic Token

Create your Basic Token in this format: `{basic_prefix}{basic_suffix}`

* `basic_prefix` -> Basic Prefix obtained in Step 3
* `basic_suffix` -> Basic Suffix obtained in Step 4.

Finally encode your Basic Token with Base64.

### Step 6. Prime the Token (Optional)

Once the Basic Token has been generated, it'll need to be primed against the API before it can be used. To do this, make a request using your newly generated Basic Token to the API.

{% hint style="info" %}
While any request to the API will
{% endhint %}

## Examples <a href="#basic-token-examples" id="basic-token-examples"></a>

These are all working and tested as of **09-20-2023**

{% tabs %}
{% tab title="TypeScript" %}
```typescript
import crypto from "crypto";

function createBasicAuth(
    clientId: string,
    clientSecret: string, 
    length: 112 | 156
): string {
    // Step 1
    const uuid = crypto.randomUUID().replace(/\-/g, "");

  
    // Step 2
    let hex: string;
    switch (length) {
        case 112: // Step 2 - 112
            hex = uuid;
            break;
        case 156: // Step 2 - 156
            hex = crypto
                .createHash("sha256")
                .update(uuid)
                .digest("hex");
            break;
        default:
            throw TypeError("Invalid token length. Expected 112 | 156");
    }

    hex = hex.toUpperCase();

    // Step 3
    const prefix = `${hex}_${clientId}:`;

    // Step 4
    const suffix = crypto.createHash("sha1")
        .update(`${hex}:${clientId}:${clientSecret}`)
        .digest("hex");

    // Step 5
    let decoded = prefix + c;
    return Buffer.from(decoded).toString("base64");
}
```
{% endtab %}

{% tab title="Rust" %}
```rust
use base64::{engine::general_purpose, Engine as _};
use sha1::Sha1;
use sha2::{Digest, Sha256};
use uuid::Uuid;

pub fn create_basic_auth(length: usize, client_id: &str, client_secret: &str) -> String {
    // Step 1
    let uuid = Uuid::new_v4().simple();

    // Step 2
    let hex = match length {
        // Step 2 - 112
        112 => uuid.to_string(),
        // Step 2 -156
        156 => {
            let mut hasher = Sha256::new();
            hasher.update(uuid.to_string());

            let result = hasher.finalize();
            format!("{:x}", result)
        }
        _ => panic!("Length must be 112 or 156"), // You can use an enum to make this unreachable
    }
    .to_uppercase();

    // Step 3
    let prefix = format!("{}_{}:", hex, client_id);

    // Step 4
    let suffix: String = {
        let mut hasher = Sha1::new();
        hasher.update(format!("{}:{}:{}", hex, client_id, client_secret));
        format!("{:x}", hasher.finalize())
    };

    // Step 5
    let decoded_hash = format!("{}{}", a, c);

    general_purpose::STANDARD.encode(decoded_hash)
}
```
{% endtab %}

{% tab title="GoLang" %}
```go
import (
    "crypto/sha1"
    "crypto/sha256"
    "encoding/base64"
    "encoding/hex"
    "fmt"
    "strings"
    
    "github.com/google/uuid"
)

func CreateBasicToken(clientId string, clientSecret string, length uint8) (basicToken string) {
    // Step 1
    id := uuid.New().String()
    id = strings.ReplaceAll(id, "-", "")
    
    // Step 2
    var hexString string
    switch length {
        case 112:
            hexString = strings.ToUpper(id)
        case 156:
            hash := sha256.Sum256([]byte(id))
            hexString = strings.ToUpper(hex.EncodeToString(hash[:]))
        default:
            panic("Invalid basic token length")
    }
    
    // Step 3
    prefix := fmt.Sprintf("%s_%s:", hexString, clientId)
    
    // Step 4
    suffix := fmt.Sprintf("%x", sha1.Sum([]byte(fmt.Sprintf("%s:%s:%s", hexString, clientId, clientSecret))))
    
    // Step 5
    basicToken = base64.StdEncoding.EncodeToString([]byte(prefix + suffix))
    return
}
```
{% endtab %}
{% endtabs %}
