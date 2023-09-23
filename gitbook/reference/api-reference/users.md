---
description: Collection of API methods for interacting with users
---

# 🫂 Users

{% swagger method="get" path="/users/:id" baseUrl="https://api.ifunny.mobi/v4" summary="Fetch user by ID" %}
{% swagger-description %}
Fetch user information by their unique ID
{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
Basic | Bearer
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="User Data" %}
{% tabs %}
{% tab title="Schema" %}
<pre class="language-typescript"><code class="lang-typescript">{
  data: <a data-footnote-ref href="#user-content-fn-1">User</a>,
  status: 200,
}
</code></pre>
{% endtab %}

{% tab title="Description" %}

{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

[^1]: [#user-info](../data-types/#user-info "mention")
