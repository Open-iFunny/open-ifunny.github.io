---
description: Collection of data structures for authentication, account info, and bans
---

# 🤖 Client, OAuth & Basic Token

The client represents your authenticated application or user account. Authentication uses either Basic tokens (for early-stage API access) or OAuth 2.0 Bearer tokens (for full user account access). This section covers account info, bans, and appeals.

## Account Information

Full profile for the authenticated client account (`ClientProfile`).
This is a superset of the public [User Profile](user-types.md#user-profile)
that additionally exposes email, phone, moderation flags, and unread
notification counters.

--8<-- "_snippets/schemas/ClientProfile.md"

### Client Phone Data

--8<-- "_snippets/schemas/ClientPhoneData.md"

## Client Ban

Full record for a ban applied to the client, including the reason,
optional related content/comment, and appeal state. See
[Ban Type](#ban-type) and [Ban Reason](#ban-reason) for the enum
values.

--8<-- "_snippets/schemas/ClientBan.md"

### Ban Type

* `chat_access` - Client is banned from accessing chat functionality.
* `comment_creation` - Client is banned from creating comments
* `content_creation` - Client is banned from creating content
* `profile_access` - Client is banned from accessing profiles
* `repubing` - Client is banned from republishing content
* `smiling` - Client is banned from smiling content
* `subscribing` - Client is banned from subscribing to users
* `other` - Other unspecified ban types.
* `collective_shadow` - Client can upload but content won't be shared with the Collective

### Ban Reason

* `abuse_harassment` - Ban due to abuse or harassment
* `child_pornography` - Ban due to child pornography
* `hardcore` - Ban due to hardcore content
* `hate_speech` - Ban due to hate speech
* `bot_spam` - Ban due to spam from bots
* `threats_of_harm` - Ban due to threats of harm
* `death_gore` - Ban related to death and gore content
* `other` - Other unspecified ban types

## Appeal

An appeal filed against a ban or strike. Uses the same
[Ban Reason](#ban-reason) enum as [Client Ban](#client-ban).

--8<-- "_snippets/schemas/Appeal.md"

## Practical Examples

### Generating and Priming a Basic Token

Basic tokens are used for initial API access without user credentials. See the [Quick Start guide](../../quick-start.md#basic-token-generation) for code examples in cURL, TypeScript, and Go.

After generation, you must [prime the token](../../quick-start.md#priming-your-token) by making any API request with it. The server takes ~15 seconds to process the prime, after which the token is valid for all authenticated endpoints.

### OAuth Login Flow

Exchange username and password for a Bearer token via [POST /oauth2/login](../api/oauth2.md):

```
POST /oauth2/login
{
  "username": "myusername",
  "password": "mypassword"
}
```

Response includes `access_token` (Bearer token), `token_type: "Bearer"`, and `expires_in` (seconds until expiration). Store the access token and use it in subsequent requests: `Authorization: Bearer <token>`.

### Refreshing a Bearer Token

When a Bearer token approaches expiration, refresh it via [POST /oauth2/refresh](../api/oauth2.md) with the token's refresh credentials. Returns a new access token with updated expiration.

### Fetching Current Account Info

Retrieve your authenticated `ClientProfile` via [GET /account](../api/client.md):

```
GET /account
```

Response includes email, phone data, notification counters, and moderation flags. Compare this to the public [User Profile](user-types.md#user-profile) — the `ClientProfile` is a superset with private fields.

### Handling Bans

If you hit a rate limit or violate community guidelines, you may receive a `ClientBan`. Check your ban status via [GET /account/bans](../api/client.md). The response lists all active bans with type, reason, and optionally the related content or comment ID.

Each ban includes an `appeal` object. If it's `null`, you cannot appeal. If populated, it tracks your pending or resolved appeals. Submit a new appeal via [POST /account/bans/{id}/appeal](../api/client.md) to request review.
