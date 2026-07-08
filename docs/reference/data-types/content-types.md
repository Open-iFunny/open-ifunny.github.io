---
description: Collection of data types for content, comments, and tasks on iFunny
---

# 🤣 Content, Comments & Tasks

Content on iFunny includes posts, videos, and other media types. Comments allow threaded discussion on content. Tasks represent the upload workflow: create a task, poll its status, and publish content once processing completes.

## Content

A piece of content (meme, video, gif, etc.). Which nested payload field
is populated depends on `type`; the [Content Type](#content-type)
section below documents which type maps to which media block.

--8<-- "_snippets/schemas/Content.md"

### Content Type

#### Images

* `pic`
* `mem`
* `comics`
* `caption`

#### Videos

* `video_clip`
* `video`
* `vine`
* `coub`

#### Gif

* `gif`
* `gif_caption`

#### Unknown

!!! warning
    These have not been observed and are likely deprecated

* `app` - Deprecated
* `old`
* `dem`
* `special`

### Content State

* `delayed` - Content was scheduled to be published later
* `deleted` - Content was deleted
* `draft` - Content is a draft that hasn't been published yet
* `published` - Content has been published

### Content Source

Where reposted / republished content originally came from.

--8<-- "_snippets/schemas/ContentSource.md"

## Comment

Top-level comments and threaded replies share most fields but differ in
the presence of `root_comm_id` / `parent_comm_id` / `depth`. The
`is_reply` discriminator is `false` on a top-level comment and `true`
on a reply.

=== "Comment"

    --8<-- "_snippets/schemas/Comment.md"

=== "Reply"

    --8<-- "_snippets/schemas/Reply.md"

### Comment State

* `normal` - Typical Comment
* `top` - Top comment
* `abused` - Comment was marked as "abusive"
* `deleted` - Comment was deleted
* `deleted_self` - Comment author deleted it

### Comment Attachment

Attachments carried alongside a comment: quoted content, links that
resolved to content, user mentions, and giphy embeds.

--8<-- "_snippets/schemas/CommentAttachment.md"

### User Mention

--8<-- "_snippets/schemas/UserMention.md"

### Comment Deletion Reason

* `del_by_spam_filter` - Automatically deleted by the spam filter
* `del_content` - The content the comment was attached to has been deleted
* `del_content_creator` - The content creator deleted the content
* `del_for_abuses` - Deleted due to containing abusive material, typically slurs
* `del_root_comment` - The root comment of this comment was deleted
* `del_via_portal` - The comment was deleted via admin portal

## Task

A task represents an upload operation. Create a task, receive a unique `id`, then poll for completion. Once the task completes, publish the content using the task ID.

--8<-- "_snippets/schemas/Task.md"

## Practical Examples

### The Content Upload Flow

To upload content, follow these steps:

1. **Create a task** via [POST /tasks](../api/tasks.md). Provide media file, title, description, and tags. Returns a `Task` with a unique `id` and initial `status`.

2. **Poll for completion** by fetching [GET /tasks/{id}](../api/tasks.md). Check the `status` field. Common statuses: `pending`, `processing`, `completed`, `failed`.

3. **Publish the content** once `status === "completed"`. Use the task ID with [POST /content](../api/content.md) to create the content post, specifying the task ID to associate the processed media.

The content appears in your profile and feeds once published. Check `state` to confirm it's `published` (not `draft` or `delayed`).

### Fetching Content Feeds

Retrieve content from different feed types using [Content API feed endpoints](../api/content.md):

- **Featured feed**: [GET /feeds/featured](../api/content.md) — curated trending content
- **Subscribed feed**: [GET /feeds/subscribed](../api/content.md) — posts from users you follow
- **Best feed**: [GET /feeds/best](../api/content.md) — highly-smiled content

Each returns paginated `Content` objects. Use `paging.next` cursor to fetch the next page.

### Creating & Replying to Comments

Post a top-level comment on content via [POST /content/{id}/comments](../api/comments.md):

```
POST /content/abc123/comments
{
  "text": "This is hilarious!"
}
```

Returns a `Comment` with `is_reply: false`. To reply to a comment, use the same endpoint but include `parent_comm_id` to thread the reply. The response will be a `Reply` (same shape as `Comment` but with `is_reply: true` and threaded fields: `root_comm_id`, `parent_comm_id`, `depth`).

### Editing & Deleting Comments

Edit a comment's text via [PATCH /comments/{id}](../api/comments.md). Delete via [DELETE /comments/{id}](../api/comments.md). Deleted comments remain in the thread but have `state: "deleted_self"` or `state: "deleted"` depending on who initiated the deletion.
