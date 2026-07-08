---
description: Methods for the authenticated client's own account
---

# 🤖 Client

Methods for the authenticated client's own account

{% swagger method="get" path="/account" baseUrl="https://api.ifunny.mobi/v4" summary="Fetch Profile" %}

{% swagger-description %}
Fetch account information for the client.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-response status="200: OK" description="Account Information" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientAccount200Response
{
  "data"?: "ClientProfile",
  "status"?: "200"
}

// ClientProfile
{
  "about"?: "string",
  "id"?: "string",
  "bans"?: "SmallBan[]",
  "birth_date"?: "string",
  "email"?: "string",
  "meme_experience"?: "MemeExperience",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "UserProfileNums",
  "original_nick"?: "string",
  "sex"?: "enum(male, female, other)",
  "web_url"?: "string",
  "is_available_for_chat"?: "boolean",
  "is_banned"?: "boolean",
  "is_blocked_in_messenger"?: "boolean",
  "is_deleted"?: "boolean",
  "is_ifunny_team_member"?: "boolean",
  "is_moderator"?: "boolean",
  "is_private"?: "boolean",
  "is_verified"?: "boolean",
  "have_unnotified_achievements"?: "boolean",
  "have_unnotified_bans"?: "boolean",
  "have_unnotified_levels"?: "boolean",
  "have_unnotified_strikes"?: "boolean",
  "messaging_privacy_status"?: "enum(public, subscribers, closed)",
  "messenger_active"?: "boolean",
  "messenger_token"?: "string",
  "need_account_setup"?: "boolean",
  "safe_mode"?: "boolean",
  "cover_bg_color"?: "string",
  "cover_url"?: "string",
  "photo"?: "ProfilePhoto",
  "phone_data"?: "ClientPhoneData",
  "phone"?: "string",
  "unconfirmed_phone_data"?: "ClientPhoneData",
  "unconfirmed_phone"?: "string",
  "location"?: "string",
  "hometown"?: "string"
}

// SmallBan
{
  "date_until"?: "integer",
  "id"?: "string",
  "type"?: "string"
}

// MemeExperience
{
  "badge_size"?: "MemeExperienceBadgeSize",
  "badge_url"?: "string",
  "days"?: "integer",
  "next_milestone"?: "integer",
  "rank"?: "integer"
}

