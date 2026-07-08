---
description: Authentication and authorization
---

# 🔑 OAuth2

Authentication and authorization

{% swagger method="post" path="/users" baseUrl="https://api.ifunny.mobi/v4" summary="Register Account" %}

{% swagger-description %}
Create a new account on iFunny.

**Auth:** BasicAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface RegisterAccountRequest {
  reg_type: 'pwd';
  nick: string;
  email: string;
  password: string;
  accepted_mailing: 0 | 1;
}
```
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="body" name="reg_type" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="nick" type="String" required="true" %}
Username for the account
{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Email for the account
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Password for the account
{% endswagger-parameter %}

{% swagger-parameter in="body" name="accepted_mailing" type="Number" required="true" %}
0 for no, 1 for yes

One of: 0, 1
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Account Created" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface RegisterAccount200Response {
  data?: RegisterAccount200Data;
  status?: 200;
}

interface RegisterAccount200Data {
  id?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RegisterAccount200Response struct {
	Data RegisterAccount200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type RegisterAccount200Data struct {
	Id *string `json:"id,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Bad Request" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type RegisterAccount400Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RegisterAccount400Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Invalid Email or Email Already Exists" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type RegisterAccount403Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RegisterAccount403Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/oauth2/login" baseUrl="https://api.ifunny.mobi/v4" summary="Login / Refresh Bearer Token" %}

{% swagger-description %}
This single path serves two grant types in the source documentation:

- `grant_type=password` — log in with username/password using a Basic token
  (see Basic Token Generation guide).
- Refresh — exchange an existing Bearer token for a new one via the `token` field.

**Auth:** BasicAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
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
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-response status="200: OK" description="Successfully logged in / refreshed" %}
{% tabs %}
{% tab title="JSON" %}
```json
// LoginOrRefresh200Response
{
  "access_token"?: "string",
  "token_type"?: "bearer",
  "expires_in"?: "integer"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface LoginOrRefresh200Response {
  access_token?: string;
  token_type?: 'bearer';
  expires_in?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type LoginOrRefresh200Response struct {
	AccessToken *string `json:"access_token,omitempty"`
	TokenType *string `json:"token_type,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid Credentials" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type LoginOrRefresh400Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type LoginOrRefresh400Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Captcha Error" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
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
{% endtab %}

{% tab title="Go" %}
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
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="429: Too Many Requests" description="Too Many Requests" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
type LoginOrRefresh429Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type LoginOrRefresh429Response Error

type Error struct {
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/oauth2/revoke" baseUrl="https://api.ifunny.mobi/v4" summary="Revoke Access Token" %}

{% swagger-description %}
Revokes a created access token. This will log out every device using this token.

**Auth:** BasicAuth + ProjectId

**Request Body (application/x-www-form-urlencoded)**

{% tabs %}
{% tab title="JSON" %}
```json
// RevokeAccessTokenRequest
{
  "token": "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface RevokeAccessTokenRequest {
  token: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RevokeAccessTokenRequest struct {
	Token string `json:"token"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="body" name="token" type="String" required="true" %}
Bearer Token to revoke
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Token successfully revoked" %}
{% tabs %}
{% tab title="JSON" %}
```json
// RevokeAccessToken200Response
{
  "status"?: "200"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface RevokeAccessToken200Response {
  status?: 200;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type RevokeAccessToken200Response struct {
	Status *int `json:"status,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/nicks/available" baseUrl="https://api.ifunny.mobi/v4" summary="Check Nick Availability" %}

{% swagger-description %}
Check whether a nickname is available for signup or account rename.
Returns `{available: boolean}`.

**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// CheckNickAvailabilityQuery
{
  "nick": "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface CheckNickAvailabilityQuery {
  nick: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type CheckNickAvailabilityQuery struct {
	Nick string `query:"nick"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="nick" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Availability result" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface CheckNickAvailability200Response {
  data?: CheckNickAvailability200Data;
  status?: 200;
}

interface CheckNickAvailability200Data {
  available?: boolean;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type CheckNickAvailability200Response struct {
	Data CheckNickAvailability200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CheckNickAvailability200Data struct {
	Available *bool `json:"available,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/emails/available" baseUrl="https://api.ifunny.mobi/v4" summary="Check Email Availability" %}

{% swagger-description %}
Check whether an email address is available for signup or account
rebinding. Returns `{available: boolean}`.

**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

**Query Parameters**

{% tabs %}
{% tab title="JSON" %}
```json
// CheckEmailAvailabilityQuery
{
  "email": "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface CheckEmailAvailabilityQuery {
  email: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type CheckEmailAvailabilityQuery struct {
	Email string `query:"email"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-description %}

{% swagger-parameter in="query" name="email" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Availability result" %}
{% tabs %}
{% tab title="JSON" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface CheckEmailAvailability200Response {
  data?: CheckEmailAvailability200Data;
  status?: 200;
}

interface CheckEmailAvailability200Data {
  available?: boolean;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type CheckEmailAvailability200Response struct {
	Data CheckEmailAvailability200Data `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type CheckEmailAvailability200Data struct {
	Available *bool `json:"available,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% endswagger %}
