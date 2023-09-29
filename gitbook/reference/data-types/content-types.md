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
    creator?: <a data-footnote-ref href="#user-content-fn-4">ContentCreator</a>;
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
These have no been observed and are likely deprecated
{% endhint %}

* `app`
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

### Content Creator

<pre class="language-typescript"><code class="lang-typescript">{
    id: string;
    nick: string;
    photo: <a data-footnote-ref href="#user-content-fn-6">ProfilePhoto</a>;
    is_verified: boolean;
    is_banned: boolean;
    is_deleted: boolean;
    is_in_subcribers: boolean;
    is_in_subscriptions: boolean;
    is_blocked: boolean;
    nick_color: string; // Hex Code with no #
    rating: <a data-footnote-ref href="#user-content-fn-7">UserRating</a>;
</code></pre>

### Content Source

<pre class="language-typescript"><code class="lang-typescript">{
    id: string;
    date_create: number; // UNIX in Seconds
    creator?: <a data-footnote-ref href="#user-content-fn-8">ContentCreator</a>
}
</code></pre>

[^1]: [#content-type](content-types.md#content-type "mention")

[^2]: [#content-thumbnail](content-types.md#content-thumbnail "mention")

[^3]: [#content-nums](content-types.md#content-nums "mention")

[^4]: [#content-creator](content-types.md#content-creator "mention")

[^5]: [#content-source](content-types.md#content-source "mention")

[^6]: [#profile-photo](user-types.md#profile-photo "mention")

[^7]: [#user-rating](user-types.md#user-rating "mention")

[^8]: [#content-creator](content-types.md#content-creator "mention")
