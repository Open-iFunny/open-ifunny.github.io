---
description: A collection of data types relevant to Users on iFunny
---

# 🎭 User Types

Users on iFunny represent individual accounts. The API surfaces three user representations: a full public profile with statistics and metadata, a compact form for embedding in feeds and comments, and a blocked-user variant that tracks block relationships.

## User Profile

The full user profile returned for a public user account. Nested types
(`SmallBan`, `MemeExperience`, `UserProfileNums`, `ProfilePhoto`,
`UserRating`, `UserSocials`) are inlined below.

--8<-- "_snippets/schemas/UserProfile.md"

### Meme Rank (days)

The `meme_experience.rank` value is an integer; iFunny surfaces the
following display names for each rank:

1. Meme explorer (1-4)
2. Meme bro (5-24)
3. Meme daddy (25-49)
4. Dank memer (50-99)
5. Meme master baker (100-199)
6. Deep fried memer (200-299)
7. Saucy memer (300-499)
8. Original Meme Gangster (500-665)
9. Meme demon (666-910)
10. Steal beams of memes (911-999)
11. Meme dealer (1000-1499)
12. iFunny Veteran (1500-1999)
13. Chef's meme agent (2000+)

## User

The compact user representation embedded in feeds, comments, and other
list responses.

--8<-- "_snippets/schemas/User.md"

## Blocked User

Functionally the same as a [User](#user) but with the addition of the
`indirectly_blocked_users_count` field.

--8<-- "_snippets/schemas/BlockedUser.md"

## Practical Examples

### Finding Users by Name

To search for users, use the [Users API search endpoint](../api/users.md#op-searchusers). Supply a nick (username) query and receive a list of matching users.

```
GET /search/users?q=xXmemeking420Xx
```

The response includes matching `User` objects with basic profile info like subscriber counts and verification status. Use the returned `id` to fetch the full `UserProfile` or to subscribe/block.

### Viewing a User's Profile

Fetch a complete user profile including meme rank, ban history, and social stats by ID:

```
GET /users/{id}
```

Returns a `UserProfile` with all nested data. Check `meme_experience.rank` against the meme rank table above to show the user's title display (e.g., "Dank memer" for rank 50–99).

### Managing Subscriptions

The `User.num.subscribers` and `User.num.subscriptions` fields show follower/following counts. To subscribe or unsubscribe to a user, see [Users API subscribe/unsubscribe endpoints](../api/users.md).

### Blocking & Unblocking

When you block a user, they appear as a `BlockedUser` in your block list. The `indirectly_blocked_users_count` field tracks indirect blocks (e.g., users blocked by people you've blocked). Use [Users API block/unblock endpoints](../api/users.md) to manage your block list.
