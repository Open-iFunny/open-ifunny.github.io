---
description: Methods for interacting with comments
---

# 💭 Comments

Methods for interacting with comments

{% swagger method="get" path="/content/:id/comments" baseUrl="https://api.ifunny.mobi/v4" summary="Get Content Comments" %}

{% swagger-description %}
Paginate through comments on some content by its ID.

**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// GetContentCommentsQuery
{
  "limit"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetContentCommentsQuery {
  limit?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetContentCommentsQuery struct {
	Limit *int `query:"limit,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Pagination" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetContentComments200Response
"GetContentComments200Response": "CommentPageResponse"

// CommentPageResponse
{
  "data"?: "CommentPageResponseData",
  "status"?: "200"
}

// CommentPageResponseData
{
  "comments"?: "CommentPageResponseDataComments",
  "content"?: "CommentPageResponseDataContent"
}

// CommentPageResponseDataComments
{
  "items"?: "Comment[]",
  "paging"?: "PagingCursors"
}

// CommentPageResponseDataContent
{
  "comments_count"?: "integer",
  "replies_count"?: "integer"
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
type GetContentComments200Response = CommentPageResponse;

interface CommentPageResponse {
  data?: CommentPageResponseData;
  status?: 200;
}

interface CommentPageResponseData {
  comments?: CommentPageResponseDataComments;
  content?: CommentPageResponseDataContent;
}

interface CommentPageResponseDataComments {
  items?: Comment[];
  paging?: PagingCursors;
}

interface CommentPageResponseDataContent {
  comments_count?: number;
  replies_count?: number;
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
type GetContentComments200Response CommentPageResponse

type CommentPageResponse struct {
	Data CommentPageResponseData `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CommentPageResponseData struct {
	Comments CommentPageResponseDataComments `json:"comments,omitempty"`
	Content CommentPageResponseDataContent `json:"content,omitempty"`
}

type CommentPageResponseDataComments struct {
	Items []Comment `json:"items,omitempty"`
	Paging PagingCursors `json:"paging,omitempty"`
}

type CommentPageResponseDataContent struct {
	CommentsCount *int `json:"comments_count,omitempty"`
	RepliesCount *int `json:"replies_count,omitempty"`
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

{% swagger-response status="404: Not Found" description="Content Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetContentComments404Response
"GetContentComments404Response": "Error"

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
type GetContentComments404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetContentComments404Response Error

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

{% swagger method="post" path="/content/:id/comments" baseUrl="https://api.ifunny.mobi/v4" summary="Add Comment" %}

{% swagger-description %}
Post a top-level comment on content. Body supports plain text,
an optional attached post (`content`), and user mentions.

**Auth:** BearerAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
```json
// AddContentCommentRequest
{
  "text": "string",
  "content"?: "string",
  "mentions"?: "UserMention[]"
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
interface AddContentCommentRequest {
  text: string;
  content?: string;
  mentions?: UserMention[];
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
type AddContentCommentRequest struct {
	Text string `json:"text"`
	Content *string `json:"content,omitempty"`
	Mentions []UserMention `json:"mentions,omitempty"`
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
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="text" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="content" type="String" %}
Optional attached post's content ID.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="mentions" type="String[]" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment created" %}
{% tabs %}
{% tab title="JSON" %}
```json
// AddContentComment200Response
{
  "data"?: "AddContentComment200Data",
  "status"?: "200"
}

// AddContentComment200Data
{
  "comment"?: "Comment"
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
interface AddContentComment200Response {
  data?: AddContentComment200Data;
  status?: 200;
}

interface AddContentComment200Data {
  comment?: Comment;
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
type AddContentComment200Response struct {
	Data AddContentComment200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type AddContentComment200Data struct {
	Comment Comment `json:"comment,omitempty"`
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

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// AddContentComment404Response
"AddContentComment404Response": "Error"

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
type AddContentComment404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type AddContentComment404Response Error

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

{% swagger method="get" path="/content/:content_id/comments/:comment_id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Get Comment Smiles" %}

{% swagger-description %}
Paginate through users that smiled the comment.

**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smilers" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetCommentSmiles200Response
{
  "data"?: "GetCommentSmiles200Data"
}

// GetCommentSmiles200Data
{
  "smiles_count"?: "integer",
  "users"?: "GetCommentSmiles200DataUsers"
}

// GetCommentSmiles200DataUsers
{
  "items"?: "User[]",
  "paging"?: "PagingCursors"
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

// PagingCursors
{
  "cursors"?: "PagingCursorsCursors",
  "hasNext"?: "boolean",
  "hasPrev"?: "boolean",
  "has_next"?: "boolean",
  "has_prev"?: "boolean"
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
interface GetCommentSmiles200Response {
  data?: GetCommentSmiles200Data;
}

interface GetCommentSmiles200Data {
  smiles_count?: number;
  users?: GetCommentSmiles200DataUsers;
}

interface GetCommentSmiles200DataUsers {
  items?: User[];
  paging?: PagingCursors;
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

interface PagingCursors {
  cursors?: PagingCursorsCursors;
  hasNext?: boolean;
  hasPrev?: boolean;
  has_next?: boolean;
  has_prev?: boolean;
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
type GetCommentSmiles200Response struct {
	Data GetCommentSmiles200Data `json:"data,omitempty"`
}

type GetCommentSmiles200Data struct {
	SmilesCount *int `json:"smiles_count,omitempty"`
	Users GetCommentSmiles200DataUsers `json:"users,omitempty"`
}

type GetCommentSmiles200DataUsers struct {
	Items []User `json:"items,omitempty"`
	Paging PagingCursors `json:"paging,omitempty"`
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

type PagingCursors struct {
	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
	HasNext *bool `json:"hasNext,omitempty"`
	HasPrev *bool `json:"hasPrev,omitempty"`
	HasNext *bool `json:"has_next,omitempty"`
	HasPrev *bool `json:"has_prev,omitempty"`
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

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetCommentSmiles404Response
"GetCommentSmiles404Response": "Error"

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
type GetCommentSmiles404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetCommentSmiles404Response Error

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

{% swagger method="put" path="/content/:content_id/comments/:comment_id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Smile Comment" %}

{% swagger-description %}
Smile a comment by its ID.
If the comment was unsmiled by the client, this will remove that unsmile.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smiles" %}
{% tabs %}
{% tab title="JSON" %}
```json
// SmileComment200Response
"SmileComment200Response": "CommentSmileCountsResponse"

// CommentSmileCountsResponse
{
  "data"?: "CommentSmileCountsResponseData",
  "status"?: "200"
}

// CommentSmileCountsResponseData
{
  "num_smiles"?: "integer",
  "num_unsmiles"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type SmileComment200Response = CommentSmileCountsResponse;

interface CommentSmileCountsResponse {
  data?: CommentSmileCountsResponseData;
  status?: 200;
}

interface CommentSmileCountsResponseData {
  num_smiles?: number;
  num_unsmiles?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type SmileComment200Response CommentSmileCountsResponse

type CommentSmileCountsResponse struct {
	Data CommentSmileCountsResponseData `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CommentSmileCountsResponseData struct {
	NumSmiles *int `json:"num_smiles,omitempty"`
	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Authorization Required" %}
{% tabs %}
{% tab title="JSON" %}
```json
// SmileComment403Response
"SmileComment403Response": "Error"

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
type SmileComment403Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type SmileComment403Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// SmileComment404Response
"SmileComment404Response": "Error"

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
type SmileComment404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type SmileComment404Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="423: Locked" description="Comment already smiled" %}
{% tabs %}
{% tab title="JSON" %}
```json
// SmileComment423Response
"SmileComment423Response": "Error"

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
type SmileComment423Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type SmileComment423Response Error

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

{% swagger method="delete" path="/content/:content_id/comments/:comment_id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Remove Comment Smile" %}

{% swagger-description %}
Removes the smile on a comment. **NOT** the same as unsmiling the Comment.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smiles" %}
{% tabs %}
{% tab title="JSON" %}
```json
// RemoveCommentSmile200Response
"RemoveCommentSmile200Response": "CommentSmileCountsResponse"

// CommentSmileCountsResponse
{
  "data"?: "CommentSmileCountsResponseData",
  "status"?: "200"
}

// CommentSmileCountsResponseData
{
  "num_smiles"?: "integer",
  "num_unsmiles"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type RemoveCommentSmile200Response = CommentSmileCountsResponse;

interface CommentSmileCountsResponse {
  data?: CommentSmileCountsResponseData;
  status?: 200;
}

interface CommentSmileCountsResponseData {
  num_smiles?: number;
  num_unsmiles?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RemoveCommentSmile200Response CommentSmileCountsResponse

type CommentSmileCountsResponse struct {
	Data CommentSmileCountsResponseData `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CommentSmileCountsResponseData struct {
	NumSmiles *int `json:"num_smiles,omitempty"`
	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Authorization Required" %}
{% tabs %}
{% tab title="JSON" %}
```json
// RemoveCommentSmile403Response
"RemoveCommentSmile403Response": "Error"

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
type RemoveCommentSmile403Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RemoveCommentSmile403Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// RemoveCommentSmile404Response
"RemoveCommentSmile404Response": "Error"

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
type RemoveCommentSmile404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RemoveCommentSmile404Response Error

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

{% swagger method="put" path="/content/:content_id/comments/:comment_id/unsmiles" baseUrl="https://api.ifunny.mobi/v4" summary="Unsmile Comment" %}

{% swagger-description %}
Add an Unsmile to a comment.
If the client has already smiled the Comment, this will remove that smile.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smile Nums" %}
{% tabs %}
{% tab title="JSON" %}
```json
// UnsmileComment200Response
"UnsmileComment200Response": "CommentSmileCountsResponse"

// CommentSmileCountsResponse
{
  "data"?: "CommentSmileCountsResponseData",
  "status"?: "200"
}

// CommentSmileCountsResponseData
{
  "num_smiles"?: "integer",
  "num_unsmiles"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type UnsmileComment200Response = CommentSmileCountsResponse;

interface CommentSmileCountsResponse {
  data?: CommentSmileCountsResponseData;
  status?: 200;
}

interface CommentSmileCountsResponseData {
  num_smiles?: number;
  num_unsmiles?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UnsmileComment200Response CommentSmileCountsResponse

type CommentSmileCountsResponse struct {
	Data CommentSmileCountsResponseData `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CommentSmileCountsResponseData struct {
	NumSmiles *int `json:"num_smiles,omitempty"`
	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Authorization Required" %}
{% tabs %}
{% tab title="JSON" %}
```json
// UnsmileComment403Response
"UnsmileComment403Response": "Error"

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
type UnsmileComment403Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UnsmileComment403Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// UnsmileComment404Response
"UnsmileComment404Response": "Error"

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
type UnsmileComment404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UnsmileComment404Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="423: Locked" description="Already Unsmiled" %}
{% tabs %}
{% tab title="JSON" %}
```json
// UnsmileComment423Response
"UnsmileComment423Response": "Error"

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
type UnsmileComment423Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type UnsmileComment423Response Error

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

{% swagger method="delete" path="/content/:content_id/comments/:comment_id/unsmiles" baseUrl="https://api.ifunny.mobi/v4" summary="Remove Comment Unsmile" %}

{% swagger-description %}
This will remove a comment's Unsmile. **NOT** the same as smiling the Content.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smile Nums" %}
{% tabs %}
{% tab title="JSON" %}
```json
// RemoveCommentUnsmile200Response
"RemoveCommentUnsmile200Response": "CommentSmileCountsResponse"

// CommentSmileCountsResponse
{
  "data"?: "CommentSmileCountsResponseData",
  "status"?: "200"
}

// CommentSmileCountsResponseData
{
  "num_smiles"?: "integer",
  "num_unsmiles"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type RemoveCommentUnsmile200Response = CommentSmileCountsResponse;

interface CommentSmileCountsResponse {
  data?: CommentSmileCountsResponseData;
  status?: 200;
}

interface CommentSmileCountsResponseData {
  num_smiles?: number;
  num_unsmiles?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RemoveCommentUnsmile200Response CommentSmileCountsResponse

type CommentSmileCountsResponse struct {
	Data CommentSmileCountsResponseData `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CommentSmileCountsResponseData struct {
	NumSmiles *int `json:"num_smiles,omitempty"`
	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// RemoveCommentUnsmile404Response
"RemoveCommentUnsmile404Response": "Error"

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
type RemoveCommentUnsmile404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RemoveCommentUnsmile404Response Error

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

{% swagger method="delete" path="/content/:content_id/comments/:comment_id" baseUrl="https://api.ifunny.mobi/v4" summary="Delete Comment" %}

{% swagger-description %}
Delete a comment. Client must be the comment author or the post owner.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment deleted" %}
No response body.
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Forbidden (not comment author or post owner)" %}
{% tabs %}
{% tab title="JSON" %}
```json
// DeleteComment403Response
"DeleteComment403Response": "Error"

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
type DeleteComment403Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type DeleteComment403Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// DeleteComment404Response
"DeleteComment404Response": "Error"

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
type DeleteComment404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type DeleteComment404Response Error

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

{% swagger method="post" path="/content/:content_id/comments/:comment_id/replies" baseUrl="https://api.ifunny.mobi/v4" summary="Reply to Comment" %}

{% swagger-description %}
Post a reply to a comment. Body supports plain text, an optional
attached post (`content`), and user mentions.

**Auth:** BearerAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
```json
// AddCommentReplyRequest
{
  "text": "string",
  "content"?: "string",
  "mentions"?: "UserMention[]"
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
interface AddCommentReplyRequest {
  text: string;
  content?: string;
  mentions?: UserMention[];
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
type AddCommentReplyRequest struct {
	Text string `json:"text"`
	Content *string `json:"content,omitempty"`
	Mentions []UserMention `json:"mentions,omitempty"`
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
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="text" type="String" required="true" %}
Reply text.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="content" type="String" %}
Optional attached post's content ID.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="mentions" type="String[]" %}
User mentions embedded in the reply.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Reply created" %}
{% tabs %}
{% tab title="JSON" %}
```json
// AddCommentReply200Response
{
  "data"?: "AddCommentReply200Data",
  "status"?: "200"
}

// AddCommentReply200Data
{
  "comment"?: "Reply"
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
interface AddCommentReply200Response {
  data?: AddCommentReply200Data;
  status?: 200;
}

interface AddCommentReply200Data {
  comment?: Reply;
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
type AddCommentReply200Response struct {
	Data AddCommentReply200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type AddCommentReply200Data struct {
	Comment Reply `json:"comment,omitempty"`
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

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// AddCommentReply404Response
"AddCommentReply404Response": "Error"

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
type AddCommentReply404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type AddCommentReply404Response Error

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

{% swagger method="put" path="/content/:content_id/comments/:comment_id/abuses" baseUrl="https://api.ifunny.mobi/v4" summary="Report Comment" %}

{% swagger-description %}
Report a comment for abuse. `type` categorizes the report.

**Auth:** BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// ReportCommentQuery
{
  "type": "enum(hate, nude, spam, harm, target)"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface ReportCommentQuery {
  type: 'hate' | 'nude' | 'spam' | 'harm' | 'target';
}
```
{% endtab %}

{% tab title="Go" %}
```go
type ReportCommentQuery struct {
	Type string `query:"type"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="type" type="String" required="true" %}
One of: hate, nude, spam, harm, target
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Report accepted" %}
No response body.
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// ReportComment404Response
"ReportComment404Response": "Error"

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
type ReportComment404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type ReportComment404Response Error

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
