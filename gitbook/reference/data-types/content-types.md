---
description: Collection of data types returned by the iFunny API
---

# 🤣 Content Types

## Content

<pre class="language-typescript"><code class="lang-typescript">{
    /// Data fields

    // Shows up on "pic"
    pic?: {
        webp_url: string;
    };
    // Shows up on "caption"
    caption?: {
        caption_text: string;
    };
    // Shows up on "comics"
    comics?: {
        webp_url: string;
    };
    // Shows up on "mem"
    mem?: {
        webp_url: string;
    };
    // Shows up on "video_clip"
    video_clip: {
        screen_url: string;
        bytes: number;
        source_type: "user" | "instagram"; // There may be more
        logo_url?: string;
        duration: number; // In seconds
    };
    // Shows up on "video"
    video?: {
        url: string;
        duration: number; // In seconds
        lengh: number; // In seconds
    };
    // Shows up on "vine"
    vine?: {
        screen_url: string;
        bytes: number
    };
    // Shows up on "coub"
    coub?: {
        screen_url: string;
        bytes: number;
        traceback_url: string; // Source on coub.com
        duration: number; // In seconds
    };
    // Shows up on "gif" |  "gif_caption"
    gif?: {
        caption?: string; // Only appears on `gif_caption`
        screen_url: string;
        bytes: string;
        mp4_url: string;
        mp4_bytes: number;
        webm_url?: string;
        webm_url?: number;
    };
    // Shows on "app"
    app?: {
        url: string;
        is_scroll_allowed: boolean;
    }

    // Standard fields
    id: string; // "2hu2ab8J";
    type: C<a data-footnote-ref href="#user-content-fn-1">ontentType</a>;
    url: string; // jpg
    share_url?: string;
    old_watermark: boolean; 
    link: string; // Opens in app
    title: string;
    fixed_title?: string;
    description?: string;
    tags: string[];
    state: "delayed" | "deleted" | "draft" | "published";
    date_create: number; // UNIX in Seconds
    publish_at: number; // Unix in Seconds
    is_smiled: boolean;
    is_unsmiled: boolean;
    is_abused: boolean;
    is_featured: boolean;
    is_republished: boolean;
    is_pinned: boolean;
    bg_color: string; // Hex Code without #
    thumb: <a data-footnote-ref href="#user-content-fn-2">ContentThumbnail</a>;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: <a data-footnote-ref href="#user-content-fn-3">ContentNums</a>;
    creator?: <a data-footnote-ref href="#user-content-fn-4">User</a>;
    size: {
        w: number;
        h: number;
    };
    issue_at?: number; // UNIX in Seconds
    traceback_url?: string; // Only observed on coub types
    engagement_rate?: string; // Not observed
    engagement_rate_explain?: string; // Not observed
    visibility: "public" | "subcribers" | "closed" | "chats";
    shot_status: "approved" | "shot" | "hardShot";
    fast_start: boolean;
    subtitle?: {
        lang: string; // en-US
        url: string; // ends in .srt or .vtt
    };
    risk: number; 
    canonical_url: string;
    ocr_text?: string;
    can_be_boosted: boolean;
    lat?: number;
    lon?: number;
    has_header?: boolean; // Only observed on videos and gifs
    source?: <a data-footnote-ref href="#user-content-fn-5">ContentSource</a>;
    ftag?: string; // Only observed as "feat"
}
</code></pre>

### Content Type

#### Images

* `pic`
* `mem`
* `comics`
* `caption`

#### Videos

* `video_clip`
* `video`
* `vine`
* `coub`

#### Gif

* `gif`
* `gif_caption`

#### Unknown

{% hint style="warning" %}
These have not been observed and are likely deprecated
{% endhint %}

* `app` - Deprecated
* `old`
* `dem`
* `special`

### Content Thumbnail

```typescript
{
    small_url: string;
    url: string; // This will be the url without the watermark
    large_url: string;
    x640_url: string;
    webp_url: string;
    large_webp_url: string;
    x640_webp_url: string;
    proportional_url: string;
    proportional_webp_url: string;
    proportional_size: {
        w: number;
        h: number;
    };
}
```

### Content Nums

```typescript
{
    smiles: number;
    unsmiles: number;
    guest_smiles: number; // Smiled with Basic Token
    comments: number;
    views: number;
    republished: number;
    shares: number;
}
```

### Content State

* `delayed` - Content was scheduled to be published later
* `deleted` - Content was deleted
* `draft` - Content is a draft that hasn't been published yet
* `published` - Content has been published

### Content Source

<pre class="language-typescript"><code class="lang-typescript">{
    id: string;
    date_create: number; // UNIX in Seconds
    creator?: <a data-footnote-ref href="#user-content-fn-6">User</a>;
}
</code></pre>

## Comment

