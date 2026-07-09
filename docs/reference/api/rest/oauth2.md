---
title: OAuth2
description: "Authentication and authorization"
---

# 🔑 OAuth2

Authentication and authorization

### Register Account  {: #op-registeraccount }

**`POST /users`**

Create a new account on iFunny.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `reg_type` | `String` | yes |  |
    | `nick` | `String` | yes | Username for the account |
    | `email` | `String` | yes | Email for the account |
    | `password` | `String` | yes | Password for the account |
    | `accepted_mailing` | `Number` | yes | 0 for no, 1 for yes — One of: 0, 1 |

=== "JSON"

    ```json
    // RegisterAccountRequest
    {
      "reg_type": "pwd",
      "nick": "string",
      "email": "string",
      "password": "string",
      "accepted_mailing": "enum(0, 1)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RegisterAccountRequest {
      reg_type: 'pwd';
      nick: string;
      email: string;
      password: string;
      accepted_mailing: 0 | 1;
    }
    ```

=== "Go"

    ```go
    type RegisterAccountRequest struct {
    	RegType string `json:"reg_type"`
    	Nick string `json:"nick"`
    	Email string `json:"email"`
    	Password string `json:"password"`
    	AcceptedMailing registerAccountRequestAcceptedMailingKind `json:"accepted_mailing"`
    }

    type registerAccountRequestAcceptedMailingKind int

    const (
    	REGISTER_ACCOUNT_REQUEST_ACCEPTED_MAILING_0 = registerAccountRequestAcceptedMailingKind(iota)
    	REGISTER_ACCOUNT_REQUEST_ACCEPTED_MAILING_1 = registerAccountRequestAcceptedMailingKind(iota)
    )
    ```

#### Responses

##### `200 OK` — Account Created

=== "JSON"

    ```json
    // RegisterAccount200Response
    {
      "data"?: "RegisterAccount200Data",
      "status"?: "200"
    }

    // RegisterAccount200Data
    {
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RegisterAccount200Response {
      data?: RegisterAccount200Data;
      status?: 200;
    }

    interface RegisterAccount200Data {
      id?: string;
    }
    ```

=== "Go"

    ```go
    type RegisterAccount200Response struct {
    	Data RegisterAccount200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type RegisterAccount200Data struct {
    	Id *string `json:"id,omitempty"`
    }
    ```

##### `400 Bad Request` — Bad Request

=== "JSON"

    ```json
    // RegisterAccount400Response
    "RegisterAccount400Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type RegisterAccount400Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type RegisterAccount400Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `403 Forbidden` — Invalid Email or Email Already Exists

=== "JSON"

    ```json
    // RegisterAccount403Response
    "RegisterAccount403Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type RegisterAccount403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type RegisterAccount403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Login / Refresh Bearer Token  {: #op-loginorrefresh }

**`POST /oauth2/login`**

This single path serves two grant types in the source documentation:

- `grant_type=password` — log in with username/password using a Basic token
  (see Basic Token Generation guide).
- Refresh — exchange an existing Bearer token for a new one via the `token` field.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId

#### Request body (`application/x-www-form-urlencoded`)

=== "JSON"

    ```json
    // LoginOrRefreshRequest
    "LoginOrRefreshRequest": "PasswordGrant | RefreshGrant"

    // PasswordGrant
    {
      "username": "string",
      "password": "string",
      "grant_type": "password"
    }

    // RefreshGrant
    {
      "token": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    type LoginOrRefreshRequest = PasswordGrant | RefreshGrant;

    interface PasswordGrant {
      username: string;
      password: string;
      grant_type: 'password';
    }

    interface RefreshGrant {
      token: string;
    }
    ```

=== "Go"

    ```go
    type LoginOrRefreshRequest PasswordGrant /* or */ RefreshGrant

    type PasswordGrant struct {
    	Username string `json:"username"`
    	Password string `json:"password"`
    	GrantType string `json:"grant_type"`
    }

    type RefreshGrant struct {
    	Token string `json:"token"`
    }
    ```

#### Responses

##### `200 OK` — Successfully logged in / refreshed

=== "JSON"

    ```json
    // LoginOrRefresh200Response
    {
      "access_token"?: "string",
      "token_type"?: "bearer",
      "expires_in"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface LoginOrRefresh200Response {
      access_token?: string;
      token_type?: 'bearer';
      expires_in?: number;
    }
    ```

=== "Go"

    ```go
    type LoginOrRefresh200Response struct {
    	AccessToken *string `json:"access_token,omitempty"`
    	TokenType *string `json:"token_type,omitempty"`
    	ExpiresIn *int `json:"expires_in,omitempty"`
    }
    ```

##### `400 Bad Request` — Invalid Credentials

