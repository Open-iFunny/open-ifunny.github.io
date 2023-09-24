---
description: Collection of data types returned by the iFunny API
---

# 🤣 Content

## Picture Content

These are the known bodies of existing content types

{% tabs %}
{% tab title="Pic | Comics | Meme" %}
<pre class="language-typescript"><code class="lang-typescript">{
    pic: {
        webp_url: string;
    };
    id: string; // "2hu2ab8J";
    type: "pic" | "comics" | "mem";
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
    thumb: <a data-footnote-ref href="#user-content-fn-1">ContentThumbnail</a>;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: <a data-footnote-ref href="#user-content-fn-2">ContentNums</a>;
    creator?: <a data-footnote-ref href="#user-content-fn-3">ContentCreator</a>;
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
    source?: <a data-footnote-ref href="#user-content-fn-4">ContentSource</a>;
    ftag?: string; // Only observed as "feat"
}
</code></pre>
{% endtab %}

{% tab title="Gif | Gif Caption" %}
```typescript
{
    gif: {
        caption?: string; // Only appears on `gif_caption`
        screen_url: string;
        bytes: string;
        mp4_url: string;
        mp4_bytes: number;
        webm_url?: string;
        webm_url?: number;
    };
    id: string; // "2hu2ab8J";
    type: "gif" | "gif_caption";
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
    thumb: ContentThumbnail;
    copyright?: {
        note?: string;
        url?: string;
    };
    num: ContentNums;
    creator?: ContentCreator;
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
    source?: ContentSource;
    ftag?: string; // Only observed as "feat"
}
```
{% endtab %}

{% tab title="Caption" %}
```typescript
{
    caption: {
        caption_text: string;
    };
    id: string; // "2hu2ab8J";
    type: "caption";
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
    thumb: ContentThumbnail;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: ContentNums;
    creator?: ContentCreator;
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
    source?: ContentSource;
    ftag?: string; // Only observed as "feat"
}
```
{% endtab %}
{% endtabs %}

## Video Content

{% tabs %}
{% tab title="Video Clip" %}
<pre class="language-typescript"><code class="lang-typescript">{
    video_clip: {
        screen_url: string;
        bytes: number;
        source_type: "user" | "instagram"; // There may be more
        logo_url?: string;
        duration: number; // In seconds
    };
    id: string; // "2hu2ab8J";
    type: "video_clip";
    url: string;
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
    thumb: <a data-footnote-ref href="#user-content-fn-5">ContentThumbnail</a>;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: <a data-footnote-ref href="#user-content-fn-6">ContentNums</a>;
    creator?: <a data-footnote-ref href="#user-content-fn-7">ContentCreator</a>;
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
    source?: <a data-footnote-ref href="#user-content-fn-8">ContentSource</a>;
    ftag?: string; // Only observed as "feat"
}
</code></pre>
{% endtab %}

{% tab title="Video" %}
```typescript
{
    video: {
        url: string;
        duration: number; // In seconds
        lengh: number; // In seconds
    };
    id: string; // "2hu2ab8J";
    type: "video_clip";
    url: string;
    share_url?: string;
    old_watermark: boolean; 
    link: string; // Opens in app
    title: string;
    fixed_title?: string;
    description?: string;
    tags: string[];
    state: "delayed" | "deleted" | "draft" | "published";
    date_create: number; // UNIX in Seconds
    publish_at: number; // UNIX in Seconds
    is_smiled: boolean;
    is_unsmiled: boolean;
    is_abused: boolean;
    is_featured: boolean;
    is_republished: boolean;
    is_pinned: boolean;
    bg_color: string; // Hex Code without #
    thumb: ContentThumbnail;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: ContentNums;
    creator?: ContentCreator;
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
    source?: ContentSource;
    ftag?: string; // Only observed as "feat"
}
```
{% endtab %}

{% tab title="Vine" %}
```typescript
{
    vine: {
        screen_url: string;
        bytes: number
    };
    id: string; // "2hu2ab8J";
    type: "vine";
    url: string;
    share_url?: string;
    old_watermark: boolean; 
    link: string; // Opens in app
    title: string;
    fixed_title?: string;
    description?: string;
    tags: string[];
    state: "delayed" | "deleted" | "draft" | "published";
    date_create: number; // UNIX in Seconds
    publish_at: number; // UNIX in Seconds
    is_smiled: boolean;
    is_unsmiled: boolean;
    is_abused: boolean;
    is_featured: boolean;
    is_republished: boolean;
    is_pinned: boolean;
    bg_color: string; // Hex Code without #
    thumb: ContentThumbnail;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: ContentNums;
    creator?: ContentCreator;
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
    source?: ContentSource;
    ftag?: string; // Only observed as "feat"
}
```
{% endtab %}

{% tab title="Coub" %}
```typescript
{
    coub: {
        screen_url: string;
        bytes: number;
        traceback_url: string; // Source on coub.com
        duration: number; // In seconds
    };
    id: string; // "2hu2ab8J";
    type: "coub";
    url: string;
    share_url?: string;
    old_watermark: boolean; 
    link: string; // Opens in app
    title: string;
    fixed_title?: string;
    description?: string;
    tags: string[];
    state: "delayed" | "deleted" | "draft" | "published";
    date_create: number; // UNIX in Seconds
    publish_at: number; // UNIX in Seconds
    is_smiled: boolean;
    is_unsmiled: boolean;
    is_abused: boolean;
    is_featured: boolean;
    is_republished: boolean;
    is_pinned: boolean;
    bg_color: string; // Hex Code without #
    thumb: ContentThumbnail;
    // May not exist
    copyright?: {
        note?: string;
        url?: string;
    };
    num: ContentNums;
    creator?: ContentCreator;
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
    source?: ContentSource;
    ftag?: string; // Only observed as "feat"
}
```
{% endtab %}
{% endtabs %}

### Content Type

{% hint style="info" %}
Some of these have not been observed, and are likely deprecated
{% endhint %}

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
    photo: <a data-footnote-ref href="#user-content-fn-9">ProfilePhoto</a>;
    is_verified: boolean;
    is_banned: boolean;
    is_deleted: boolean;
    is_in_subcribers: boolean;
    is_in_subscriptions: boolean;
    is_blocked: boolean;
    nick_color: string; // Hex Code with no #
    rating: <a data-footnote-ref href="#user-content-fn-10">UserRating</a>;
</code></pre>

### Content Source

<pre class="language-typescript"><code class="lang-typescript">{
    id: string;
    date_create: number; // UNIX in Seconds
    creator?: <a data-footnote-ref href="#user-content-fn-11">ContentCreator</a>
}
</code></pre>

[^1]: [#content-thumbnail](content.md#content-thumbnail "mention")

[^2]: [#content-nums](content.md#content-nums "mention")

[^3]: [#content-creator](content.md#content-creator "mention")

[^4]: &#x20;

[^5]: [#content-thumbnail](content.md#content-thumbnail "mention")

[^6]: [#content-nums](content.md#content-nums "mention")

[^7]: [#content-creator](content.md#content-creator "mention")

[^8]: [#content-source](content.md#content-source "mention")

[^9]: [#profile-photo](user-information.md#profile-photo "mention")

[^10]: [#user-rating](user-information.md#user-rating "mention")

[^11]: [#content-creator](content.md#content-creator "mention")
