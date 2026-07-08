---
description: Machine-readable OpenAPI 3.1 specification for the REST API
---

# 📄 OpenAPI Spec

Every other page in this **API Reference** section (OAuth2, Client, Users, Content, Comments, Chat, Discovery, Tasks) is generated directly from a single machine-readable [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) document:

{% code title="ifunny-api.yaml" %}
```
gitbook/openapi/ifunny-api.yaml
```
{% endcode %}

This file lives in the same repository as this GitBook space (in the synced `gitbook/openapi/` folder), so it stays under version control alongside the rest of the docs.

## Why a separate spec?

The spec is the single source of truth: `scripts/generate-docs.js` reads it and renders the other pages in this section straight into `gitbook/reference/api-reference/`, using GitBook's own block syntax. The spec is also useful directly for tooling: import it into Postman/Insomnia, generate client SDKs, or feed it into a linter/mock server.

## How the pages are generated

A GitHub Actions workflow (`.github/workflows/openapi.yml`) runs `scripts/generate-docs.js` on every push, and commits the regenerated Markdown straight back into this repository — since GitBook syncs its content directly from here, the generated pages need to be tracked in git, not just built as an ephemeral artifact. Don't hand-edit the other pages in this section directly; edit `gitbook/openapi/ifunny-api.yaml` (or its `paths/`/`schemas/` includes) instead and let the workflow regenerate them.

## What's not covered

The WAMP-based [Chats](../chats/ "mention") protocol is a WebSocket/pub-sub protocol, not REST, so it cannot be represented in OpenAPI. Documenting it in a machine-readable way would require a companion [AsyncAPI](https://www.asyncapi.com/) spec — left as a future addition, not included here.
