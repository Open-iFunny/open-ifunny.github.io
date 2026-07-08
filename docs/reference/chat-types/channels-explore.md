---
description: Creating, discovering, and exploring public channels.
---

# 📢 Channels + Explore

Public channels are shared communication spaces on iFunny. Any user can create or join public group chats. This page covers channel discovery and creation.

## Creating Channels

Use the procedures in [Chats + DMs](chats-dms.md) to create channels:

- **Public channel** — Use `co.fun.chat.create_channel` or `co.fun.chat.new_chat` with `type: 3`
- **Private group** — Use `type: 2` if you want a closed membership group
- **Direct message** — Use `type: 1` for 1:1 or small group DMs

All three are "channels" in the WAMP API; the `type` field determines access control.

## Discovering Channels

### Via Your Channel List

Subscribe to your user's channel stream to see all channels you're a member of:

```
co.fun.chat.user.{your_user_id}.chats
```

See [Subscriptions + Events](subscriptions-events.md#topic-co-fun-chat-user-id-chats) for details.

### Via REST API

For broader channel discovery (search, trending, recommendations), use the REST API endpoints in the Data Types reference. Non-chat Explore functionality (general content discovery) is covered in the [Data Types section](../data-types/index.md).

## Channel Operations

Once you have a channel (created or discovered), use these operations:

| Operation | Procedure |
|-----------|-----------|
| **Get channel metadata** | `co.fun.chat.get_chat` |
| **Join a channel** | `co.fun.chat.join_chat` |
| **Leave a channel** | `co.fun.chat.leave_chat` |
| **Hide from your list** | `co.fun.chat.hide_chat` (remains joined server-side) |
| **Send a message** | Publish via `co.fun.chat.chat.{channel_name}` topic |
| **Subscribe to updates** | `co.fun.chat.chat.{channel_name}` topic |

See [Chats + DMs](chats-dms.md) for the full procedure reference.

## Channel Types

| Type | Name | Behavior |
|------|------|----------|
| `1` | Direct Message | 1:1 or small group DM; private by default |
| `2` | Private Group | Closed group requiring invite to join |
| `3` | Public Group | Open group; anyone can discover and join |

## Related Pages

- [Chats + DMs](chats-dms.md) — Full procedure and topic reference for all channel operations
- [Subscriptions + Events](subscriptions-events.md) — Real-time event streams for channel activity
- [Data Types > Explore](../data-types/index.md) — General content discovery and recommendations