// UserProfileNums
{
  "achievements"?: "integer",
  "created"?: "integer",
  "featured"?: "integer",
  "subscribers"?: "integer",
  "subscriptions"?: "integer",
  "total_posts"?: "integer",
  "total_smiles"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// ClientPhoneData
{
  "code"?: "string",
  "number"?: "string"
}

// MemeExperienceBadgeSize
{
  "h"?: "integer",
  "w"?: "integer"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientAccount200Response {
  data?: ClientProfile;
  status?: 200;
}

interface ClientProfile {
  about?: string;
  id?: string;
  bans?: SmallBan[];
  birth_date?: string;
  email?: string;
  meme_experience?: MemeExperience;
  nick?: string;
  nick_color?: string;
  num?: UserProfileNums;
  original_nick?: string;
  sex?: 'male' | 'female' | 'other';
  web_url?: string;
  is_available_for_chat?: boolean;
  is_banned?: boolean;
  is_blocked_in_messenger?: boolean;
  is_deleted?: boolean;
  is_ifunny_team_member?: boolean;
  is_moderator?: boolean;
  is_private?: boolean;
  is_verified?: boolean;
  have_unnotified_achievements?: boolean;
  have_unnotified_bans?: boolean;
  have_unnotified_levels?: boolean;
  have_unnotified_strikes?: boolean;
  messaging_privacy_status?: 'public' | 'subscribers' | 'closed';
  messenger_active?: boolean;
  messenger_token?: string;
  need_account_setup?: boolean;
  safe_mode?: boolean;
  cover_bg_color?: string;
  cover_url?: string;
  photo?: ProfilePhoto;
  phone_data?: ClientPhoneData;
  phone?: string;
  unconfirmed_phone_data?: ClientPhoneData;
  unconfirmed_phone?: string;
  location?: string;
  hometown?: string;
}

interface SmallBan {
  date_until?: number;
  id?: string;
  type?: string;
}

interface MemeExperience {
  badge_size?: MemeExperienceBadgeSize;
  badge_url?: string;
  days?: number;
  next_milestone?: number;
  rank?: number;
}

interface UserProfileNums {
  achievements?: number;
  created?: number;
  featured?: number;
  subscribers?: number;
  subscriptions?: number;
  total_posts?: number;
  total_smiles?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface ClientPhoneData {
  code?: string;
  number?: string;
}

interface MemeExperienceBadgeSize {
  h?: number;
  w?: number;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientAccount200Response struct {
	Data ClientProfile `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type ClientProfile struct {
	About *string `json:"about,omitempty"`
	Id *string `json:"id,omitempty"`
	Bans []SmallBan `json:"bans,omitempty"`
	BirthDate *string `json:"birth_date,omitempty"`
	Email *string `json:"email,omitempty"`
	MemeExperience MemeExperience `json:"meme_experience,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num UserProfileNums `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Sex *string `json:"sex,omitempty"`
	WebUrl *string `json:"web_url,omitempty"`
	IsAvailableForChat *bool `json:"is_available_for_chat,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlockedInMessenger *bool `json:"is_blocked_in_messenger,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsIfunnyTeamMember *bool `json:"is_ifunny_team_member,omitempty"`
	IsModerator *bool `json:"is_moderator,omitempty"`
	IsPrivate *bool `json:"is_private,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	HaveUnnotifiedAchievements *bool `json:"have_unnotified_achievements,omitempty"`
	HaveUnnotifiedBans *bool `json:"have_unnotified_bans,omitempty"`
	HaveUnnotifiedLevels *bool `json:"have_unnotified_levels,omitempty"`
	HaveUnnotifiedStrikes *bool `json:"have_unnotified_strikes,omitempty"`
	MessagingPrivacyStatus *string `json:"messaging_privacy_status,omitempty"`
	MessengerActive *bool `json:"messenger_active,omitempty"`
	MessengerToken *string `json:"messenger_token,omitempty"`
	NeedAccountSetup *bool `json:"need_account_setup,omitempty"`
	SafeMode *bool `json:"safe_mode,omitempty"`
	CoverBgColor *string `json:"cover_bg_color,omitempty"`
	CoverUrl *string `json:"cover_url,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	PhoneData ClientPhoneData `json:"phone_data,omitempty"`
	Phone *string `json:"phone,omitempty"`
	UnconfirmedPhoneData ClientPhoneData `json:"unconfirmed_phone_data,omitempty"`
	UnconfirmedPhone *string `json:"unconfirmed_phone,omitempty"`
	Location *string `json:"location,omitempty"`
	Hometown *string `json:"hometown,omitempty"`
}

type SmallBan struct {
	DateUntil *int `json:"date_until,omitempty"`
	Id *string `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
}

type MemeExperience struct {
	BadgeSize MemeExperienceBadgeSize `json:"badge_size,omitempty"`
	BadgeUrl *string `json:"badge_url,omitempty"`
	Days *int `json:"days,omitempty"`
	NextMilestone *int `json:"next_milestone,omitempty"`
	Rank *int `json:"rank,omitempty"`
}

type UserProfileNums struct {
	Achievements *int `json:"achievements,omitempty"`
	Created *int `json:"created,omitempty"`
	Featured *int `json:"featured,omitempty"`
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
	TotalSmiles *int `json:"total_smiles,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ClientPhoneData struct {
	Code *string `json:"code,omitempty"`
	Number *string `json:"number,omitempty"`
}

type MemeExperienceBadgeSize struct {
	H *int `json:"h,omitempty"`
	W *int `json:"w,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientAccount401Response
"GetClientAccount401Response": "Error"

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
type GetClientAccount401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientAccount401Response Error

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

{% swagger method="put" path="/account" baseUrl="https://api.ifunny.mobi/v4" summary="Edit Profile" %}

{% swagger-description %}
Edit profile information for the client.

**Auth:** BearerAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
```json
// EditClientAccountRequest
{
  "nick"?: "string",
  "about"?: "string",
  "sex"?: "enum(male, female, other)",
  "birth_date"?: "string",
  "hometown"?: "string",
  "location"?: "string",
  "messaging_privacy_status"?: "enum(public, subscribers, closed)",
  "is_private"?: "enum(0, 1)"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface EditClientAccountRequest {
  nick?: string;
  about?: string;
  sex?: 'male' | 'female' | 'other';
  birth_date?: string;
  hometown?: string;
  location?: string;
  messaging_privacy_status?: 'public' | 'subscribers' | 'closed';
  is_private?: 0 | 1;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type EditClientAccountRequest struct {
	Nick *string `json:"nick,omitempty"`
	About *string `json:"about,omitempty"`
	Sex *string `json:"sex,omitempty"`
	BirthDate *string `json:"birth_date,omitempty"`
	Hometown *string `json:"hometown,omitempty"`
	Location *string `json:"location,omitempty"`
	MessagingPrivacyStatus *string `json:"messaging_privacy_status,omitempty"`
	IsPrivate *editClientAccountRequestIsPrivateKind `json:"is_private,omitempty"`
}

type editClientAccountRequestIsPrivateKind int

const (
	EDIT_CLIENT_ACCOUNT_REQUEST_IS_PRIVATE_FALSE = editClientAccountRequestIsPrivateKind(iota)
	EDIT_CLIENT_ACCOUNT_REQUEST_IS_PRIVATE_TRUE  = editClientAccountRequestIsPrivateKind(iota)
)
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="body" name="nick" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="about" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="sex" type="String" %}
One of: male, female, other
{% endswagger-parameter %}

{% swagger-parameter in="body" name="birth_date" type="String" %}
YYYY-MM-DD
{% endswagger-parameter %}

{% swagger-parameter in="body" name="hometown" type="String" %}
Empty if none
{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" type="String" %}
Empty if none
{% endswagger-parameter %}

{% swagger-parameter in="body" name="messaging_privacy_status" type="String" %}
One of: public, subscribers, closed
{% endswagger-parameter %}

{% swagger-parameter in="body" name="is_private" type="Number" %}
1: True - 0: False

One of: 0, 1
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully edited" %}
{% tabs %}
{% tab title="JSON" %}
```json
// EditClientAccount200Response
{
  "status"?: "200"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface EditClientAccount200Response {
  status?: 200;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type EditClientAccount200Response struct {
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// EditClientAccount401Response
"EditClientAccount401Response": "Error"

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
type EditClientAccount401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type EditClientAccount401Response Error

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

{% swagger method="put" path="/account/email" baseUrl="https://api.ifunny.mobi/v4" summary="Update Email" %}

{% swagger-description %}
Update the email address associated with the client's account.

**Auth:** BearerAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
```json
// UpdateClientEmailRequest
{
  "email": "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface UpdateClientEmailRequest {
  email: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UpdateClientEmailRequest struct {
	Email string `json:"email"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
URL encoded email address
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully Updated" %}
{% tabs %}
{% tab title="JSON" %}
```json
// UpdateClientEmail200Response
{
  "status"?: "200"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface UpdateClientEmail200Response {
  status?: 200;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UpdateClientEmail200Response struct {
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// UpdateClientEmail401Response
"UpdateClientEmail401Response": "Error"

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
type UpdateClientEmail401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UpdateClientEmail401Response Error

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

{% swagger method="post" path="/account/password_change_request" baseUrl="https://api.ifunny.mobi/v4" summary="Request Password Change" %}

{% swagger-description %}
Request an email to be sent to change a password.

**Auth:** BearerAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
```json
// RequestPasswordChangeRequest
{
  "email": "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface RequestPasswordChangeRequest {
  email: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RequestPasswordChangeRequest struct {
	Email string `json:"email"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
URL encoded email address
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Request sent" %}
No response body.
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/users/my/comments" baseUrl="https://api.ifunny.mobi/v4" summary="Client Comments" %}

{% swagger-description %}
Paginate through comments made by the Client.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetClientCommentsQuery
{
  "limit"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientCommentsQuery {
  limit?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientCommentsQuery struct {
	Limit *int `query:"limit,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Client Comments" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientComments200Response
{
  "data"?: "GetClientComments200Data",
  "status"?: "200"
}

// GetClientComments200Data
{
  "comments"?: "GetClientComments200DataComments"
}

// GetClientComments200DataComments
{
  "items"?: "Comment[]",
  "paging"?: "PagingCursors"
}

// Comment
{
  "is_reply"?: "false",
  "id"?: "string",
  "cid"?: "string",
  "state"?: "CommentState",
  "date"?: "integer",
  "text"?: "string",
  "num"?: "CommentNums",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_edited"?: "boolean",
  "user"?: "User",
  "deletion_reason"?: "CommentDeletionReason",
  "content"?: "Content",
  "attachments"?: "CommentAttachment[]",
  "content_thumbs"?: "ContentThumbnail",
  "last_reply"?: "Reply"
}

// PagingCursors
{
  "cursors"?: "PagingCursorsCursors",
  "hasNext"?: "boolean",
  "hasPrev"?: "boolean",
  "has_next"?: "boolean",
  "has_prev"?: "boolean"
}

// CommentState
"CommentState": "enum(normal, top, abused, deleted, deleted_self)"

// CommentNums
{
  "smiles"?: "integer",
  "unsmiles"?: "integer",
  "replies"?: "integer"
}

// User
{
  "block_type"?: "enum(installation, user)",
  "id"?: "string",
  "is_banned"?: "boolean",
  "is_blocked"?: "boolean",
  "is_deleted"?: "boolean",
  "is_in_subscribers"?: "boolean",
  "is_in_subscriptions"?: "boolean",
  "is_verified"?: "boolean",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "UserNum",
  "original_nick"?: "string",
  "photo"?: "ProfilePhoto",
  "total_posts"?: "integer"
}

// CommentDeletionReason
"CommentDeletionReason": "enum(del_by_spam_filter, del_content, del_content_creator, del_for_abuses, del_root_comment, del_via_portal)"

// Content
{
  "pic"?: "ContentPic",
  "caption"?: "ContentCaption",
  "comics"?: "ContentComics",
  "mem"?: "ContentMem",
  "video_clip"?: "ContentVideoClip",
  "video"?: "ContentVideo",
  "vine"?: "ContentVine",
  "coub"?: "ContentCoub",
  "gif"?: "ContentGif",
  "app"?: "ContentApp",
  "id"?: "string",
  "type"?: "ContentType",
  "url"?: "string",
  "share_url"?: "string",
  "old_watermark"?: "boolean",
  "link"?: "string",
  "title"?: "string",
  "fixed_title"?: "string",
  "description"?: "string",
  "tags"?: "string[]",
  "state"?: "enum(delayed, deleted, draft, published)",
  "date_create"?: "integer",
  "publish_at"?: "integer",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_abused"?: "boolean",
  "is_featured"?: "boolean",
  "is_republished"?: "boolean",
  "is_pinned"?: "boolean",
  "bg_color"?: "string",
  "thumb"?: "ContentThumbnail",
  "copyright"?: "ContentCopyright",
  "num"?: "ContentNums",
  "creator"?: "User",
  "size"?: "ContentSize",
  "issue_at"?: "integer",
  "traceback_url"?: "string",
  "engagement_rate"?: "string",
  "engagement_rate_explain"?: "string",
  "visibility"?: "enum(public, subscribers, closed, chats)",
  "shot_status"?: "enum(approved, shot, hardShot)",
  "fast_start"?: "boolean",
  "subtitle"?: "ContentSubtitle",
  "risk"?: "integer",
  "canonical_url"?: "string",
  "ocr_text"?: "string",
  "can_be_boosted"?: "boolean",
  "lat"?: "number",
  "lon"?: "number",
  "has_header"?: "boolean",
  "source"?: "ContentSource",
  "ftag"?: "string"
}

// CommentAttachment
{
  "content"?: "Content[]",
  "content_from_links"?: "Content[]",
  "mention_user"?: "UserMention[]",
  "giphy"?: "Content[]"
}

// ContentThumbnail
{
  "small_url"?: "string",
  "url"?: "string",
  "large_url"?: "string",
  "x640_url"?: "string",
  "webp_url"?: "string",
  "large_webp_url"?: "string",
  "x640_webp_url"?: "string",
  "proportional_url"?: "string",
  "proportional_webp_url"?: "string",
  "proportional_size"?: "ContentThumbnailProportionalSize"
}

// Reply
{
  "is_reply"?: "true",
  "id"?: "string",
  "cid"?: "string",
  "state"?: "CommentState",
  "date"?: "integer",
  "text"?: "string",
  "num"?: "CommentNums",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_edited"?: "boolean",
  "user"?: "User",
  "deletion_reason"?: "CommentDeletionReason",
  "content"?: "Content",
  "attachments"?: "CommentAttachment[]",
  "content_thumbs"?: "ContentThumbnail",
  "last_reply"?: "Reply",
  "root_comm_id"?: "string",
  "parent_comm_id"?: "string",
  "depth"?: "integer"
}

// PagingCursorsCursors
{
  "next"?: "string",
  "prev"?: "string"
}

// UserNum
{
  "subscribers"?: "integer",
  "subscriptions"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// ContentPic
{
  "webp_url"?: "string"
}

// ContentCaption
{
  "caption_text"?: "string"
}

// ContentComics
{
  "webp_url"?: "string"
}

// ContentMem
{
  "webp_url"?: "string"
}

// ContentVideoClip
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "source_type"?: "enum(user, instagram)",
  "logo_url"?: "string",
  "duration"?: "integer"
}

// ContentVideo
{
  "url"?: "string",
  "duration"?: "integer",
  "length"?: "integer"
}

// ContentVine
{
  "screen_url"?: "string",
  "bytes"?: "integer"
}

// ContentCoub
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "traceback_url"?: "string",
  "duration"?: "integer"
}

// ContentGif
{
  "caption"?: "string",
  "screen_url"?: "string",
  "bytes"?: "integer",
  "mp4_url"?: "string",
  "mp4_bytes"?: "integer",
  "webm_url"?: "string"
}

// ContentApp
{
  "url"?: "string",
  "is_scroll_allowed"?: "boolean"
}

// ContentType
"ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

// ContentCopyright
{
  "note"?: "string",
  "url"?: "string"
}

// ContentNums
{
  "smiles"?: "integer",
  "unsmiles"?: "integer",
  "guest_smiles"?: "integer",
  "comments"?: "integer",
  "views"?: "integer",
  "republished"?: "integer",
  "shares"?: "integer"
}

// ContentSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// ContentSubtitle
{
  "lang"?: "string",
  "url"?: "string"
}

// ContentSource
{
  "id"?: "string",
  "date_create"?: "integer",
  "creator"?: "User"
}

// UserMention
{
  "id"?: "string",
  "creator"?: "User",
  "nick"?: "string",
  "start_index"?: "integer",
  "stop_index"?: "integer",
  "user_id"?: "string",
  "original_nick"?: "string"
}

// ContentThumbnailProportionalSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientComments200Response {
  data?: GetClientComments200Data;
  status?: 200;
}

interface GetClientComments200Data {
  comments?: GetClientComments200DataComments;
}

interface GetClientComments200DataComments {
  items?: Comment[];
  paging?: PagingCursors;
}

interface Comment {
  is_reply?: false;
  id?: string;
  cid?: string;
  state?: CommentState;
  date?: number;
  text?: string;
  num?: CommentNums;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_edited?: boolean;
  user?: User;
  deletion_reason?: CommentDeletionReason;
  content?: Content;
  attachments?: CommentAttachment[];
  content_thumbs?: ContentThumbnail;
  last_reply?: Reply;
}

interface PagingCursors {
  cursors?: PagingCursorsCursors;
  hasNext?: boolean;
  hasPrev?: boolean;
  has_next?: boolean;
  has_prev?: boolean;
}

type CommentState = 'normal' | 'top' | 'abused' | 'deleted' | 'deleted_self';

interface CommentNums {
  smiles?: number;
  unsmiles?: number;
  replies?: number;
}

interface User {
  block_type?: 'installation' | 'user';
  id?: string;
  is_banned?: boolean;
  is_blocked?: boolean;
  is_deleted?: boolean;
  is_in_subscribers?: boolean;
  is_in_subscriptions?: boolean;
  is_verified?: boolean;
  nick?: string;
  nick_color?: string;
  num?: UserNum;
  original_nick?: string;
  photo?: ProfilePhoto;
  total_posts?: number;
}

type CommentDeletionReason = 'del_by_spam_filter' | 'del_content' | 'del_content_creator' | 'del_for_abuses' | 'del_root_comment' | 'del_via_portal';

interface Content {
  pic?: ContentPic;
  caption?: ContentCaption;
  comics?: ContentComics;
  mem?: ContentMem;
  video_clip?: ContentVideoClip;
  video?: ContentVideo;
  vine?: ContentVine;
  coub?: ContentCoub;
  gif?: ContentGif;
  app?: ContentApp;
  id?: string;
  type?: ContentType;
  url?: string;
  share_url?: string;
  old_watermark?: boolean;
  link?: string;
  title?: string;
  fixed_title?: string;
  description?: string;
  tags?: string[];
  state?: 'delayed' | 'deleted' | 'draft' | 'published';
  date_create?: number;
  publish_at?: number;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_abused?: boolean;
  is_featured?: boolean;
  is_republished?: boolean;
  is_pinned?: boolean;
  bg_color?: string;
  thumb?: ContentThumbnail;
  copyright?: ContentCopyright;
  num?: ContentNums;
  creator?: User;
  size?: ContentSize;
  issue_at?: number;
  traceback_url?: string;
  engagement_rate?: string;
  engagement_rate_explain?: string;
  visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
  shot_status?: 'approved' | 'shot' | 'hardShot';
  fast_start?: boolean;
  subtitle?: ContentSubtitle;
  risk?: number;
  canonical_url?: string;
  ocr_text?: string;
  can_be_boosted?: boolean;
  lat?: number;
  lon?: number;
  has_header?: boolean;
  source?: ContentSource;
  ftag?: string;
}

interface CommentAttachment {
  content?: Content[];
  content_from_links?: Content[];
  mention_user?: UserMention[];
  giphy?: Content[];
}

interface ContentThumbnail {
  small_url?: string;
  url?: string;
  large_url?: string;
  x640_url?: string;
  webp_url?: string;
  large_webp_url?: string;
  x640_webp_url?: string;
  proportional_url?: string;
  proportional_webp_url?: string;
  proportional_size?: ContentThumbnailProportionalSize;
}

interface Reply {
  is_reply?: true;
  id?: string;
  cid?: string;
  state?: CommentState;
  date?: number;
  text?: string;
  num?: CommentNums;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_edited?: boolean;
  user?: User;
  deletion_reason?: CommentDeletionReason;
  content?: Content;
  attachments?: CommentAttachment[];
  content_thumbs?: ContentThumbnail;
  last_reply?: Reply;
  root_comm_id?: string;
  parent_comm_id?: string;
  depth?: number;
}

interface PagingCursorsCursors {
  next?: string;
  prev?: string;
}

interface UserNum {
  subscribers?: number;
  subscriptions?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface ContentPic {
  webp_url?: string;
}

interface ContentCaption {
  caption_text?: string;
}

interface ContentComics {
  webp_url?: string;
}

interface ContentMem {
  webp_url?: string;
}

interface ContentVideoClip {
  screen_url?: string;
  bytes?: number;
  source_type?: 'user' | 'instagram';
  logo_url?: string;
  duration?: number;
}

interface ContentVideo {
  url?: string;
  duration?: number;
  length?: number;
}

interface ContentVine {
  screen_url?: string;
  bytes?: number;
}

interface ContentCoub {
  screen_url?: string;
  bytes?: number;
  traceback_url?: string;
  duration?: number;
}

interface ContentGif {
  caption?: string;
  screen_url?: string;
  bytes?: number;
  mp4_url?: string;
  mp4_bytes?: number;
  webm_url?: string;
}

interface ContentApp {
  url?: string;
  is_scroll_allowed?: boolean;
}

type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

interface ContentCopyright {
  note?: string;
  url?: string;
}

interface ContentNums {
  smiles?: number;
  unsmiles?: number;
  guest_smiles?: number;
  comments?: number;
  views?: number;
  republished?: number;
  shares?: number;
}

interface ContentSize {
  w?: number;
  h?: number;
}

interface ContentSubtitle {
  lang?: string;
  url?: string;
}

interface ContentSource {
  id?: string;
  date_create?: number;
  creator?: User;
}

interface UserMention {
  id?: string;
  creator?: User;
  nick?: string;
  start_index?: number;
  stop_index?: number;
  user_id?: string;
  original_nick?: string;
}

interface ContentThumbnailProportionalSize {
  w?: number;
  h?: number;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientComments200Response struct {
	Data GetClientComments200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type GetClientComments200Data struct {
	Comments GetClientComments200DataComments `json:"comments,omitempty"`
}

type GetClientComments200DataComments struct {
	Items []Comment `json:"items,omitempty"`
	Paging PagingCursors `json:"paging,omitempty"`
}

type Comment struct {
	IsReply *bool `json:"is_reply,omitempty"`
	Id *string `json:"id,omitempty"`
	Cid *string `json:"cid,omitempty"`
	State CommentState `json:"state,omitempty"`
	Date *int `json:"date,omitempty"`
	Text *string `json:"text,omitempty"`
	Num CommentNums `json:"num,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsEdited *bool `json:"is_edited,omitempty"`
	User User `json:"user,omitempty"`
	DeletionReason CommentDeletionReason `json:"deletion_reason,omitempty"`
	Content Content `json:"content,omitempty"`
	Attachments []CommentAttachment `json:"attachments,omitempty"`
	ContentThumbs ContentThumbnail `json:"content_thumbs,omitempty"`
	LastReply Reply `json:"last_reply,omitempty"`
}

type PagingCursors struct {
	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
	HasNext *bool `json:"hasNext,omitempty"`
	HasPrev *bool `json:"hasPrev,omitempty"`
	HasNext *bool `json:"has_next,omitempty"`
	HasPrev *bool `json:"has_prev,omitempty"`
}

type CommentState string

type CommentNums struct {
	Smiles *int `json:"smiles,omitempty"`
	Unsmiles *int `json:"unsmiles,omitempty"`
	Replies *int `json:"replies,omitempty"`
}

type User struct {
	BlockType *string `json:"block_type,omitempty"`
	Id *string `json:"id,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlocked *bool `json:"is_blocked,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num UserNum `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
}

type CommentDeletionReason string

type Content struct {
	Pic ContentPic `json:"pic,omitempty"`
	Caption ContentCaption `json:"caption,omitempty"`
	Comics ContentComics `json:"comics,omitempty"`
	Mem ContentMem `json:"mem,omitempty"`
	VideoClip ContentVideoClip `json:"video_clip,omitempty"`
	Video ContentVideo `json:"video,omitempty"`
	Vine ContentVine `json:"vine,omitempty"`
	Coub ContentCoub `json:"coub,omitempty"`
	Gif ContentGif `json:"gif,omitempty"`
	App ContentApp `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	Type ContentType `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	ShareUrl *string `json:"share_url,omitempty"`
	OldWatermark *bool `json:"old_watermark,omitempty"`
	Link *string `json:"link,omitempty"`
	Title *string `json:"title,omitempty"`
	FixedTitle *string `json:"fixed_title,omitempty"`
	Description *string `json:"description,omitempty"`
	Tags []string `json:"tags,omitempty"`
	State *string `json:"state,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	PublishAt *int `json:"publish_at,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsAbused *bool `json:"is_abused,omitempty"`
	IsFeatured *bool `json:"is_featured,omitempty"`
	IsRepublished *bool `json:"is_republished,omitempty"`
	IsPinned *bool `json:"is_pinned,omitempty"`
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ContentThumbnail `json:"thumb,omitempty"`
	Copyright ContentCopyright `json:"copyright,omitempty"`
	Num ContentNums `json:"num,omitempty"`
	Creator User `json:"creator,omitempty"`
	Size ContentSize `json:"size,omitempty"`
	IssueAt *int `json:"issue_at,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	EngagementRate *string `json:"engagement_rate,omitempty"`
	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	ShotStatus *string `json:"shot_status,omitempty"`
	FastStart *bool `json:"fast_start,omitempty"`
	Subtitle ContentSubtitle `json:"subtitle,omitempty"`
	Risk *int `json:"risk,omitempty"`
	CanonicalUrl *string `json:"canonical_url,omitempty"`
	OcrText *string `json:"ocr_text,omitempty"`
	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	HasHeader *bool `json:"has_header,omitempty"`
	Source ContentSource `json:"source,omitempty"`
	Ftag *string `json:"ftag,omitempty"`
}

type CommentAttachment struct {
	Content []Content `json:"content,omitempty"`
	ContentFromLinks []Content `json:"content_from_links,omitempty"`
	MentionUser []UserMention `json:"mention_user,omitempty"`
	Giphy []Content `json:"giphy,omitempty"`
}

type ContentThumbnail struct {
	SmallUrl *string `json:"small_url,omitempty"`
	Url *string `json:"url,omitempty"`
	LargeUrl *string `json:"large_url,omitempty"`
	X640Url *string `json:"x640_url,omitempty"`
	WebpUrl *string `json:"webp_url,omitempty"`
	LargeWebpUrl *string `json:"large_webp_url,omitempty"`
	X640WebpUrl *string `json:"x640_webp_url,omitempty"`
	ProportionalUrl *string `json:"proportional_url,omitempty"`
	ProportionalWebpUrl *string `json:"proportional_webp_url,omitempty"`
	ProportionalSize ContentThumbnailProportionalSize `json:"proportional_size,omitempty"`
}

type Reply struct {
	IsReply *bool `json:"is_reply,omitempty"`
	Id *string `json:"id,omitempty"`
	Cid *string `json:"cid,omitempty"`
	State CommentState `json:"state,omitempty"`
	Date *int `json:"date,omitempty"`
	Text *string `json:"text,omitempty"`
	Num CommentNums `json:"num,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsEdited *bool `json:"is_edited,omitempty"`
	User User `json:"user,omitempty"`
	DeletionReason CommentDeletionReason `json:"deletion_reason,omitempty"`
	Content Content `json:"content,omitempty"`
	Attachments []CommentAttachment `json:"attachments,omitempty"`
	ContentThumbs ContentThumbnail `json:"content_thumbs,omitempty"`
	LastReply Reply `json:"last_reply,omitempty"`
	RootCommId *string `json:"root_comm_id,omitempty"`
	ParentCommId *string `json:"parent_comm_id,omitempty"`
	Depth *int `json:"depth,omitempty"`
}

type PagingCursorsCursors struct {
	Next *string `json:"next,omitempty"`
	Prev *string `json:"prev,omitempty"`
}

type UserNum struct {
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentPic struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentCaption struct {
	CaptionText *string `json:"caption_text,omitempty"`
}

type ContentComics struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentMem struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentVideoClip struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	SourceType *string `json:"source_type,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentVideo struct {
	Url *string `json:"url,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Length *int `json:"length,omitempty"`
}

type ContentVine struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
}

type ContentCoub struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentGif struct {
	Caption *string `json:"caption,omitempty"`
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	Mp4Url *string `json:"mp4_url,omitempty"`
	Mp4Bytes *int `json:"mp4_bytes,omitempty"`
	WebmUrl *string `json:"webm_url,omitempty"`
}

type ContentApp struct {
	Url *string `json:"url,omitempty"`
	IsScrollAllowed *bool `json:"is_scroll_allowed,omitempty"`
}

type ContentType string

type ContentCopyright struct {
	Note *string `json:"note,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentNums struct {
	Smiles *int `json:"smiles,omitempty"`
	Unsmiles *int `json:"unsmiles,omitempty"`
	GuestSmiles *int `json:"guest_smiles,omitempty"`
	Comments *int `json:"comments,omitempty"`
	Views *int `json:"views,omitempty"`
	Republished *int `json:"republished,omitempty"`
	Shares *int `json:"shares,omitempty"`
}

type ContentSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type ContentSubtitle struct {
	Lang *string `json:"lang,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentSource struct {
	Id *string `json:"id,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	Creator User `json:"creator,omitempty"`
}

type UserMention struct {
	Id *string `json:"id,omitempty"`
	Creator User `json:"creator,omitempty"`
	Nick *string `json:"nick,omitempty"`
	StartIndex *int `json:"start_index,omitempty"`
	StopIndex *int `json:"stop_index,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
}

type ContentThumbnailProportionalSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientComments401Response
"GetClientComments401Response": "Error"

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
type GetClientComments401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientComments401Response Error

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

{% swagger method="get" path="/users/my/blocked" baseUrl="https://api.ifunny.mobi/v4" summary="Blocked Users" %}

{% swagger-description %}
Scroll through the Client's Blocked Users.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-response status="200: OK" description="Blocked Users" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetBlockedUsers200Response
{
  "users"?: "GetBlockedUsers200Users"
}

// GetBlockedUsers200Users
{
  "items"?: "BlockedUser[]",
  "paging"?: "PagingCursors"
}

// BlockedUser
{
  "block_type"?: "enum(installation, user)",
  "id"?: "string",
  "is_banned"?: "boolean",
  "is_blocked"?: "boolean",
  "is_deleted"?: "boolean",
  "is_in_subscribers"?: "boolean",
  "is_in_subscriptions"?: "boolean",
  "is_verified"?: "boolean",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "BlockedUserNum",
  "original_nick"?: "string",
  "photo"?: "ProfilePhoto",
  "total_posts"?: "integer",
  "indirectly_blocked_users_count"?: "integer"
}

// PagingCursors
{
  "cursors"?: "PagingCursorsCursors",
  "hasNext"?: "boolean",
  "hasPrev"?: "boolean",
  "has_next"?: "boolean",
  "has_prev"?: "boolean"
}

// BlockedUserNum
{
  "subscribers"?: "integer",
  "subscriptions"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// PagingCursorsCursors
{
  "next"?: "string",
  "prev"?: "string"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetBlockedUsers200Response {
  users?: GetBlockedUsers200Users;
}

interface GetBlockedUsers200Users {
  items?: BlockedUser[];
  paging?: PagingCursors;
}

interface BlockedUser {
  block_type?: 'installation' | 'user';
  id?: string;
  is_banned?: boolean;
  is_blocked?: boolean;
  is_deleted?: boolean;
  is_in_subscribers?: boolean;
  is_in_subscriptions?: boolean;
  is_verified?: boolean;
  nick?: string;
  nick_color?: string;
  num?: BlockedUserNum;
  original_nick?: string;
  photo?: ProfilePhoto;
  total_posts?: number;
  indirectly_blocked_users_count?: number;
}

interface PagingCursors {
  cursors?: PagingCursorsCursors;
  hasNext?: boolean;
  hasPrev?: boolean;
  has_next?: boolean;
  has_prev?: boolean;
}

interface BlockedUserNum {
  subscribers?: number;
  subscriptions?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface PagingCursorsCursors {
  next?: string;
  prev?: string;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetBlockedUsers200Response struct {
	Users GetBlockedUsers200Users `json:"users,omitempty"`
}

type GetBlockedUsers200Users struct {
	Items []BlockedUser `json:"items,omitempty"`
	Paging PagingCursors `json:"paging,omitempty"`
}

type BlockedUser struct {
	BlockType *string `json:"block_type,omitempty"`
	Id *string `json:"id,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlocked *bool `json:"is_blocked,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num BlockedUserNum `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
	IndirectlyBlockedUsersCount *int `json:"indirectly_blocked_users_count,omitempty"`
}

type PagingCursors struct {
	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
	HasNext *bool `json:"hasNext,omitempty"`
	HasPrev *bool `json:"hasPrev,omitempty"`
	HasNext *bool `json:"has_next,omitempty"`
	HasPrev *bool `json:"has_prev,omitempty"`
}

type BlockedUserNum struct {
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type PagingCursorsCursors struct {
	Next *string `json:"next,omitempty"`
	Prev *string `json:"prev,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetBlockedUsers401Response
"GetBlockedUsers401Response": "Error"

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
type GetBlockedUsers401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetBlockedUsers401Response Error

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

{% swagger method="get" path="/users/my/unread_chat_messages" baseUrl="https://api.ifunny.mobi/v4" summary="Unread Messages" %}

{% swagger-description %}
Fetch the amount of unread messages the user has.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-response status="200: OK" description="Unread message count" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetUnreadMessageCount200Response
{
  "data"?: "GetUnreadMessageCount200Data",
  "status"?: "200"
}

// GetUnreadMessageCount200Data
{
  "unread_messages"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetUnreadMessageCount200Response {
  data?: GetUnreadMessageCount200Data;
  status?: 200;
}

interface GetUnreadMessageCount200Data {
  unread_messages?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetUnreadMessageCount200Response struct {
	Data GetUnreadMessageCount200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type GetUnreadMessageCount200Data struct {
	UnreadMessages *int `json:"unread_messages,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetUnreadMessageCount401Response
"GetUnreadMessageCount401Response": "Error"

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
type GetUnreadMessageCount401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetUnreadMessageCount401Response Error

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

{% swagger method="get" path="/users/my/appeals" baseUrl="https://api.ifunny.mobi/v4" summary="Client Appeals" %}

{% swagger-description %}
Fetch the client ban/strike appeals.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-response status="200: OK" description="Appeal Array" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientAppeals200Response
{
  "data"?: "GetClientAppeals200Data",
  "status"?: "200"
}

// GetClientAppeals200Data
{
  "appeals"?: "Appeal[]"
}

// Appeal
{
  "ban_id"?: "string",
  "ban_reason"?: "string",
  "created_at"?: "integer",
  "id"?: "string",
  "status"?: "enum(pending, denied)",
  "strike_id"?: "string",
  "type"?: "enum(ban, strike)"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientAppeals200Response {
  data?: GetClientAppeals200Data;
  status?: 200;
}

interface GetClientAppeals200Data {
  appeals?: Appeal[];
}

interface Appeal {
  ban_id?: string;
  ban_reason?: string;
  created_at?: number;
  id?: string;
  status?: 'pending' | 'denied';
  strike_id?: string;
  type?: 'ban' | 'strike';
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientAppeals200Response struct {
	Data GetClientAppeals200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type GetClientAppeals200Data struct {
	Appeals []Appeal `json:"appeals,omitempty"`
}

type Appeal struct {
	BanId *string `json:"ban_id,omitempty"`
	BanReason *string `json:"ban_reason,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Status *string `json:"status,omitempty"`
	StrikeId *string `json:"strike_id,omitempty"`
	Type *string `json:"type,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientAppeals401Response
"GetClientAppeals401Response": "Error"

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
type GetClientAppeals401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientAppeals401Response Error

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

{% swagger method="get" path="/users/my/chat_invitations" baseUrl="https://api.ifunny.mobi/v4" summary="Chat Invitations" %}

{% swagger-description %}
Fetch the client's current pending chat invites.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-response status="200: OK" description="Chat Invites" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetChatInvitations200Response
{
  "data"?: "GetChatInvitations200Data",
  "status"?: "200"
}

// GetChatInvitations200Data
{
  "chats"?: "Chat[]"
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
interface GetChatInvitations200Response {
  data?: GetChatInvitations200Data;
  status?: 200;
}

interface GetChatInvitations200Data {
  chats?: Chat[];
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
type GetChatInvitations200Response struct {
	Data GetChatInvitations200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type GetChatInvitations200Data struct {
	Chats []Chat `json:"chats,omitempty"`
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

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetChatInvitations401Response
"GetChatInvitations401Response": "Error"

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
type GetChatInvitations401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetChatInvitations401Response Error

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

{% swagger method="get" path="/users/my/content_smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Client Smiled Content" %}

{% swagger-description %}
Paginate through content that is smiled by the client.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetClientSmiledContentQuery
{
  "limit"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientSmiledContentQuery {
  limit?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientSmiledContentQuery struct {
	Limit *int `query:"limit,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Smiled Content" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientSmiledContent200Response
{
  "data"?: "GetClientSmiledContent200Data",
  "status"?: "200"
}

// GetClientSmiledContent200Data
{
  "content"?: "GetClientSmiledContent200DataContent"
}

// GetClientSmiledContent200DataContent
{
  "items"?: "Content[]",
  "paging"?: "PagingCursors"
}

// Content
{
  "pic"?: "ContentPic",
  "caption"?: "ContentCaption",
  "comics"?: "ContentComics",
  "mem"?: "ContentMem",
  "video_clip"?: "ContentVideoClip",
  "video"?: "ContentVideo",
  "vine"?: "ContentVine",
  "coub"?: "ContentCoub",
  "gif"?: "ContentGif",
  "app"?: "ContentApp",
  "id"?: "string",
  "type"?: "ContentType",
  "url"?: "string",
  "share_url"?: "string",
  "old_watermark"?: "boolean",
  "link"?: "string",
  "title"?: "string",
  "fixed_title"?: "string",
  "description"?: "string",
  "tags"?: "string[]",
  "state"?: "enum(delayed, deleted, draft, published)",
  "date_create"?: "integer",
  "publish_at"?: "integer",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_abused"?: "boolean",
  "is_featured"?: "boolean",
  "is_republished"?: "boolean",
  "is_pinned"?: "boolean",
  "bg_color"?: "string",
  "thumb"?: "ContentThumbnail",
  "copyright"?: "ContentCopyright",
  "num"?: "ContentNums",
  "creator"?: "User",
  "size"?: "ContentSize",
  "issue_at"?: "integer",
  "traceback_url"?: "string",
  "engagement_rate"?: "string",
  "engagement_rate_explain"?: "string",
  "visibility"?: "enum(public, subscribers, closed, chats)",
  "shot_status"?: "enum(approved, shot, hardShot)",
  "fast_start"?: "boolean",
  "subtitle"?: "ContentSubtitle",
  "risk"?: "integer",
  "canonical_url"?: "string",
  "ocr_text"?: "string",
  "can_be_boosted"?: "boolean",
  "lat"?: "number",
  "lon"?: "number",
  "has_header"?: "boolean",
  "source"?: "ContentSource",
  "ftag"?: "string"
}

// PagingCursors
{
  "cursors"?: "PagingCursorsCursors",
  "hasNext"?: "boolean",
  "hasPrev"?: "boolean",
  "has_next"?: "boolean",
  "has_prev"?: "boolean"
}

// ContentPic
{
  "webp_url"?: "string"
}

// ContentCaption
{
  "caption_text"?: "string"
}

// ContentComics
{
  "webp_url"?: "string"
}

// ContentMem
{
  "webp_url"?: "string"
}

// ContentVideoClip
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "source_type"?: "enum(user, instagram)",
  "logo_url"?: "string",
  "duration"?: "integer"
}

// ContentVideo
{
  "url"?: "string",
  "duration"?: "integer",
  "length"?: "integer"
}

// ContentVine
{
  "screen_url"?: "string",
  "bytes"?: "integer"
}

// ContentCoub
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "traceback_url"?: "string",
  "duration"?: "integer"
}

// ContentGif
{
  "caption"?: "string",
  "screen_url"?: "string",
  "bytes"?: "integer",
  "mp4_url"?: "string",
  "mp4_bytes"?: "integer",
  "webm_url"?: "string"
}

// ContentApp
{
  "url"?: "string",
  "is_scroll_allowed"?: "boolean"
}

// ContentType
"ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

// ContentThumbnail
{
  "small_url"?: "string",
  "url"?: "string",
  "large_url"?: "string",
  "x640_url"?: "string",
  "webp_url"?: "string",
  "large_webp_url"?: "string",
  "x640_webp_url"?: "string",
  "proportional_url"?: "string",
  "proportional_webp_url"?: "string",
  "proportional_size"?: "ContentThumbnailProportionalSize"
}

// ContentCopyright
{
  "note"?: "string",
  "url"?: "string"
}

// ContentNums
{
  "smiles"?: "integer",
  "unsmiles"?: "integer",
  "guest_smiles"?: "integer",
  "comments"?: "integer",
  "views"?: "integer",
  "republished"?: "integer",
  "shares"?: "integer"
}

// User
{
  "block_type"?: "enum(installation, user)",
  "id"?: "string",
  "is_banned"?: "boolean",
  "is_blocked"?: "boolean",
  "is_deleted"?: "boolean",
  "is_in_subscribers"?: "boolean",
  "is_in_subscriptions"?: "boolean",
  "is_verified"?: "boolean",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "UserNum",
  "original_nick"?: "string",
  "photo"?: "ProfilePhoto",
  "total_posts"?: "integer"
}

// ContentSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// ContentSubtitle
{
  "lang"?: "string",
  "url"?: "string"
}

// ContentSource
{
  "id"?: "string",
  "date_create"?: "integer",
  "creator"?: "User"
}

// PagingCursorsCursors
{
  "next"?: "string",
  "prev"?: "string"
}

// ContentThumbnailProportionalSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// UserNum
{
  "subscribers"?: "integer",
  "subscriptions"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientSmiledContent200Response {
  data?: GetClientSmiledContent200Data;
  status?: 200;
}

interface GetClientSmiledContent200Data {
  content?: GetClientSmiledContent200DataContent;
}

interface GetClientSmiledContent200DataContent {
  items?: Content[];
  paging?: PagingCursors;
}

interface Content {
  pic?: ContentPic;
  caption?: ContentCaption;
  comics?: ContentComics;
  mem?: ContentMem;
  video_clip?: ContentVideoClip;
  video?: ContentVideo;
  vine?: ContentVine;
  coub?: ContentCoub;
  gif?: ContentGif;
  app?: ContentApp;
  id?: string;
  type?: ContentType;
  url?: string;
  share_url?: string;
  old_watermark?: boolean;
  link?: string;
  title?: string;
  fixed_title?: string;
  description?: string;
  tags?: string[];
  state?: 'delayed' | 'deleted' | 'draft' | 'published';
  date_create?: number;
  publish_at?: number;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_abused?: boolean;
  is_featured?: boolean;
  is_republished?: boolean;
  is_pinned?: boolean;
  bg_color?: string;
  thumb?: ContentThumbnail;
  copyright?: ContentCopyright;
  num?: ContentNums;
  creator?: User;
  size?: ContentSize;
  issue_at?: number;
  traceback_url?: string;
  engagement_rate?: string;
  engagement_rate_explain?: string;
  visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
  shot_status?: 'approved' | 'shot' | 'hardShot';
  fast_start?: boolean;
  subtitle?: ContentSubtitle;
  risk?: number;
  canonical_url?: string;
  ocr_text?: string;
  can_be_boosted?: boolean;
  lat?: number;
  lon?: number;
  has_header?: boolean;
  source?: ContentSource;
  ftag?: string;
}

interface PagingCursors {
  cursors?: PagingCursorsCursors;
  hasNext?: boolean;
  hasPrev?: boolean;
  has_next?: boolean;
  has_prev?: boolean;
}

interface ContentPic {
  webp_url?: string;
}

interface ContentCaption {
  caption_text?: string;
}

interface ContentComics {
  webp_url?: string;
}

interface ContentMem {
  webp_url?: string;
}

interface ContentVideoClip {
  screen_url?: string;
  bytes?: number;
  source_type?: 'user' | 'instagram';
  logo_url?: string;
  duration?: number;
}

interface ContentVideo {
  url?: string;
  duration?: number;
  length?: number;
}

interface ContentVine {
  screen_url?: string;
  bytes?: number;
}

interface ContentCoub {
  screen_url?: string;
  bytes?: number;
  traceback_url?: string;
  duration?: number;
}

interface ContentGif {
  caption?: string;
  screen_url?: string;
  bytes?: number;
  mp4_url?: string;
  mp4_bytes?: number;
  webm_url?: string;
}

interface ContentApp {
  url?: string;
  is_scroll_allowed?: boolean;
}

type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

interface ContentThumbnail {
  small_url?: string;
  url?: string;
  large_url?: string;
  x640_url?: string;
  webp_url?: string;
  large_webp_url?: string;
  x640_webp_url?: string;
  proportional_url?: string;
  proportional_webp_url?: string;
  proportional_size?: ContentThumbnailProportionalSize;
}

interface ContentCopyright {
  note?: string;
  url?: string;
}

interface ContentNums {
  smiles?: number;
  unsmiles?: number;
  guest_smiles?: number;
  comments?: number;
  views?: number;
  republished?: number;
  shares?: number;
}

interface User {
  block_type?: 'installation' | 'user';
  id?: string;
  is_banned?: boolean;
  is_blocked?: boolean;
  is_deleted?: boolean;
  is_in_subscribers?: boolean;
  is_in_subscriptions?: boolean;
  is_verified?: boolean;
  nick?: string;
  nick_color?: string;
  num?: UserNum;
  original_nick?: string;
  photo?: ProfilePhoto;
  total_posts?: number;
}

interface ContentSize {
  w?: number;
  h?: number;
}

interface ContentSubtitle {
  lang?: string;
  url?: string;
}

interface ContentSource {
  id?: string;
  date_create?: number;
  creator?: User;
}

interface PagingCursorsCursors {
  next?: string;
  prev?: string;
}

interface ContentThumbnailProportionalSize {
  w?: number;
  h?: number;
}

interface UserNum {
  subscribers?: number;
  subscriptions?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientSmiledContent200Response struct {
	Data GetClientSmiledContent200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type GetClientSmiledContent200Data struct {
	Content GetClientSmiledContent200DataContent `json:"content,omitempty"`
}

type GetClientSmiledContent200DataContent struct {
	Items []Content `json:"items,omitempty"`
	Paging PagingCursors `json:"paging,omitempty"`
}

type Content struct {
	Pic ContentPic `json:"pic,omitempty"`
	Caption ContentCaption `json:"caption,omitempty"`
	Comics ContentComics `json:"comics,omitempty"`
	Mem ContentMem `json:"mem,omitempty"`
	VideoClip ContentVideoClip `json:"video_clip,omitempty"`
	Video ContentVideo `json:"video,omitempty"`
	Vine ContentVine `json:"vine,omitempty"`
	Coub ContentCoub `json:"coub,omitempty"`
	Gif ContentGif `json:"gif,omitempty"`
	App ContentApp `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	Type ContentType `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	ShareUrl *string `json:"share_url,omitempty"`
	OldWatermark *bool `json:"old_watermark,omitempty"`
	Link *string `json:"link,omitempty"`
	Title *string `json:"title,omitempty"`
	FixedTitle *string `json:"fixed_title,omitempty"`
	Description *string `json:"description,omitempty"`
	Tags []string `json:"tags,omitempty"`
	State *string `json:"state,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	PublishAt *int `json:"publish_at,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsAbused *bool `json:"is_abused,omitempty"`
	IsFeatured *bool `json:"is_featured,omitempty"`
	IsRepublished *bool `json:"is_republished,omitempty"`
	IsPinned *bool `json:"is_pinned,omitempty"`
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ContentThumbnail `json:"thumb,omitempty"`
	Copyright ContentCopyright `json:"copyright,omitempty"`
	Num ContentNums `json:"num,omitempty"`
	Creator User `json:"creator,omitempty"`
	Size ContentSize `json:"size,omitempty"`
	IssueAt *int `json:"issue_at,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	EngagementRate *string `json:"engagement_rate,omitempty"`
	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	ShotStatus *string `json:"shot_status,omitempty"`
	FastStart *bool `json:"fast_start,omitempty"`
	Subtitle ContentSubtitle `json:"subtitle,omitempty"`
	Risk *int `json:"risk,omitempty"`
	CanonicalUrl *string `json:"canonical_url,omitempty"`
	OcrText *string `json:"ocr_text,omitempty"`
	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	HasHeader *bool `json:"has_header,omitempty"`
	Source ContentSource `json:"source,omitempty"`
	Ftag *string `json:"ftag,omitempty"`
}

type PagingCursors struct {
	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
	HasNext *bool `json:"hasNext,omitempty"`
	HasPrev *bool `json:"hasPrev,omitempty"`
	HasNext *bool `json:"has_next,omitempty"`
	HasPrev *bool `json:"has_prev,omitempty"`
}

type ContentPic struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentCaption struct {
	CaptionText *string `json:"caption_text,omitempty"`
}

type ContentComics struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentMem struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentVideoClip struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	SourceType *string `json:"source_type,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentVideo struct {
	Url *string `json:"url,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Length *int `json:"length,omitempty"`
}

type ContentVine struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
}

type ContentCoub struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentGif struct {
	Caption *string `json:"caption,omitempty"`
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	Mp4Url *string `json:"mp4_url,omitempty"`
	Mp4Bytes *int `json:"mp4_bytes,omitempty"`
	WebmUrl *string `json:"webm_url,omitempty"`
}

type ContentApp struct {
	Url *string `json:"url,omitempty"`
	IsScrollAllowed *bool `json:"is_scroll_allowed,omitempty"`
}

type ContentType string

type ContentThumbnail struct {
	SmallUrl *string `json:"small_url,omitempty"`
	Url *string `json:"url,omitempty"`
	LargeUrl *string `json:"large_url,omitempty"`
	X640Url *string `json:"x640_url,omitempty"`
	WebpUrl *string `json:"webp_url,omitempty"`
	LargeWebpUrl *string `json:"large_webp_url,omitempty"`
	X640WebpUrl *string `json:"x640_webp_url,omitempty"`
	ProportionalUrl *string `json:"proportional_url,omitempty"`
	ProportionalWebpUrl *string `json:"proportional_webp_url,omitempty"`
	ProportionalSize ContentThumbnailProportionalSize `json:"proportional_size,omitempty"`
}

type ContentCopyright struct {
	Note *string `json:"note,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentNums struct {
	Smiles *int `json:"smiles,omitempty"`
	Unsmiles *int `json:"unsmiles,omitempty"`
	GuestSmiles *int `json:"guest_smiles,omitempty"`
	Comments *int `json:"comments,omitempty"`
	Views *int `json:"views,omitempty"`
	Republished *int `json:"republished,omitempty"`
	Shares *int `json:"shares,omitempty"`
}

type User struct {
	BlockType *string `json:"block_type,omitempty"`
	Id *string `json:"id,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlocked *bool `json:"is_blocked,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num UserNum `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
}

type ContentSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type ContentSubtitle struct {
	Lang *string `json:"lang,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentSource struct {
	Id *string `json:"id,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	Creator User `json:"creator,omitempty"`
}

type PagingCursorsCursors struct {
	Next *string `json:"next,omitempty"`
	Prev *string `json:"prev,omitempty"`
}

type ContentThumbnailProportionalSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type UserNum struct {
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientSmiledContent401Response
"GetClientSmiledContent401Response": "Error"

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
type GetClientSmiledContent401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientSmiledContent401Response Error

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

{% swagger method="get" path="/feeds/reads" baseUrl="https://api.ifunny.mobi/v4" summary="Client Reads" %}

{% swagger-description %}
Paginate through content that the client has marked as viewed.

**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetClientReadsQuery
{
  "limit"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientReadsQuery {
  limit?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientReadsQuery struct {
	Limit *int `query:"limit,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Content Pagination" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientReads200Response
"GetClientReads200Response": "FeedResponse"

// FeedResponse
{
  "data"?: "FeedResponseData",
  "notifications"?: "FeedResponseNotifications",
  "status"?: "200"
}

// FeedResponseData
{
  "content"?: "FeedResponseDataContent"
}

// FeedResponseNotifications
{
  "counters"?: "NotificationCounters"
}

// FeedResponseDataContent
{
  "items"?: "Content[]",
  "paging"?: "PagingCursors"
}

// NotificationCounters
{
  "featured"?: "integer",
  "subscriptions"?: "integer",
  "collective"?: "integer",
  "news"?: "integer",
  "map"?: "integer"
}

// Content
{
  "pic"?: "ContentPic",
  "caption"?: "ContentCaption",
  "comics"?: "ContentComics",
  "mem"?: "ContentMem",
  "video_clip"?: "ContentVideoClip",
  "video"?: "ContentVideo",
  "vine"?: "ContentVine",
  "coub"?: "ContentCoub",
  "gif"?: "ContentGif",
  "app"?: "ContentApp",
  "id"?: "string",
  "type"?: "ContentType",
  "url"?: "string",
  "share_url"?: "string",
  "old_watermark"?: "boolean",
  "link"?: "string",
  "title"?: "string",
  "fixed_title"?: "string",
  "description"?: "string",
  "tags"?: "string[]",
  "state"?: "enum(delayed, deleted, draft, published)",
  "date_create"?: "integer",
  "publish_at"?: "integer",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_abused"?: "boolean",
  "is_featured"?: "boolean",
  "is_republished"?: "boolean",
  "is_pinned"?: "boolean",
  "bg_color"?: "string",
  "thumb"?: "ContentThumbnail",
  "copyright"?: "ContentCopyright",
  "num"?: "ContentNums",
  "creator"?: "User",
  "size"?: "ContentSize",
  "issue_at"?: "integer",
  "traceback_url"?: "string",
  "engagement_rate"?: "string",
  "engagement_rate_explain"?: "string",
  "visibility"?: "enum(public, subscribers, closed, chats)",
  "shot_status"?: "enum(approved, shot, hardShot)",
  "fast_start"?: "boolean",
  "subtitle"?: "ContentSubtitle",
  "risk"?: "integer",
  "canonical_url"?: "string",
  "ocr_text"?: "string",
  "can_be_boosted"?: "boolean",
  "lat"?: "number",
  "lon"?: "number",
  "has_header"?: "boolean",
  "source"?: "ContentSource",
  "ftag"?: "string"
}

// PagingCursors
{
  "cursors"?: "PagingCursorsCursors",
  "hasNext"?: "boolean",
  "hasPrev"?: "boolean",
  "has_next"?: "boolean",
  "has_prev"?: "boolean"
}

// ContentPic
{
  "webp_url"?: "string"
}

// ContentCaption
{
  "caption_text"?: "string"
}

// ContentComics
{
  "webp_url"?: "string"
}

// ContentMem
{
  "webp_url"?: "string"
}

// ContentVideoClip
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "source_type"?: "enum(user, instagram)",
  "logo_url"?: "string",
  "duration"?: "integer"
}

// ContentVideo
{
  "url"?: "string",
  "duration"?: "integer",
  "length"?: "integer"
}

// ContentVine
{
  "screen_url"?: "string",
  "bytes"?: "integer"
}

// ContentCoub
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "traceback_url"?: "string",
  "duration"?: "integer"
}

// ContentGif
{
  "caption"?: "string",
  "screen_url"?: "string",
  "bytes"?: "integer",
  "mp4_url"?: "string",
  "mp4_bytes"?: "integer",
  "webm_url"?: "string"
}

// ContentApp
{
  "url"?: "string",
  "is_scroll_allowed"?: "boolean"
}

// ContentType
"ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

// ContentThumbnail
{
  "small_url"?: "string",
  "url"?: "string",
  "large_url"?: "string",
  "x640_url"?: "string",
  "webp_url"?: "string",
  "large_webp_url"?: "string",
  "x640_webp_url"?: "string",
  "proportional_url"?: "string",
  "proportional_webp_url"?: "string",
  "proportional_size"?: "ContentThumbnailProportionalSize"
}

// ContentCopyright
{
  "note"?: "string",
  "url"?: "string"
}

// ContentNums
{
  "smiles"?: "integer",
  "unsmiles"?: "integer",
  "guest_smiles"?: "integer",
  "comments"?: "integer",
  "views"?: "integer",
  "republished"?: "integer",
  "shares"?: "integer"
}

// User
{
  "block_type"?: "enum(installation, user)",
  "id"?: "string",
  "is_banned"?: "boolean",
  "is_blocked"?: "boolean",
  "is_deleted"?: "boolean",
  "is_in_subscribers"?: "boolean",
  "is_in_subscriptions"?: "boolean",
  "is_verified"?: "boolean",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "UserNum",
  "original_nick"?: "string",
  "photo"?: "ProfilePhoto",
  "total_posts"?: "integer"
}

// ContentSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// ContentSubtitle
{
  "lang"?: "string",
  "url"?: "string"
}

// ContentSource
{
  "id"?: "string",
  "date_create"?: "integer",
  "creator"?: "User"
}

// PagingCursorsCursors
{
  "next"?: "string",
  "prev"?: "string"
}

// ContentThumbnailProportionalSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// UserNum
{
  "subscribers"?: "integer",
  "subscriptions"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type GetClientReads200Response = FeedResponse;

interface FeedResponse {
  data?: FeedResponseData;
  notifications?: FeedResponseNotifications;
  status?: 200;
}

interface FeedResponseData {
  content?: FeedResponseDataContent;
}

interface FeedResponseNotifications {
  counters?: NotificationCounters;
}

interface FeedResponseDataContent {
  items?: Content[];
  paging?: PagingCursors;
}

interface NotificationCounters {
  featured?: number;
  subscriptions?: number;
  collective?: number;
  news?: number;
  map?: number;
}

interface Content {
  pic?: ContentPic;
  caption?: ContentCaption;
  comics?: ContentComics;
  mem?: ContentMem;
  video_clip?: ContentVideoClip;
  video?: ContentVideo;
  vine?: ContentVine;
  coub?: ContentCoub;
  gif?: ContentGif;
  app?: ContentApp;
  id?: string;
  type?: ContentType;
  url?: string;
  share_url?: string;
  old_watermark?: boolean;
  link?: string;
  title?: string;
  fixed_title?: string;
  description?: string;
  tags?: string[];
  state?: 'delayed' | 'deleted' | 'draft' | 'published';
  date_create?: number;
  publish_at?: number;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_abused?: boolean;
  is_featured?: boolean;
  is_republished?: boolean;
  is_pinned?: boolean;
  bg_color?: string;
  thumb?: ContentThumbnail;
  copyright?: ContentCopyright;
  num?: ContentNums;
  creator?: User;
  size?: ContentSize;
  issue_at?: number;
  traceback_url?: string;
  engagement_rate?: string;
  engagement_rate_explain?: string;
  visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
  shot_status?: 'approved' | 'shot' | 'hardShot';
  fast_start?: boolean;
  subtitle?: ContentSubtitle;
  risk?: number;
  canonical_url?: string;
  ocr_text?: string;
  can_be_boosted?: boolean;
  lat?: number;
  lon?: number;
  has_header?: boolean;
  source?: ContentSource;
  ftag?: string;
}

interface PagingCursors {
  cursors?: PagingCursorsCursors;
  hasNext?: boolean;
  hasPrev?: boolean;
  has_next?: boolean;
  has_prev?: boolean;
}

interface ContentPic {
  webp_url?: string;
}

interface ContentCaption {
  caption_text?: string;
}

interface ContentComics {
  webp_url?: string;
}

interface ContentMem {
  webp_url?: string;
}

interface ContentVideoClip {
  screen_url?: string;
  bytes?: number;
  source_type?: 'user' | 'instagram';
  logo_url?: string;
  duration?: number;
}

interface ContentVideo {
  url?: string;
  duration?: number;
  length?: number;
}

interface ContentVine {
  screen_url?: string;
  bytes?: number;
}

interface ContentCoub {
  screen_url?: string;
  bytes?: number;
  traceback_url?: string;
  duration?: number;
}

interface ContentGif {
  caption?: string;
  screen_url?: string;
  bytes?: number;
  mp4_url?: string;
  mp4_bytes?: number;
  webm_url?: string;
}

interface ContentApp {
  url?: string;
  is_scroll_allowed?: boolean;
}

type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

interface ContentThumbnail {
  small_url?: string;
  url?: string;
  large_url?: string;
  x640_url?: string;
  webp_url?: string;
  large_webp_url?: string;
  x640_webp_url?: string;
  proportional_url?: string;
  proportional_webp_url?: string;
  proportional_size?: ContentThumbnailProportionalSize;
}

interface ContentCopyright {
  note?: string;
  url?: string;
}

interface ContentNums {
  smiles?: number;
  unsmiles?: number;
  guest_smiles?: number;
  comments?: number;
  views?: number;
  republished?: number;
  shares?: number;
}

interface User {
  block_type?: 'installation' | 'user';
  id?: string;
  is_banned?: boolean;
  is_blocked?: boolean;
  is_deleted?: boolean;
  is_in_subscribers?: boolean;
  is_in_subscriptions?: boolean;
  is_verified?: boolean;
  nick?: string;
  nick_color?: string;
  num?: UserNum;
  original_nick?: string;
  photo?: ProfilePhoto;
  total_posts?: number;
}

interface ContentSize {
  w?: number;
  h?: number;
}

interface ContentSubtitle {
  lang?: string;
  url?: string;
}

interface ContentSource {
  id?: string;
  date_create?: number;
  creator?: User;
}

interface PagingCursorsCursors {
  next?: string;
  prev?: string;
}

interface ContentThumbnailProportionalSize {
  w?: number;
  h?: number;
}

interface UserNum {
  subscribers?: number;
  subscriptions?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientReads200Response FeedResponse

type FeedResponse struct {
	Data FeedResponseData `json:"data,omitempty"`
	Notifications FeedResponseNotifications `json:"notifications,omitempty"`
	Status *int `json:"status,omitempty"`
}

type FeedResponseData struct {
	Content FeedResponseDataContent `json:"content,omitempty"`
}

type FeedResponseNotifications struct {
	Counters NotificationCounters `json:"counters,omitempty"`
}

type FeedResponseDataContent struct {
	Items []Content `json:"items,omitempty"`
	Paging PagingCursors `json:"paging,omitempty"`
}

type NotificationCounters struct {
	Featured *int `json:"featured,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
	Collective *int `json:"collective,omitempty"`
	News *int `json:"news,omitempty"`
	Map *int `json:"map,omitempty"`
}

type Content struct {
	Pic ContentPic `json:"pic,omitempty"`
	Caption ContentCaption `json:"caption,omitempty"`
	Comics ContentComics `json:"comics,omitempty"`
	Mem ContentMem `json:"mem,omitempty"`
	VideoClip ContentVideoClip `json:"video_clip,omitempty"`
	Video ContentVideo `json:"video,omitempty"`
	Vine ContentVine `json:"vine,omitempty"`
	Coub ContentCoub `json:"coub,omitempty"`
	Gif ContentGif `json:"gif,omitempty"`
	App ContentApp `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	Type ContentType `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	ShareUrl *string `json:"share_url,omitempty"`
	OldWatermark *bool `json:"old_watermark,omitempty"`
	Link *string `json:"link,omitempty"`
	Title *string `json:"title,omitempty"`
	FixedTitle *string `json:"fixed_title,omitempty"`
	Description *string `json:"description,omitempty"`
	Tags []string `json:"tags,omitempty"`
	State *string `json:"state,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	PublishAt *int `json:"publish_at,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsAbused *bool `json:"is_abused,omitempty"`
	IsFeatured *bool `json:"is_featured,omitempty"`
	IsRepublished *bool `json:"is_republished,omitempty"`
	IsPinned *bool `json:"is_pinned,omitempty"`
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ContentThumbnail `json:"thumb,omitempty"`
	Copyright ContentCopyright `json:"copyright,omitempty"`
	Num ContentNums `json:"num,omitempty"`
	Creator User `json:"creator,omitempty"`
	Size ContentSize `json:"size,omitempty"`
	IssueAt *int `json:"issue_at,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	EngagementRate *string `json:"engagement_rate,omitempty"`
	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	ShotStatus *string `json:"shot_status,omitempty"`
	FastStart *bool `json:"fast_start,omitempty"`
	Subtitle ContentSubtitle `json:"subtitle,omitempty"`
	Risk *int `json:"risk,omitempty"`
	CanonicalUrl *string `json:"canonical_url,omitempty"`
	OcrText *string `json:"ocr_text,omitempty"`
	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	HasHeader *bool `json:"has_header,omitempty"`
	Source ContentSource `json:"source,omitempty"`
	Ftag *string `json:"ftag,omitempty"`
}

type PagingCursors struct {
	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
	HasNext *bool `json:"hasNext,omitempty"`
	HasPrev *bool `json:"hasPrev,omitempty"`
	HasNext *bool `json:"has_next,omitempty"`
	HasPrev *bool `json:"has_prev,omitempty"`
}

type ContentPic struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentCaption struct {
	CaptionText *string `json:"caption_text,omitempty"`
}

type ContentComics struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentMem struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentVideoClip struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	SourceType *string `json:"source_type,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentVideo struct {
	Url *string `json:"url,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Length *int `json:"length,omitempty"`
}

type ContentVine struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
}

type ContentCoub struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentGif struct {
	Caption *string `json:"caption,omitempty"`
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	Mp4Url *string `json:"mp4_url,omitempty"`
	Mp4Bytes *int `json:"mp4_bytes,omitempty"`
	WebmUrl *string `json:"webm_url,omitempty"`
}

type ContentApp struct {
	Url *string `json:"url,omitempty"`
	IsScrollAllowed *bool `json:"is_scroll_allowed,omitempty"`
}

type ContentType string

type ContentThumbnail struct {
	SmallUrl *string `json:"small_url,omitempty"`
	Url *string `json:"url,omitempty"`
	LargeUrl *string `json:"large_url,omitempty"`
	X640Url *string `json:"x640_url,omitempty"`
	WebpUrl *string `json:"webp_url,omitempty"`
	LargeWebpUrl *string `json:"large_webp_url,omitempty"`
	X640WebpUrl *string `json:"x640_webp_url,omitempty"`
	ProportionalUrl *string `json:"proportional_url,omitempty"`
	ProportionalWebpUrl *string `json:"proportional_webp_url,omitempty"`
	ProportionalSize ContentThumbnailProportionalSize `json:"proportional_size,omitempty"`
}

type ContentCopyright struct {
	Note *string `json:"note,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentNums struct {
	Smiles *int `json:"smiles,omitempty"`
	Unsmiles *int `json:"unsmiles,omitempty"`
	GuestSmiles *int `json:"guest_smiles,omitempty"`
	Comments *int `json:"comments,omitempty"`
	Views *int `json:"views,omitempty"`
	Republished *int `json:"republished,omitempty"`
	Shares *int `json:"shares,omitempty"`
}

type User struct {
	BlockType *string `json:"block_type,omitempty"`
	Id *string `json:"id,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlocked *bool `json:"is_blocked,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num UserNum `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
}

type ContentSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type ContentSubtitle struct {
	Lang *string `json:"lang,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentSource struct {
	Id *string `json:"id,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	Creator User `json:"creator,omitempty"`
}

type PagingCursorsCursors struct {
	Next *string `json:"next,omitempty"`
	Prev *string `json:"prev,omitempty"`
}

type ContentThumbnailProportionalSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type UserNum struct {
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/feeds/reads" baseUrl="https://api.ifunny.mobi/v4" summary="Clear Read History" %}

{% swagger-description %}
This clears all content from the Client's "reads".

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-response status="200: OK" description="Cleared Read History" %}
{% tabs %}
{% tab title="JSON" %}
```json
// ClearClientReads200Response
{
  "status"?: "200"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface ClearClientReads200Response {
  status?: 200;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type ClearClientReads200Response struct {
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/reads/:ids" baseUrl="https://api.ifunny.mobi/v4" summary="Mark Content as Read" %}

{% swagger-description %}
Add content to the Client's "reads".

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="ids" type="String" required="true" %}
List of Content IDs separated by a comma
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Marked as Read" %}
{% tabs %}
{% tab title="JSON" %}
```json
// MarkContentRead200Response
{
  "status"?: "200"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface MarkContentRead200Response {
  status?: 200;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type MarkContentRead200Response struct {
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/users/my/guests" baseUrl="https://api.ifunny.mobi/v4" summary="Client Guests" %}

{% swagger-description %}
Paginate through users that have viewed the Client's profile.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetClientGuestsQuery
{
  "limit": "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientGuestsQuery {
  limit: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientGuestsQuery struct {
	Limit int `query:"limit"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Number" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Guest Pagination" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientGuests200Response
{
  "guest"?: "User",
  "visit_timestamp"?: "integer"
}

// User
{
  "block_type"?: "enum(installation, user)",
  "id"?: "string",
  "is_banned"?: "boolean",
  "is_blocked"?: "boolean",
  "is_deleted"?: "boolean",
  "is_in_subscribers"?: "boolean",
  "is_in_subscriptions"?: "boolean",
  "is_verified"?: "boolean",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "UserNum",
  "original_nick"?: "string",
  "photo"?: "ProfilePhoto",
  "total_posts"?: "integer"
}

// UserNum
{
  "subscribers"?: "integer",
  "subscriptions"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientGuests200Response {
  guest?: User;
  visit_timestamp?: number;
}

interface User {
  block_type?: 'installation' | 'user';
  id?: string;
  is_banned?: boolean;
  is_blocked?: boolean;
  is_deleted?: boolean;
  is_in_subscribers?: boolean;
  is_in_subscriptions?: boolean;
  is_verified?: boolean;
  nick?: string;
  nick_color?: string;
  num?: UserNum;
  original_nick?: string;
  photo?: ProfilePhoto;
  total_posts?: number;
}

interface UserNum {
  subscribers?: number;
  subscriptions?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientGuests200Response struct {
	Guest User `json:"guest,omitempty"`
	VisitTimestamp *int `json:"visit_timestamp,omitempty"`
}

type User struct {
	BlockType *string `json:"block_type,omitempty"`
	Id *string `json:"id,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlocked *bool `json:"is_blocked,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num UserNum `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
}

type UserNum struct {
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientGuests401Response
"GetClientGuests401Response": "Error"

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
type GetClientGuests401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientGuests401Response Error

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

{% swagger method="get" path="/users/my/bans" baseUrl="https://api.ifunny.mobi/v4" summary="Client Bans" %}

{% swagger-description %}
Paginate through the Client's bans.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetClientBansQuery
{
  "limit"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientBansQuery {
  limit?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientBansQuery struct {
	Limit *int `query:"limit,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Client Bans" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetClientBans200Response
{
  "data"?: "GetClientBans200Data"
}

// GetClientBans200Data
{
  "bans"?: "ClientBan[]"
}

// ClientBan
{
  "date_until"?: "integer",
  "id"?: "string",
  "type"?: "enum(chat_access, comment_creation, content_creation, profile_access, repubing, smiling, subscribing, other, collective_shadow)",
  "ban_reason"?: "enum(abuse_harassment, child_pornography, hardcore, hate_speech, bot_spam, threats_of_harm, death_gore, other)",
  "created_at"?: "integer",
  "pid"?: "integer",
  "is_appealed"?: "boolean",
  "can_be_appealed"?: "boolean",
  "was_shown"?: "boolean",
  "is_active"?: "boolean",
  "is_shortable"?: "boolean",
  "related_content"?: "Content",
  "related_comment"?: "Comment",
  "date_until_minimum"?: "integer",
  "type_message"?: "string",
  "ban_reason_message"?: "string"
}

// Content
{
  "pic"?: "ContentPic",
  "caption"?: "ContentCaption",
  "comics"?: "ContentComics",
  "mem"?: "ContentMem",
  "video_clip"?: "ContentVideoClip",
  "video"?: "ContentVideo",
  "vine"?: "ContentVine",
  "coub"?: "ContentCoub",
  "gif"?: "ContentGif",
  "app"?: "ContentApp",
  "id"?: "string",
  "type"?: "ContentType",
  "url"?: "string",
  "share_url"?: "string",
  "old_watermark"?: "boolean",
  "link"?: "string",
  "title"?: "string",
  "fixed_title"?: "string",
  "description"?: "string",
  "tags"?: "string[]",
  "state"?: "enum(delayed, deleted, draft, published)",
  "date_create"?: "integer",
  "publish_at"?: "integer",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_abused"?: "boolean",
  "is_featured"?: "boolean",
  "is_republished"?: "boolean",
  "is_pinned"?: "boolean",
  "bg_color"?: "string",
  "thumb"?: "ContentThumbnail",
  "copyright"?: "ContentCopyright",
  "num"?: "ContentNums",
  "creator"?: "User",
  "size"?: "ContentSize",
  "issue_at"?: "integer",
  "traceback_url"?: "string",
  "engagement_rate"?: "string",
  "engagement_rate_explain"?: "string",
  "visibility"?: "enum(public, subscribers, closed, chats)",
  "shot_status"?: "enum(approved, shot, hardShot)",
  "fast_start"?: "boolean",
  "subtitle"?: "ContentSubtitle",
  "risk"?: "integer",
  "canonical_url"?: "string",
  "ocr_text"?: "string",
  "can_be_boosted"?: "boolean",
  "lat"?: "number",
  "lon"?: "number",
  "has_header"?: "boolean",
  "source"?: "ContentSource",
  "ftag"?: "string"
}

// Comment
{
  "is_reply"?: "false",
  "id"?: "string",
  "cid"?: "string",
  "state"?: "CommentState",
  "date"?: "integer",
  "text"?: "string",
  "num"?: "CommentNums",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_edited"?: "boolean",
  "user"?: "User",
  "deletion_reason"?: "CommentDeletionReason",
  "content"?: "Content",
  "attachments"?: "CommentAttachment[]",
  "content_thumbs"?: "ContentThumbnail",
  "last_reply"?: "Reply"
}

// ContentPic
{
  "webp_url"?: "string"
}

// ContentCaption
{
  "caption_text"?: "string"
}

// ContentComics
{
  "webp_url"?: "string"
}

// ContentMem
{
  "webp_url"?: "string"
}

// ContentVideoClip
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "source_type"?: "enum(user, instagram)",
  "logo_url"?: "string",
  "duration"?: "integer"
}

// ContentVideo
{
  "url"?: "string",
  "duration"?: "integer",
  "length"?: "integer"
}

// ContentVine
{
  "screen_url"?: "string",
  "bytes"?: "integer"
}

// ContentCoub
{
  "screen_url"?: "string",
  "bytes"?: "integer",
  "traceback_url"?: "string",
  "duration"?: "integer"
}

// ContentGif
{
  "caption"?: "string",
  "screen_url"?: "string",
  "bytes"?: "integer",
  "mp4_url"?: "string",
  "mp4_bytes"?: "integer",
  "webm_url"?: "string"
}

// ContentApp
{
  "url"?: "string",
  "is_scroll_allowed"?: "boolean"
}

// ContentType
"ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

// ContentThumbnail
{
  "small_url"?: "string",
  "url"?: "string",
  "large_url"?: "string",
  "x640_url"?: "string",
  "webp_url"?: "string",
  "large_webp_url"?: "string",
  "x640_webp_url"?: "string",
  "proportional_url"?: "string",
  "proportional_webp_url"?: "string",
  "proportional_size"?: "ContentThumbnailProportionalSize"
}

// ContentCopyright
{
  "note"?: "string",
  "url"?: "string"
}

// ContentNums
{
  "smiles"?: "integer",
  "unsmiles"?: "integer",
  "guest_smiles"?: "integer",
  "comments"?: "integer",
  "views"?: "integer",
  "republished"?: "integer",
  "shares"?: "integer"
}

// User
{
  "block_type"?: "enum(installation, user)",
  "id"?: "string",
  "is_banned"?: "boolean",
  "is_blocked"?: "boolean",
  "is_deleted"?: "boolean",
  "is_in_subscribers"?: "boolean",
  "is_in_subscriptions"?: "boolean",
  "is_verified"?: "boolean",
  "nick"?: "string",
  "nick_color"?: "string",
  "num"?: "UserNum",
  "original_nick"?: "string",
  "photo"?: "ProfilePhoto",
  "total_posts"?: "integer"
}

// ContentSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// ContentSubtitle
{
  "lang"?: "string",
  "url"?: "string"
}

// ContentSource
{
  "id"?: "string",
  "date_create"?: "integer",
  "creator"?: "User"
}

// CommentState
"CommentState": "enum(normal, top, abused, deleted, deleted_self)"

// CommentNums
{
  "smiles"?: "integer",
  "unsmiles"?: "integer",
  "replies"?: "integer"
}

// CommentDeletionReason
"CommentDeletionReason": "enum(del_by_spam_filter, del_content, del_content_creator, del_for_abuses, del_root_comment, del_via_portal)"

// CommentAttachment
{
  "content"?: "Content[]",
  "content_from_links"?: "Content[]",
  "mention_user"?: "UserMention[]",
  "giphy"?: "Content[]"
}

// Reply
{
  "is_reply"?: "true",
  "id"?: "string",
  "cid"?: "string",
  "state"?: "CommentState",
  "date"?: "integer",
  "text"?: "string",
  "num"?: "CommentNums",
  "is_smiled"?: "boolean",
  "is_unsmiled"?: "boolean",
  "is_edited"?: "boolean",
  "user"?: "User",
  "deletion_reason"?: "CommentDeletionReason",
  "content"?: "Content",
  "attachments"?: "CommentAttachment[]",
  "content_thumbs"?: "ContentThumbnail",
  "last_reply"?: "Reply",
  "root_comm_id"?: "string",
  "parent_comm_id"?: "string",
  "depth"?: "integer"
}

// ContentThumbnailProportionalSize
{
  "w"?: "integer",
  "h"?: "integer"
}

// UserNum
{
  "subscribers"?: "integer",
  "subscriptions"?: "integer"
}

// ProfilePhoto
{
  "bg_color"?: "string",
  "thumb"?: "ProfilePhotoThumb",
  "url"?: "string"
}

// UserMention
{
  "id"?: "string",
  "creator"?: "User",
  "nick"?: "string",
  "start_index"?: "integer",
  "stop_index"?: "integer",
  "user_id"?: "string",
  "original_nick"?: "string"
}

// ProfilePhotoThumb
{
  "large_url"?: "string",
  "medium_url"?: "string",
  "small_url"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetClientBans200Response {
  data?: GetClientBans200Data;
}

interface GetClientBans200Data {
  bans?: ClientBan[];
}

interface ClientBan {
  date_until?: number;
  id?: string;
  type?: 'chat_access' | 'comment_creation' | 'content_creation' | 'profile_access' | 'repubing' | 'smiling' | 'subscribing' | 'other' | 'collective_shadow';
  ban_reason?: 'abuse_harassment' | 'child_pornography' | 'hardcore' | 'hate_speech' | 'bot_spam' | 'threats_of_harm' | 'death_gore' | 'other';
  created_at?: number;
  pid?: number;
  is_appealed?: boolean;
  can_be_appealed?: boolean;
  was_shown?: boolean;
  is_active?: boolean;
  is_shortable?: boolean;
  related_content?: Content;
  related_comment?: Comment;
  date_until_minimum?: number;
  type_message?: string;
  ban_reason_message?: string;
}

interface Content {
  pic?: ContentPic;
  caption?: ContentCaption;
  comics?: ContentComics;
  mem?: ContentMem;
  video_clip?: ContentVideoClip;
  video?: ContentVideo;
  vine?: ContentVine;
  coub?: ContentCoub;
  gif?: ContentGif;
  app?: ContentApp;
  id?: string;
  type?: ContentType;
  url?: string;
  share_url?: string;
  old_watermark?: boolean;
  link?: string;
  title?: string;
  fixed_title?: string;
  description?: string;
  tags?: string[];
  state?: 'delayed' | 'deleted' | 'draft' | 'published';
  date_create?: number;
  publish_at?: number;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_abused?: boolean;
  is_featured?: boolean;
  is_republished?: boolean;
  is_pinned?: boolean;
  bg_color?: string;
  thumb?: ContentThumbnail;
  copyright?: ContentCopyright;
  num?: ContentNums;
  creator?: User;
  size?: ContentSize;
  issue_at?: number;
  traceback_url?: string;
  engagement_rate?: string;
  engagement_rate_explain?: string;
  visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
  shot_status?: 'approved' | 'shot' | 'hardShot';
  fast_start?: boolean;
  subtitle?: ContentSubtitle;
  risk?: number;
  canonical_url?: string;
  ocr_text?: string;
  can_be_boosted?: boolean;
  lat?: number;
  lon?: number;
  has_header?: boolean;
  source?: ContentSource;
  ftag?: string;
}

interface Comment {
  is_reply?: false;
  id?: string;
  cid?: string;
  state?: CommentState;
  date?: number;
  text?: string;
  num?: CommentNums;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_edited?: boolean;
  user?: User;
  deletion_reason?: CommentDeletionReason;
  content?: Content;
  attachments?: CommentAttachment[];
  content_thumbs?: ContentThumbnail;
  last_reply?: Reply;
}

interface ContentPic {
  webp_url?: string;
}

interface ContentCaption {
  caption_text?: string;
}

interface ContentComics {
  webp_url?: string;
}

interface ContentMem {
  webp_url?: string;
}

interface ContentVideoClip {
  screen_url?: string;
  bytes?: number;
  source_type?: 'user' | 'instagram';
  logo_url?: string;
  duration?: number;
}

interface ContentVideo {
  url?: string;
  duration?: number;
  length?: number;
}

interface ContentVine {
  screen_url?: string;
  bytes?: number;
}

interface ContentCoub {
  screen_url?: string;
  bytes?: number;
  traceback_url?: string;
  duration?: number;
}

interface ContentGif {
  caption?: string;
  screen_url?: string;
  bytes?: number;
  mp4_url?: string;
  mp4_bytes?: number;
  webm_url?: string;
}

interface ContentApp {
  url?: string;
  is_scroll_allowed?: boolean;
}

type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

interface ContentThumbnail {
  small_url?: string;
  url?: string;
  large_url?: string;
  x640_url?: string;
  webp_url?: string;
  large_webp_url?: string;
  x640_webp_url?: string;
  proportional_url?: string;
  proportional_webp_url?: string;
  proportional_size?: ContentThumbnailProportionalSize;
}

interface ContentCopyright {
  note?: string;
  url?: string;
}

interface ContentNums {
  smiles?: number;
  unsmiles?: number;
  guest_smiles?: number;
  comments?: number;
  views?: number;
  republished?: number;
  shares?: number;
}

interface User {
  block_type?: 'installation' | 'user';
  id?: string;
  is_banned?: boolean;
  is_blocked?: boolean;
  is_deleted?: boolean;
  is_in_subscribers?: boolean;
  is_in_subscriptions?: boolean;
  is_verified?: boolean;
  nick?: string;
  nick_color?: string;
  num?: UserNum;
  original_nick?: string;
  photo?: ProfilePhoto;
  total_posts?: number;
}

interface ContentSize {
  w?: number;
  h?: number;
}

interface ContentSubtitle {
  lang?: string;
  url?: string;
}

interface ContentSource {
  id?: string;
  date_create?: number;
  creator?: User;
}

type CommentState = 'normal' | 'top' | 'abused' | 'deleted' | 'deleted_self';

interface CommentNums {
  smiles?: number;
  unsmiles?: number;
  replies?: number;
}

type CommentDeletionReason = 'del_by_spam_filter' | 'del_content' | 'del_content_creator' | 'del_for_abuses' | 'del_root_comment' | 'del_via_portal';

interface CommentAttachment {
  content?: Content[];
  content_from_links?: Content[];
  mention_user?: UserMention[];
  giphy?: Content[];
}

interface Reply {
  is_reply?: true;
  id?: string;
  cid?: string;
  state?: CommentState;
  date?: number;
  text?: string;
  num?: CommentNums;
  is_smiled?: boolean;
  is_unsmiled?: boolean;
  is_edited?: boolean;
  user?: User;
  deletion_reason?: CommentDeletionReason;
  content?: Content;
  attachments?: CommentAttachment[];
  content_thumbs?: ContentThumbnail;
  last_reply?: Reply;
  root_comm_id?: string;
  parent_comm_id?: string;
  depth?: number;
}

interface ContentThumbnailProportionalSize {
  w?: number;
  h?: number;
}

interface UserNum {
  subscribers?: number;
  subscriptions?: number;
}

interface ProfilePhoto {
  bg_color?: string;
  thumb?: ProfilePhotoThumb;
  url?: string;
}

interface UserMention {
  id?: string;
  creator?: User;
  nick?: string;
  start_index?: number;
  stop_index?: number;
  user_id?: string;
  original_nick?: string;
}

interface ProfilePhotoThumb {
  large_url?: string;
  medium_url?: string;
  small_url?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetClientBans200Response struct {
	Data GetClientBans200Data `json:"data,omitempty"`
}

type GetClientBans200Data struct {
	Bans []ClientBan `json:"bans,omitempty"`
}

type ClientBan struct {
	DateUntil *int `json:"date_until,omitempty"`
	Id *string `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
	BanReason *string `json:"ban_reason,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Pid *int `json:"pid,omitempty"`
	IsAppealed *bool `json:"is_appealed,omitempty"`
	CanBeAppealed *bool `json:"can_be_appealed,omitempty"`
	WasShown *bool `json:"was_shown,omitempty"`
	IsActive *bool `json:"is_active,omitempty"`
	IsShortable *bool `json:"is_shortable,omitempty"`
	RelatedContent Content `json:"related_content,omitempty"`
	RelatedComment Comment `json:"related_comment,omitempty"`
	DateUntilMinimum *int `json:"date_until_minimum,omitempty"`
	TypeMessage *string `json:"type_message,omitempty"`
	BanReasonMessage *string `json:"ban_reason_message,omitempty"`
}

type Content struct {
	Pic ContentPic `json:"pic,omitempty"`
	Caption ContentCaption `json:"caption,omitempty"`
	Comics ContentComics `json:"comics,omitempty"`
	Mem ContentMem `json:"mem,omitempty"`
	VideoClip ContentVideoClip `json:"video_clip,omitempty"`
	Video ContentVideo `json:"video,omitempty"`
	Vine ContentVine `json:"vine,omitempty"`
	Coub ContentCoub `json:"coub,omitempty"`
	Gif ContentGif `json:"gif,omitempty"`
	App ContentApp `json:"app,omitempty"`
	Id *string `json:"id,omitempty"`
	Type ContentType `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	ShareUrl *string `json:"share_url,omitempty"`
	OldWatermark *bool `json:"old_watermark,omitempty"`
	Link *string `json:"link,omitempty"`
	Title *string `json:"title,omitempty"`
	FixedTitle *string `json:"fixed_title,omitempty"`
	Description *string `json:"description,omitempty"`
	Tags []string `json:"tags,omitempty"`
	State *string `json:"state,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	PublishAt *int `json:"publish_at,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsAbused *bool `json:"is_abused,omitempty"`
	IsFeatured *bool `json:"is_featured,omitempty"`
	IsRepublished *bool `json:"is_republished,omitempty"`
	IsPinned *bool `json:"is_pinned,omitempty"`
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ContentThumbnail `json:"thumb,omitempty"`
	Copyright ContentCopyright `json:"copyright,omitempty"`
	Num ContentNums `json:"num,omitempty"`
	Creator User `json:"creator,omitempty"`
	Size ContentSize `json:"size,omitempty"`
	IssueAt *int `json:"issue_at,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	EngagementRate *string `json:"engagement_rate,omitempty"`
	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	ShotStatus *string `json:"shot_status,omitempty"`
	FastStart *bool `json:"fast_start,omitempty"`
	Subtitle ContentSubtitle `json:"subtitle,omitempty"`
	Risk *int `json:"risk,omitempty"`
	CanonicalUrl *string `json:"canonical_url,omitempty"`
	OcrText *string `json:"ocr_text,omitempty"`
	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	HasHeader *bool `json:"has_header,omitempty"`
	Source ContentSource `json:"source,omitempty"`
	Ftag *string `json:"ftag,omitempty"`
}

type Comment struct {
	IsReply *bool `json:"is_reply,omitempty"`
	Id *string `json:"id,omitempty"`
	Cid *string `json:"cid,omitempty"`
	State CommentState `json:"state,omitempty"`
	Date *int `json:"date,omitempty"`
	Text *string `json:"text,omitempty"`
	Num CommentNums `json:"num,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsEdited *bool `json:"is_edited,omitempty"`
	User User `json:"user,omitempty"`
	DeletionReason CommentDeletionReason `json:"deletion_reason,omitempty"`
	Content Content `json:"content,omitempty"`
	Attachments []CommentAttachment `json:"attachments,omitempty"`
	ContentThumbs ContentThumbnail `json:"content_thumbs,omitempty"`
	LastReply Reply `json:"last_reply,omitempty"`
}

type ContentPic struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentCaption struct {
	CaptionText *string `json:"caption_text,omitempty"`
}

type ContentComics struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentMem struct {
	WebpUrl *string `json:"webp_url,omitempty"`
}

type ContentVideoClip struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	SourceType *string `json:"source_type,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentVideo struct {
	Url *string `json:"url,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Length *int `json:"length,omitempty"`
}

type ContentVine struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
}

type ContentCoub struct {
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	TracebackUrl *string `json:"traceback_url,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

type ContentGif struct {
	Caption *string `json:"caption,omitempty"`
	ScreenUrl *string `json:"screen_url,omitempty"`
	Bytes *int `json:"bytes,omitempty"`
	Mp4Url *string `json:"mp4_url,omitempty"`
	Mp4Bytes *int `json:"mp4_bytes,omitempty"`
	WebmUrl *string `json:"webm_url,omitempty"`
}

type ContentApp struct {
	Url *string `json:"url,omitempty"`
	IsScrollAllowed *bool `json:"is_scroll_allowed,omitempty"`
}

type ContentType string

type ContentThumbnail struct {
	SmallUrl *string `json:"small_url,omitempty"`
	Url *string `json:"url,omitempty"`
	LargeUrl *string `json:"large_url,omitempty"`
	X640Url *string `json:"x640_url,omitempty"`
	WebpUrl *string `json:"webp_url,omitempty"`
	LargeWebpUrl *string `json:"large_webp_url,omitempty"`
	X640WebpUrl *string `json:"x640_webp_url,omitempty"`
	ProportionalUrl *string `json:"proportional_url,omitempty"`
	ProportionalWebpUrl *string `json:"proportional_webp_url,omitempty"`
	ProportionalSize ContentThumbnailProportionalSize `json:"proportional_size,omitempty"`
}

type ContentCopyright struct {
	Note *string `json:"note,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentNums struct {
	Smiles *int `json:"smiles,omitempty"`
	Unsmiles *int `json:"unsmiles,omitempty"`
	GuestSmiles *int `json:"guest_smiles,omitempty"`
	Comments *int `json:"comments,omitempty"`
	Views *int `json:"views,omitempty"`
	Republished *int `json:"republished,omitempty"`
	Shares *int `json:"shares,omitempty"`
}

type User struct {
	BlockType *string `json:"block_type,omitempty"`
	Id *string `json:"id,omitempty"`
	IsBanned *bool `json:"is_banned,omitempty"`
	IsBlocked *bool `json:"is_blocked,omitempty"`
	IsDeleted *bool `json:"is_deleted,omitempty"`
	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	Nick *string `json:"nick,omitempty"`
	NickColor *string `json:"nick_color,omitempty"`
	Num UserNum `json:"num,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
	Photo ProfilePhoto `json:"photo,omitempty"`
	TotalPosts *int `json:"total_posts,omitempty"`
}

type ContentSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type ContentSubtitle struct {
	Lang *string `json:"lang,omitempty"`
	Url *string `json:"url,omitempty"`
}

type ContentSource struct {
	Id *string `json:"id,omitempty"`
	DateCreate *int `json:"date_create,omitempty"`
	Creator User `json:"creator,omitempty"`
}

type CommentState string

type CommentNums struct {
	Smiles *int `json:"smiles,omitempty"`
	Unsmiles *int `json:"unsmiles,omitempty"`
	Replies *int `json:"replies,omitempty"`
}

type CommentDeletionReason string

type CommentAttachment struct {
	Content []Content `json:"content,omitempty"`
	ContentFromLinks []Content `json:"content_from_links,omitempty"`
	MentionUser []UserMention `json:"mention_user,omitempty"`
	Giphy []Content `json:"giphy,omitempty"`
}

type Reply struct {
	IsReply *bool `json:"is_reply,omitempty"`
	Id *string `json:"id,omitempty"`
	Cid *string `json:"cid,omitempty"`
	State CommentState `json:"state,omitempty"`
	Date *int `json:"date,omitempty"`
	Text *string `json:"text,omitempty"`
	Num CommentNums `json:"num,omitempty"`
	IsSmiled *bool `json:"is_smiled,omitempty"`
	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
	IsEdited *bool `json:"is_edited,omitempty"`
	User User `json:"user,omitempty"`
	DeletionReason CommentDeletionReason `json:"deletion_reason,omitempty"`
	Content Content `json:"content,omitempty"`
	Attachments []CommentAttachment `json:"attachments,omitempty"`
	ContentThumbs ContentThumbnail `json:"content_thumbs,omitempty"`
	LastReply Reply `json:"last_reply,omitempty"`
	RootCommId *string `json:"root_comm_id,omitempty"`
	ParentCommId *string `json:"parent_comm_id,omitempty"`
	Depth *int `json:"depth,omitempty"`
}

type ContentThumbnailProportionalSize struct {
	W *int `json:"w,omitempty"`
	H *int `json:"h,omitempty"`
}

type UserNum struct {
	Subscribers *int `json:"subscribers,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
}

type ProfilePhoto struct {
	BgColor *string `json:"bg_color,omitempty"`
	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
	Url *string `json:"url,omitempty"`
}

type UserMention struct {
	Id *string `json:"id,omitempty"`
	Creator User `json:"creator,omitempty"`
	Nick *string `json:"nick,omitempty"`
	StartIndex *int `json:"start_index,omitempty"`
	StopIndex *int `json:"stop_index,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	OriginalNick *string `json:"original_nick,omitempty"`
}

type ProfilePhotoThumb struct {
	LargeUrl *string `json:"large_url,omitempty"`
	MediumUrl *string `json:"medium_url,omitempty"`
	SmallUrl *string `json:"small_url,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/counters" baseUrl="https://api.ifunny.mobi/v4" summary="Notification Counters" %}

{% swagger-description %}
Fetch the notification counters for the client.

**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetNotificationCountersQuery
{
  "is_new"?: "boolean"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetNotificationCountersQuery {
  is_new?: boolean;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetNotificationCountersQuery struct {
	IsNew *bool `query:"is_new,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="is_new" type="Boolean" %}
Doesn't seem to affect responses
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Client Counters" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetNotificationCounters200Response
{
  "data"?: "NotificationCounters",
  "status"?: "200"
}

// NotificationCounters
{
  "featured"?: "integer",
  "subscriptions"?: "integer",
  "collective"?: "integer",
  "news"?: "integer",
  "map"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetNotificationCounters200Response {
  data?: NotificationCounters;
  status?: 200;
}

interface NotificationCounters {
  featured?: number;
  subscriptions?: number;
  collective?: number;
  news?: number;
  map?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetNotificationCounters200Response struct {
	Data NotificationCounters `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type NotificationCounters struct {
	Featured *int `json:"featured,omitempty"`
	Subscriptions *int `json:"subscriptions,omitempty"`
	Collective *int `json:"collective,omitempty"`
	News *int `json:"news,omitempty"`
	Map *int `json:"map,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid Grant" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetNotificationCounters401Response
"GetNotificationCounters401Response": "Error"

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
type GetNotificationCounters401Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetNotificationCounters401Response Error

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
