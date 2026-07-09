---
title: Procedures
description: "Invites, moderation, and other one-off procedures"
---

# 🔪 Procedures

Invites, moderation, and other one-off procedures

## Procedures

### Invite users to a channel  {: #proc-co-fun-chat-invite-invite }

**`CALL co.fun.chat.invite.invite`**

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |
    | `users` | `String[]` | yes |  |

=== "WAMP"

    ```text
    [CALL, <request_id>, {}, "co.fun.chat.invite.invite",
      [
      ],
      {
          "chat_name": …,
          "users": …
        }
    ]
    ```

=== "TypeScript"

    ```typescript
    interface InviteKwargs {
      chat_name: string;
      users: string[];
    }
    ```

=== "Go"

    ```go
    type InviteKwargs struct {
    	ChatName string `json:"chat_name"`
    	Users []string `json:"users"`
    }
    ```

### Accept a channel invitation  {: #proc-co-fun-chat-invite-accept }

**`CALL co.fun.chat.invite.accept`**

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |

=== "WAMP"

    ```text
    [CALL, <request_id>, {}, "co.fun.chat.invite.accept",
      [
      ],
      {
          "chat_name": …
        }
    ]
    ```

=== "TypeScript"

    ```typescript
    interface AcceptKwargs {
      chat_name: string;
    }
    ```

=== "Go"

    ```go
    type AcceptKwargs struct {
    	ChatName string `json:"chat_name"`
    }
    ```

### Decline a channel invitation  {: #proc-co-fun-chat-invite-decline }

**`CALL co.fun.chat.invite.decline`**

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |

=== "WAMP"

    ```text
    [CALL, <request_id>, {}, "co.fun.chat.invite.decline",
      [
      ],
      {
          "chat_name": …
        }
    ]
    ```

=== "TypeScript"

    ```typescript
    interface DeclineKwargs {
      chat_name: string;
    }
    ```

=== "Go"

    ```go
    type DeclineKwargs struct {
    	ChatName string `json:"chat_name"`
    }
    ```

### Remove a user from a channel  {: #proc-co-fun-chat-kick-member }

**`CALL co.fun.chat.kick_member`**

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |
    | `user_id` | `String` | yes |  |

=== "WAMP"

    ```text
    [CALL, <request_id>, {}, "co.fun.chat.kick_member",
      [
      ],
      {
          "chat_name": …,
          "user_id": …
        }
    ]
    ```

=== "TypeScript"

    ```typescript
    interface KickMemberKwargs {
      chat_name: string;
      user_id: string;
    }
    ```

=== "Go"

    ```go
    type KickMemberKwargs struct {
    	ChatName string `json:"chat_name"`
    	UserId string `json:"user_id"`
    }
    ```
