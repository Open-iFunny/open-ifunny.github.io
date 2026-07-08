---
title: Chat
description: "REST endpoints for discovering and looking up chat channels. Real-time chat messaging itself is WAMP over WebSocket to `chat.ifunny.co` and is documented in Markdown (see externalDocs)."
---

# 📡 Chat

REST endpoints for discovering and looking up chat channels. Real-time
chat messaging itself is WAMP over WebSocket to `chat.ifunny.co` and is
documented in Markdown (see externalDocs).

### `GET /chats/channels/by_link/{link}` — Get Chat Channel by Link  {: #op-getchatbylink }

Resolve a `/c/`-style chat share link to a chat channel record. Returns
the channel data (name, type, member counts, cover, description) needed
to then join over WAMP.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `link` | `String` | yes | The `/c/` link identifier (last path segment of the share URL). |

#### Responses

##### `200 OK` — Channel data

=== "JSON"

    ```json
    // GetChatByLink200Response
    {
      "data"?: "GetChatByLink200Data",
      "status"?: "200"
    }

    // GetChatByLink200Data
    {
      "channel"?: "Chat"
    }

    // Chat
    {
      "touch_dt"?: "integer",
      "name"?: "string",
      "role"?: "integer",
      "cover"?: "string",
      "title"?: "string",
      "last_msg"?: "ChatMessage",
      "messages_unread"?: "integer",
      "join_state"?: "integer",
      "members_online"?: "integer",
      "type"?: "ChatType",
      "members_total"?: "integer"
    }

    // ChatMessage
    {
      "payload"?: "ChatMessagePayload",
      "user"?: "ChatMessageUser",
      "id"?: "string",
      "type"?: "integer",
      "pub_at"?: "integer",
      "status"?: "integer",
      "text"?: "string"
    }

    // ChatType
    "ChatType": "enum(1, 2, 3)"

    // ChatMessagePayload
    {
      "local_id"?: "string"
    }

    // ChatMessageUser
    {
      "nick"?: "string",
      "is_verified"?: "boolean",
      "last_seen_at"?: "integer",
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetChatByLink200Response {
      data?: GetChatByLink200Data;
      status?: 200;
    }

    interface GetChatByLink200Data {
      channel?: Chat;
    }

    interface Chat {
      touch_dt?: number;
      name?: string;
      role?: number;
      cover?: string;
      title?: string;
      last_msg?: ChatMessage;
      messages_unread?: number;
      join_state?: number;
      members_online?: number;
      type?: ChatType;
      members_total?: number;
    }

    interface ChatMessage {
      payload?: ChatMessagePayload;
      user?: ChatMessageUser;
      id?: string;
      type?: number;
      pub_at?: number;
      status?: number;
      text?: string;
    }

    type ChatType = 1 | 2 | 3;

    interface ChatMessagePayload {
      local_id?: string;
    }

    interface ChatMessageUser {
      nick?: string;
      is_verified?: boolean;
      last_seen_at?: number;
      id?: string;
    }
    ```

