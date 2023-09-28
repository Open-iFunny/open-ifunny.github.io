---
description: Collection of data structures related to the Client
---

# 🤖 Client

## Account Information

```typescript
{
    about: string; // Can be empty
    bans: SmallBan[];
    cover_bg_color: string; // "3919de";
    cover_url: string;
    email: string; // "email@email.com";
    have_unnotified_achievements: boolean;
    have_unnotified_bans: boolean;
    have_unnotified_levels: boolean;
    have_unnotified_strikes: boolean;
    hometown: string; // Can be empty
    id: string; // "60b8109a6559e61ca16bc1dd";
    is_available_for_chat: boolean;
    is_banned: boolean;
    is_blocked_in_messenger: boolean;
    is_deleted: boolean;
    is_ifunny_team_member: boolean;
    is_moderator: boolean;
    is_private: boolean;
    is_verified: boolean;
    location: string; // Can be empty
    meme_experience: MemeExperience;
    messaging_privacy_status: "public" | "subscribers" | "closed"; // only checked client side
    messenger_active: boolean;
    messenger_token: string; // "1010101010101010101010101010101010101010";
    need_account_setup: boolean;
    nick_color?: string; // "#FFFFFF";
    nick: string;
    num: UserNums;
    original_nick: boolean; // Different if it violates iFunny content policy
    phone_data?: ClientPhoneData;
    phone?: string;
    photo?: ProfilePhoto;
    safe_mode: boolean;
    unconfirmed_phone_data?: ClientPhoneData;
    unconfirmed_phone?: string;
    web_url: string; // `https://ifunny.co/user/${nick}`;
}
```

## Appeal

```typescript
{
    ban_id?: string;
    ban_reason: string; // Reason for strikes as well
    created_at: number; // UNIX in Seconds
    id: string;
    status: "pending" | "denied";
    strike_id?: string;
    type: "ban" | "strike";
}
```

## Client Phone Data

```typescript
{
    code: string;
    number: string;
}
```
