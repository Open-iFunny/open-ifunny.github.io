---
description: Send and receive messages via Direct Messages, Group Chats, and Public Channels using real-time WAMP
---

# Chats and Channels

iFunny Chat enables real-time messaging through Direct Messages (DMs), private group chats, and public channels. All chat operations use the WebSocket-based WAMP protocol for instant delivery and real-time updates.

## Establishing a Chat Connection

All chat operations require an authenticated WebSocket connection to the iFunny Chat server. You must have a Bearer Token before connecting.

### Connect to the Chat Server

Initialize a WebSocket connection to the WAMP chat realm:

=== "cURL"

    ```bash
    # Raw WebSocket connection (requires a WebSocket client like wscat)
    wscat -c wss://chat.ifunny.co/chat \
      --subprotocol wamp.json
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
      bearer: bearerToken,
    });

    // Get the chat WebSocket connection
    // This lazily initializes on first call
    const ws = await client.chat();
    console.log("Connected to chat server");
    ```

=== "Go"

    ```go
    client, err := ifunny.MakeClient(bearerToken, ua)
    if err != nil {
      panic(err)
    }

    // The Chat() method returns a WAMP connection
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }
    fmt.Println("Connected to chat server")
    ```

### WAMP Handshake

When your client connects, complete the WAMP authentication handshake:

#### 1. Send Hello

Announce yourself to the server:

```json
[
  1,
  "co.fun.chat.ifunny",
  {
    "authmethods": ["ticket"],
    "roles": {
      "subscriber": {},
      "publisher": {}
    }
  }
]
```

#### 2. Receive Challenge

The server responds asking for credentials:

```json
[
  4,
  "ticket",
  {}
]
```

#### 3. Send Authenticate

Reply with your Bearer Token:

```json
[
  5,
  "your_bearer_token_here",
  {}
]
```

#### 4. Receive Welcome

The server confirms your identity:

```json
[
  2,
  <session_id>,
  {
    "authid": "your_user_id",
    "authrole": "user",
    "attributes": {
      "nick": "your_username"
    }
  }
]
```

Most WAMP client libraries (including iFunny.ts and ifunny-go) handle this handshake automatically. You only need to call the library's connection method.

## Creating Direct Messages

### Get or Create a DM Channel

Start a 1:1 or group DM with one or more users. The operation is idempotent—calling it multiple times returns the same channel:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();

    // Get or create a DM with one user
    const dm = await client.chats.getDMChannel("recipient_user_id");
    console.log(`DM channel: ${dm.name}`);

    // Get or create a group DM with multiple users
    const groupDm = await client.chats.getDMChannel("user1_id", "user2_id", "user3_id");
    console.log(`Group DM: ${groupDm.name}`);
    ```

=== "Go"

    ```go
    // Compute the canonical DM channel name
    dmName := client.DMChannelName("recipient_user_id")
    fmt.Printf("DM channel name: %s\n", dmName)

    // Then use the WAMP RPC to get/create the channel
    // Note: ifunny-go exposes this through the Chat WAMP connection
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }
    // Use ws.Call("co.fun.chat.get_or_create_chat", ...)
    ```

The channel `name` is the canonical identifier—use this for all subsequent operations on that DM.

## Creating Group Chats and Public Channels

### Create a New Channel

Create a private group chat or public channel:

=== "TypeScript"

    ```typescript
    import { v4 as uuid } from "uuid";

    const channelName = uuid(); // Client-generated unique name
    const channelId = uuid();

    const channel = await client.chats.createChannel(
      3,                    // Type: 1=DM, 2=private group, 3=public
      "My Awesome Channel", // Title
      channelName,          // Channel name (canonical identifier)
      "A fun place to chat", // Description (optional, not for private)
      ["user1_id", "user2_id"] // User IDs to invite (optional)
    );

    console.log(`Created channel: ${channel.name}`);
    console.log(`Type: ${channel.type}`);
    ```

=== "Go"

    ```go
    import "github.com/google/uuid"

    channelName := uuid.New().String()
    channelId := uuid.New().String()

    // Use the WAMP connection to call co.fun.chat.new_chat
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }

    // ws.Call("co.fun.chat.new_chat", {
    //   "type": 3,
    //   "id": channelId,
    //   "title": "My Awesome Channel",
    //   "description": "A fun place to chat",
    //   "name": channelName,
    //   "users": ["user1_id", "user2_id"]
    // })
    ```

**Channel Types:**

| Type | Name | Behavior |
|------|------|----------|
| 1 | Direct Message | 1:1 or small group DM (private) |
| 2 | Private Group | Closed group; members only |
| 3 | Public Channel | Open group; anyone can discover and join |

## Joining and Leaving Channels

### Join a Channel

Subscribe to a channel by name:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();
    // Handled by library during getChannel or queryChannels
    ```

