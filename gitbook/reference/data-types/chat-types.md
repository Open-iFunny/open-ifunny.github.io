---
description: Collection of data types used in iFunny Chats
---

# 💬 Chat Types

## Chat

A "Chat" is a DM or Group Chat. Similar to a channel in Discord

<pre class="language-typescript"><code class="lang-typescript">{
    touch_dt: number;
    name: string; // This is the unique identifier
    role: number;
    title: string; // Display name of the chat
    last_msg: <a data-footnote-ref href="#user-content-fn-1">Message</a>;
    messages_unread: number;
    join_state: number;
    members_online: number;
    type: number;
    members_total: number;
    description: string;
    operators_count: number;
}
</code></pre>

## Message

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





[^1]: [#message](chat-types.md#message "mention")&#x20;



    The last message sent in the chat                      &#x20;

    &#x20;         &#x20;

    &#x20;
