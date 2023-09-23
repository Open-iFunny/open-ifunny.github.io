---
description: Introduction to iFunny chats and Web Application Messaging Protocol (WAMP)
---

# WAMP

The iFunny API uses a WAMP WebSocket server for most operations that can be done in iFunny chats. API reference for iFunny chats related endpoints can be found at [Broken link](broken-reference "mention"). iFunny chats uses a different host for its chat WebSocket, namely, `wss://chat.ifunny.co/chat`.

An anecdotal thing I have found is that generally speaking, pre-built WAMP clients do not tend to work seamlessly with iFunny Chats. It almost always has to do with the headers of the WAMP clients not using the required WebSocket protocol `wamp.json` because modern clients prefer `wamp.2.json`. If it is not the headers, it can be the form of authentication. The WAMP documents used to build this document can be [found here](https://wamp-proto.org/wamp\_latest\_ietf.html).

WAMP uses a system of organized messages. Each message is defined as an array, serialized in JSON. The first element in each message MUST associated with the correct WAMP message ID, and then extra data gets appended after. The reference documents for WAMP IDs can be [found here](https://wamp-proto.org/wamp\_latest\_ietf.html#name-message-codes-and-direction).