=== "Go"

    ```go
    type GetChatByLink200Response struct {
    	Data GetChatByLink200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetChatByLink200Data struct {
    	Channel Chat `json:"channel,omitempty"`
    }

    type Chat struct {
    	TouchDt *int `json:"touch_dt,omitempty"`
    	Name *string `json:"name,omitempty"`
    	Role *int `json:"role,omitempty"`
    	Cover *string `json:"cover,omitempty"`
    	Title *string `json:"title,omitempty"`
    	LastMsg ChatMessage `json:"last_msg,omitempty"`
    	MessagesUnread *int `json:"messages_unread,omitempty"`
    	JoinState *int `json:"join_state,omitempty"`
    	MembersOnline *int `json:"members_online,omitempty"`
    	Type *chatTypeKind `json:"type,omitempty"`
    	MembersTotal *int `json:"members_total,omitempty"`
    }

    type ChatMessage struct {
    	Payload ChatMessagePayload `json:"payload,omitempty"`
    	User ChatMessageUser `json:"user,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *int `json:"type,omitempty"`
    	PubAt *int `json:"pub_at,omitempty"`
    	Status *int `json:"status,omitempty"`
    	Text *string `json:"text,omitempty"`
    }

    type ChatMessagePayload struct {
    	LocalId *string `json:"local_id,omitempty"`
    }

    type ChatMessageUser struct {
    	Nick *string `json:"nick,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	LastSeenAt *int `json:"last_seen_at,omitempty"`
    	Id *string `json:"id,omitempty"`
    }

    type chatTypeKind int

    const (
    	CHAT_TYPE_PRIVATE_DIRECT_MESSAGE = chatTypeKind(iota + 1)
    	CHAT_TYPE_PRIVATE_GROUP_CHAT     = chatTypeKind(iota + 1)
    	CHAT_TYPE_PUBLIC_GROUP_CHAT      = chatTypeKind(iota + 1)
    )
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // GetChatByLink404Response
    "GetChatByLink404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetChatByLink404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetChatByLink404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `GET /chats/trending` — Get Trending Chat Channels  {: #op-gettrendingchats }

Paginated list of trending public channels the user may want to join.
Cursor-based pagination via `next`/`prev`.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |
    | `next` | `String` | no |  |
    | `prev` | `String` | no |  |

=== "JSON"

    ```json
    // GetTrendingChatsQuery
    {
      "limit"?: "integer",
      "next"?: "string",
      "prev"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetTrendingChatsQuery {
      limit?: number;
      next?: string;
      prev?: string;
    }
    ```

=== "Go"

    ```go
    type GetTrendingChatsQuery struct {
    	Limit *int `query:"limit,omitempty"`
    	Next *string `query:"next,omitempty"`
    	Prev *string `query:"prev,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Trending channels page

=== "JSON"

    ```json
    // GetTrendingChats200Response
    {
      "data"?: "GetTrendingChats200Data",
      "status"?: "200"
    }

    // GetTrendingChats200Data
    {
      "channels"?: "GetTrendingChats200DataChannels"
    }

    // GetTrendingChats200DataChannels
    {
      "items"?: "Chat[]",
      "paging"?: "PagingCursors"
    }

    // Chat
    {
      "touch_dt"?: "integer",
      "name"?: "string",
      "role"?: "integer",
      "cover"?: "string",
      "title"?: "string",
      "last_msg"?: "ChatMessage",
      "messages_unread"?: "integer",
      "join_state"?: "integer",
      "members_online"?: "integer",
      "type"?: "ChatType",
      "members_total"?: "integer"
    }

    // PagingCursors
    {
      "cursors"?: "PagingCursorsCursors",
      "hasNext"?: "boolean",
      "hasPrev"?: "boolean",
      "has_next"?: "boolean",
      "has_prev"?: "boolean"
    }

    // ChatMessage
    {
      "payload"?: "ChatMessagePayload",
      "user"?: "ChatMessageUser",
      "id"?: "string",
      "type"?: "integer",
      "pub_at"?: "integer",
      "status"?: "integer",
      "text"?: "string"
    }

    // ChatType
    "ChatType": "enum(1, 2, 3)"

    // PagingCursorsCursors
    {
      "next"?: "string",
      "prev"?: "string"
    }

    // ChatMessagePayload
    {
      "local_id"?: "string"
    }

    // ChatMessageUser
    {
      "nick"?: "string",
      "is_verified"?: "boolean",
      "last_seen_at"?: "integer",
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetTrendingChats200Response {
      data?: GetTrendingChats200Data;
      status?: 200;
    }

    interface GetTrendingChats200Data {
      channels?: GetTrendingChats200DataChannels;
    }

    interface GetTrendingChats200DataChannels {
      items?: Chat[];
      paging?: PagingCursors;
    }

    interface Chat {
      touch_dt?: number;
      name?: string;
      role?: number;
      cover?: string;
      title?: string;
      last_msg?: ChatMessage;
      messages_unread?: number;
      join_state?: number;
      members_online?: number;
      type?: ChatType;
      members_total?: number;
    }

    interface PagingCursors {
      cursors?: PagingCursorsCursors;
      hasNext?: boolean;
      hasPrev?: boolean;
      has_next?: boolean;
      has_prev?: boolean;
    }

    interface ChatMessage {
      payload?: ChatMessagePayload;
      user?: ChatMessageUser;
      id?: string;
      type?: number;
      pub_at?: number;
      status?: number;
      text?: string;
    }

    type ChatType = 1 | 2 | 3;

    interface PagingCursorsCursors {
      next?: string;
      prev?: string;
    }

    interface ChatMessagePayload {
      local_id?: string;
    }

    interface ChatMessageUser {
      nick?: string;
      is_verified?: boolean;
      last_seen_at?: number;
      id?: string;
    }
    ```

=== "Go"

    ```go
    type GetTrendingChats200Response struct {
    	Data GetTrendingChats200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetTrendingChats200Data struct {
    	Channels GetTrendingChats200DataChannels `json:"channels,omitempty"`
    }

    type GetTrendingChats200DataChannels struct {
    	Items []Chat `json:"items,omitempty"`
    	Paging PagingCursors `json:"paging,omitempty"`
    }

    type Chat struct {
    	TouchDt *int `json:"touch_dt,omitempty"`
    	Name *string `json:"name,omitempty"`
    	Role *int `json:"role,omitempty"`
    	Cover *string `json:"cover,omitempty"`
    	Title *string `json:"title,omitempty"`
    	LastMsg ChatMessage `json:"last_msg,omitempty"`
    	MessagesUnread *int `json:"messages_unread,omitempty"`
    	JoinState *int `json:"join_state,omitempty"`
    	MembersOnline *int `json:"members_online,omitempty"`
    	Type *chatTypeKind `json:"type,omitempty"`
    	MembersTotal *int `json:"members_total,omitempty"`
    }

    type PagingCursors struct {
    	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
    	HasNext *bool `json:"hasNext,omitempty"`
    	HasPrev *bool `json:"hasPrev,omitempty"`
    	HasNext *bool `json:"has_next,omitempty"`
    	HasPrev *bool `json:"has_prev,omitempty"`
    }

    type ChatMessage struct {
    	Payload ChatMessagePayload `json:"payload,omitempty"`
    	User ChatMessageUser `json:"user,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *int `json:"type,omitempty"`
    	PubAt *int `json:"pub_at,omitempty"`
    	Status *int `json:"status,omitempty"`
    	Text *string `json:"text,omitempty"`
    }

    type PagingCursorsCursors struct {
    	Next *string `json:"next,omitempty"`
    	Prev *string `json:"prev,omitempty"`
    }

    type ChatMessagePayload struct {
    	LocalId *string `json:"local_id,omitempty"`
    }

    type ChatMessageUser struct {
    	Nick *string `json:"nick,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	LastSeenAt *int `json:"last_seen_at,omitempty"`
    	Id *string `json:"id,omitempty"`
    }

    type chatTypeKind int

    const (
    	CHAT_TYPE_PRIVATE_DIRECT_MESSAGE = chatTypeKind(iota + 1)
    	CHAT_TYPE_PRIVATE_GROUP_CHAT     = chatTypeKind(iota + 1)
    	CHAT_TYPE_PUBLIC_GROUP_CHAT      = chatTypeKind(iota + 1)
    )
    ```

### `GET /chats/open_channels` — Search / List Open Chat Channels  {: #op-searchopenchats }

Search public (open) channels by name, or list them with cursor
pagination. Used by the "join a public chat" browser.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `q` | `String` | no | Search query. Omit to list without filtering. |
    | `limit` | `Number` | no |  |
    | `next` | `String` | no |  |

=== "JSON"

    ```json
    // SearchOpenChatsQuery
    {
      "q"?: "string",
      "limit"?: "integer",
      "next"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchOpenChatsQuery {
      q?: string;
      limit?: number;
      next?: string;
    }
    ```

=== "Go"

    ```go
    type SearchOpenChatsQuery struct {
    	Q *string `query:"q,omitempty"`
    	Limit *int `query:"limit,omitempty"`
    	Next *string `query:"next,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Open channels page

=== "JSON"

    ```json
    // SearchOpenChats200Response
    {
      "data"?: "SearchOpenChats200Data",
      "status"?: "200"
    }

    // SearchOpenChats200Data
    {
      "channels"?: "SearchOpenChats200DataChannels"
    }

    // SearchOpenChats200DataChannels
    {
      "items"?: "Chat[]",
      "paging"?: "PagingCursors"
    }

    // Chat
    {
      "touch_dt"?: "integer",
      "name"?: "string",
      "role"?: "integer",
      "cover"?: "string",
      "title"?: "string",
      "last_msg"?: "ChatMessage",
      "messages_unread"?: "integer",
      "join_state"?: "integer",
      "members_online"?: "integer",
      "type"?: "ChatType",
      "members_total"?: "integer"
    }

    // PagingCursors
    {
      "cursors"?: "PagingCursorsCursors",
      "hasNext"?: "boolean",
      "hasPrev"?: "boolean",
      "has_next"?: "boolean",
      "has_prev"?: "boolean"
    }

    // ChatMessage
    {
      "payload"?: "ChatMessagePayload",
      "user"?: "ChatMessageUser",
      "id"?: "string",
      "type"?: "integer",
      "pub_at"?: "integer",
      "status"?: "integer",
      "text"?: "string"
    }

    // ChatType
    "ChatType": "enum(1, 2, 3)"

    // PagingCursorsCursors
    {
      "next"?: "string",
      "prev"?: "string"
    }

    // ChatMessagePayload
    {
      "local_id"?: "string"
    }

    // ChatMessageUser
    {
      "nick"?: "string",
      "is_verified"?: "boolean",
      "last_seen_at"?: "integer",
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchOpenChats200Response {
      data?: SearchOpenChats200Data;
      status?: 200;
    }

    interface SearchOpenChats200Data {
      channels?: SearchOpenChats200DataChannels;
    }

    interface SearchOpenChats200DataChannels {
      items?: Chat[];
      paging?: PagingCursors;
    }

    interface Chat {
      touch_dt?: number;
      name?: string;
      role?: number;
      cover?: string;
      title?: string;
      last_msg?: ChatMessage;
      messages_unread?: number;
      join_state?: number;
      members_online?: number;
      type?: ChatType;
      members_total?: number;
    }

    interface PagingCursors {
      cursors?: PagingCursorsCursors;
      hasNext?: boolean;
      hasPrev?: boolean;
      has_next?: boolean;
      has_prev?: boolean;
    }

    interface ChatMessage {
      payload?: ChatMessagePayload;
      user?: ChatMessageUser;
      id?: string;
      type?: number;
      pub_at?: number;
      status?: number;
      text?: string;
    }

    type ChatType = 1 | 2 | 3;

    interface PagingCursorsCursors {
      next?: string;
      prev?: string;
    }

    interface ChatMessagePayload {
      local_id?: string;
    }

    interface ChatMessageUser {
      nick?: string;
      is_verified?: boolean;
      last_seen_at?: number;
      id?: string;
    }
    ```

=== "Go"

    ```go
    type SearchOpenChats200Response struct {
    	Data SearchOpenChats200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SearchOpenChats200Data struct {
    	Channels SearchOpenChats200DataChannels `json:"channels,omitempty"`
    }

    type SearchOpenChats200DataChannels struct {
    	Items []Chat `json:"items,omitempty"`
    	Paging PagingCursors `json:"paging,omitempty"`
    }

    type Chat struct {
    	TouchDt *int `json:"touch_dt,omitempty"`
    	Name *string `json:"name,omitempty"`
    	Role *int `json:"role,omitempty"`
    	Cover *string `json:"cover,omitempty"`
    	Title *string `json:"title,omitempty"`
    	LastMsg ChatMessage `json:"last_msg,omitempty"`
    	MessagesUnread *int `json:"messages_unread,omitempty"`
    	JoinState *int `json:"join_state,omitempty"`
    	MembersOnline *int `json:"members_online,omitempty"`
    	Type *chatTypeKind `json:"type,omitempty"`
    	MembersTotal *int `json:"members_total,omitempty"`
    }

    type PagingCursors struct {
    	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
    	HasNext *bool `json:"hasNext,omitempty"`
    	HasPrev *bool `json:"hasPrev,omitempty"`
    	HasNext *bool `json:"has_next,omitempty"`
    	HasPrev *bool `json:"has_prev,omitempty"`
    }

    type ChatMessage struct {
    	Payload ChatMessagePayload `json:"payload,omitempty"`
    	User ChatMessageUser `json:"user,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *int `json:"type,omitempty"`
    	PubAt *int `json:"pub_at,omitempty"`
    	Status *int `json:"status,omitempty"`
    	Text *string `json:"text,omitempty"`
    }

    type PagingCursorsCursors struct {
    	Next *string `json:"next,omitempty"`
    	Prev *string `json:"prev,omitempty"`
    }

    type ChatMessagePayload struct {
    	LocalId *string `json:"local_id,omitempty"`
    }

    type ChatMessageUser struct {
    	Nick *string `json:"nick,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	LastSeenAt *int `json:"last_seen_at,omitempty"`
    	Id *string `json:"id,omitempty"`
    }

    type chatTypeKind int

    const (
    	CHAT_TYPE_PRIVATE_DIRECT_MESSAGE = chatTypeKind(iota + 1)
    	CHAT_TYPE_PRIVATE_GROUP_CHAT     = chatTypeKind(iota + 1)
    	CHAT_TYPE_PUBLIC_GROUP_CHAT      = chatTypeKind(iota + 1)
    )
    ```

### `GET /search/chats/channels` — Search Chat Channels  {: #op-searchchatchannels }

Global chat-channel search. Cursor-paginated.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `q` | `String` | yes | Search query string |
    | `limit` | `Number` | no |  |
    | `next` | `String` | no |  |

=== "JSON"

    ```json
    // SearchChatChannelsQuery
    {
      "q": "string",
      "limit"?: "integer",
      "next"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchChatChannelsQuery {
      q: string;
      limit?: number;
      next?: string;
    }
    ```

=== "Go"

    ```go
    type SearchChatChannelsQuery struct {
    	Q string `query:"q"`
    	Limit *int `query:"limit,omitempty"`
    	Next *string `query:"next,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Channel search results

=== "JSON"

    ```json
    // SearchChatChannels200Response
    {
      "data"?: "SearchChatChannels200Data",
      "status"?: "200"
    }

    // SearchChatChannels200Data
    {
      "channels"?: "SearchChatChannels200DataChannels"
    }

    // SearchChatChannels200DataChannels
    {
      "items"?: "Chat[]",
      "paging"?: "PagingCursors"
    }

    // Chat
    {
      "touch_dt"?: "integer",
      "name"?: "string",
      "role"?: "integer",
      "cover"?: "string",
      "title"?: "string",
      "last_msg"?: "ChatMessage",
      "messages_unread"?: "integer",
      "join_state"?: "integer",
      "members_online"?: "integer",
      "type"?: "ChatType",
      "members_total"?: "integer"
    }

    // PagingCursors
    {
      "cursors"?: "PagingCursorsCursors",
      "hasNext"?: "boolean",
      "hasPrev"?: "boolean",
      "has_next"?: "boolean",
      "has_prev"?: "boolean"
    }

    // ChatMessage
    {
      "payload"?: "ChatMessagePayload",
      "user"?: "ChatMessageUser",
      "id"?: "string",
      "type"?: "integer",
      "pub_at"?: "integer",
      "status"?: "integer",
      "text"?: "string"
    }

    // ChatType
    "ChatType": "enum(1, 2, 3)"

    // PagingCursorsCursors
    {
      "next"?: "string",
      "prev"?: "string"
    }

    // ChatMessagePayload
    {
      "local_id"?: "string"
    }

    // ChatMessageUser
    {
      "nick"?: "string",
      "is_verified"?: "boolean",
      "last_seen_at"?: "integer",
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchChatChannels200Response {
      data?: SearchChatChannels200Data;
      status?: 200;
    }

    interface SearchChatChannels200Data {
      channels?: SearchChatChannels200DataChannels;
    }

    interface SearchChatChannels200DataChannels {
      items?: Chat[];
      paging?: PagingCursors;
    }

    interface Chat {
      touch_dt?: number;
      name?: string;
      role?: number;
      cover?: string;
      title?: string;
      last_msg?: ChatMessage;
      messages_unread?: number;
      join_state?: number;
      members_online?: number;
      type?: ChatType;
      members_total?: number;
    }

    interface PagingCursors {
      cursors?: PagingCursorsCursors;
      hasNext?: boolean;
      hasPrev?: boolean;
      has_next?: boolean;
      has_prev?: boolean;
    }

    interface ChatMessage {
      payload?: ChatMessagePayload;
      user?: ChatMessageUser;
      id?: string;
      type?: number;
      pub_at?: number;
      status?: number;
      text?: string;
    }

    type ChatType = 1 | 2 | 3;

    interface PagingCursorsCursors {
      next?: string;
      prev?: string;
    }

    interface ChatMessagePayload {
      local_id?: string;
    }

    interface ChatMessageUser {
      nick?: string;
      is_verified?: boolean;
      last_seen_at?: number;
      id?: string;
    }
    ```

=== "Go"

    ```go
    type SearchChatChannels200Response struct {
    	Data SearchChatChannels200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SearchChatChannels200Data struct {
    	Channels SearchChatChannels200DataChannels `json:"channels,omitempty"`
    }

    type SearchChatChannels200DataChannels struct {
    	Items []Chat `json:"items,omitempty"`
    	Paging PagingCursors `json:"paging,omitempty"`
    }

    type Chat struct {
    	TouchDt *int `json:"touch_dt,omitempty"`
    	Name *string `json:"name,omitempty"`
    	Role *int `json:"role,omitempty"`
    	Cover *string `json:"cover,omitempty"`
    	Title *string `json:"title,omitempty"`
    	LastMsg ChatMessage `json:"last_msg,omitempty"`
    	MessagesUnread *int `json:"messages_unread,omitempty"`
    	JoinState *int `json:"join_state,omitempty"`
    	MembersOnline *int `json:"members_online,omitempty"`
    	Type *chatTypeKind `json:"type,omitempty"`
    	MembersTotal *int `json:"members_total,omitempty"`
    }

    type PagingCursors struct {
    	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
    	HasNext *bool `json:"hasNext,omitempty"`
    	HasPrev *bool `json:"hasPrev,omitempty"`
    	HasNext *bool `json:"has_next,omitempty"`
    	HasPrev *bool `json:"has_prev,omitempty"`
    }

    type ChatMessage struct {
    	Payload ChatMessagePayload `json:"payload,omitempty"`
    	User ChatMessageUser `json:"user,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *int `json:"type,omitempty"`
    	PubAt *int `json:"pub_at,omitempty"`
    	Status *int `json:"status,omitempty"`
    	Text *string `json:"text,omitempty"`
    }

    type PagingCursorsCursors struct {
    	Next *string `json:"next,omitempty"`
    	Prev *string `json:"prev,omitempty"`
    }

    type ChatMessagePayload struct {
    	LocalId *string `json:"local_id,omitempty"`
    }

    type ChatMessageUser struct {
    	Nick *string `json:"nick,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	LastSeenAt *int `json:"last_seen_at,omitempty"`
    	Id *string `json:"id,omitempty"`
    }

    type chatTypeKind int

    const (
    	CHAT_TYPE_PRIVATE_DIRECT_MESSAGE = chatTypeKind(iota + 1)
    	CHAT_TYPE_PRIVATE_GROUP_CHAT     = chatTypeKind(iota + 1)
    	CHAT_TYPE_PUBLIC_GROUP_CHAT      = chatTypeKind(iota + 1)
    )
    ```
