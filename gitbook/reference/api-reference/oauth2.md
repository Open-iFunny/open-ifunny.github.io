---
description: API methods in relation to OAuth2
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 🔑 OAuth2



{% hint style="info" %}
These methods only include the headers **REQUIRED** to make the request successfully. This may be changed in the future but in order to save time I will not be including the miscellaneous headers
{% endhint %}

{% swagger method="post" baseUrl="https://api.ifunny.mobi/v4" path="/oauth2/login" summary="Login to iFunny" %}
{% swagger-description %}
This will log you in with a username and password. This requires a Primed Basic Token which can be found here #

[basic-token-generation.md](../basic-token-generation.md "mention")


{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" type="String" %}
Basic Token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" type="String" required="true" %}
Your iFunny email address
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Your iFunny password
{% endswagger-parameter %}

{% swagger-parameter in="body" name="grant_type" type="String" required="true" %}
"password"
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully logged in" %}
{% tabs %}
{% tab title="Schema" %}
```typescript
{
    access_token: "{bearer_token}",
    token_type: "bearer",
    expires_in: 315360000 // In seconds (10 Years)
}
```
{% endtab %}

{% tab title="Description" %}
The `expires_in` field is represented in seconds, which is equivalent to about 10 years
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid Credentials" %}
{% tabs %}
{% tab title="Schema" %}
```json
{
    error: "invalid_grant",
    error_description: "Wrong user credentials",
    status: 400
}
```
{% endtab %}

{% tab title="Description" %}
Typically returned when the username and password is incorrect
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Captcha Error" %}
{% tabs %}
{% tab title="Schema" %}
```typescript
{
  error: "captcha_required",
  error_description: "Human verification is required",
  data: {
    captcha_url: "https://ifunny.co/captcha/{captcha_id}",
    // Recaptcha is used when no user-agent is provided
    type: "fun_captcha" | "recaptcha"
  },
  status: 403
}
```
{% endtab %}

{% tab title="Description" %}
If you've received a Captcha Error, you need to open `data.captcha_url` in a browser, solve the captcha and then attempt the exact same request again within 10 seconds
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="429: Too Many Requests" description="Too many user auths" %}
{% tabs %}
{% tab title="Schema" %}
```typescript
{
    error: "too_many_user_auths",
    error_description: "User auths rate exceed, please try again later.",
    status: 429
}
```
{% endtab %}

{% tab title="Description" %}
Usually returned when the basic token has created too many bearer tokens too quickly. This can be circumvented by generating a new basic token
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/oauth2/login" baseUrl="https://api.ifunny.mobi/v4" summary="Refresh Bearer Token" %}
{% swagger-description %}
In case your Bearer Token has expired or is about to, this refreshes it
{% endswagger-description %}

{% swagger-parameter in="body" name="token" type="String" required="true" %}
Bearer Token
{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
Basic Token
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" type="String" required="true" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully refreshed Bearer" %}
{% tabs %}
{% tab title="Schema" %}
```json
{
    access_token: "{bearer_token}",
    token_type: "bearer",
    expires_in: 315360000 // In seconds (10 Years)
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid Credentials" %}
{% tabs %}
{% tab title="Schema" %}
```json
{
    error: "invalid_grant",
    error_description: "Wrong user credentials",
    status: 400
}
```
{% endtab %}

{% tab title="Description" %}
Typically returned when the username and password is incorrect
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Captcha Error" %}
{% tabs %}
{% tab title="Schema" %}
```json
{
  error: "captcha_required",
  error_description: "Human verification is required",
  data: {
    captcha_url: "https://ifunny.co/captcha/{captcha_id}",
    type: "fun_captcha" | "recaptcha"
  },
  status: 403
}
```
{% endtab %}

{% tab title="Description" %}
If you've received a Captcha Error, you need to open `data.captcha_url` in a browser, solve the captcha and then attempt the exact same request again within 10 seconds
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="429: Too Many Requests" description="" %}
{% tabs %}
{% tab title="Schema" %}
```json
{
    error: "too_many_user_auths",
    error_description: "User auths rate exceed, please try again later.",
    status: 429
}
```
{% endtab %}

{% tab title="Description" %}
Usually returned when the basic token has created too many bearer tokens too quickly. This can be circumvented by generating a new basic token
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/oauth2/revoke" baseUrl="https://api.ifunny.mobi/v4" summary="Revoke Access Token" %}
{% swagger-description %}
Revokes a created access token. This will log out every device using this token.
{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
Basic Token
{% endswagger-parameter %}

{% swagger-parameter in="header" name="ifunny-project-id" required="true" type="String" %}
"iFunny"
{% endswagger-parameter %}

{% swagger-parameter in="body" name="token" type="String" required="true" %}
Bearer Token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
{% tabs %}
{% tab title="Schema" %}
```json
{
    status: 200
}
```
{% endtab %}

{% tab title="Description" %}
The token was successfully revoked and is no longer valid
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}
