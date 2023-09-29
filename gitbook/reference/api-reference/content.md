# 😂 Content



{% swagger method="get" path="/feeds/featured" baseUrl="https://api.ifunny.mobi/v4" summary="Get features" %}
{% swagger-description %}
Paginate through content in featured.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter required="true" in="header" name="ifunny-project-id" type="String" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
(Default = 30)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="is_new" type="Boolean" %}
Seems to have no effect on responses
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Featured Content" %}
<pre class="language-typescript"><code class="lang-typescript">{
    data: {
        content: {
            items: <a data-footnote-ref href="#user-content-fn-1">Content</a>[];
            paging: {
                cursors: {
                    prev: string; // Content ID
                    next: string; // Content ID
                };
                has_prev: boolean;
                has_next: boolean;
            };
        };
    };
    notifications: {
        counters: {
            featured: number;
            subscriptions: number;
            collective: number;
            news: number;
            map: number;
        };
    };
    status: 200;
}
</code></pre>
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/feeds/collective" baseUrl="https://api.ifunny.mobi/v4" summary="Get Collective" %}
{% swagger-description %}
Paginate through content in collective. Unclear why iFunny made this a POST\
instead of Get
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
(Default = 30)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Collective Content" %}
```typescript
{
    data: {
        content: {
            items: Content[];
            paging: {
                cursors: {
                    prev: string; // Content ID
                    next: string; // Content ID
                };
                has_prev: boolean;
                has_next: boolean;
            };
        };
    };
    notifications: {
        counters: {
            featured: number;
            subscriptions: number;
            collective: number;
            news: number;
            map: number;
        };
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/content/:id" baseUrl="https://api.ifunny.mobi/v4" summary="Get Content by ID" %}
{% swagger-description %}
Fetch content by it's ID
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Content" %}
<pre class="language-typescript"><code class="lang-typescript">{
    data: <a data-footnote-ref href="#user-content-fn-2">Content</a>;
    status: 200;
}
</code></pre>
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/content" baseUrl="https://api.ifunny.mobi/v4" summary="Upload Content" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="String" required="true" %}
"multipart/form-data"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="type" type="String" required="true" %}
[Content Type](#user-content-fn-3)[^3]
{% endswagger-parameter %}

{% swagger-parameter in="body" name="tags" type="String[]" required="true" %}
Array of tags to apply to the post
{% endswagger-parameter %}

{% swagger-parameter in="body" name="video" type="Bytes" %}
Bytes for the video
{% endswagger-parameter %}

{% swagger-response status="202: Accepted" description="Content Upload Pending" %}
This should return "pending". You can check on the status using the tasks endpoint

```typescript
{
  data: {
    id: string; // UUID v1,
    type: "content_uploading";
    state: "pending" | "failure" | "success";

    // Only shows up on "pending"
    retry_after?: 1, // Seconds
    
    // Only shows on "success"
    result?: {
      cid: string; // Content ID of the uploaded post
    };

    // These only show on "failure"
    error?: string;
    error_description?: string;
  };
  status: 202
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/content/:id/republished" baseUrl="https://api.ifunny.mobi/v4" summary="Republish Content" %}
{% swagger-description %}
Republish the content to your account
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Republished ID" %}
```typescript
{
    data: {
        id: string; // ID of republished post
        num_republished: number; // What republish number it is
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/content/:id/republished" baseUrl="https://api.ifunny.mobi/v4" summary="Delete Republish" %}
{% swagger-description %}
If the client has republished the content, this will remove remove it
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Un-republished" %}
```typescript
{
    data: {
        num_republished: number; // What republish number it is
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/content/:id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Smile Content" %}
{% swagger-description %}
Smiles (likes) the content.\
\
\- Using a Bearer will increase the "smiles" in Content Nums.\
\- Using a Basic will increase the "guest\_smiles" in Content Nums.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" type="String" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Content Smiles" %}
```typescript
{
    data: {
        num_smiles: number;
        num_unsmiles: number;
        num_guest_smiles: number; // Increases with Basic Token smiles
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/content/:id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Remove Content Smile" %}
{% swagger-description %}
Remove the Client's smile on the content\
\- **NOT** the same as _unsmiling_ the content
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" required="true" name="Authorization" type="String" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="from" type="String" %}
A "Seen" From Tag
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Content Smiles" %}
```typescript
{
    data: {
        num_smiles: number;
        num_unsmiles: number;
        num_guest_smiles: number; // Increases with Basic Token smiles
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/content/:id/unsmiles" baseUrl="https://api.ifunny.mobi/v4" summary="Unsmile Content" %}
{% swagger-description %}
Unsmiles (Dislikes) a content
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="from" type="String" %}
A "Seen" From Tag
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Content Smiles" %}
```typescript
{
    data: {
        num_smiles: number;
        num_unsmiles: number;
        num_guest_smiles: number; // Increases with Basic Token smiles
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/content/:id/unsmiles" baseUrl="https://api.ifunny.mobi/v4" summary="Remove Content Unsmile" %}
{% swagger-description %}
Removes the Client's Unsmile from the Content\
\- **NOT** the same as _smiling_ the Content
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="from" type="String" %}
A "Seen" From Tag
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Content Smiles" %}
```typescript
{
    data: {
        num_smiles: number;
        num_unsmiles: number;
        num_guest_smiles: number; // Increases with Basic Token smiles
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/content/:id/categories" baseUrl="https://api.ifunny.mobi/v4" summary="Add Content Categories" %}
{% swagger-description %}
Add categories to the content
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="categories[]" type="String" required="true" %}
Category IDs you want to apply to the content
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="String" required="true" %}
"application/x-www-form-urlencoded"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Categories Added" %}
```typescript
{
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

[^1]: [#content](../data-types/content-types.md#content "mention")

[^2]: [#content](../data-types/content-types.md#content "mention")

[^3]: [#content-type](../data-types/content-types.md#content-type "mention")
