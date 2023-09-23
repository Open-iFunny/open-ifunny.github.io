---
description: Implementation of Wamp client in iFunny Chats
---

# Events

## List Chats

List chats is a Wamp subscription iFunny uses to get the latest messages for all of your group chats. It will continue to repeat the same channels to you even if no messages are being sent.

If you decide to parse messages listed using this method, you have to keep track of the id of the message, otherwise, your parser will double-parse messages because of the behavior of [#subscriptions](routing.md#subscriptions "mention")

To create your subscription, you must first build your URI. This requires your User ID. The easiest way is to use the `authid` that comes from [#welcome](connection.md#welcome "mention"). The URI looks like this. (Do not include brackets)

```rust
co.fun.chat.user.{your_user_id}.chats
```

Then place that in a [#subscribe](routing.md#subscribe "mention") message as the topic, and send it with the WebSocket. This should look something like this.

```typescript
[
    32,
    number,
    {},
    "co.fun.chat.user.{your_user_id}.chats" // The topic to subscribe to
]
```

After that, it should reply with a [#subscribed](routing.md#subscribed "mention") message. Upon subscribing, the WebSocket will start to send [#event](routing.md#event "mention") frame. That event frame will contain the information about the Channels.
