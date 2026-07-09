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

    // Present only on `success`.
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

    // Present only on `success`.
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

    // Present only on `success`.
    type TaskResult struct {
    	Cid *string `json:"cid,omitempty"`
    }
    ```