=== "Go"

    ```go
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }
    // ws.Call("co.fun.chat.join_chat", {"chat_name": "channel_name"})
    ```

### Leave a Channel

Unsubscribe from a channel:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();
    // Call the WAMP procedure directly if needed
    ```

=== "Go"

    ```go
    // ws.Call("co.fun.chat.leave_chat", {"chat_name": "channel_name"})
    ```

### Hide a Channel

Hide a channel from your channel list without leaving it:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();
    // Call the WAMP procedure directly if needed
    ```

=== "Go"

    ```go
    // ws.Call("co.fun.chat.hide_chat", {"chat_name": "channel_name"})
    ```

## Sending and Receiving Messages

### Send a Message

Publish a message to a channel:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();

    // Publish to a channel topic
    await ws.publish(`co.fun.chat.chat.${channelName}`, {
      text: "Hello everyone!",
    });
    ```

=== "Go"

    ```go
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }

    // ws.Publish(fmt.Sprintf("co.fun.chat.chat.%s", channelName), 
    //   map[string]interface{}{"text": "Hello everyone!"})
    ```

### Subscribe to Channel Messages

Receive real-time messages from a channel:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();

    // Subscribe to messages in a channel
    const unsubscribe = await ws.subscribe(
      `co.fun.chat.chat.${channelName}`,
      (eventType, message) => {
        console.log(`Message: ${message.text}`);
        console.log(`From: ${message.author.nick}`);
      }
    );

    // Later: stop listening
    unsubscribe();
    ```

=== "Go"

    ```go
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }

    // ws.Subscribe(fmt.Sprintf("co.fun.chat.chat.%s", channelName),
    //   func(eventType int, message interface{}) {
    //     fmt.Printf("Message: %v\n", message)
    //   })
    ```

### Get Message History

Retrieve past messages from a channel:

=== "TypeScript"

    ```typescript
    const feed = client.chats.messages(channelName);

    // Get the most recent 20 messages
    for await (const message of feed.scroll()) {
      console.log(`${message.author.nick}: ${message.text}`);
    }
    ```

=== "Go"

    ```go
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }

    // ws.Call("co.fun.chat.list_messages", {
    //   "chat_name": channelName,
    //   "limit": 20
    // })
    ```

## Discovering Channels

### Get Your Channels

Retrieve all channels you're a member of:

=== "TypeScript"

    ```typescript
    // Async generator yields channels as they arrive
    for await (const channel of client.chats.getChannels()) {
      console.log(`Channel: ${channel.name}`);
      console.log(`Type: ${channel.type}`);
    }
    ```

=== "Go"

    ```go
    channels, err := client.GetChannels(compose.UserJoinedChats(userId))
    if err != nil {
      panic(err)
    }
    for _, ch := range channels {
      fmt.Printf("Channel: %s\n", ch.Name)
    }
    ```

### Search for Public Channels

Find open channels by query:

=== "TypeScript"

    ```typescript
    // Async generator; yields channels as pages arrive
    for await (const channel of client.chats.queryChannels("memes", 50)) {
      console.log(`Found: ${channel.name}`);
    }
    ```

=== "Go"

    ```go
    for result := range client.IterChannelsQuery("memes") {
      if result.Err != nil {
        panic(result.Err)
      }
      fmt.Printf("Found: %s\n", result.V.Name)
    }
    ```

