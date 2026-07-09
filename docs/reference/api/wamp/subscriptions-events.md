---
title: Subscriptions + Events
description: "Event stream subscriptions and real-time updates"
---

# 📬 Subscriptions + Events

Event stream subscriptions and real-time updates

## Topics

### Subscribe to updates about your joined channels  {: #topic-co-fun-chat-user-id-chats }

**`SUBSCRIBE co.fun.chat.user.{id}.chats`**

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### URI parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes | The subscribing user's iFunny numeric ID. |

#### Event kwargs

=== "JSON"

    ```json
    // Channel-update payload; shape mirrors `get_chat` results.
    // ChatsEventKwargs
    {

    }
    ```

=== "TypeScript"

    ```typescript
    // Channel-update payload; shape mirrors `get_chat` results.
    interface ChatsEventKwargs {

    }
    ```

=== "Go"

    ```go
    // Channel-update payload; shape mirrors `get_chat` results.
    type ChatsEventKwargs struct {

    }
    ```

### Subscribe to incoming channel invitations  {: #topic-co-fun-chat-user-id-invites }

**`SUBSCRIBE co.fun.chat.user.{id}.invites`**

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### URI parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes | The subscribing user's iFunny numeric ID. |

#### Event kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `Number` | yes | Always `300` (INVITED) on this topic. — One of: 100, 101, 200, 300 |

=== "WAMP"

    ```text
    [EVENT, <subscription_id>, <publication_id>, {},
      [
      ],
      {
          "type": …
        }
    ]
    ```

=== "TypeScript"

    ```typescript
    interface InvitesEventKwargs {
      type: 100 | 101 | 200 | 300;
    }
    ```

=== "Go"

    ```go
    type InvitesEventKwargs struct {
    	Type invitesEventKwargsTypeKind `json:"type"`
    }

    type invitesEventKwargsTypeKind int

    const (
    	INVITES_EVENT_KWARGS_TYPE_100 = invitesEventKwargsTypeKind(100)
    	INVITES_EVENT_KWARGS_TYPE_101 = invitesEventKwargsTypeKind(101)
    	INVITES_EVENT_KWARGS_TYPE_200 = invitesEventKwargsTypeKind(200)
    	INVITES_EVENT_KWARGS_TYPE_300 = invitesEventKwargsTypeKind(300)
    )
    ```

### Subscribe to events in a channel  {: #topic-co-fun-chat-chat-channel-name }

**`SUBSCRIBE co.fun.chat.chat.{channel_name}`**

Every join, exit, message, and invite dispatched to a channel
arrives on this topic. Dispatch on the `type` field to decode.

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

#### URI parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `channel_name` | `String` | yes | Canonical channel name (see `co.fun.chat.get_chat`). |

#### Event kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `Number` | yes | Chat event discriminator. `100` = JOIN, `101` = EXIT, `200` = MESSAGE, `300` = INVITED. Any other value should be treated as unknown.  — One of: 100, 101, 200, 300 |
    | `message_type` | `Number` | no | Present on `MESSAGE` events; `1` for plain text. |
    | `text` | `String` | no | Present on `MESSAGE` events. |

=== "WAMP"

    ```text
    [EVENT, <subscription_id>, <publication_id>, {},
      [
      ],
      {
          "type": …,
          "message_type": …,
          "text": …
        }
    ]
    ```

=== "TypeScript"

    ```typescript
    interface ChatEventKwargs {
      type: 100 | 101 | 200 | 300;
      message_type?: number;
      text?: string;
    }
    ```

=== "Go"

    ```go
    type ChatEventKwargs struct {
    	Type chatEventKwargsTypeKind `json:"type"`
    	MessageType *int `json:"message_type,omitempty"`
    	Text *string `json:"text,omitempty"`
    }

    type chatEventKwargsTypeKind int

    const (
    	CHAT_EVENT_KWARGS_TYPE_100 = chatEventKwargsTypeKind(100)
    	CHAT_EVENT_KWARGS_TYPE_101 = chatEventKwargsTypeKind(101)
    	CHAT_EVENT_KWARGS_TYPE_200 = chatEventKwargsTypeKind(200)
    	CHAT_EVENT_KWARGS_TYPE_300 = chatEventKwargsTypeKind(300)
    )
    ```
