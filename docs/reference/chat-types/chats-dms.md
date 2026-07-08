---
title: channels
description: "Create, discover, join, leave, and hide chat channels."
---

# 💬 channels

Create, discover, join, leave, and hide chat channels.

## Procedures

### CALL `co.fun.chat.hide_chat` — Hide a channel from your channel list  {: #proc-co-fun-chat-hide-chat }

Hides the channel from the caller's chats without leaving it.
The channel remains joined server-side; other participants see
no change.

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes | Canonical channel name. |

=== "JSON"

    ```json
    // HideChatKwargs
    {
      "chat_name": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface HideChatKwargs {
      chat_name: string;
    }
    ```

=== "Go"

    ```go
    type HideChatKwargs struct {
    	ChatName string `json:"chat_name"`
    }
    ```

### CALL `co.fun.chat.create_channel` — Create a new channel  {: #proc-co-fun-chat-create-channel }

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `Number` | yes | Channel kind. `1` = DM, `2` = private group, `3` = public group.  — One of: 1, 2, 3 |
    | `id` | `String` | yes | Client-generated channel identifier (usually a UUID). |
    | `title` | `String` | yes |  |
    | `description` | `String` | no |  |
    | `coverURL` | `String` | no |  |
    | `inviteMembersIDs` | `String[]` | no | User IDs to invite at creation time. |

=== "JSON"

    ```json
    // CreateChannelKwargs
    {
      "type": "enum(1, 2, 3)",
      "id": "string",
      "title": "string",
      "description"?: "string",
      "coverURL"?: "string",
      "inviteMembersIDs"?: "string[]"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CreateChannelKwargs {
      type: 1 | 2 | 3;
      id: string;
      title: string;
      description?: string;
      coverURL?: string;
      inviteMembersIDs?: string[];
    }
    ```

=== "Go"

    ```go
    type CreateChannelKwargs struct {
    	Type createChannelKwargsTypeKind `json:"type"`
    	Id string `json:"id"`
    	Title string `json:"title"`
    	Description *string `json:"description,omitempty"`
    	CoverURL *string `json:"coverURL,omitempty"`
    	InviteMembersIDs []string `json:"inviteMembersIDs,omitempty"`
    }

    type createChannelKwargsTypeKind int

    const (
    	CREATE_CHANNEL_KWARGS_TYPE_1 = createChannelKwargsTypeKind(iota + 1)
    	CREATE_CHANNEL_KWARGS_TYPE_2 = createChannelKwargsTypeKind(iota + 1)
    	CREATE_CHANNEL_KWARGS_TYPE_3 = createChannelKwargsTypeKind(iota + 1)
    )
    ```

### CALL `co.fun.chat.get_or_create_chat` — Get or create a direct-message channel  {: #proc-co-fun-chat-get-or-create-chat }

Idempotently resolves a DM channel between the caller and one
or more other users. The canonical `name` for a DM channel is
the sorted user IDs joined with `_` in reverse order (see the
`DMChannelName` helper in ifunny-go/compose/channel.go).

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `Number` | yes | Channel kind. `1` = DM, `2` = private group, `3` = public group.  — One of: 1, 2, 3 |
    | `users` | `String[]` | yes |  |
    | `name` | `String` | yes | Canonical DM channel name. |

=== "JSON"

    ```json
    // GetOrCreateChatKwargs
    {
      "type": "enum(1, 2, 3)",
      "users": "string[]",
      "name": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetOrCreateChatKwargs {
      type: 1 | 2 | 3;
      users: string[];
      name: string;
    }
    ```

=== "Go"

    ```go
    type GetOrCreateChatKwargs struct {
    	Type getOrCreateChatKwargsTypeKind `json:"type"`
    	Users []string `json:"users"`
    	Name string `json:"name"`
    }

    type getOrCreateChatKwargsTypeKind int

    const (
    	GET_OR_CREATE_CHAT_KWARGS_TYPE_1 = getOrCreateChatKwargsTypeKind(iota + 1)
    	GET_OR_CREATE_CHAT_KWARGS_TYPE_2 = getOrCreateChatKwargsTypeKind(iota + 1)
    	GET_OR_CREATE_CHAT_KWARGS_TYPE_3 = getOrCreateChatKwargsTypeKind(iota + 1)
    )
    ```

