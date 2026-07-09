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

    // A DM or Group Chat, similar to a Discord channel.
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

    // Cursor pagination block. Field naming (`hasNext`/`hasPrev` vs
    // `has_next`/`has_prev`) is inconsistent across endpoints in the source API;
    // both are accepted here.
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

    // 1=Private Direct Message, 2=Private Group Chat, 3=Public Group Chat
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

    // A DM or Group Chat, similar to a Discord channel.
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

    // Cursor pagination block. Field naming (`hasNext`/`hasPrev` vs
    // `has_next`/`has_prev`) is inconsistent across endpoints in the source API;
    // both are accepted here.
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

    // 1=Private Direct Message, 2=Private Group Chat, 3=Public Group Chat
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

    // A DM or Group Chat, similar to a Discord channel.
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

    // Cursor pagination block. Field naming (`hasNext`/`hasPrev` vs
    // `has_next`/`has_prev`) is inconsistent across endpoints in the source API;
    // both are accepted here.
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
