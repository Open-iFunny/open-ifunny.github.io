---
description: Machine-readable OpenAPI 3.1 specification for the REST API
---

# 📄 OpenAPI Spec

In addition to the hand-written pages in this **API Reference** section, the REST endpoints documented here (OAuth2, Client, Users, Content, Comments) are also available as a single machine-readable [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) document:

{% code title="ifunny-api.yaml" %}
```
gitbook/openapi/ifunny-api.yaml
```
{% endcode %}

This file lives in the same repository as this GitBook space (in the synced `gitbook/openapi/` folder), so it stays under version control alongside the rest of the docs.

## Why a separate spec?

The Markdown pages in this space are written for humans first. The OpenAPI file is written for tooling: import it into Postman/Insomnia, generate client SDKs, or feed it into a linter/mock server. It intentionally does **not** try to reproduce the Markdown pages 1:1 — it's a different artifact for a different purpose, kept in sync by hand as the API evolves.

## Rendered documentation

A rendered, browsable version of the spec (via [Redoc](https://redocly.com/redoc)) is published automatically from `main` using GitHub Actions + GitHub Pages. See `.github/workflows/openapi.yml` in the repository for the build/publish pipeline.

## What's not covered

The WAMP-based [Chats](../chats/ "mention") protocol is a WebSocket/pub-sub protocol, not REST, so it cannot be represented in OpenAPI. Documenting it in a machine-readable way would require a companion [AsyncAPI](https://www.asyncapi.com/) spec — left as a future addition, not included here.
