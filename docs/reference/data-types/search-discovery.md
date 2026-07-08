---
description: Data types for search queries, trending content, and content discovery
---

# 🔍 Search & Discovery

Search and discovery allow users to find content, users, and trends. Search operations return matching results; discovery surfaces curated content through compilations and trending feeds.

## Tag

A simple tag object representing a keyword or topic used to organize and discover content.

--8<-- "_snippets/schemas/Tag.md"

## Digest

A digest is a curated collection of content around a theme (e.g., "Weekly Trending" or "Best Memes"). Digests include metadata, a list of featured content items, and top comments.

--8<-- "_snippets/schemas/Digest.md"

## Practical Examples

### Searching for Users

Find users by nickname using [GET /search/users](../api/users.md#op-searchusers):

```
GET /search/users?q=xXmemeking&limit=10
```

Returns a list of `User` objects matching the query. Use the returned `id` to fetch their full [User Profile](user-types.md#user-profile) or to subscribe/block them.

### Searching for Content by Tag

Browse content tagged with a specific keyword via [GET /search/content](../api/content.md#op-searchcontent):

```
GET /search/content?tag=memes&limit=20
```

Returns paginated `Content` objects. Use `paging.next` to fetch additional pages. Note: search focuses on tags; for text search across post titles/descriptions, check the full API spec or use the in-app search endpoint.

### Discovering Trending Tags

See what's trending via [GET /tags/suggested](../api/content.md#op-searchtags):

```
GET /tags/suggested
```

Returns a list of `Tag` objects representing currently trending topics. Use these tags to explore hot content or recommend trends to users.

### Browsing Explore Compilations

iFunny surfaces curated content via compilations (themed shelves). Fetch a compilation page via [POST /explore/compilation/{id}](../api/discovery.md#op-getexplorecompilation):

```
POST /explore/compilation/featured
{
  "limit": 20
}
```

Returns a `FeedResponse` with paginated `Content` items. Compilation IDs vary (e.g., "featured", "trending", "new_creators"). Check the API reference for available IDs and use pagination cursors (`next`, `prev`) to navigate.

### Viewing Weekly Digests

Access curated `Digest` objects for weekly or themed content roundups via [GET /digests](../api/discovery.md) (or similar discovery endpoint):

```
GET /digests?type=weekly
```

Each `Digest` includes a title, subtitle, engagement counts (smiles, comments, views), a `contents[]` array of featured `Content` objects, and a `comments[]` array of top comments. Use digests to surface high-quality curated content in your UI.
