---
description: A collection of data types relevant to Users on iFunny
---

# 🎭 User Information

## User

<pre class="language-typescript"><code class="lang-typescript">{
    is_subscribed_to_updates: boolean;
    meme_experience: <a data-footnote-ref href="#user-content-fn-1">MemeExperience</a>;
    messaging_privacy_status: string; // "closed" | "public" | "subscribers";
    is_available_for_chat: boolean;
    is_private: boolean;
    messenger_token: string; // "1010101010101010101010101010101010101010";
    messenger_active: boolean;
    bans: <a data-footnote-ref href="#user-content-fn-2">SmallBan</a>[];
    photo: <a data-footnote-ref href="#user-content-fn-3">ProfilePhoto</a>;
    web_url: string; // `https://ifunny.co/user/${nick}`;
    is_blocked: boolean;
    are_you_blocked: boolean;
    about: string;
    cover_url: string; // `https://img.ifunny.co/user_covers/${cover_id}.webp`;
    cover_bg_color: string; // "2d2214";
    id: string: // "3a5b7c86d4e9f21b2d56e0cf";
    nick: string;
    is_verified: boolean;
    is_banned: boolean;
    is_deleted: boolean;
    is_in_subscriptions: boolean;
    is_in_subscribers: boolean;
    num: <a data-footnote-ref href="#user-content-fn-4">UserNums</a>;
    nick_color: string; // "55FF00";
    rating: Rating;
    original_nick: string; // If the user's name is against content policy
}
</code></pre>

## Meme Experience

```typescript
{
    days: number;
    rank: string; // MemeRank
    badge_url: string; // `https://img.ifunny.co/meme_experience/${index}.png`
    badge_size: {
        w: number;
        h: number;
    };
    next_milestone: number;
}
```

## Meme Rank

* Meme explorer (1-4)
* Meme bro (5-24)
* Meme daddy (25-49)
* Dank memer (50-99)
* Meme master baker (100-199)
* Deep fried memer (200-299)
* Saucy memer (300-499)
* Original Meme Gangster (500-665)
* Meme demon (666-910)
* Steal beams of memes (911-999)
* Meme dealer (1000-1499)
* iFunny Veteran (1500-1999)
* Chef's meme agent (2000+)

## Profile Photo

```typescript
{
    bg_color: string; // "597aa7"
    thumb: {
        large_url: string;
        medium_url: string;
        small_url: string;
    };
    url: string;
}
```

## Small Ban

```typescript
{
    id: string,
    date_until: number, // Seconds since unix epoch
    type: string;
}
```

## User Nums

```typescript
{
    subscriptions: number;
    subscribers: number;
    total_posts: number;
    created: number;
    featured: number;
    total_smiles: number;
    achievements: number;
}
```

[^1]: [#meme-experience](user-information.md#meme-experience "mention")

[^2]: [#small-ban](user-information.md#small-ban "mention")

[^3]: [#profile-photo](user-information.md#profile-photo "mention")

[^4]: [#user-nums](user-information.md#user-nums "mention")