### CALL `co.fun.chat.new_chat` — Create a new named channel  {: #proc-co-fun-chat-new-chat }

Creates a public or private group channel. Private channels do
not accept a `description`.

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `Number` | yes | Channel kind. `1` = DM, `2` = private group, `3` = public group.  — One of: 1, 2, 3 |
    | `name` | `String` | yes |  |
    | `title` | `String` | yes |  |
    | `description` | `String` | no |  |
    | `users` | `String[]` | yes |  |

=== "JSON"

    ```json
    // NewChatKwargs
    {
      "type": "enum(1, 2, 3)",
      "name": "string",
      "title": "string",
      "description"?: "string",
      "users": "string[]"
    }
    ```

=== "TypeScript"

    ```typescript
    interface NewChatKwargs {
      type: 1 | 2 | 3;
      name: string;
      title: string;
      description?: string;
      users: string[];
    }
    ```

=== "Go"

    ```go
    type NewChatKwargs struct {
    	Type newChatKwargsTypeKind `json:"type"`
    	Name string `json:"name"`
    	Title string `json:"title"`
    	Description *string `json:"description,omitempty"`
    	Users []string `json:"users"`
    }

    type newChatKwargsTypeKind int

    const (
    	NEW_CHAT_KWARGS_TYPE_1 = newChatKwargsTypeKind(iota + 1)
    	NEW_CHAT_KWARGS_TYPE_2 = newChatKwargsTypeKind(iota + 1)
    	NEW_CHAT_KWARGS_TYPE_3 = newChatKwargsTypeKind(iota + 1)
    )
    ```

### CALL `co.fun.chat.get_chat` — Fetch channel details by name  {: #proc-co-fun-chat-get-chat }

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
    // GetChatKwargs
    {
      "chat_name": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetChatKwargs {
      chat_name: string;
    }
    ```

=== "Go"

    ```go
    type GetChatKwargs struct {
    	ChatName string `json:"chat_name"`
    }
    ```

### CALL `co.fun.chat.join_chat` — Join a channel by name  {: #proc-co-fun-chat-join-chat }

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
    // JoinChatKwargs
    {
      "chat_name": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface JoinChatKwargs {
      chat_name: string;
    }
    ```

=== "Go"

    ```go
    type JoinChatKwargs struct {
    	ChatName string `json:"chat_name"`
    }
    ```

### CALL `co.fun.chat.leave_chat` — Leave a channel by name  {: #proc-co-fun-chat-leave-chat }

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
    // LeaveChatKwargs
    {
      "chat_name": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface LeaveChatKwargs {
      chat_name: string;
    }
    ```

=== "Go"

    ```go
    type LeaveChatKwargs struct {
    	ChatName string `json:"chat_name"`
    }
    ```

### CALL `co.fun.chat.list_messages` — List messages in a channel  {: #proc-co-fun-chat-list-messages }

Paginated message history. `next`/`prev` cursors are integer
message IDs; omit both to fetch the newest page.

**URL:** `wss://chat.ifunny.co/chat`  
**Realm:** `co.fun.chat.ifunny`  
**Auth:** `ticket` (ticket) — credential: [reference/api/oauth2.md#op-loginorrefresh](../../reference/api/oauth2.md#op-loginorrefresh)

#### Kwargs

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `chat_name` | `String` | yes |  |
    | `limit` | `Number` | yes |  |
    | `next` | `Number` | no | Fetch messages older than this cursor. |
    | `prev` | `Number` | no | Fetch messages newer than this cursor. |

=== "JSON"

    ```json
    // ListMessagesKwargs
    {
      "chat_name": "string",
      "limit": "integer",
      "next"?: "integer",
      "prev"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ListMessagesKwargs {
      chat_name: string;
      limit: number;
      next?: number;
      prev?: number;
    }
    ```

=== "Go"

    ```go
    type ListMessagesKwargs struct {
    	ChatName string `json:"chat_name"`
    	Limit int `json:"limit"`
    	Next *int `json:"next,omitempty"`
    	Prev *int `json:"prev,omitempty"`
    }
    ```