=== "JSON"

    ```json
    // LoginOrRefresh400Response
    "LoginOrRefresh400Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type LoginOrRefresh400Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type LoginOrRefresh400Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `403 Forbidden` — Captcha Error

=== "JSON"

    ```json
    // LoginOrRefresh403Response
    "LoginOrRefresh403Response": "CaptchaError"

    // CaptchaError
    {
      "error"?: "captcha_required",
      "error_description"?: "Human verification is required",
      "data"?: "CaptchaErrorData",
      "status"?: "403"
    }

    // CaptchaErrorData
    {
      "captcha_url"?: "string",
      "type"?: "enum(fun_captcha, recaptcha)"
    }
    ```

=== "TypeScript"

    ```typescript
    type LoginOrRefresh403Response = CaptchaError;

    interface CaptchaError {
      error?: 'captcha_required';
      error_description?: 'Human verification is required';
      data?: CaptchaErrorData;
      status?: 403;
    }

    interface CaptchaErrorData {
      captcha_url?: string;
      type?: 'fun_captcha' | 'recaptcha';
    }
    ```

=== "Go"

    ```go
    type LoginOrRefresh403Response CaptchaError

    type CaptchaError struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Data CaptchaErrorData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CaptchaErrorData struct {
    	CaptchaUrl *string `json:"captcha_url,omitempty"`
    	Type *string `json:"type,omitempty"`
    }
    ```

##### `429 Too Many Requests` — Too Many Requests

=== "JSON"

    ```json
    // LoginOrRefresh429Response
    "LoginOrRefresh429Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type LoginOrRefresh429Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type LoginOrRefresh429Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Revoke Access Token  {: #op-revokeaccesstoken }

**`POST /oauth2/revoke`**

Revokes a created access token. This will log out every device using this token.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId

#### Request body (`application/x-www-form-urlencoded`)

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `token` | `String` | yes | Bearer Token to revoke |

=== "JSON"

    ```json
    // RevokeAccessTokenRequest
    {
      "token": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RevokeAccessTokenRequest {
      token: string;
    }
    ```

=== "Go"

    ```go
    type RevokeAccessTokenRequest struct {
    	Token string `json:"token"`
    }
    ```

#### Responses

##### `200 OK` — Token successfully revoked

=== "JSON"

    ```json
    // RevokeAccessToken200Response
    {
      "status"?: "200"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RevokeAccessToken200Response {
      status?: 200;
    }
    ```

=== "Go"

    ```go
    type RevokeAccessToken200Response struct {
    	Status *int `json:"status,omitempty"`
    }
    ```

### Check Nick Availability  {: #op-checknickavailability }

**`GET /nicks/available`**

Check whether a nickname is available for signup or account rename.
Returns `{available: boolean}`.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `nick` | `String` | yes |  |

=== "JSON"

    ```json
    // CheckNickAvailabilityQuery
    {
      "nick": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CheckNickAvailabilityQuery {
      nick: string;
    }
    ```

=== "Go"

    ```go
    type CheckNickAvailabilityQuery struct {
    	Nick string `query:"nick"`
    }
    ```

#### Responses

##### `200 OK` — Availability result

=== "JSON"

    ```json
    // CheckNickAvailability200Response
    {
      "data"?: "CheckNickAvailability200Data",
      "status"?: "200"
    }

    // CheckNickAvailability200Data
    {
      "available"?: "boolean"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CheckNickAvailability200Response {
      data?: CheckNickAvailability200Data;
      status?: 200;
    }

    interface CheckNickAvailability200Data {
      available?: boolean;
    }
    ```

=== "Go"

    ```go
    type CheckNickAvailability200Response struct {
    	Data CheckNickAvailability200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CheckNickAvailability200Data struct {
    	Available *bool `json:"available,omitempty"`
    }
    ```

### Check Email Availability  {: #op-checkemailavailability }

**`GET /emails/available`**

Check whether an email address is available for signup or account
rebinding. Returns `{available: boolean}`.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `email` | `String` | yes |  |

=== "JSON"

    ```json
    // CheckEmailAvailabilityQuery
    {
      "email": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CheckEmailAvailabilityQuery {
      email: string;
    }
    ```

=== "Go"

    ```go
    type CheckEmailAvailabilityQuery struct {
    	Email string `query:"email"`
    }
    ```

#### Responses

##### `200 OK` — Availability result

=== "JSON"

    ```json
    // CheckEmailAvailability200Response
    {
      "data"?: "CheckEmailAvailability200Data",
      "status"?: "200"
    }

    // CheckEmailAvailability200Data
    {
      "available"?: "boolean"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CheckEmailAvailability200Response {
      data?: CheckEmailAvailability200Data;
      status?: 200;
    }

    interface CheckEmailAvailability200Data {
      available?: boolean;
    }
    ```

=== "Go"

    ```go
    type CheckEmailAvailability200Response struct {
    	Data CheckEmailAvailability200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CheckEmailAvailability200Data struct {
    	Available *bool `json:"available,omitempty"`
    }
    ```
