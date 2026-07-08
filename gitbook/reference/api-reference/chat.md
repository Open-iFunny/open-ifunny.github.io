---
description: REST endpoints for discovering and looking up chat channels. Real-time chat messaging itself is WAMP over WebSocket to `chat.ifunny.co` and is documented in Markdown (see externalDocs).
---

# 📡 Chat

REST endpoints for discovering and looking up chat channels. Real-time
chat messaging itself is WAMP over WebSocket to `chat.ifunny.co` and is
documented in Markdown (see externalDocs).

{% swagger method="get" path="/chats/channels/by_link/:link" baseUrl="https://api.ifunny.mobi/v4" summary="Get Chat Channel by Link" %}

{% swagger-description %}
Resolve a `/c/`-style chat share link to a chat channel record. Returns
the channel data (name, type, member counts, cover, description) needed
to then join over WAMP.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="link" type="String" required="true" %}
The `/c/` link identifier (last path segment of the share URL).
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Channel data" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
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
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type GetChatByLink404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetChatByLink404Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/chats/trending" baseUrl="https://api.ifunny.mobi/v4" summary="Get Trending Chat Channels" %}

{% swagger-description %}
Paginated list of trending public channels the user may want to join.
Cursor-based pagination via `next`/`prev`.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetTrendingChatsQuery
{
  "limit"?: "integer",
  "next"?: "string",
  "prev"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetTrendingChatsQuery {
  limit?: number;
  next?: string;
  prev?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetTrendingChatsQuery struct {
	Limit *int `query:"limit,omitempty"`
	Next *string `query:"next,omitempty"`
	Prev *string `query:"prev,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="next" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="prev" type="String" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Trending channels page" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
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
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/chats/open_channels" baseUrl="https://api.ifunny.mobi/v4" summary="Search / List Open Chat Channels" %}

{% swagger-description %}
Search public (open) channels by name, or list them with cursor
pagination. Used by the "join a public chat" browser.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// SearchOpenChatsQuery
{
  "q"?: "string",
  "limit"?: "integer",
  "next"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface SearchOpenChatsQuery {
  q?: string;
  limit?: number;
  next?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type SearchOpenChatsQuery struct {
	Q *string `query:"q,omitempty"`
	Limit *int `query:"limit,omitempty"`
	Next *string `query:"next,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="q" type="String" %}
Search query. Omit to list without filtering.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="next" type="String" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Open channels page" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
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
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/search/chats/channels" baseUrl="https://api.ifunny.mobi/v4" summary="Search Chat Channels" %}

{% swagger-description %}
Global chat-channel search. Cursor-paginated.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// SearchChatChannelsQuery
{
  "q": "string",
  "limit"?: "integer",
  "next"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface SearchChatChannelsQuery {
  q: string;
  limit?: number;
  next?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type SearchChatChannelsQuery struct {
	Q string `query:"q"`
	Limit *int `query:"limit,omitempty"`
	Next *string `query:"next,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="q" type="String" required="true" %}
Search query string
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="next" type="String" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Channel search results" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
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
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}
