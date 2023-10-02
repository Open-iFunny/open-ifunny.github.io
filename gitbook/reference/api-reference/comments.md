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
