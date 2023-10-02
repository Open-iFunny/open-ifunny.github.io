---
description: Collection of data structures related to the Client
---

# 🤖 Client Types

## Account Information

<pre class="language-typescript"><code class="lang-typescript">{
    about: string; // Can be empty
    id: string;
    bans: <a data-footnote-ref href="#user-content-fn-1">SmallBan</a>[];
    birth_date?: string; // "YYYY-MM-DD"
    email: string;
    meme_experience: <a data-footnote-ref href="#user-content-fn-2">MemeExperience</a>;
    nick: string;
    nick_color?: string;
    num: <a data-footnote-ref href="#user-content-fn-3">UserProfileNums</a>;
    original_nick: string; // Different if it violates iFunny content policy
    sex: "male" | "female" | "other"
    web_url: string; // `https://ifunny.co/user/${nick}`;
    
    
    is_available_for_chat: boolean;
    is_banned: boolean;
    is_blocked_in_messenger: boolean;
    is_deleted: boolean;
    is_ifunny_team_member: boolean;
    is_moderator: boolean;
    is_private: boolean;
    is_verified: boolean;

    have_unnotified_achievements: boolean;
    have_unnotified_bans: boolean;
    have_unnotified_levels: boolean;
    have_unnotified_strikes: boolean;
    
    messaging_privacy_status: "public" | "subscribers" | "closed"; // only checked client side
    messenger_active: boolean;
    messenger_token: string; // "1010101010101010101010101010101010101010";
    need_account_setup: boolean;
    safe_mode: boolean;

    cover_bg_color: string; // "3919de";
    cover_url: string;
    photo?: <a data-footnote-ref href="#user-content-fn-4">ProfilePhoto</a>;

    phone_data?: <a data-footnote-ref href="#user-content-fn-5">ClientPhoneData</a>;
    phone?: string;
    unconfirmed_phone_data?: <a data-footnote-ref href="#user-content-fn-6">ClientPhoneData</a>;
    unconfirmed_phone?: string;
    location: string; // Can be empty
    hometown: string; // Can be empty
}
</code></pre>

### Client Phone Data

```typescript
{
    code: string;
    number: string;
}
```

## Client Ban

<pre class="language-typescript"><code class="lang-typescript">{
    date_until: number; // Unix in seconds
    id: string;
    type: <a data-footnote-ref href="#user-content-fn-7">BanType</a>;
    ban_reason: BanReason;
    created_at: number; // Unix in seconds
    pid: number;
    is_appealed: boolean;
    can_be_appealed: boolean;
    was_shown: boolean;
    is_active: boolean;
    is_shortable: boolean;
    related_content?: Content;
    related_comment?: APIComment;
    date_until_minimum?: number; // Unix in seconds // Not observed
    type_message?: string;
    ban_reason_message?: string;
}
</code></pre>

### Ban Type

* `chat_access` - Client is banned from accessing chat functionality.
* `comment_creation` - Client is banned from creating comments
* `content_creation` - Client is banned from creating content
* `profile_access` - Client is banned from accessing profiles
* `repubing` - Client is banned from republishing content
* `smiling` - Client is banned from smiling content
* `subscribing` - Client is banned from subscribing to users
* `other` - Other unspecified ban types.
* `collective_shadow` - Client can upload but content won't be shared with the Collective

### Ban Reason

* `abuse_harassment` - Ban due to abuse or harassment
* `child_pornography` - Ban due to child pornography
* `hardcore` - Ban due to hardcore content
* `hate_speech` - Ban due to hate speech
* `bot_spam` - Ban due to spam from bots
* `threats_of_harm` - Ban due to threats of harm
* `death_gore` - Ban related to death and gore content
* `other` - Other unspecified ban types

## Appeal

<pre class="language-typescript"><code class="lang-typescript">{
    ban_id?: string;
    ban_reason: <a data-footnote-ref href="#user-content-fn-8">BanReason</a>; // Reason for strikes as well
    created_at: number; // UNIX in Seconds
    id: string;
    status: "pending" | "denied";
    strike_id?: string;
    type: "ban" | "strike";
}
</code></pre>

[^1]: [#small-ban](user-types.md#small-ban "mention")

[^2]: [#meme-experience](user-types.md#meme-experience "mention")

[^3]: [#user-profile-nums](user-types.md#user-profile-nums "mention")

[^4]: [#profile-photo](user-types.md#profile-photo "mention")

[^5]: [#client-phone-data](client-types.md#client-phone-data "mention")

[^6]: [#client-phone-data](client-types.md#client-phone-data "mention")

[^7]: [#ban-type](client-types.md#ban-type "mention")

[^8]: [#ban-reason](client-types.md#ban-reason "mention")
