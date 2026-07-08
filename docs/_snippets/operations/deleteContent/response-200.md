=== "JSON"

    ```json
    // DeleteContent200Response
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
    interface DeleteContent200Response {
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
    type DeleteContent200Response struct {
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
