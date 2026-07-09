---
description: Browse, search, and interact with content on the iFunny API
---

# Exploring Feeds and Curations

Feeds are the heart of iFunny. Learn how to scroll through different feed types, search for content by tag, discover trending topics, and interact with posts through comments and reactions.

## Browsing Feeds

iFunny offers three main feed types: **Featured** (curated by iFunny), **Home** (posts from users you follow), and **Collective** (all recent posts). All feeds are paginated and support scrolling.

### Featured Feed

Browse iFunny's curated featured content:

=== "cURL"

    ```bash
    # Fetch the featured feed (requires only Basic Token)
    curl https://api.ifunny.mobi/feeds/featured \
      -H "authorization: Basic $BASIC_TOKEN" | jq '.data | length'
    
    # Paginate with cursor
    NEXT_CURSOR=$(curl https://api.ifunny.mobi/feeds/featured \
      -H "authorization: Basic $BASIC_TOKEN" | jq -r '.paging.cursors.next')
    
    curl "https://api.ifunny.mobi/feeds/featured?next=$NEXT_CURSOR" \
      -H "authorization: Basic $BASIC_TOKEN"
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({ basic: basicToken });

    // Scroll through featured feed (async generator)
    for await (const post of client.feeds.features.scroll()) {
      console.log(`Post ${post.id}: ${post.num.likes} likes`);
      
      // Optional: stop after 10 posts
      if (++count >= 10) break;
    }
    ```

=== "Go"

    ```go
    package main

    import (
      "fmt"
      "github.com/open-ifunny/ifunny-go"
    )

    func main() {
      ua := ifunny.Android{Version: "14"}.UserAgent()
      client, err := ifunny.MakeClientBasic(basic, ua)
      if err != nil {
        panic(err)
      }

      // Iterate featured feed
      count := 0
      for result := range client.IterFeed("featured") {
        if result.Err != nil {
          panic(result.Err)
        }
        fmt.Printf("Post: %s (%d smiles)\n", result.V.ID, result.V.Num.Smiles)
        
        count++
        if count >= 10 {
          break
        }
      }
    }
    ```

### Home/Subscribed Feed

Browse posts from users you follow. Requires a Bearer Token:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/feeds/home \
      -H "authorization: Bearer $BEARER_TOKEN" | jq '.data | length'
    ```

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken, bearer: bearerToken });

    // Scroll through your home feed (personalized)
    for await (const post of client.feeds.home.scroll()) {
      console.log(`Post ${post.id} from ${post.creator.nick}`);
    }
    
    // Alias: client.feeds.subscriptions is the same as client.feeds.home
    ```

=== "Go"

    ```go
    client, err := ifunny.MakeClient(bearerToken, ua)
    if err != nil {
      panic(err)
    }

    for result := range client.IterFeed("home") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Post: %s by %s\n", result.V.ID, result.V.Creator.Nick)
    }
    ```

### Collective Feed

Browse all recent posts from the entire platform:

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken });

    for await (const post of client.feeds.collective.scroll()) {
      console.log(`Post ${post.id}`);
    }
    ```

=== "Go"

    ```go
    for result := range client.IterFeed("collective") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Post: %s\n", result.V.ID)
    }
    ```

## Fetching Individual Content

Retrieve a specific post by ID:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/content/POST_ID \
      -H "authorization: Basic $BASIC_TOKEN" | jq '.data'
    ```

=== "TypeScript"

    ```typescript
    const post = await client.content.fetch("POST_ID");
    console.log(`Title: ${post.title}`);
    console.log(`Likes: ${post.num.likes}`);
    console.log(`Comments: ${post.num.comments}`);
    ```

=== "Go"

    ```go
    post, err := client.GetContent("POST_ID")
    if err != nil {
      panic(err)
    }
    fmt.Printf("Title: %s\n", post.Title)
    ```

## Searching Content

### Search by Tag

Find all posts tagged with a specific keyword:

=== "cURL"

    ```bash
    curl "https://api.ifunny.mobi/search/content?tag=memes&limit=20" \
      -H "authorization: Basic $BASIC_TOKEN" | jq '.data | length'
    ```

=== "TypeScript"

    ```typescript
    // Note: The iFunny.ts library doesn't expose a direct search method.
    // Use the REST API endpoint directly or make a custom request.
    const response = await client.instance.get(
      "/search/content?tag=memes&limit=20"
    );
    const posts = response.data.data;
    ```

=== "Go"

    ```go
    // Use the REST API directly or fetch via compose.Request
    // The Go library doesn't expose a high-level search method.
    ```

### Discover Trending Tags

See what's trending right now:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/tags/suggested \
      -H "authorization: Basic $BASIC_TOKEN" | jq '.data[] | .tag'
    ```

## Content Compilations

Browse curated content shelves organized by theme:

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/explore/compilation/featured \
      -H "authorization: Basic $BASIC_TOKEN" \
      -H "content-type: application/json" \
      -d '{"limit": 20}' | jq '.data | length'
    ```

=== "TypeScript"

    ```typescript
    // Use compose.Request for REST API access
    // The high-level exploration API is not yet fully exposed in iFunny.ts
    ```

