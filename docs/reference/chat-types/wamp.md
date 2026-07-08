---
title: invites
description: "Extend, accept, and decline channel invitations."
---

# 📨 invites

Extend, accept, and decline channel invitations.

## Procedures

### CALL `co.fun.chat.invite.invite` — Invite users to a channel  {: #proc-co-fun-chat-invite-invite }

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |
    | `users` | `String[]` | yes |  |

=== "JSON"

    ```json
    // InviteKwargs
    {
      "chat_name": "string",
      "users": "string[]"
    }
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

### CALL `co.fun.chat.invite.accept` — Accept a channel invitation  {: #proc-co-fun-chat-invite-accept }

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |

=== "JSON"

    ```json
    // AcceptKwargs
    {
      "chat_name": "string"
    }
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

### CALL `co.fun.chat.invite.decline` — Decline a channel invitation  {: #proc-co-fun-chat-invite-decline }

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |

=== "JSON"

    ```json
    // DeclineKwargs
    {
      "chat_name": "string"
    }
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

### CALL `co.fun.chat.kick_member` — Remove a user from a channel  {: #proc-co-fun-chat-kick-member }

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |
    | `user_id` | `String` | yes |  |

=== "JSON"

    ```json
    // KickMemberKwargs
    {
      "chat_name": "string",
      "user_id": "string"
    }
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
