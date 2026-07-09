---
description: Search for users, follow, subscribe, and manage social relationships
---

# Making Friends and Foes

Build social features into your app by searching for users, following creators, and managing your social graph. This guide shows you how to find users, view their content, and manage your relationships with them.

## Searching for Users

### Find Users by Nickname

Search for users by their iFunny nickname:

=== "cURL"

    ```bash
    curl "https://api.ifunny.mobi/search/users?q=xXmemeking&limit=10" \
      -H "authorization: Basic $BASIC_TOKEN" | jq '.data'
    ```

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken });

    // Note: iFunny.ts does not expose a high-level search method.
    // Use the REST API directly:
    const response = await client.instance.get(
      "/search/users?q=xXmemeking&limit=10"
    );
    const users = response.data.data;
    users.forEach(user => {
      console.log(`${user.nick} (@${user.id})`);
    });
    ```

=== "Go"

    ```go
    // The Go library does not expose a high-level search method.
    // Use REST API directly via client.RequestJSON() or fetch via compose.Request.
    ```

The search returns `User` objects with essential info: nick, ID, follower count, and verification status. Use the returned `id` to fetch their full profile or interact with them.

## Fetching User Profiles

### Get a Full User Profile

Retrieve complete information about a user:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/users/USER_ID \
      -H "authorization: Basic $BASIC_TOKEN" | jq '.data'
    ```

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken });

    // Fetch a user by ID
    const user = await client.users.fetch("USER_ID");
    console.log(`Nick: ${user.nick}`);
    console.log(`Followers: ${user.num.subscribers}`);
    console.log(`Meme Rank: ${user.meme_experience.rank}`);
    ```

=== "Go"

    ```go
    user, err := client.GetUser(compose.User("USER_ID"))
    if err != nil {
      panic(err)
    }
    fmt.Printf("Nick: %s\n", user.Nick)
    fmt.Printf("Followers: %d\n", user.Num.Subscribers)
    ```

### Understanding Meme Rank

The `meme_experience.rank` field represents days of account activity. iFunny displays rank-based titles:

| Rank | Title | Days Active |
|------|-------|-------------|
| 1 | Meme explorer | 1-4 |
| 2 | Meme bro | 5-24 |
| 3 | Meme daddy | 25-49 |
| 4 | Dank memer | 50-99 |
| 5 | Meme master baker | 100-199 |
| 6 | Deep fried memer | 200-299 |
| 7 | Saucy memer | 300-499 |
| 8 | Original Meme Gangster | 500-665 |
| 9 | Meme demon | 666-910 |
| 10 | Steal beams of memes | 911-999 |
| 11 | Meme dealer | 1000-1499 |
| 12 | iFunny Veteran | 1500-1999 |
| 13 | Chef's meme agent | 2000+ |

When displaying a user profile, map their rank to the appropriate title for context.

## Viewing User Content

### Get a User's Timeline

Fetch all posts from a specific user:

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken });

    // Iterate through a user's posts
    const userId = "USER_ID";
    // Note: iFunny.ts does not expose a high-level timeline API yet.
    // Use REST API directly.
    ```

=== "Go"

    ```go
    userId := "USER_ID"
    for result := range client.IterTimeline(userId) {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Post: %s\n", result.V.ID)
    }
    
    // Alternative: Get by user's nick
    for result := range client.IterTimelineByNick("username") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Post: %s\n", result.V.ID)
    }
    ```

## Managing Subscriptions (Following)

### Follow a User

Subscribe to a user to see their posts in your home feed:

=== "cURL"

    ```bash
    curl -X PUT https://api.ifunny.mobi/users/USER_ID/subscribe \
      -H "authorization: Bearer $BEARER_TOKEN"
    ```

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken, bearer: bearerToken });

    // Note: iFunny.ts does not expose high-level subscribe/unsubscribe methods yet.
    // Use REST API directly:
    await client.instance.put(`/users/USER_ID/subscribe`);
    console.log("Followed!");
    ```

=== "Go"

    ```go
    // The Go library does not expose high-level subscribe/unsubscribe methods.
    // Use REST API directly.
    ```

### Unfollow a User

Unsubscribe from a user:

=== "cURL"

    ```bash
    curl -X DELETE https://api.ifunny.mobi/users/USER_ID/subscribe \
      -H "authorization: Bearer $BEARER_TOKEN"
    ```

### Get Your Following List

View all users you follow:

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken, bearer: bearerToken });

    // Note: Direct method not yet exposed.
    // Use REST API or iterate via Go library.
    ```

=== "Go"

    ```go
    // Iterate through your subscriptions
    for result := range client.IterSubscriptions("your_user_id") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Following: %s\n", result.V.Nick)
    }
    ```

### Get a User's Followers

View all users following a specific account:

=== "Go"

    ```go
    userId := "USER_ID"
    for result := range client.IterSubscribers(userId) {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Follower: %s\n", result.V.Nick)
    }
    ```

## Checking User Availability

Before creating an account or changing your username, check if a nick or email is available:

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken });

    const nickAvailable = await client.users.isNickAvailable("newuser");
    console.log(`Nick "newuser" available: ${nickAvailable}`);

    const emailAvailable = await client.users.isEmailAvailable("new@example.com");
    console.log(`Email available: ${emailAvailable}`);
    ```

## Practical Example: Display User Profile Card

=== "TypeScript"

    ```typescript
    const client = new iFunnyClient({ basic: basicToken });

    async function displayUserProfile(userId: string) {
      const user = await client.users.fetch(userId);
      
      const rankTitle = [
        "", "Meme explorer", "Meme bro", "Meme daddy", "Dank memer",
        "Meme master baker", "Deep fried memer", "Saucy memer",
        "Original Meme Gangster", "Meme demon", "Steal beams of memes",
        "Meme dealer", "iFunny Veteran", "Chef's meme agent"
      ][user.meme_experience.rank] || "Unknown";

      console.log(`=== ${user.nick} ===`);
      console.log(`Rank: ${rankTitle} (${user.meme_experience.rank})`);
      console.log(`Followers: ${user.num.subscribers}`);
      console.log(`Following: ${user.num.subscriptions}`);
      console.log(`Verified: ${user.is_verified ? "Yes" : "No"}`);
    }

    displayUserProfile("USER_ID");
    ```

=== "Go"

    ```go
    func displayUserProfile(userId string) {
      user, err := client.GetUser(compose.User(userId))
      if err != nil {
        panic(err)
      }

      rankTitles := []string{
        "", "Meme explorer", "Meme bro", "Meme daddy", "Dank memer",
        "Meme master baker", "Deep fried memer", "Saucy memer",
        "Original Meme Gangster", "Meme demon", "Steal beams of memes",
        "Meme dealer", "iFunny Veteran", "Chef's meme agent",
      }

      rank := int(user.MemeExperience.Rank)
      rankTitle := ""
      if rank >= 0 && rank < len(rankTitles) {
        rankTitle = rankTitles[rank]
      }

      fmt.Printf("=== %s ===\n", user.Nick)
      fmt.Printf("Rank: %s (%d)\n", rankTitle, rank)
      fmt.Printf("Followers: %d\n", user.Num.Subscribers)
      fmt.Printf("Following: %d\n", user.Num.Subscriptions)
    }

    displayUserProfile("USER_ID")
    ```

## Next Steps

- **Browse trending content:** [Exploring Feeds and Curations](exploring-feeds-and-curations.md) to discover creators
- **Chat with friends:** [Chats and Channels](chats-and-channels.md) to start direct messages
- **Full user reference:** [Users API Reference](../reference/api/rest/users.md)