=== "Go"

    ```go
    for result := range client.IterExploreContent("featured") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Content: %s\n", result.V.ID)
    }
    ```

## Comments and Replies

### Posting a Top-Level Comment

Add a comment to a post:

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/content/POST_ID/comments \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"text": "This is hilarious!"}' | jq '.data.id'
    ```

=== "TypeScript"

    ```typescript
    // Note: Comment creation requires access to internal methods.
    // The iFunny.ts library does not currently expose a high-level comment API.
    // Use REST calls directly via client.instance.
    ```

=== "Go"

    ```go
    // The Go library does not currently expose a high-level comment API.
    // Use REST calls directly via client.RequestJSON().
    ```

### Replying to a Comment

Reply to an existing comment (creates a threaded reply):

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/content/POST_ID/comments \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"text": "I agree!", "parent_comm_id": "COMMENT_ID"}' \
      | jq '.data.id'
    ```

### Smiling/Liking Content

Mark a post as liked (smile it):

=== "cURL"

    ```bash
    # Smile a post
    curl -X PUT https://api.ifunny.mobi/content/POST_ID/smile \
      -H "authorization: Bearer $BEARER_TOKEN"
    
    # Unsmile a post
    curl -X DELETE https://api.ifunny.mobi/content/POST_ID/smile \
      -H "authorization: Bearer $BEARER_TOKEN"
    ```

=== "TypeScript"

    ```typescript
    // Not yet exposed in iFunny.ts; use REST API directly
    const response = await client.instance.put(
      `/content/POST_ID/smile`
    );
    console.log("Post smiled!");
    ```

=== "Go"

    ```go
    // Not yet exposed in ifunny-go; use REST API directly
    ```

### Viewing Smile Stats

Get all users who smiled a post:

=== "Go"

    ```go
    // Iterate through users who smiled this post
    for result := range client.IterSmiles("POST_ID") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Smiled by: %s\n", result.V.Nick)
    }
    ```

### Republishing Content

Share a post to your own profile (re-share / repost):

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/content/POST_ID/republish \
      -H "authorization: Bearer $BEARER_TOKEN"
    ```

=== "TypeScript"

    ```typescript
    // Not yet exposed in iFunny.ts; use REST API directly
    ```

=== "Go"

    ```go
    // Get users who republished this post
    for result := range client.IterRepublishers("POST_ID") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Republished by: %s\n", result.V.Nick)
    }
    ```

### Managing Your Interactions

Mark content as read:

=== "TypeScript"

    ```typescript
    await client.content.markAsRead("POST_ID");
    // Can also pass an array: ["POST_ID1", "POST_ID2", ...]
    ```

=== "Go"

    ```go
    // The Go library does not expose a high-level read-marking API
    ```

## Understanding Content Objects

Every post returned from the API includes:

- **id** — Unique post identifier
- **title** — Post title or caption
- **creator** — User object of the poster
- **num** — Stats object with:
  - **likes** / **smiles** — Reaction count
  - **comments** — Comment count
  - **republishes** — Re-share count
- **created_at** — ISO 8601 timestamp

### Media variants are mutually exclusive

The `type` field discriminates *which kind* of post you're looking at, and
exactly one matching media-variant field will be populated per item — the
rest are omitted. In practice you'll want to switch on `type` (or on which
variant field is present) rather than assume the shape:

| `type`              | Populated field |
| ------------------- | --------------- |
| `pic`               | `pic`           |
| `caption`           | `caption`       |
| `comics`            | `comics`        |
| `mem`               | `mem`           |
| `video_clip`        | `video_clip`    |
| `video`             | `video`         |
| `vine`              | `vine`          |
| `coub`              | `coub`          |
| `gif` / `gif_caption` | `gif`         |
| `app`               | `app`           |

Each variant carries its own asset URLs and metadata (bytes, duration, source
attribution, etc). See the [`Content` schema](../reference/api/rest/content.md)
for the full shape of each variant.

## Practical Example: Print Top Posts from Your Feed

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({
      basic: basicToken,
      bearer: bearerToken,
    });

    console.log("Your top 5 posts:");
    let count = 0;
    for await (const post of client.feeds.home.scroll()) {
      console.log(`${count + 1}. ${post.title}`);
      console.log(`   Likes: ${post.num.likes}`);
      console.log(`   By: ${post.creator.nick}`);
      
      count++;
      if (count >= 5) break;
    }
    ```

=== "Go"

    ```go
    fmt.Println("Your top 5 posts:")
    count := 0
    for result := range client.IterFeed("home") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("%d. %s\n", count+1, result.V.Title)
      fmt.Printf("   Likes: %d\n", result.V.Num.Smiles)
      fmt.Printf("   By: %s\n", result.V.Creator.Nick)
      
      count++
      if count >= 5 {
        break
      }
    }
    ```

## Next Steps

- **Connect with creators:** [Making Friends and Foes](making-friends-and-foes.md) to follow and discover new creators
- **Create your own content:** See the [Content API Reference](../reference/api/rest/content.md) for uploading posts
- **Full feed reference:** [Content API Reference](../reference/api/rest/content.md)
