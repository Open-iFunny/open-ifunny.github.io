---
description: Collection of methods to interact with the client or user account
---

# 🤖 Client



{% swagger method="get" path="/account" baseUrl="https://api.ifunny.mobi/v4" summary="Fetch Profile" %}
{% swagger-description %}
Fetch account information for the client
{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
Bearer Token
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Account Information" %}
```typescript
{
    data: ClientProfile,
    status: 200
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid Grant" %}
```typescript
{
    status: 401;
    error: "invalid_grant";
    error_description: "token is expired";
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/account" baseUrl="https://api.ifunny/mobi/v4" summary="Edit Profile" %}
{% swagger-description %}
Edit profile information for the client
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer Token
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="String" required="true" %}
"application/x-www-form-urlencoded"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="nick" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="about" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="sex" type="String" %}
"male" | "female" | "other"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="birth_date" type="String" %}
"YYYY-MM-DD"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="hometown" type="String" %}
Empty if none
{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" type="String" %}
Empty if none
{% endswagger-parameter %}

{% swagger-parameter in="body" name="messaging_privacy_status" type="String" %}
"public" | "subscribers" | "closed"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="is_private" type="Number" %}
1: True - 0: False
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully edited" %}
```json
{
    "status": 200
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Expired Token" %}
```json
{
  "status": 401,
  "error": "invalid_grant",
  "error_description": "token is expired"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/account/email" baseUrl="https://api.ifunny.mobi/v4" summary="Update Email" %}
{% swagger-description %}
Update the email address associated with the client's account
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" required="true" name="ifunny-project-id" type="String" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="String" %}
"application/x-www-form-urlencoded"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" type="String" %}
URL Encoded Email Address
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully Updated" %}
```typescript
{
    status: 200
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/account/password_change_request" baseUrl="https://api.ifunny.mobi/v4" summary="Request Password Change" %}
{% swagger-description %}
Request an email to be sent to change a password
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="String" required="true" %}
"application/x-www-form-urlencoded"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" type="String" %}
URL encoded email address
{% endswagger-parameter %}
{% endswagger %}

{% swagger method="get" path="/users/my/comments" baseUrl="https://api.ifunny/mobi/v4" summary="Client Commments" %}
{% swagger-description %}
Paginate through comments made by the Client
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
(Default = 30)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Client Comments" %}
```typescript
{
    data: {
        comments: {
            items: Comment[];
            paging: {
                cursors: {
                    prev: string; // UNIX in Seconds - "1632702392";
                    next: string; // Unix in Seconds - "1632702392";
                };
                hasPrev: boolean;
                hasNext: boolean;
            };
        };
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/users/my/unread_chat_messages" baseUrl="https://api.ifunny.mobi/v4" summary="Unread Messages" %}
{% swagger-description %}
Fetch the amount of unread messages the user has
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Unread message count" %}
```typescript
{
    data: {
        unread_messages: number;
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/users/my/appeals" baseUrl="https://api.ifunny.mobi/v4" summary="Client Appeals" %}
{% swagger-description %}
Fetch the client ban/strike appeals
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Appeal Array" %}
<pre class="language-typescript"><code class="lang-typescript">{
    data: {
        appeals: <a data-footnote-ref href="#user-content-fn-1">Appeal</a>[]
    },
    status: 200
}
</code></pre>
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/users/my/chat_invitations" baseUrl="https://api.ifunny.mobi/v4" summary="Chat Invitations" %}
{% swagger-description %}
Fetch the client's current pending chat invites
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Chat Invites" %}
```typescript
{
    data: {
        chats: Chat[];
    };
    status: 200
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/users/my/content_smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Client Smiled Content" %}
{% swagger-description %}
Paginate through content that is smiled by the client
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
(Default = 30)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Smiled Content" %}
```typescript
{
    data: {
        content: {
            items: Content[];
            paging: {
                cursors: {
                    hasPrev: number;
                    hasNext: number;
                };
            };
        };
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/counters" baseUrl="https://api.ifunny.mobi/v4" summary="Notification Counters" %}
{% swagger-description %}
Fetch the notification counters for the client
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="is_new" type="Boolean" %}
Doens't seem to affect responses
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Client Counters" %}
```typescript
{
    data: {
        featured: number;
        subscriptions: number;
        collective: number;
        news: number;
        map: number;
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

[^1]: [#appeal](../data-types/client-types.md#appeal "mention")
