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

{% swagger method="post" path="/feeds/collective" baseUrl="https://api.ifunny.mobi/v4" summary="Get Collective" %}
{% swagger-description %}
Paginate through content in collective. Unclear why iFunny made this a POST

\


instead of Get
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" %}
"iFunny"
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