### Get a Specific Channel

Fetch details for a channel by name:

=== "TypeScript"

    ```typescript
    const channel = await client.chats.getChannel("channel_name");
    console.log(`Channel: ${channel.name}`);
    console.log(`Members: ${channel.member_count}`);
    ```

=== "Go"

    ```go
    ws, err := client.Chat()
    if err != nil {
      panic(err)
    }
    // ws.Call("co.fun.chat.get_chat", {"chat_name": "channel_name"})
    ```

## Managing Channel Members

### Invite Users to a Channel

Add users to a channel:

=== "TypeScript"

    ```typescript
    await client.chats.inviteUserToChannel(
      "channel_name",
      ["user1_id", "user2_id"]
    );
    ```

=== "Go"

    ```go
    // ws.Call("co.fun.chat.invite_users", {
    //   "chat_name": "channel_name",
    //   "user_ids": ["user1_id", "user2_id"]
    // })
    ```

### Remove a User from a Channel

Kick a user out:

=== "TypeScript"

    ```typescript
    await client.chats.kickUserFromChannel("channel_name", "user_id");
    ```

=== "Go"

    ```go
    // ws.Call("co.fun.chat.kick_member", {
    //   "chat_name": "channel_name",
    //   "user_id": "user_id"
    // })
    ```

## Subscribing to Channel Events

Get real-time notifications about channel changes:

=== "TypeScript"

    ```typescript
    const ws = await client.chat();

    // Subscribe to your channels changing
    await ws.subscribe(`co.fun.chat.user.${userId}.chats`, (eventType, event) => {
      console.log("Channels changed:");
      console.log(event.chats);
    });
    ```

## Practical Example: Start a Group Chat

=== "TypeScript"

    ```typescript
    import { v4 as uuid } from "uuid";

    const client = new iFunnyClient({
      basic: basicToken,
      bearer: bearerToken,
    });

    async function startGroupChat() {
      const channelName = uuid();

      const channel = await client.chats.createChannel(
        2, // Private group
        "Game Night Planning",
        channelName,
        "Let's plan our game night!"
      );

      // Invite friends
      await client.chats.inviteUserToChannel(channelName, [
        "alice_id",
        "bob_id",
        "charlie_id",
      ]);

      // Subscribe to messages
      const ws = await client.chat();
      await ws.subscribe(
        `co.fun.chat.chat.${channelName}`,
        (_, message) => {
          console.log(`${message.author.nick}: ${message.text}`);
        }
      );

      // Send a message
      await ws.publish(`co.fun.chat.chat.${channelName}`, {
        text: "Hey everyone! Who's ready to game?",
      });

      console.log("Group chat created and message sent!");
    }

    startGroupChat().catch(console.error);
    ```

=== "Go"

    ```go
    import "github.com/google/uuid"

    func startGroupChat() {
      channelName := uuid.New().String()

      ws, err := client.Chat()
      if err != nil {
        panic(err)
      }

      // Create channel via WAMP RPC
      // ws.Call("co.fun.chat.new_chat", ...)

      // Invite friends
      // ws.Call("co.fun.chat.invite_users", ...)

      // Subscribe to messages
      // ws.Subscribe(fmt.Sprintf("co.fun.chat.chat.%s", channelName), ...)

      // Publish a message
      // ws.Publish(fmt.Sprintf("co.fun.chat.chat.%s", channelName), ...)

      fmt.Println("Group chat created!")
    }
    ```

## Disconnecting from Chat

When you're done with chat operations, disconnect gracefully:

=== "TypeScript"

    ```typescript
    client.disconnectChat();
    ```

=== "Go"

    ```go
    ws.Close()
    ```

## Next Steps

- **Trust and safety:** [Trust and Safety](trust-and-safety.md) to manage moderation
- **Explore channel WAMP procedures:** [Chats & DMs Reference](../reference/api/wamp/chats-dms.md)
- **Full WAMP reference:** [WAMP Protocol Reference](../reference/api/wamp/index.md)
