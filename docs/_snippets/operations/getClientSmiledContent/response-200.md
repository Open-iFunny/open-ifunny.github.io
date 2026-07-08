=== "JSON"

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

=== "TypeScript"

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

=== "Go"

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
