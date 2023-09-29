---
description: A collection of data types relevant to Users on iFunny
---

# 🎭 User Types

## User

<pre class="language-typescript"><code class="lang-typescript">{
    about: string;
    are_you_blocked: boolean;
    bans: <a data-footnote-ref href="#user-content-fn-1">SmallBan</a>[];
    cover_bg_color: string; // "2d2214";
    cover_url: string; // `https://img.ifunny.co/user_covers/${cover_id}.webp`;
    id: string: // "3a5b7c86d4e9f21b2d56e0cf";
    is_available_for_chat: boolean;
    is_banned: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    is_in_subscribers: boolean;
    is_in_subscriptions: boolean;
    is_private: boolean;
    is_subscribed_to_updates: boolean;
    is_verified: boolean;
    meme_experience: <a data-footnote-ref href="#user-content-fn-2">MemeExperience</a>;
    messaging_privacy_status: "closed" | "public" | "subscribers"; // This is only checked client side
    messenger_active: boolean;
    messenger_token: string; // "1010101010101010101010101010101010101010";
    nick_color: string; // "55FF00";
    nick: string;
    num: <a data-footnote-ref href="#user-content-fn-3">UserNums</a>;
    original_nick: string; // Different if the user's name is against content policy
    photo: <a data-footnote-ref href="#user-content-fn-4">ProfilePhoto</a>;
    rating: <a data-footnote-ref href="#user-content-fn-5">UserRating</a>;
    web_url: string; // `https://ifunny.co/user/${nick}`;
}
</code></pre>

### Meme Experience

<pre class="language-typescript"><code class="lang-typescript">{
    badge_size: {
        h: number;
        w: number;
    };
    badge_url: string; // `https://img.ifunny.co/meme_experience/${index}.png`
    days: number;
    next_milestone: number;
    rank: string; // <a data-footnote-ref href="#user-content-fn-6">MemeRank</a>
}
</code></pre>

### Meme Rank (days)

1. Meme explorer (1-4)
2. Meme bro (5-24)
3. Meme daddy (25-49)
4. Dank memer (50-99)
5. Meme master baker (100-199)
6. Deep fried memer (200-299)
7. Saucy memer (300-499)
8. Original Meme Gangster (500-665)
9. Meme demon (666-910)
10. Steal beams of memes (911-999)
11. Meme dealer (1000-1499)
12. iFunny Veteran (1500-1999)
13. Chef's meme agent (2000+)

### Profile Photo

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

### Small Ban

```typescript
{
    date_until: number, // Seconds since unix epoch
    id: string, 
    type: string;
}
```

### User Nums

```typescript
{
    achievements: number;
    created: number;
    featured: number;
    subscribers: number;
    subscriptions: number;
    total_posts: number;
    total_smiles: number;
}
```

### User Rating

```typescript
{
    points: number;
    current_level: {
    	id: string;
	value: number;
	points: number;
    };
    next_level: {
    	id: string;
	value: number;
	points: number;
    };
    // Max always has the same values
    max_level: {
    	id: string;
	value: number;
	points: number;
    };
    is_show_level: boolean;
}
```

[^1]: [#small-ban](user-types.md#small-ban "mention")

[^2]: [#meme-experience](user-types.md#meme-experience "mention")

[^3]: [#user-nums](user-types.md#user-nums "mention")

[^4]: [#profile-photo](user-types.md#profile-photo "mention")

[^5]: [#user-rating](user-types.md#user-rating "mention")

[^6]: [#meme-rank](user-types.md#meme-rank "mention")
