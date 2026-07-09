---
title: WAMP Reference
description: WAMP procedures and topics, grouped by category.
---

# 📡 WAMP Reference

WAMP catalog for iFunny's chat realm. Procedures cover channel
management, message pagination, invites, and moderation; topics
cover per-user channel/invite streams and per-channel event
streams.

All URIs live under the `co.fun.chat.` namespace. Payloads on the
wire are JSON; the renderer emits JSON, TypeScript, and Go type
layouts identical to the REST reference.

## Servers

- **production** — `wss://chat.ifunny.co/chat` (realm `co.fun.chat.ifunny`)
  - Subprotocols: `wamp.json`, `wamp.2.json`
  - Auth: `ticket` (ticket) — credential: [reference/api/rest/oauth2.md#op-loginorrefresh](../../../reference/api/rest/oauth2.md#op-loginorrefresh)

## 💬 [Chats + DMs](chats-dms.md)

Channel management and messaging procedures/topics

**Procedures:**

- [`co.fun.chat.hide_chat`](chats-dms.md#proc-co-fun-chat-hide-chat) — Hide a channel from your channel list
- [`co.fun.chat.create_channel`](chats-dms.md#proc-co-fun-chat-create-channel) — Create a new channel
- [`co.fun.chat.get_or_create_chat`](chats-dms.md#proc-co-fun-chat-get-or-create-chat) — Get or create a direct-message channel
- [`co.fun.chat.new_chat`](chats-dms.md#proc-co-fun-chat-new-chat) — Create a new named channel
- [`co.fun.chat.get_chat`](chats-dms.md#proc-co-fun-chat-get-chat) — Fetch channel details by name
- [`co.fun.chat.join_chat`](chats-dms.md#proc-co-fun-chat-join-chat) — Join a channel by name
- [`co.fun.chat.leave_chat`](chats-dms.md#proc-co-fun-chat-leave-chat) — Leave a channel by name
- [`co.fun.chat.list_messages`](chats-dms.md#proc-co-fun-chat-list-messages) — List messages in a channel

## 🔪 [Procedures](procedures.md)

Invites, moderation, and other one-off procedures

**Procedures:**

- [`co.fun.chat.invite.invite`](procedures.md#proc-co-fun-chat-invite-invite) — Invite users to a channel
- [`co.fun.chat.invite.accept`](procedures.md#proc-co-fun-chat-invite-accept) — Accept a channel invitation
- [`co.fun.chat.invite.decline`](procedures.md#proc-co-fun-chat-invite-decline) — Decline a channel invitation
- [`co.fun.chat.kick_member`](procedures.md#proc-co-fun-chat-kick-member) — Remove a user from a channel

## 📬 [Subscriptions + Events](subscriptions-events.md)

Event stream subscriptions and real-time updates

**Topics:**

- [`co.fun.chat.user.{id}.chats`](subscriptions-events.md#topic-co-fun-chat-user-id-chats) — Subscribe to updates about your joined channels
- [`co.fun.chat.user.{id}.invites`](subscriptions-events.md#topic-co-fun-chat-user-id-invites) — Subscribe to incoming channel invitations
- [`co.fun.chat.chat.{channel_name}`](subscriptions-events.md#topic-co-fun-chat-chat-channel-name) — Subscribe to events in a channel
