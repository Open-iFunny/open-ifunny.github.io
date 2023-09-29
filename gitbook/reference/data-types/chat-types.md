---
description: Collection of data types used in iFunny Chats
---

# 💬 Chats

## Chat

A "Chat" is a DM or Group Chat. Similar to a channel in Discord

```typescript
{
    touch_dt: number;
    name: string; // This is the unique identifier
    role: number;
    title: string; // Display name of the chat
    last_msg: {
        payload: {
            local_id: string;
        };
        user: {
            nick: string;
            is_verified: boolean;
            last_seen_at: number;
            id: string; // User id
        };
        id: string; // Message id
        type: number;
        pub_at: number;
        status: number;
        text: string;
    };
    messages_unread: number;
    join_state: number;
    members_online: number;
    type: number;
    members_total: number;
}
```

## Message
