---
title: API Reference
description: Complete REST and WAMP API reference documentation.
---

# 👾 API Reference

Comprehensive reference documentation for iFunny's REST and WAMP APIs.

## 🔗 REST API

Traditional HTTP-based REST endpoints for all iFunny operations.

- **[REST Reference](rest/index.md)** — OAuth2, Client, Bans & Appeals, Users, Content, Comments, Chat, and Discovery endpoints
- Each endpoint is documented with query/path/header parameters and response schemas in tabbed view: Fields | JSON | TypeScript | Go

## 📡 WAMP API

WebSocket-based WAMP (Web Application Messaging Protocol) for real-time chat and event streaming.

- **[WAMP Reference](wamp/index.md)** — Channel management, messaging, subscriptions/events, invites, and moderation
- Each procedure and topic is documented with positional args, kwargs, and event payloads in tabbed view: Fields | WAMP | TypeScript | Go
- **WAMP tab** shows the actual wire format: `[CALL, <request_id>, {}, uri, args[], kwargs{}]` for procedures and `[EVENT, <subscription_id>, <publication_id>, {}, args[], kwargs{}]` for events

---

**Choose your integration method:**
- **Web clients, mobile apps** — typically use REST for one-time operations and WAMP for real-time chat
- **Backend services** — can use either depending on your architecture; REST is simpler, WAMP adds streaming/subscriptions
- **CLI tools, scripts** — REST is recommended for simplicity
