---
description: Establishing a connection with iFunny Chats.
---

# Connection

In order to connect to iFunny Chats, you must first create a WebSocket connection to `wss://chat.ifunny.co/chat`. Ensure that your WebSocket has the following header:

```
Sec-WebSocket-Protocol: wamp.json
```

## Hello

> [Hello reference documents](https://wamp-proto.org/wamp\_latest\_ietf.html#name-hello-2)

When any WAMP client has established its connection with the server, it must announce the fact that it has connected to the server as a part of WAMP specification. This is done in the form of a [#hello](connection.md#hello "mention") message. Here is what you would send to iFunny Chats as your [#hello](connection.md#hello "mention") message. This is required and I recommend sending an exact copy of this message.

{% code fullWidth="false" %}
```json
[
  1, // Required WAMP ID
  "co.fun.chat.ifunny", // Realm URI 
  {
    "authmethods": [ // Must be array of accepted auth methods.
      "ticket" // "ticket" because we use the bearer to authenticate
    ],
    "roles": { // The roles that your client requests from WAMP.
      "subscriber": {},
      "publisher": {}
    }
  }
]
```
{% endcode %}

## Challenge

> [Challenge reference documents](https://wamp-proto.org/wamp\_latest\_ietf.html#name-challenge)

Upon receiving your [#hello](connection.md#hello "mention") message, the server replies with a [#challenge](connection.md#challenge "mention") message. The [#challenge](connection.md#challenge "mention") message means that the server is asking for your bearer. The [#challenge](connection.md#challenge "mention") message should always look like this.

```
[
  4, // Required WAMP ID
  "ticket", // Confirmation of Ticket auth
  {} // Empty details object (required per wamp spec)
]
```

## Authenticate

Authentication requires that you have your bearer token. If you do not have a generated bearer token, there is no way to log in to iFunny Chats. Please see [oauth2.md](../api-reference/oauth2.md "mention") to learn how to generate a bearer.

> [Authenticate reference documents](https://wamp-proto.org/wamp\_latest\_ietf.html#name-authenticate)

When your WebSocket client receives the [#challenge](connection.md#challenge "mention") frame, you must reply with the [#authenticate](connection.md#authenticate "mention") frame. The #[#authenticate](connection.md#authenticate "mention") message should look like the following.

```
[
  5, // Required WAMP ID
  "your_bearer_here",
  {} // Authenticate Details (Required per wamp spec)
]
```

## Welcome

> [Welcome reference documents](https://wamp-proto.org/wamp\_latest\_ietf.html#name-welcome-2)

When the WAMP server receives your [#authenticate](connection.md#authenticate "mention") frame, it will reply with a [#welcome](connection.md#welcome "mention") frame. The welcome frame looks like this.

```typescript
[
  2,
  number, // <- This is the Session ID that WAMP generates.
  {
    "authid": string, // iFunny user ID
    "authrole": "user",
    "authmethod": "ticket",
    "authprovider": "users",
    "attributes": {
      "nick": string // iFunny Nickname
    },
    "agent": "co.fun.chat",
    "roles": {
      "broker": {
        "features": {
          "pattern_based_subscription": true,
          "publisher_exclusion": true,
          "publisher_identification": true,
          "subscriber_blackwhite_listing": true,
          "session_meta_api": true,
          "subscription_meta_api": true
        }
      },
      "dealer": {
        "features": {
          "call_canceling": true,
          "call_timeout": true,
          "caller_identification": true,
          "pattern_based_registration": true,
          "progressive_call_results": true,
          "shared_registration": true,
          "session_meta_api": true,
          "registration_meta_api": true,
          "testament_meta_api": true
        }
      }
    }
  }
]
```

