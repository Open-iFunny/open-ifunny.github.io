---
description: Collection of API methods for interacting with Comments on iFunny
---

# 💭 Comments



{% swagger method="get" path="/content/:id/comments" baseUrl="https://api.ifunny.mobi/v4" summary="Get Content Comments" %}
{% swagger-description %}
Paginate through comments on some content by it's ID
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

{% swagger-response status="200: OK" description="Comment Pagination" %}
```typescript
{
    data: {
        comments: {
            items: Comment[];
            paging: {
                cursors: {
                    next: string; // "1:1632791852";
                    prev: string; // "5:1632791359";
                };
                hasNext: boolean;
                hasPrev: boolean;
            };    
        };
        content: {
            comments_count: number;
            replies_count: number;
        };
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/content/:content_id/comments/:comment_id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Smile Comment" %}
{% swagger-description %}
Smile a comment by it's ID\
\
_If the comment was unsmiled by the client, this will remove it_
{% endswagger-description %}

{% swagger-parameter in="path" name="content_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="comment_id" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smiles" %}
```typescript
{
    data: {
        num_smiles: number;
        num_unsmiles: number;
    };
    status: 200;
}
```
{% endswagger-response %}

{% swagger-response status="423: Locked" description="Comment already smiled" %}
```typescript
{
    error: "content_already_exists";
    error_description: "Comment is already smiled";
    status: 423;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/content/:content_id/comments/:comment_id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Remove Comment Smile" %}
{% swagger-description %}
Removes the smile on a comment\
\
\- **NOT** the same as _unsmiling_ the Comment
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Comment Smiles" %}
```typescript
{
    data: {
        num_smiles: number;
        num_unsmiles: number;
    };
    status: 200;
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/content/:content_id/comments/:comment_id/smiles" baseUrl="https://api.ifunny.mobi/v4" summary="Scroll Comment Smiles" %}
{% swagger-description %}
Paginate through users that smiled the comment
{% endswagger-description %}

{% swagger-response status="200: OK" description="Comment Smilers" %}
```typescript
{
    data: {
        smiles_count: number;
        users: {
            items: User[];
            paging: {
                cursors: {
                    next: string;
                    prev: string;
                };
                hasNext: boolean;
                hasPrev: boolean;
            };
        };
    };
    statusB: 200;
}
```
{% endswagger-response %}
{% endswagger %}
