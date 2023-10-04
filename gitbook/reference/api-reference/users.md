---
description: Collection of API methods for interacting with users
---

# 🫂 Users

{% swagger method="get" path="/search/users" baseUrl="https://api.ifunny.mobi/v4" summary="Search Users" %}
{% swagger-description %}
Search users by nick
{% endswagger-description %}

{% swagger-parameter in="query" name="q" type="String" required="true" %}
Nick to search for
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
(Default = 30)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Possible Users" %}
```typescript
{
    data: {
        num: []; // Haven't observed
        users: User[];
    };
    status: 200;
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Empty Query" %}
```typescript
{
    error: "empty_query";
    error_description: "Empty query";
    status: 400;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/users/:id" baseUrl="https://api.ifunny.mobi/v4" summary="User by ID" %}
{% swagger-description %}
Fetch user profile by their unique ID
{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
The ID of the user
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="User Data" %}
{% tabs %}
{% tab title="Schema" %}
<pre class="language-typescript"><code class="lang-typescript">{
    data: <a data-footnote-ref href="#user-content-fn-1">UserProfile</a>;
<strong>    status: 200;
</strong>}
</code></pre>
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid User Id" %}
```typescript
{
    error: "bad_request";
    error_description: "Invalid user id"
    status: 400;
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="User Not Found" %}
```typescript
{
    error: "not_found";
    error_description: string;
    status: 404;
};
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/users/by_nick/:nick" baseUrl="https://api.ifunny.mobi/v4" summary="User By Nick" %}
{% swagger-description %}
Fetch a user profile by their nick
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorizatoin" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="nick" type="String" required="true" %}
The nick of the user
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="User Profile" %}
<pre class="language-typescript"><code class="lang-typescript">{
    data: <a data-footnote-ref href="#user-content-fn-2">UserProfile</a>;
    status: 200;
}
</code></pre>
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Bad Request" %}
<pre class="language-typescript"><code class="lang-typescript">{
    error: "bad_request" | "invalid_request";
<strong>    error_description: string;
</strong>    status: 400;
};
</code></pre>
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="User Not Found" %}
```typescript
{
    error: "not_found";
    error_description: string;
    status: 404;
};
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/users/:id/subscribers" baseUrl="https://api.ifunny.mobi/v4" summary="Subscribe to User" %}
{% swagger-description %}
Add user to the Client's subscriptions
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Subcribed" %}
```typescript
{
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/users/:id/subscribers" baseUrl="https://api.ifunny.mobi/v4" summary="Unsubscribe to User" %}
{% swagger-description %}
Removes the user from the Client's subscriptions
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Unsubscribed" %}
```typescript
{
    status: 200;
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```typescript
{
    error: "not_found";
    error_description: string;
    status: 404;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/users/:id/updates_subcribers" baseUrl="https://api.ifunny.mobi/v4" summary="Subscribe to User Updates" %}
{% swagger-description %}
Add the user to the Client's "updates" subscriptions\
This will notify the client when the user uploads new content
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Subscribed to Updates" %}
```typescript
{
    status: 200;
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```typescript
{
    error: "not_found";
    error_description: string;
    status: 404;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/users/:id/updates_subscribers" baseUrl="https://api.ifunny.mobi/v4" summary="Unsubscribe to User Updates" %}
{% swagger-description %}
Remove the user from the Client's "updates" subscriptions\
This will stop iFunny notifying the Client when the user uploads new content
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Unsubscribed to Updates" %}
```typescript
{
    status: 200;
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```typescript
{
    error: "not_found";
    error_description: string;
    status: 404;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/timelines/user/:id" baseUrl="https://api.ifunny.mobi/v4" summary="Scroll Timeline" %}
{% swagger-description %}
Paginate through content on the user's timeline\
\
If a Basic token is used, it will only show original content, not republished content\
\
If a Bearer token is used, it will include republished content
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
(Default = 30)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="User Timeline" %}
<pre class="language-typescript"><code class="lang-typescript">{
    data: {
        content: {
            items: <a data-footnote-ref href="#user-content-fn-3">Content</a>[];
            paging: {
                cursors: {
                    prev: string;
                    next: string;
                };
                hasPrev: boolean;
                hasNext: boolean;
            };
        };
    };
    status: 200;
}
</code></pre>
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```typescript
{
    error: "not_found";
    error_description: string;
    status: 404;
}
```
{% endswagger-response %}
{% endswagger %}

[^1]: [#user-profile](../data-types/user-types.md#user-profile "mention")

[^2]: [#user-profile](../data-types/user-types.md#user-profile "mention")&#x20;

[^3]: [#content](../data-types/content-types.md#content "mention")
