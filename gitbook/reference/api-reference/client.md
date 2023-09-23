---
description: Collection of methods to interact with the client or user account
---

# 🤖 Client



{% swagger method="get" path="/account" baseUrl="https://api.ifunny.mobi/v4" summary="Gets more information about the account" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
Bearer Token
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="The account information" %}
{% tabs %}
{% tab title="Schema" %}
```json
// Some code
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}
