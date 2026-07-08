---
title: Content
description: "Methods for interacting with content (posts)"
---

# 😂 Content

Methods for interacting with content (posts)

### `GET /feeds/featured` — Scroll Featured  {: #op-getfeaturedfeed }

Paginate through content in featured.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |
    | `is_new` | `Boolean` | no | Seems to have no effect on responses |

=== "JSON"

    ```json
    // GetFeaturedFeedQuery
    {
      "limit"?: "integer",
      "is_new"?: "boolean"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetFeaturedFeedQuery {
      limit?: number;
      is_new?: boolean;
    }
    ```

=== "Go"

    ```go
    type GetFeaturedFeedQuery struct {
    	Limit *int `query:"limit,omitempty"`
    	IsNew *bool `query:"is_new,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Featured Content

=== "JSON"

    ```json
    // GetFeaturedFeed200Response
    "GetFeaturedFeed200Response": "FeedResponse"

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

=== "TypeScript"

    ```typescript
    type GetFeaturedFeed200Response = FeedResponse;

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

=== "Go"

    ```go
    type GetFeaturedFeed200Response FeedResponse

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

### `POST /feeds/collective` — Scroll Collective  {: #op-getcollectivefeed }

Paginate through content in collective. Unclear why iFunny made this a POST
instead of GET.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |

=== "JSON"

    ```json
    // GetCollectiveFeedQuery
    {
      "limit"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetCollectiveFeedQuery {
      limit?: number;
    }
    ```

=== "Go"

    ```go
    type GetCollectiveFeedQuery struct {
    	Limit *int `query:"limit,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Collective Content

=== "JSON"

    ```json
    // GetCollectiveFeed200Response
    "GetCollectiveFeed200Response": "FeedResponse"

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

=== "TypeScript"

    ```typescript
    type GetCollectiveFeed200Response = FeedResponse;

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

=== "Go"

    ```go
    type GetCollectiveFeed200Response FeedResponse

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

### `GET /timelines/home` — Scroll Subscription Timeline  {: #op-getsubscriptiontimeline }

Paginate through content in the Client's subscription Feed.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |

=== "JSON"

    ```json
    // GetSubscriptionTimelineQuery
    {
      "limit"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetSubscriptionTimelineQuery {
      limit?: number;
    }
    ```

=== "Go"

    ```go
    type GetSubscriptionTimelineQuery struct {
    	Limit *int `query:"limit,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Subscription Feed

=== "JSON"

    ```json
    // GetSubscriptionTimeline200Response
    "GetSubscriptionTimeline200Response": "FeedResponse"

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

=== "TypeScript"

    ```typescript
    type GetSubscriptionTimeline200Response = FeedResponse;

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

=== "Go"

    ```go
    type GetSubscriptionTimeline200Response FeedResponse

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

### `GET /content/{id}` — Get Content by ID  {: #op-getcontentbyid }

Fetch content by its ID.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Content

=== "JSON"

    ```json
    // GetContentById200Response
    {
      "data"?: "Content",
      "status"?: "200"
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

=== "TypeScript"

    ```typescript
    interface GetContentById200Response {
      data?: Content;
      status?: 200;
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

=== "Go"

    ```go
    type GetContentById200Response struct {
    	Data Content `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
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

##### `404 Not Found` — Content Not Found

=== "JSON"

    ```json
    // GetContentById404Response
    "GetContentById404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetContentById404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetContentById404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `PATCH /content/{id}` — Modify Content  {: #op-modifycontent }

Update a delayed/scheduled post's publish time or visibility.
Send exactly one of `publish_at` or `visibility`.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `publish_at` | `Number` | no | New scheduled publish time (Unix seconds). |
    | `visibility` | `String` | no | New visibility for a still-delayed post. — One of: public, subscribers |

=== "JSON"

    ```json
    // ModifyContentRequest
    {
      "publish_at"?: "integer",
      "visibility"?: "enum(public, subscribers)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ModifyContentRequest {
      publish_at?: number;
      visibility?: 'public' | 'subscribers';
    }
    ```

=== "Go"

    ```go
    type ModifyContentRequest struct {
    	PublishAt *int `json:"publish_at,omitempty"`
    	Visibility *string `json:"visibility,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Updated

No response body.

##### `403 Forbidden` — Forbidden (not content owner, or already published)

=== "JSON"

    ```json
    // ModifyContent403Response
    "ModifyContent403Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type ModifyContent403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ModifyContent403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // ModifyContent404Response
    "ModifyContent404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type ModifyContent404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ModifyContent404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `DELETE /content/{id}` — Delete Content  {: #op-deletecontent }

Delete a post. Only the author may call this. Returns a task-style
envelope; poll `GET /tasks/{id}` for terminal state.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Deletion accepted

=== "JSON"

    ```json
    // DeleteContent200Response
    {
      "data"?: "Task",
      "status"?: "200"
    }

    // Task
    {
      "id"?: "string",
      "type"?: "string",
      "state"?: "enum(pending, success, failure)",
      "retry_after"?: "integer",
      "result"?: "TaskResult",
      "error"?: "string",
      "error_description"?: "string"
    }

    // TaskResult
    {
      "cid"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface DeleteContent200Response {
      data?: Task;
      status?: 200;
    }

    interface Task {
      id?: string;
      type?: string;
      state?: 'pending' | 'success' | 'failure';
      retry_after?: number;
      result?: TaskResult;
      error?: string;
      error_description?: string;
    }

    interface TaskResult {
      cid?: string;
    }
    ```

=== "Go"

    ```go
    type DeleteContent200Response struct {
    	Data Task `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type Task struct {
    	Id *string `json:"id,omitempty"`
    	Type *string `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	RetryAfter *int `json:"retry_after,omitempty"`
    	Result TaskResult `json:"result,omitempty"`
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    }

    type TaskResult struct {
    	Cid *string `json:"cid,omitempty"`
    }
    ```

##### `403 Forbidden` — Forbidden (not content owner)

=== "JSON"

    ```json
    // DeleteContent403Response
    "DeleteContent403Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type DeleteContent403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type DeleteContent403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // DeleteContent404Response
    "DeleteContent404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type DeleteContent404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type DeleteContent404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `POST /content` — Upload Content  {: #op-uploadcontent }

Uploads new content.

Note: the source documentation listed this as `GET /content`; corrected to
`POST` here since the request body is `multipart/form-data`.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Request body (`multipart/form-data`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `String` | yes | Content type (see ContentType schema) |
    | `tags` | `String[]` | yes | Array of tags to apply to the post |
    | `video` | `String` | no | Bytes for the video |

=== "JSON"

    ```json
    // UploadContentRequest
    {
      "type": "string",
      "tags": "string[]",
      "video"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UploadContentRequest {
      type: string;
      tags: string[];
      video?: string;
    }
    ```

=== "Go"

    ```go
    type UploadContentRequest struct {
    	Type string `json:"type"`
    	Tags []string `json:"tags"`
    	Video *string `json:"video,omitempty"`
    }
    ```

#### Responses

##### `202 Accepted` — Content Upload Pending

=== "JSON"

    ```json
    // UploadContent202Response
    {
      "data"?: "UploadContent202Data",
      "status"?: "202"
    }

    // UploadContent202Data
    {
      "id"?: "string",
      "type"?: "content_uploading",
      "state"?: "enum(pending, failure, success)",
      "retry_after"?: "integer",
      "result"?: "UploadContent202DataResult",
      "error"?: "string",
      "error_description"?: "string"
    }

    // UploadContent202DataResult
    {
      "cid"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UploadContent202Response {
      data?: UploadContent202Data;
      status?: 202;
    }

    interface UploadContent202Data {
      id?: string;
      type?: 'content_uploading';
      state?: 'pending' | 'failure' | 'success';
      retry_after?: number;
      result?: UploadContent202DataResult;
      error?: string;
      error_description?: string;
    }

    interface UploadContent202DataResult {
      cid?: string;
    }
    ```

=== "Go"

    ```go
    type UploadContent202Response struct {
    	Data UploadContent202Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type UploadContent202Data struct {
    	Id *string `json:"id,omitempty"`
    	Type *string `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	RetryAfter *int `json:"retry_after,omitempty"`
    	Result UploadContent202DataResult `json:"result,omitempty"`
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    }

    type UploadContent202DataResult struct {
    	Cid *string `json:"cid,omitempty"`
    }
    ```

### `POST /content/{id}/republished` — Republish Content  {: #op-republishcontent }

Republish the content to your account.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Republished

=== "JSON"

    ```json
    // RepublishContent200Response
    {
      "data"?: "RepublishContent200Data",
      "status"?: "200"
    }

    // RepublishContent200Data
    {
      "id"?: "string",
      "num_republished"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RepublishContent200Response {
      data?: RepublishContent200Data;
      status?: 200;
    }

    interface RepublishContent200Data {
      id?: string;
      num_republished?: number;
    }
    ```

=== "Go"

    ```go
    type RepublishContent200Response struct {
    	Data RepublishContent200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type RepublishContent200Data struct {
    	Id *string `json:"id,omitempty"`
    	NumRepublished *int `json:"num_republished,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // RepublishContent404Response
    "RepublishContent404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type RepublishContent404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type RepublishContent404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `DELETE /content/{id}/republished` — Delete Republish  {: #op-deleterepublish }

If the client has republished the content, this will remove it.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Un-republished

=== "JSON"

    ```json
    // DeleteRepublish200Response
    {
      "data"?: "DeleteRepublish200Data"
    }

    // DeleteRepublish200Data
    {
      "num_republished"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface DeleteRepublish200Response {
      data?: DeleteRepublish200Data;
    }

    interface DeleteRepublish200Data {
      num_republished?: number;
    }
    ```

=== "Go"

    ```go
    type DeleteRepublish200Response struct {
    	Data DeleteRepublish200Data `json:"data,omitempty"`
    }

    type DeleteRepublish200Data struct {
    	NumRepublished *int `json:"num_republished,omitempty"`
    }
    ```

### `PUT /content/{id}/smiles` — Smile Content  {: #op-smilecontent }

Smiles (likes) the content.

- Using a Bearer will increase `smiles` in Content Nums.
- Using a Basic will increase `guest_smiles` in Content Nums.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Content Smiles

=== "JSON"

    ```json
    // SmileContent200Response
    "SmileContent200Response": "SmileCountsResponse"

    // SmileCountsResponse
    {
      "data"?: "SmileCountsResponseData",
      "status"?: "200"
    }

    // SmileCountsResponseData
    {
      "num_smiles"?: "integer",
      "num_unsmiles"?: "integer",
      "num_guest_smiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type SmileContent200Response = SmileCountsResponse;

    interface SmileCountsResponse {
      data?: SmileCountsResponseData;
      status?: 200;
    }

    interface SmileCountsResponseData {
      num_smiles?: number;
      num_unsmiles?: number;
      num_guest_smiles?: number;
    }
    ```

=== "Go"

    ```go
    type SmileContent200Response SmileCountsResponse

    type SmileCountsResponse struct {
    	Data SmileCountsResponseData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SmileCountsResponseData struct {
    	NumSmiles *int `json:"num_smiles,omitempty"`
    	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
    	NumGuestSmiles *int `json:"num_guest_smiles,omitempty"`
    }
    ```

### `DELETE /content/{id}/smiles` — Remove Content Smile  {: #op-removecontentsmile }

Remove the Client's smile on the content.
**NOT** the same as unsmiling the content.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `from` | `String` | no | A "Seen" From Tag |

=== "JSON"

    ```json
    // RemoveContentSmileQuery
    {
      "from"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RemoveContentSmileQuery {
      from?: string;
    }
    ```

=== "Go"

    ```go
    type RemoveContentSmileQuery struct {
    	From *string `query:"from,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Content Smiles

=== "JSON"

    ```json
    // RemoveContentSmile200Response
    "RemoveContentSmile200Response": "SmileCountsResponse"

    // SmileCountsResponse
    {
      "data"?: "SmileCountsResponseData",
      "status"?: "200"
    }

    // SmileCountsResponseData
    {
      "num_smiles"?: "integer",
      "num_unsmiles"?: "integer",
      "num_guest_smiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type RemoveContentSmile200Response = SmileCountsResponse;

    interface SmileCountsResponse {
      data?: SmileCountsResponseData;
      status?: 200;
    }

    interface SmileCountsResponseData {
      num_smiles?: number;
      num_unsmiles?: number;
      num_guest_smiles?: number;
    }
    ```

=== "Go"

    ```go
    type RemoveContentSmile200Response SmileCountsResponse

    type SmileCountsResponse struct {
    	Data SmileCountsResponseData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SmileCountsResponseData struct {
    	NumSmiles *int `json:"num_smiles,omitempty"`
    	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
    	NumGuestSmiles *int `json:"num_guest_smiles,omitempty"`
    }
    ```

### `PUT /content/{id}/unsmiles` — Unsmile Content  {: #op-unsmilecontent }

Unsmiles (dislikes) a content.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `from` | `String` | no | A "Seen" From Tag |

=== "JSON"

    ```json
    // UnsmileContentQuery
    {
      "from"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnsmileContentQuery {
      from?: string;
    }
    ```

=== "Go"

    ```go
    type UnsmileContentQuery struct {
    	From *string `query:"from,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Content Smiles

=== "JSON"

    ```json
    // UnsmileContent200Response
    "UnsmileContent200Response": "SmileCountsResponse"

    // SmileCountsResponse
    {
      "data"?: "SmileCountsResponseData",
      "status"?: "200"
    }

    // SmileCountsResponseData
    {
      "num_smiles"?: "integer",
      "num_unsmiles"?: "integer",
      "num_guest_smiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type UnsmileContent200Response = SmileCountsResponse;

    interface SmileCountsResponse {
      data?: SmileCountsResponseData;
      status?: 200;
    }

    interface SmileCountsResponseData {
      num_smiles?: number;
      num_unsmiles?: number;
      num_guest_smiles?: number;
    }
    ```

=== "Go"

    ```go
    type UnsmileContent200Response SmileCountsResponse

    type SmileCountsResponse struct {
    	Data SmileCountsResponseData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SmileCountsResponseData struct {
    	NumSmiles *int `json:"num_smiles,omitempty"`
    	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
    	NumGuestSmiles *int `json:"num_guest_smiles,omitempty"`
    }
    ```

### `DELETE /content/{id}/unsmiles` — Remove Content Unsmile  {: #op-removecontentunsmile }

Removes the Client's Unsmile from the Content.
**NOT** the same as smiling the Content.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Content Smiles

=== "JSON"

    ```json
    // RemoveContentUnsmile200Response
    "RemoveContentUnsmile200Response": "SmileCountsResponse"

    // SmileCountsResponse
    {
      "data"?: "SmileCountsResponseData",
      "status"?: "200"
    }

    // SmileCountsResponseData
    {
      "num_smiles"?: "integer",
      "num_unsmiles"?: "integer",
      "num_guest_smiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type RemoveContentUnsmile200Response = SmileCountsResponse;

    interface SmileCountsResponse {
      data?: SmileCountsResponseData;
      status?: 200;
    }

    interface SmileCountsResponseData {
      num_smiles?: number;
      num_unsmiles?: number;
      num_guest_smiles?: number;
    }
    ```

=== "Go"

    ```go
    type RemoveContentUnsmile200Response SmileCountsResponse

    type SmileCountsResponse struct {
    	Data SmileCountsResponseData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SmileCountsResponseData struct {
    	NumSmiles *int `json:"num_smiles,omitempty"`
    	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
    	NumGuestSmiles *int `json:"num_guest_smiles,omitempty"`
    }
    ```

### `PUT /content/{id}/categories` — Add Content Categories  {: #op-addcontentcategories }

Add categories to the content.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `categories[]` | `String[]` | yes | Category IDs you want to apply to the content |

=== "JSON"

    ```json
    // AddContentCategoriesRequest
    {
      "categories[]": "string[]"
    }
    ```

=== "TypeScript"

    ```typescript
    interface AddContentCategoriesRequest {
      'categories[]': string[];
    }
    ```

=== "Go"

    ```go
    type AddContentCategoriesRequest struct {
    	Categories []string `json:"categories[]"`
    }
    ```

#### Responses

##### `200 OK` — Categories Added

=== "JSON"

    ```json
    // AddContentCategories200Response
    {
      "status"?: "200"
    }
    ```

=== "TypeScript"

    ```typescript
    interface AddContentCategories200Response {
      status?: 200;
    }
    ```

=== "Go"

    ```go
    type AddContentCategories200Response struct {
    	Status *int `json:"status,omitempty"`
    }
    ```

### `GET /channels` — Get Channels  {: #op-getchannels }

Fetch all available channels.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Responses

##### `200 OK` — Channels

=== "JSON"

    ```json
    // GetChannels200Response
    {
      "data"?: "GetChannels200Data",
      "status"?: "200"
    }

    // GetChannels200Data
    {
      "channels"?: "GetChannels200DataChannels"
    }

    // GetChannels200DataChannels
    {
      "items"?: "Channel[]"
    }

    // Channel
    {
      "id"?: "string",
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetChannels200Response {
      data?: GetChannels200Data;
      status?: 200;
    }

    interface GetChannels200Data {
      channels?: GetChannels200DataChannels;
    }

    interface GetChannels200DataChannels {
      items?: Channel[];
    }

    interface Channel {
      id?: string;
      title?: string;
    }
    ```

=== "Go"

    ```go
    type GetChannels200Response struct {
    	Data GetChannels200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetChannels200Data struct {
    	Channels GetChannels200DataChannels `json:"channels,omitempty"`
    }

    type GetChannels200DataChannels struct {
    	Items []Channel `json:"items,omitempty"`
    }

    type Channel struct {
    	Id *string `json:"id,omitempty"`
    	Title *string `json:"title,omitempty"`
    }
    ```

### `GET /channels/{id}/items` — Get Channel Items  {: #op-getchannelitems }

Paginate through content in a channel.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes | ID of the channel |

#### Responses

##### `200 OK` — Channel Content

=== "JSON"

    ```json
    // GetChannelItems200Response
    {
      "data"?: "GetChannelItems200Data",
      "status"?: "200"
    }

    // GetChannelItems200Data
    {
      "content"?: "GetChannelItems200DataContent"
    }

    // GetChannelItems200DataContent
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

=== "TypeScript"

    ```typescript
    interface GetChannelItems200Response {
      data?: GetChannelItems200Data;
      status?: 200;
    }

    interface GetChannelItems200Data {
      content?: GetChannelItems200DataContent;
    }

    interface GetChannelItems200DataContent {
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

=== "Go"

    ```go
    type GetChannelItems200Response struct {
    	Data GetChannelItems200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetChannelItems200Data struct {
    	Content GetChannelItems200DataContent `json:"content,omitempty"`
    }

    type GetChannelItems200DataContent struct {
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

##### `400 Bad Request` — Bad Request

=== "JSON"

    ```json
    // GetChannelItems400Response
    "GetChannelItems400Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetChannelItems400Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetChannelItems400Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // GetChannelItems404Response
    "GetChannelItems404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetChannelItems404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetChannelItems404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `GET /tags/suggested` — Search Tags  {: #op-searchtags }

Search tags suggested by iFunny.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `q` | `String` | yes | Query |

=== "JSON"

    ```json
    // SearchTagsQuery
    {
      "q": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchTagsQuery {
      q: string;
    }
    ```

=== "Go"

    ```go
    type SearchTagsQuery struct {
    	Q string `query:"q"`
    }
    ```

#### Responses

##### `200 OK` — Suggested Tags

=== "JSON"

    ```json
    // SearchTags200Response
    {
      "data"?: "SearchTags200Data",
      "status"?: "200"
    }

    // SearchTags200Data
    {
      "tags"?: "SearchTags200DataTags"
    }

    // SearchTags200DataTags
    {
      "items"?: "Tag[]"
    }

    // Tag
    {
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchTags200Response {
      data?: SearchTags200Data;
      status?: 200;
    }

    interface SearchTags200Data {
      tags?: SearchTags200DataTags;
    }

    interface SearchTags200DataTags {
      items?: Tag[];
    }

    interface Tag {
      title?: string;
    }
    ```

=== "Go"

    ```go
    type SearchTags200Response struct {
    	Data SearchTags200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SearchTags200Data struct {
    	Tags SearchTags200DataTags `json:"tags,omitempty"`
    }

    type SearchTags200DataTags struct {
    	Items []Tag `json:"items,omitempty"`
    }

    type Tag struct {
    	Title *string `json:"title,omitempty"`
    }
    ```

### `GET /search/content` — Search Content  {: #op-searchcontent }

Search content by tag.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `tag` | `String` | yes | Tag to search for |

=== "JSON"

    ```json
    // SearchContentQuery
    {
      "tag": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchContentQuery {
      tag: string;
    }
    ```

=== "Go"

    ```go
    type SearchContentQuery struct {
    	Tag string `query:"tag"`
    }
    ```

#### Responses

##### `200 OK` — Content Pagination

=== "JSON"

    ```json
    // SearchContent200Response
    {
      "data"?: "SearchContent200Data",
      "status"?: "200"
    }

    // SearchContent200Data
    {
      "content"?: "SearchContent200DataContent",
      "num"?: "any[]"
    }

    // SearchContent200DataContent
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

=== "TypeScript"

    ```typescript
    interface SearchContent200Response {
      data?: SearchContent200Data;
      status?: 200;
    }

    interface SearchContent200Data {
      content?: SearchContent200DataContent;
      num?: unknown[];
    }

    interface SearchContent200DataContent {
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

=== "Go"

    ```go
    type SearchContent200Response struct {
    	Data SearchContent200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SearchContent200Data struct {
    	Content SearchContent200DataContent `json:"content,omitempty"`
    	Num []interface{} `json:"num,omitempty"`
    }

    type SearchContent200DataContent struct {
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

### `PUT /content/{id}/tags` — Modify Content Tags  {: #op-modifycontenttags }

Replace the set of tags on a post owned by the client.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `tags` | `String[]` | yes | New tag list. Replaces existing tags. |

=== "JSON"

    ```json
    // ModifyContentTagsRequest
    {
      "tags": "string[]"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ModifyContentTagsRequest {
      tags: string[];
    }
    ```

=== "Go"

    ```go
    type ModifyContentTagsRequest struct {
    	Tags []string `json:"tags"`
    }
    ```

#### Responses

##### `200 OK` — Tags updated

No response body.

##### `403 Forbidden` — Forbidden (not content owner)

=== "JSON"

    ```json
    // ModifyContentTags403Response
    "ModifyContentTags403Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type ModifyContentTags403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ModifyContentTags403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // ModifyContentTags404Response
    "ModifyContentTags404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type ModifyContentTags404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ModifyContentTags404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `PUT /content/{id}/pinned` — Pin Content  {: #op-pincontent }

Pin the post to the top of the client's profile timeline.
Client must be the author.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Pinned

No response body.

##### `403 Forbidden` — Forbidden (not content owner)

=== "JSON"

    ```json
    // PinContent403Response
    "PinContent403Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type PinContent403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type PinContent403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // PinContent404Response
    "PinContent404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type PinContent404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type PinContent404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `DELETE /content/{id}/pinned` — Unpin Content  {: #op-unpincontent }

Remove the pin from the post.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Responses

##### `200 OK` — Unpinned

No response body.

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // UnpinContent404Response
    "UnpinContent404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type UnpinContent404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnpinContent404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `PUT /content/{id}/abuses` — Report Content  {: #op-reportcontent }

Report a post for abuse. Query parameter `type` categorizes the report.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `String` | yes |  |

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `String` | yes | Abuse category. — One of: hate, nude, spam, harm, target |

=== "JSON"

    ```json
    // ReportContentQuery
    {
      "type": "enum(hate, nude, spam, harm, target)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ReportContentQuery {
      type: 'hate' | 'nude' | 'spam' | 'harm' | 'target';
    }
    ```

=== "Go"

    ```go
    type ReportContentQuery struct {
    	Type string `query:"type"`
    }
    ```

#### Responses

##### `200 OK` — Report accepted

No response body.

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // ReportContent404Response
    "ReportContent404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type ReportContent404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ReportContent404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### `GET /timelines/users/by_nick/{nick}` — Get User Timeline by Nick  {: #op-getusertimelinebynick }

Paginated posts on a user's profile timeline, addressed by nickname.
Cursor-paginated. `/timelines/user/{id}` (root spec) is the equivalent
addressed by user id.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `nick` | `String` | yes |  |

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |
    | `next` | `String` | no |  |
    | `prev` | `String` | no |  |

=== "JSON"

    ```json
    // GetUserTimelineByNickQuery
    {
      "limit"?: "integer",
      "next"?: "string",
      "prev"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetUserTimelineByNickQuery {
      limit?: number;
      next?: string;
      prev?: string;
    }
    ```

=== "Go"

    ```go
    type GetUserTimelineByNickQuery struct {
    	Limit *int `query:"limit,omitempty"`
    	Next *string `query:"next,omitempty"`
    	Prev *string `query:"prev,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — User timeline page

=== "JSON"

    ```json
    // GetUserTimelineByNick200Response
    "GetUserTimelineByNick200Response": "FeedResponse"

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

=== "TypeScript"

    ```typescript
    type GetUserTimelineByNick200Response = FeedResponse;

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

=== "Go"

    ```go
    type GetUserTimelineByNick200Response FeedResponse

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

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // GetUserTimelineByNick404Response
    "GetUserTimelineByNick404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserTimelineByNick404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserTimelineByNick404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
