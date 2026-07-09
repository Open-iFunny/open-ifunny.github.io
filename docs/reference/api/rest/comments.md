---
title: Comments
description: "Methods for interacting with comments"
---

# 💭 Comments

Methods for interacting with comments

### Get Content Comments  {: #op-getcontentcomments }

**`GET /content/{id}/comments`**

Paginate through comments on some content by its ID.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // GetContentCommentsPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetContentCommentsPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type GetContentCommentsPath struct {
    	Id string `path:"id"`
    }
    ```

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |

=== "JSON"

    ```json
    // GetContentCommentsQuery
    {
      "limit"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetContentCommentsQuery {
      limit?: number;
    }
    ```

=== "Go"

    ```go
    type GetContentCommentsQuery struct {
    	Limit *int `query:"limit,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Comment Pagination

=== "JSON"

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

    // CommentState
    "CommentState": "enum(normal, top, abused, deleted, deleted_self)"

    // CommentNums
    {
      "smiles"?: "integer",
      "unsmiles"?: "integer",
      "replies"?: "integer"
    }

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    // Content
    {
      "id"?: "string",
      "type"?: "ContentType",
      "state"?: "enum(delayed, deleted, draft, published)",
      "title"?: "string",
      "url"?: "string",

      "fixed_title"?: "string",
      "description"?: "string",
      "tags"?: "string[]",
      "share_url"?: "string",
      "canonical_url"?: "string",
      "link"?: "string",
      "date_create"?: "integer",
      "publish_at"?: "integer",
      "issue_at"?: "integer",

      "creator"?: "User",
      "num"?: "ContentNums",

      "is_smiled"?: "boolean",
      "is_unsmiled"?: "boolean",
      "is_abused"?: "boolean",
      "is_featured"?: "boolean",
      "is_republished"?: "boolean",
      "is_pinned"?: "boolean",

      "thumb"?: "ContentThumbnail",
      "bg_color"?: "string",
      "size"?: "ContentSize",
      "has_header"?: "boolean",
      "subtitle"?: "ContentSubtitle",

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

      "visibility"?: "enum(public, subscribers, closed, chats)",
      "shot_status"?: "enum(approved, shot, hardShot)",
      "fast_start"?: "boolean",
      "risk"?: "integer",
      "can_be_boosted"?: "boolean",
      "old_watermark"?: "boolean",

      "copyright"?: "ContentCopyright",
      "source"?: "ContentSource",
      "traceback_url"?: "string",
      "ftag"?: "string",

      "engagement_rate"?: "string",
      "engagement_rate_explain"?: "string",
      "ocr_text"?: "string",
      "lat"?: "number",
      "lon"?: "number"
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

    // Same shape as Comment, with additional thread-position fields.
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    // ContentType
    "ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

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

    // ContentCopyright
    {
      "note"?: "string",
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

=== "TypeScript"

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

    type CommentState = 'normal' | 'top' | 'abused' | 'deleted' | 'deleted_self';

    interface CommentNums {
      smiles?: number;
      unsmiles?: number;
      replies?: number;
    }

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    interface Content {
      id?: string;
      type?: ContentType;
      state?: 'delayed' | 'deleted' | 'draft' | 'published';
      title?: string;
      url?: string;

      fixed_title?: string;
      description?: string;
      tags?: string[];
      share_url?: string;
      canonical_url?: string;
      link?: string;
      date_create?: number;
      publish_at?: number;
      issue_at?: number;

      creator?: User;
      num?: ContentNums;

      is_smiled?: boolean;
      is_unsmiled?: boolean;
      is_abused?: boolean;
      is_featured?: boolean;
      is_republished?: boolean;
      is_pinned?: boolean;

      thumb?: ContentThumbnail;
      bg_color?: string;
      size?: ContentSize;
      has_header?: boolean;
      subtitle?: ContentSubtitle;

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

      visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
      shot_status?: 'approved' | 'shot' | 'hardShot';
      fast_start?: boolean;
      risk?: number;
      can_be_boosted?: boolean;
      old_watermark?: boolean;

      copyright?: ContentCopyright;
      source?: ContentSource;
      traceback_url?: string;
      ftag?: string;

      engagement_rate?: string;
      engagement_rate_explain?: string;
      ocr_text?: string;
      lat?: number;
      lon?: number;
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

    // Same shape as Comment, with additional thread-position fields.
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

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

    interface ContentCopyright {
      note?: string;
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

=== "Go"

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

    type CommentState string

    type CommentNums struct {
    	Smiles *int `json:"smiles,omitempty"`
    	Unsmiles *int `json:"unsmiles,omitempty"`
    	Replies *int `json:"replies,omitempty"`
    }

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    type Content struct {
    	Id *string `json:"id,omitempty"`
    	Type ContentType `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	Title *string `json:"title,omitempty"`
    	Url *string `json:"url,omitempty"`

    	FixedTitle *string `json:"fixed_title,omitempty"`
    	Description *string `json:"description,omitempty"`
    	Tags []string `json:"tags,omitempty"`
    	ShareUrl *string `json:"share_url,omitempty"`
    	CanonicalUrl *string `json:"canonical_url,omitempty"`
    	Link *string `json:"link,omitempty"`
    	DateCreate *int `json:"date_create,omitempty"`
    	PublishAt *int `json:"publish_at,omitempty"`
    	IssueAt *int `json:"issue_at,omitempty"`

    	Creator User `json:"creator,omitempty"`
    	Num ContentNums `json:"num,omitempty"`

    	IsSmiled *bool `json:"is_smiled,omitempty"`
    	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
    	IsAbused *bool `json:"is_abused,omitempty"`
    	IsFeatured *bool `json:"is_featured,omitempty"`
    	IsRepublished *bool `json:"is_republished,omitempty"`
    	IsPinned *bool `json:"is_pinned,omitempty"`

    	Thumb ContentThumbnail `json:"thumb,omitempty"`
    	BgColor *string `json:"bg_color,omitempty"`
    	Size ContentSize `json:"size,omitempty"`
    	HasHeader *bool `json:"has_header,omitempty"`
    	Subtitle ContentSubtitle `json:"subtitle,omitempty"`

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

    	Visibility *string `json:"visibility,omitempty"`
    	ShotStatus *string `json:"shot_status,omitempty"`
    	FastStart *bool `json:"fast_start,omitempty"`
    	Risk *int `json:"risk,omitempty"`
    	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
    	OldWatermark *bool `json:"old_watermark,omitempty"`

    	Copyright ContentCopyright `json:"copyright,omitempty"`
    	Source ContentSource `json:"source,omitempty"`
    	TracebackUrl *string `json:"traceback_url,omitempty"`
    	Ftag *string `json:"ftag,omitempty"`

    	EngagementRate *string `json:"engagement_rate,omitempty"`
    	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
    	OcrText *string `json:"ocr_text,omitempty"`
    	Lat *float64 `json:"lat,omitempty"`
    	Lon *float64 `json:"lon,omitempty"`
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

    // Same shape as Comment, with additional thread-position fields.
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType string

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

    type ContentCopyright struct {
    	Note *string `json:"note,omitempty"`
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

##### `404 Not Found` — Content Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type GetContentComments404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetContentComments404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Add Comment  {: #op-addcontentcomment }

**`POST /content/{id}/comments`**

Post a top-level comment on content. Body supports plain text,
an optional attached post (`content`), and user mentions.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // AddContentCommentPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface AddContentCommentPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type AddContentCommentPath struct {
    	Id string `path:"id"`
    }
    ```

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `text` | `String` | yes |  |
    | `content` | `String` | no | Optional attached post's content ID. |
    | `mentions` | `String[]` | no |  |

=== "JSON"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

=== "TypeScript"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

=== "Go"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

#### Responses

##### `200 OK` — Comment created

=== "JSON"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    // Content
    {
      "id"?: "string",
      "type"?: "ContentType",
      "state"?: "enum(delayed, deleted, draft, published)",
      "title"?: "string",
      "url"?: "string",

      "fixed_title"?: "string",
      "description"?: "string",
      "tags"?: "string[]",
      "share_url"?: "string",
      "canonical_url"?: "string",
      "link"?: "string",
      "date_create"?: "integer",
      "publish_at"?: "integer",
      "issue_at"?: "integer",

      "creator"?: "User",
      "num"?: "ContentNums",

      "is_smiled"?: "boolean",
      "is_unsmiled"?: "boolean",
      "is_abused"?: "boolean",
      "is_featured"?: "boolean",
      "is_republished"?: "boolean",
      "is_pinned"?: "boolean",

      "thumb"?: "ContentThumbnail",
      "bg_color"?: "string",
      "size"?: "ContentSize",
      "has_header"?: "boolean",
      "subtitle"?: "ContentSubtitle",

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

      "visibility"?: "enum(public, subscribers, closed, chats)",
      "shot_status"?: "enum(approved, shot, hardShot)",
      "fast_start"?: "boolean",
      "risk"?: "integer",
      "can_be_boosted"?: "boolean",
      "old_watermark"?: "boolean",

      "copyright"?: "ContentCopyright",
      "source"?: "ContentSource",
      "traceback_url"?: "string",
      "ftag"?: "string",

      "engagement_rate"?: "string",
      "engagement_rate_explain"?: "string",
      "ocr_text"?: "string",
      "lat"?: "number",
      "lon"?: "number"
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

    // Same shape as Comment, with additional thread-position fields.
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    // ContentType
    "ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

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

    // ContentCopyright
    {
      "note"?: "string",
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

=== "TypeScript"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    interface Content {
      id?: string;
      type?: ContentType;
      state?: 'delayed' | 'deleted' | 'draft' | 'published';
      title?: string;
      url?: string;

      fixed_title?: string;
      description?: string;
      tags?: string[];
      share_url?: string;
      canonical_url?: string;
      link?: string;
      date_create?: number;
      publish_at?: number;
      issue_at?: number;

      creator?: User;
      num?: ContentNums;

      is_smiled?: boolean;
      is_unsmiled?: boolean;
      is_abused?: boolean;
      is_featured?: boolean;
      is_republished?: boolean;
      is_pinned?: boolean;

      thumb?: ContentThumbnail;
      bg_color?: string;
      size?: ContentSize;
      has_header?: boolean;
      subtitle?: ContentSubtitle;

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

      visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
      shot_status?: 'approved' | 'shot' | 'hardShot';
      fast_start?: boolean;
      risk?: number;
      can_be_boosted?: boolean;
      old_watermark?: boolean;

      copyright?: ContentCopyright;
      source?: ContentSource;
      traceback_url?: string;
      ftag?: string;

      engagement_rate?: string;
      engagement_rate_explain?: string;
      ocr_text?: string;
      lat?: number;
      lon?: number;
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

    // Same shape as Comment, with additional thread-position fields.
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

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

    interface ContentCopyright {
      note?: string;
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

=== "Go"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    type Content struct {
    	Id *string `json:"id,omitempty"`
    	Type ContentType `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	Title *string `json:"title,omitempty"`
    	Url *string `json:"url,omitempty"`

    	FixedTitle *string `json:"fixed_title,omitempty"`
    	Description *string `json:"description,omitempty"`
    	Tags []string `json:"tags,omitempty"`
    	ShareUrl *string `json:"share_url,omitempty"`
    	CanonicalUrl *string `json:"canonical_url,omitempty"`
    	Link *string `json:"link,omitempty"`
    	DateCreate *int `json:"date_create,omitempty"`
    	PublishAt *int `json:"publish_at,omitempty"`
    	IssueAt *int `json:"issue_at,omitempty"`

    	Creator User `json:"creator,omitempty"`
    	Num ContentNums `json:"num,omitempty"`

    	IsSmiled *bool `json:"is_smiled,omitempty"`
    	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
    	IsAbused *bool `json:"is_abused,omitempty"`
    	IsFeatured *bool `json:"is_featured,omitempty"`
    	IsRepublished *bool `json:"is_republished,omitempty"`
    	IsPinned *bool `json:"is_pinned,omitempty"`

    	Thumb ContentThumbnail `json:"thumb,omitempty"`
    	BgColor *string `json:"bg_color,omitempty"`
    	Size ContentSize `json:"size,omitempty"`
    	HasHeader *bool `json:"has_header,omitempty"`
    	Subtitle ContentSubtitle `json:"subtitle,omitempty"`

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

    	Visibility *string `json:"visibility,omitempty"`
    	ShotStatus *string `json:"shot_status,omitempty"`
    	FastStart *bool `json:"fast_start,omitempty"`
    	Risk *int `json:"risk,omitempty"`
    	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
    	OldWatermark *bool `json:"old_watermark,omitempty"`

    	Copyright ContentCopyright `json:"copyright,omitempty"`
    	Source ContentSource `json:"source,omitempty"`
    	TracebackUrl *string `json:"traceback_url,omitempty"`
    	Ftag *string `json:"ftag,omitempty"`

    	EngagementRate *string `json:"engagement_rate,omitempty"`
    	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
    	OcrText *string `json:"ocr_text,omitempty"`
    	Lat *float64 `json:"lat,omitempty"`
    	Lon *float64 `json:"lon,omitempty"`
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

    // Same shape as Comment, with additional thread-position fields.
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType string

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

    type ContentCopyright struct {
    	Note *string `json:"note,omitempty"`
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

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type AddContentComment404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type AddContentComment404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Get Comment Smiles  {: #op-getcommentsmiles }

**`GET /content/{content_id}/comments/{comment_id}/smiles`**

Paginate through users that smiled the comment.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // GetCommentSmilesPath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetCommentSmilesPath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type GetCommentSmilesPath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Responses

##### `200 OK` — Comment Smilers

=== "JSON"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

=== "TypeScript"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

=== "Go"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type GetCommentSmiles404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetCommentSmiles404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Smile Comment  {: #op-smilecomment }

**`PUT /content/{content_id}/comments/{comment_id}/smiles`**

Smile a comment by its ID.
If the comment was unsmiled by the client, this will remove that unsmile.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // SmileCommentPath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SmileCommentPath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type SmileCommentPath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Responses

##### `200 OK` — Comment Smiles

=== "JSON"

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

=== "TypeScript"

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

=== "Go"

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

##### `403 Forbidden` — Authorization Required

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type SmileComment403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type SmileComment403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type SmileComment404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type SmileComment404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `423 Locked` — Comment already smiled

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type SmileComment423Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type SmileComment423Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Remove Comment Smile  {: #op-removecommentsmile }

**`DELETE /content/{content_id}/comments/{comment_id}/smiles`**

Removes the smile on a comment. **NOT** the same as unsmiling the Comment.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // RemoveCommentSmilePath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RemoveCommentSmilePath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type RemoveCommentSmilePath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Responses

##### `200 OK` — Comment Smiles

=== "JSON"

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

=== "TypeScript"

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

=== "Go"

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

##### `403 Forbidden` — Authorization Required

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type RemoveCommentSmile403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type RemoveCommentSmile403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type RemoveCommentSmile404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type RemoveCommentSmile404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Unsmile Comment  {: #op-unsmilecomment }

**`PUT /content/{content_id}/comments/{comment_id}/unsmiles`**

Add an Unsmile to a comment.
If the client has already smiled the Comment, this will remove that smile.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // UnsmileCommentPath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnsmileCommentPath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type UnsmileCommentPath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Responses

##### `200 OK` — Comment Smile Nums

=== "JSON"

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

=== "TypeScript"

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

=== "Go"

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

##### `403 Forbidden` — Authorization Required

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type UnsmileComment403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnsmileComment403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type UnsmileComment404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnsmileComment404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `423 Locked` — Already Unsmiled

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type UnsmileComment423Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnsmileComment423Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Remove Comment Unsmile  {: #op-removecommentunsmile }

**`DELETE /content/{content_id}/comments/{comment_id}/unsmiles`**

This will remove a comment's Unsmile. **NOT** the same as smiling the Content.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // RemoveCommentUnsmilePath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RemoveCommentUnsmilePath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type RemoveCommentUnsmilePath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Responses

##### `200 OK` — Comment Smile Nums

=== "JSON"

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

=== "TypeScript"

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

=== "Go"

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

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type RemoveCommentUnsmile404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type RemoveCommentUnsmile404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Delete Comment  {: #op-deletecomment }

**`DELETE /content/{content_id}/comments/{comment_id}`**

Delete a comment. Client must be the comment author or the post owner.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // DeleteCommentPath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface DeleteCommentPath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type DeleteCommentPath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Responses

##### `200 OK` — Comment deleted

No response body.

##### `403 Forbidden` — Forbidden (not comment author or post owner)

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type DeleteComment403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type DeleteComment403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type DeleteComment404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type DeleteComment404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Reply to Comment  {: #op-addcommentreply }

**`POST /content/{content_id}/comments/{comment_id}/replies`**

Post a reply to a comment. Body supports plain text, an optional
attached post (`content`), and user mentions.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // AddCommentReplyPath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface AddCommentReplyPath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type AddCommentReplyPath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `text` | `String` | yes | Reply text. |
    | `content` | `String` | no | Optional attached post's content ID. |
    | `mentions` | `String[]` | no | User mentions embedded in the reply. |

=== "JSON"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

=== "TypeScript"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

=== "Go"

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

    // Minimal user representation used in lists (comments, timelines, etc).
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

#### Responses

##### `200 OK` — Reply created

=== "JSON"

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

    // Same shape as Comment, with additional thread-position fields.
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

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    // Content
    {
      "id"?: "string",
      "type"?: "ContentType",
      "state"?: "enum(delayed, deleted, draft, published)",
      "title"?: "string",
      "url"?: "string",

      "fixed_title"?: "string",
      "description"?: "string",
      "tags"?: "string[]",
      "share_url"?: "string",
      "canonical_url"?: "string",
      "link"?: "string",
      "date_create"?: "integer",
      "publish_at"?: "integer",
      "issue_at"?: "integer",

      "creator"?: "User",
      "num"?: "ContentNums",

      "is_smiled"?: "boolean",
      "is_unsmiled"?: "boolean",
      "is_abused"?: "boolean",
      "is_featured"?: "boolean",
      "is_republished"?: "boolean",
      "is_pinned"?: "boolean",

      "thumb"?: "ContentThumbnail",
      "bg_color"?: "string",
      "size"?: "ContentSize",
      "has_header"?: "boolean",
      "subtitle"?: "ContentSubtitle",

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

      "visibility"?: "enum(public, subscribers, closed, chats)",
      "shot_status"?: "enum(approved, shot, hardShot)",
      "fast_start"?: "boolean",
      "risk"?: "integer",
      "can_be_boosted"?: "boolean",
      "old_watermark"?: "boolean",

      "copyright"?: "ContentCopyright",
      "source"?: "ContentSource",
      "traceback_url"?: "string",
      "ftag"?: "string",

      "engagement_rate"?: "string",
      "engagement_rate_explain"?: "string",
      "ocr_text"?: "string",
      "lat"?: "number",
      "lon"?: "number"
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    // ContentType
    "ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

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

    // ContentCopyright
    {
      "note"?: "string",
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

=== "TypeScript"

    ```typescript
    interface AddCommentReply200Response {
      data?: AddCommentReply200Data;
      status?: 200;
    }

    interface AddCommentReply200Data {
      comment?: Reply;
    }

    // Same shape as Comment, with additional thread-position fields.
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

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    interface Content {
      id?: string;
      type?: ContentType;
      state?: 'delayed' | 'deleted' | 'draft' | 'published';
      title?: string;
      url?: string;

      fixed_title?: string;
      description?: string;
      tags?: string[];
      share_url?: string;
      canonical_url?: string;
      link?: string;
      date_create?: number;
      publish_at?: number;
      issue_at?: number;

      creator?: User;
      num?: ContentNums;

      is_smiled?: boolean;
      is_unsmiled?: boolean;
      is_abused?: boolean;
      is_featured?: boolean;
      is_republished?: boolean;
      is_pinned?: boolean;

      thumb?: ContentThumbnail;
      bg_color?: string;
      size?: ContentSize;
      has_header?: boolean;
      subtitle?: ContentSubtitle;

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

      visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
      shot_status?: 'approved' | 'shot' | 'hardShot';
      fast_start?: boolean;
      risk?: number;
      can_be_boosted?: boolean;
      old_watermark?: boolean;

      copyright?: ContentCopyright;
      source?: ContentSource;
      traceback_url?: string;
      ftag?: string;

      engagement_rate?: string;
      engagement_rate_explain?: string;
      ocr_text?: string;
      lat?: number;
      lon?: number;
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

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

    interface ContentCopyright {
      note?: string;
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

=== "Go"

    ```go
    type AddCommentReply200Response struct {
    	Data AddCommentReply200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type AddCommentReply200Data struct {
    	Comment Reply `json:"comment,omitempty"`
    }

    // Same shape as Comment, with additional thread-position fields.
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

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    type Content struct {
    	Id *string `json:"id,omitempty"`
    	Type ContentType `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	Title *string `json:"title,omitempty"`
    	Url *string `json:"url,omitempty"`

    	FixedTitle *string `json:"fixed_title,omitempty"`
    	Description *string `json:"description,omitempty"`
    	Tags []string `json:"tags,omitempty"`
    	ShareUrl *string `json:"share_url,omitempty"`
    	CanonicalUrl *string `json:"canonical_url,omitempty"`
    	Link *string `json:"link,omitempty"`
    	DateCreate *int `json:"date_create,omitempty"`
    	PublishAt *int `json:"publish_at,omitempty"`
    	IssueAt *int `json:"issue_at,omitempty"`

    	Creator User `json:"creator,omitempty"`
    	Num ContentNums `json:"num,omitempty"`

    	IsSmiled *bool `json:"is_smiled,omitempty"`
    	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
    	IsAbused *bool `json:"is_abused,omitempty"`
    	IsFeatured *bool `json:"is_featured,omitempty"`
    	IsRepublished *bool `json:"is_republished,omitempty"`
    	IsPinned *bool `json:"is_pinned,omitempty"`

    	Thumb ContentThumbnail `json:"thumb,omitempty"`
    	BgColor *string `json:"bg_color,omitempty"`
    	Size ContentSize `json:"size,omitempty"`
    	HasHeader *bool `json:"has_header,omitempty"`
    	Subtitle ContentSubtitle `json:"subtitle,omitempty"`

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

    	Visibility *string `json:"visibility,omitempty"`
    	ShotStatus *string `json:"shot_status,omitempty"`
    	FastStart *bool `json:"fast_start,omitempty"`
    	Risk *int `json:"risk,omitempty"`
    	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
    	OldWatermark *bool `json:"old_watermark,omitempty"`

    	Copyright ContentCopyright `json:"copyright,omitempty"`
    	Source ContentSource `json:"source,omitempty"`
    	TracebackUrl *string `json:"traceback_url,omitempty"`
    	Ftag *string `json:"ftag,omitempty"`

    	EngagementRate *string `json:"engagement_rate,omitempty"`
    	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
    	OcrText *string `json:"ocr_text,omitempty"`
    	Lat *float64 `json:"lat,omitempty"`
    	Lon *float64 `json:"lon,omitempty"`
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

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType string

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

    type ContentCopyright struct {
    	Note *string `json:"note,omitempty"`
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

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type AddCommentReply404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type AddCommentReply404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Report Comment  {: #op-reportcomment }

**`PUT /content/{content_id}/comments/{comment_id}/abuses`**

Report a comment for abuse. `type` categorizes the report.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `content_id` | `String` | yes |  |
    | `comment_id` | `String` | yes |  |

=== "JSON"

    ```json
    // ReportCommentPath
    {
      "content_id": "string",
      "comment_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ReportCommentPath {
      content_id: string;
      comment_id: string;
    }
    ```

=== "Go"

    ```go
    type ReportCommentPath struct {
    	ContentId string `path:"content_id"`
    	CommentId string `path:"comment_id"`
    }
    ```

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `String` | yes | One of: hate, nude, spam, harm, target |

=== "JSON"

    ```json
    // ReportCommentQuery
    {
      "type": "enum(hate, nude, spam, harm, target)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ReportCommentQuery {
      type: 'hate' | 'nude' | 'spam' | 'harm' | 'target';
    }
    ```

=== "Go"

    ```go
    type ReportCommentQuery struct {
    	Type string `query:"type"`
    }
    ```

#### Responses

##### `200 OK` — Report accepted

No response body.

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type ReportComment404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ReportComment404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
