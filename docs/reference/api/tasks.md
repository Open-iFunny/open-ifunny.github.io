---
title: Tasks
description: "Polling endpoints for asynchronous server-side jobs (e.g. content upload)."
---

# ⏳ Tasks

Polling endpoints for asynchronous server-side jobs (e.g. content upload).

### `GET /tasks/{task_id}` — Get Task Status  {: #op-gettaskstatus }

Poll the status of an asynchronous task returned from a previous call
(e.g. `POST /content` upload). Response shape matches the 202 envelope
returned when the task was created.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `task_id` | `String` | yes | UUID v1 task ID. |

#### Responses

##### `200 OK` — Task status

=== "JSON"

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

=== "TypeScript"

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

=== "Go"

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

##### `404 Not Found` — Not Found

=== "JSON"

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

=== "TypeScript"

    ```typescript
    type GetTaskStatus404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetTaskStatus404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
