---
description: Explanation of WAMP event patterns and message types.
---

# Routing

Understand that this is here to allow other documents to be more easily read without all of the underlying WAMP boilerplate. What this means is that we will not be covering all WAMP messages here, but will be covering the key ones used in accessing iFunny Chats.

## Request IDs

Clients in accordance with WAMP protocol must use the number. The number must start from 0 and increment by one for each request ID sent to the WAMP implementation. Request IDs are returned in the responses to certain messages to route correctly.

## Subscriptions

> [Subscribe reference documents](https://wamp-proto.org/wamp\_latest\_ietf.html#name-subscribe-2)
>
> [Subscribed reference documents](https://wamp-proto.org/wamp\_latest\_ietf.html#name-subscribed-2)

[#subscriptions](routing.md#subscriptions "mention") allow for a constant channel between the Broker and the Subscriber. Upon sending [#subscribe](routing.md#subscribe "mention") to the server, iFunny WAMP will reply with a [#subscribed](routing.md#subscribed "mention") frame or an Error frame. If it responds with a [#subscribed](routing.md#subscribed "mention") frame, then it will start to also send [#event](routing.md#event "mention") frames. You are then able to send [#publish](routing.md#publish "mention") frames to the Broker. Here is what these look like.&#x20;

### Subscribe

Request from client to server to subscribe to a topic.\[

```typescript
[
    32, // Required Wamp Subscribe id
    number, // Request id
    {}, // Required details object for Wamp 
    "the.topic.uri" // The topic to subscribe to
]
```

### Subscribed

Response from the server to the client on a subscribed topic. The request ID from the [#subscribe](routing.md#subscribe "mention") frame is returned, as well as a Session ID. You want to keep track of this Session ID, as it will be used to determine which Subscription [#event](routing.md#event "mention") is coming from.

```typescript
[
    33,  // Required Wamp Subscribed id
    number, // The request id sent in Subscribe message.
    number // The session id
]
```

### Event

Upon being subscribed to a topic, your WebSocket client will start to send in [#event](routing.md#event "mention") frames.&#x20;

```typescript
[
    36, // Required Wamp Event id
    number, // Subscription id
    number, // Publication id
    {}, // Event Details
    [], // iFunny generated Args
    {} // iFunny generated Kwargs
]
```

### Publish

After a [#subscribed](routing.md#subscribed "mention") the frame is received from the server, you are able to send [#publish](routing.md#publish "mention") frames to the Broker. The response will be [#published](routing.md#published "mention").

```typescript
[
    16, // Required Wamp Publish id
    number, // Request id
    {}, // Publish details
    "the.topic.uri", // Topic to publish too.
    [], // Your client Args
    {} // Your client Kwargs
]
```

### Published

After a [#publish](routing.md#publish "mention") frame is sent, the client receives a [#published](routing.md#published "mention") frame. This looks like this.

```typescript
[
    17, // Required Wamp Published id 
    number, // Request id 
    number // Publication ID 
]
```