{% tabs %}
{% tab title="Comment" %}
<pre class="language-typescript"><code class="lang-typescript">{
    is_reply: false;
    id: string; // Id of the comment
    cid: string; // Id of the content it belongs to
    state?: <a data-footnote-ref href="#user-content-fn-7">CommentState</a>;
    date: number; // UNIX in Seconds
    text: string; // Can be empty string
    num: <a data-footnote-ref href="#user-content-fn-8">CommentNum</a>;
    is_smiled: boolean;
    is_unsmiled: boolean;
    is_edited: boolean;
    user?: <a data-footnote-ref href="#user-content-fn-9">User</a>;
    deletion_reason?: <a data-footnote-ref href="#user-content-fn-10">CommentDeletionReason</a>;
    content?: <a data-footnote-ref href="#user-content-fn-11">Content</a>;
    attachments: <a data-footnote-ref href="#user-content-fn-12">Attachments</a>[];
    content_thumbs?: <a data-footnote-ref href="#user-content-fn-13">ContentThumbnail</a>;
    last_reply?: <a data-footnote-ref href="#user-content-fn-14">Reply</a>;
}
</code></pre>
{% endtab %}

{% tab title="Reply" %}
<pre class="language-typescript"><code class="lang-typescript">{
    is_reply: true;
    id: string; // Id of the comment
    cid: string; // Id of the content it belongs to
    state?: <a data-footnote-ref href="#user-content-fn-15">CommentState</a>;
    date: number; // UNIX in Seconds
    text: string; // Can be empty string
    num: <a data-footnote-ref href="#user-content-fn-16">CommentNum</a>;
    is_smiled: boolean;
    is_unsmiled: boolean;
    is_edited: boolean;
    user?: <a data-footnote-ref href="#user-content-fn-17">Creator</a>;
    deletion_reason?: <a data-footnote-ref href="#user-content-fn-18">CommentDeletionReason</a>;
    content?: <a data-footnote-ref href="#user-content-fn-19">Content</a>;
    attachments: <a data-footnote-ref href="#user-content-fn-20">Attachments</a>;
    content_thumbs?: <a data-footnote-ref href="#user-content-fn-21">ContentThumbnail</a>;
    last_reply?: <a data-footnote-ref href="#user-content-fn-22">Reply</a>;
    root_comm_id: string; // ID of the root comment in the thread
    parent_comm_id: string; // ID of the comment this comment is replying to
    depth: number; // What index this is in the comment thread
}
</code></pre>
{% endtab %}
{% endtabs %}

### Comment State

* `normal` - Typical Comment
* `top` - Top comment
* `abused` - Comment was marked as "abusive"
* `deleted` - Comment was deleted
* `deleted_self` - Comment author deleted it

### Comment Nums

```typescript
{
    smiles: number;
    unsmiles: number;
    replies: number;
}
```

### Comment Attachment

<pre class="language-typescript"><code class="lang-typescript">{
    content: <a data-footnote-ref href="#user-content-fn-23">Content</a>[];
    content_from_links: <a data-footnote-ref href="#user-content-fn-24">Content</a>[];
    mention_user: <a data-footnote-ref href="#user-content-fn-25">UserMention</a>[];
    giphy: <a data-footnote-ref href="#user-content-fn-26">Content</a>[];
}
</code></pre>

### User Mention

<pre class="language-typescript"><code class="lang-typescript">{
    id: string;
    creator: <a data-footnote-ref href="#user-content-fn-27">User</a>;
    nick: string;
    start_index: number; // Where the username starts in the text
    stop_index: number; // Where the username ends in the text
    user_id: string;
    original_nick: string;
}
</code></pre>

### Comment Deletion Reason

* `del_by_spam_filter` - Automatically deleted by the spam filter
* `del_content` - The content the comment was attached to has been deleted
* `del_content_creator` - The content creator deleted the content
* `del_for_abuses` - Deleted due to containing abusive material, typically slurs
* `del_root_comment` - The root comment of this comment was deleted
* `del_via_portal` - The comment was deleted via admin portal

[^1]: [#content-type](content-types.md#content-type "mention")

[^2]: [#content-thumbnail](content-types.md#content-thumbnail "mention")

[^3]: [#content-nums](content-types.md#content-nums "mention")

[^4]: [#user](user-types.md#user "mention")

[^5]: [#content-source](content-types.md#content-source "mention")

[^6]: [#user](user-types.md#user "mention")

[^7]: [#comment-state](content-types.md#comment-state "mention")&#x20;

[^8]: [#comment-nums](content-types.md#comment-nums "mention")

[^9]: [#user](user-types.md#user "mention")

[^10]: [#comment-deletion-reason](content-types.md#comment-deletion-reason "mention")

[^11]: [#content](content-types.md#content "mention")

[^12]: [#comment-attachment](content-types.md#comment-attachment "mention")

[^13]: [#content-thumbnail](content-types.md#content-thumbnail "mention")

[^14]: [#reply](content-types.md#reply "mention")

[^15]: [#comment-state](content-types.md#comment-state "mention")

[^16]: [#comment-nums](content-types.md#comment-nums "mention")

[^17]: [#creator](content-types.md#creator "mention")

[^18]: [#comment-deletion-reason](content-types.md#comment-deletion-reason "mention")

[^19]: [#content](content-types.md#content "mention")

[^20]: [#comment-attachment](content-types.md#comment-attachment "mention")

[^21]: [#content-thumbnail](content-types.md#content-thumbnail "mention")

[^22]: [#reply](content-types.md#reply "mention")

[^23]: [#content](content-types.md#content "mention")

[^24]: [#content](content-types.md#content "mention")

[^25]: [#user-mention](content-types.md#user-mention "mention")

[^26]: [#content](content-types.md#content "mention")

[^27]: [#user](user-types.md#user "mention")
