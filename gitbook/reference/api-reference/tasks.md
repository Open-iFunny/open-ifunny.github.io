---
description: Polling endpoints for asynchronous server-side jobs (e.g. content upload).
---

# ⏳ Tasks

Polling endpoints for asynchronous server-side jobs (e.g. content upload).

{% swagger method="get" path="/tasks/:task_id" baseUrl="https://api.ifunny.mobi/v4" summary="Get Task Status" %}

{% swagger-description %}
Poll the status of an asynchronous task returned from a previous call
(e.g. `POST /content` upload). Response shape matches the 202 envelope
returned when the task was created.

**Auth:** BearerAuth + ProjectId
{% endswagger-description %}

{% swagger-parameter in="path" name="task_id" type="String" required="true" %}
UUID v1 task ID.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Task status" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetTaskStatus200Response
{
  "data"?: "Task",
  "status"?: "200"
}

// Task
{
  "id"?: "string",
  "type"?: "string",
  "state"?: "enum(pending, success, failure)",
  "retry_after"?: "integer",
  "result"?: "TaskResult",
  "error"?: "string",
  "error_description"?: "string"
}

// TaskResult
{
  "cid"?: "string"
}
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
interface GetTaskStatus200Response {
  data?: Task;
  status?: 200;
}

interface Task {
  id?: string;
  type?: string;
  state?: 'pending' | 'success' | 'failure';
  retry_after?: number;
  result?: TaskResult;
  error?: string;
  error_description?: string;
}

interface TaskResult {
  cid?: string;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetTaskStatus200Response struct {
	Data Task `json:"data,omitempty"`
	Status *int `json:"status,omitempty"`
}

type Task struct {
	Id *string `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
	State *string `json:"state,omitempty"`
	RetryAfter *int `json:"retry_after,omitempty"`
	Result TaskResult `json:"result,omitempty"`
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
}

type TaskResult struct {
	Cid *string `json:"cid,omitempty"`
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
{% tabs %}
{% tab title="JSON" %}
```json
// GetTaskStatus404Response
"GetTaskStatus404Response": "Error"

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
type GetTaskStatus404Response = Error;

interface Error {
  error?: string;
  error_description?: string;
  status?: number;
}
```
{% endtab %}

{% tab title="Go" %}
```go
type GetTaskStatus404Response Error

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
