---
description: Manage account security, bans, appeals, reporting, blocking, and moderation
---

# Trust and Safety

iFunny enforces community guidelines through bans, strikes, and appeals. Learn how to check your account status, appeal moderation decisions, report users and content, and manage your safety settings.

## Understanding Account Status

### Check Your Ban Status

Always verify your account status before making requests. A banned account has restricted access:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/account \
      -H "authorization: Bearer $BEARER_TOKEN" | jq '{is_banned: .is_banned, have_unnotified_bans: .have_unnotified_bans}'
    ```

=== "TypeScript"

    ```typescript
    import { iFunnyClient } from "ifunny.ts";

    const client = new iFunnyClient({
      basic: basicToken,
      bearer: bearerToken,
    });

    await client.fetch();
    const profile = client.payload;

    if (profile.is_banned) {
      console.log("Your account is currently banned");
    }

    if (profile.have_unnotified_bans) {
      console.log("You have new bans that need acknowledgment");
    }
    ```

=== "Go"

    ```go
    client, err := ifunny.MakeClient(bearerToken, ua)
    if err != nil {
      panic(err)
    }

    if client.Self.IsBanned {
      fmt.Println("Your account is currently banned")
    }

    if client.Self.HaveUnnotifiedBans {
      fmt.Println("You have new bans that need acknowledgment")
    }
    ```

### Account Flags

The `Account` response includes several flags you should monitor:

- **is_banned** — You currently have an active ban
- **have_unnotified_bans** — New ban(s) need acknowledgment
- **safe_mode** — Content filtering is enabled
- **need_account_setup** — Your profile is incomplete
- **is_blocked_in_messenger** — You're blocked from using chat

If any of these flags are true, your account may have limited functionality.

## Ban Information

### View Your Ban History

Retrieve all bans and appeals on your account:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/users/my/appeals \
      -H "authorization: Bearer $BEARER_TOKEN" | jq '.data'
    ```

=== "TypeScript"

    ```typescript
    // Note: iFunny.ts does not expose a high-level API for fetching bans.
    // Use the REST API directly:
    const response = await client.instance.get("/users/my/appeals");
    const appeals = response.data.data;

    appeals.forEach(appeal => {
      console.log(`Ban: ${appeal.reason}`);
      console.log(`Expires: ${appeal.expires_at}`);
      console.log(`Status: ${appeal.status}`);
    });
    ```

=== "Go"

    ```go
    // Use the REST API directly via client.RequestJSON()
    ```

### Understanding Ban Information

Each ban object includes:

- **id** — Unique ban identifier
- **reason** — Why you were banned (e.g., "harassment", "spam")
- **created_at** — When the ban was issued
- **expires_at** — When the ban ends (null if permanent)
- **appeal_status** — Current appeal status
- **appeal_message** — Your appeal text (if submitted)

## Appealing Bans

### Submit an Appeal

If you believe a ban was issued in error, submit an appeal:

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/users/my/appeals \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"ban_id": "ban_123", "appeal_message": "I believe this ban was a mistake..."}' \
      | jq '.data.status'
    ```

=== "TypeScript"

    ```typescript
    // Use REST API directly
    const response = await client.instance.post("/users/my/appeals", {
      ban_id: "ban_123",
      appeal_message: "I believe this ban was a mistake. I did not violate the guidelines...",
    });

    console.log(`Appeal submitted. Status: ${response.data.data.status}`);
    ```

=== "Go"

    ```go
    // Use REST API directly via client.RequestJSON()
    ```

### Appeal Statuses

Appeals follow a workflow:

| Status | Meaning |
|--------|---------|
| pending | Awaiting review by moderation team |
| accepted | Appeal approved; ban lifted |
| rejected | Appeal denied; ban remains |

Check your appeals regularly to see if they've been reviewed.

## Reporting Users and Content

### Report a User

Flag a user for violating community guidelines:

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/users/USER_ID/report \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"reason": "harassment"}' \
      | jq '.data.status'
    ```

=== "TypeScript"

    ```typescript
    // Use REST API directly
    const response = await client.instance.post(
      `/users/USER_ID/report`,
      {
        reason: "harassment", // or "spam", "impersonation", etc.
      }
    );

    console.log("User reported successfully");
    ```

=== "Go"

    ```go
    // Use REST API directly
    ```

### Report Content

Flag a post for violating guidelines:

=== "cURL"

    ```bash
    curl -X POST https://api.ifunny.mobi/content/POST_ID/report \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"reason": "inappropriate content"}' \
      | jq '.data.status'
    ```

=== "TypeScript"

    ```typescript
    const response = await client.instance.post(
      `/content/POST_ID/report`,
      {
        reason: "inappropriate content", // or other reasons
      }
    );

    console.log("Content reported successfully");
    ```

=== "Go"

    ```go
    // Use REST API directly
    ```

### Report Reasons

Common report reasons include:

- **spam** — Advertising, repetitive content, scams
- **harassment** — Bullying, harassment, targeted abuse
- **hate** — Hate speech or discrimination
- **inappropriate** — Adult content, violence, graphic material
- **impersonation** — Pretending to be someone else
- **copyright** — Copyright infringement

## Managing Your Block List

### View Blocked Users

See all users you've blocked:

=== "cURL"

    ```bash
    curl https://api.ifunny.mobi/users/my/blocked \
      -H "authorization: Bearer $BEARER_TOKEN" | jq '.data'
    ```

=== "TypeScript"

    ```typescript
    // Use REST API directly
    const response = await client.instance.get("/users/my/blocked");
    const blockedUsers = response.data.data;

    blockedUsers.forEach(user => {
      console.log(`Blocked: ${user.nick}`);
      console.log(`Indirect blocks: ${user.indirectly_blocked_users_count}`);
    });
    ```

=== "Go"

    ```go
    // Use REST API directly
    ```

### Block a User

Prevent a user from interacting with you:

=== "cURL"

    ```bash
    curl -X PUT https://api.ifunny.mobi/users/USER_ID/block \
      -H "authorization: Bearer $BEARER_TOKEN"
    ```

### Unblock a User

Allow a previously blocked user to interact with you:

=== "cURL"

    ```bash
    curl -X DELETE https://api.ifunny.mobi/users/USER_ID/block \
      -H "authorization: Bearer $BEARER_TOKEN"
    ```

When you block a user:
- Their posts don't appear in your feeds
- They can't send you DMs or add you to group chats
- They can't see your posts or profile

### Understanding Indirect Blocks

The `indirectly_blocked_users_count` field indicates transitive blocks. For example:
- You block User A
- User B follows User A
- User A blocks you

In this case, you may be "indirectly blocked" by User A even though you initiated the block.

## Account Settings and Safety

### Safe Mode

Safe mode filters adult and graphic content from your feeds:

=== "cURL"

    ```bash
    curl -X PATCH https://api.ifunny.mobi/account \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"safe_mode": true}'
    ```

### Notification Settings

Control what notifications you receive (mute, digest, real-time):

=== "cURL"

    ```bash
    # Example: Update notification preferences
    curl -X PATCH https://api.ifunny.mobi/account \
      -H "authorization: Bearer $BEARER_TOKEN" \
      -H "content-type: application/json" \
      -d '{"notification_setting": "digest"}'
    ```

## Practical Example: Check and Appeal a Ban

=== "TypeScript"

    ```typescript
    async function checkAndAppealBan() {
      const client = new iFunnyClient({
        basic: basicToken,
        bearer: bearerToken,
      });

      await client.fetch();
      const profile = client.payload;

      if (!profile.is_banned) {
        console.log("Account is not banned");
        return;
      }

      console.log("Account is banned. Fetching ban details...");

      const response = await client.instance.get("/users/my/appeals");
      const appeals = response.data.data;

      const activeBan = appeals.find(
        (a) => a.status !== "accepted" && a.status !== "rejected"
      );

      if (!activeBan) {
        console.log("No active bans found (might be expired)");
        return;
      }

      console.log(`Ban reason: ${activeBan.reason}`);
      console.log(`Expires: ${activeBan.expires_at}`);

      if (activeBan.appeal_status === "pending") {
        console.log("Appeal already submitted, awaiting review");
        return;
      }

      // Submit a new appeal
      const appealResponse = await client.instance.post("/users/my/appeals", {
        ban_id: activeBan.id,
        appeal_message:
          "I believe I did not violate the community guidelines. I will be more careful in the future.",
      });

      console.log(`Appeal submitted! Status: ${appealResponse.data.data.status}`);
    }

    checkAndAppealBan().catch(console.error);
    ```

=== "Go"

    ```go
    func checkAndAppealBan() {
      client, err := ifunny.MakeClient(bearerToken, ua)
      if err != nil {
        panic(err)
      }

      if !client.Self.IsBanned {
        fmt.Println("Account is not banned")
        return
      }

      fmt.Println("Account is banned. Fetching ban details...")

      // Fetch appeals via REST API
      // Use client.RequestJSON() to fetch /users/my/appeals

      // Submit appeal
      // Use client.RequestJSON() to POST /users/my/appeals
    }
    ```

## Community Guidelines Summary

iFunny enforces its Community Guidelines to maintain a safe platform:

- **No harassment or bullying** — Targeted abuse is not tolerated
- **No hate speech** — Discrimination based on protected characteristics
- **No spam** — Repetitive, deceptive, or promotional content
- **No adult content** — Graphic sexual or violent material
- **No impersonation** — Pretending to be someone else
- **Respect intellectual property** — Don't infringe copyrights

Review the full [Community Guidelines](https://www.ifunny.co/about/terms) for details.

## Next Steps

- **Manage relationships:** [Making Friends and Foes](making-friends-and-foes.md) to review your block and follow lists
- **Stay safe in chat:** [Chats and Channels](chats-and-channels.md) to manage your messaging privacy
- **Full API Reference:** [Bans & Appeals Reference](../reference/api/rest/bans-appeals.md)
