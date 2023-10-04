---
description: Collection of data types used in iFunny Chats
---

# 💬 Chat Types

## Chat

A "Chat" is a DM or Group Chat. Similar to a channel in Discord

<pre class="language-typescript"><code class="lang-typescript">{
    touch_dt: number;
    name: string; // This is the unique identifier
    role: number; // User role of the chat, 0=owner, 1=operator, 3=member
    cover: string; // URL of the chats image
    title: string; // Display name of the chat
    // last_msg is the last message sent in the chat.
    last_msg: <a data-footnote-ref href="#user-content-fn-1">Message</a>;
    messages_unread: number;
    join_state: number; // 
    members_online: number; // Members currently online
    type: number; // <a data-footnote-ref href="#user-content-fn-2">Type of chat</a>
    // Total number of members in chat. Something real funky is
    // happening if type == 1 and members_total > 2 😱
    members_total: number;
}
</code></pre>

### Type of chat

The type of the chat is expressed as an integer between 1 and 3.

* Private Direct Message = 1
* Private Group Chat = 2
* Public Group Chat = 3



## Message

```typescript
{
    // payload is an extra object you can pass through to the API that is
    // passed on to clients without any indication of this information on
    // the client, it could be useful for silent client-to-client communication.
    payload: { 
        local_id: string; // Randomly generated string the client generates.
    };
    user: {
        nick: string; // Nickname of the User
        is_verified: boolean;
        last_seen_at: number;
        id: string; // User id
    };
    id: string; // Message id
    type: number;
    pub_at: number;
    status: number;
    text: string;
}
```

<pre class="language-typescript"><code class="lang-typescript"><strong>{
</strong><strong>    payload: {
</strong>        local_id: string;
    };
    user: {
        nick: string;
        is_verified: boolean;
        last_seen_at: number;
        id: string; // User id
    };
    id: string; // Message id
    type: number;
<strong>    pub_at: number;
</strong>    status: number;
    text: string;
}
</code></pre>





[^1]: [#message](chat-types.md#message "mention")

[^2]: [#type-of-chat](chat-types.md#type-of-chat "mention")
