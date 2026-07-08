=== "JSON"

    ```json
    // UploadContent202Response
    {
      "data"?: "UploadContent202Data",
      "status"?: "202"
    }

    // UploadContent202Data
    {
      "id"?: "string",
      "type"?: "content_uploading",
      "state"?: "enum(pending, failure, success)",
      "retry_after"?: "integer",
      "result"?: "UploadContent202DataResult",
      "error"?: "string",
      "error_description"?: "string"
    }

    // UploadContent202DataResult
    {
      "cid"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UploadContent202Response {
      data?: UploadContent202Data;
      status?: 202;
    }

    interface UploadContent202Data {
      id?: string;
      type?: 'content_uploading';
      state?: 'pending' | 'failure' | 'success';
      retry_after?: number;
      result?: UploadContent202DataResult;
      error?: string;
      error_description?: string;
    }

    interface UploadContent202DataResult {
      cid?: string;
    }
    ```

=== "Go"

    ```go
    type UploadContent202Response struct {
    	Data UploadContent202Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type UploadContent202Data struct {
    	Id *string `json:"id,omitempty"`
    	Type *string `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	RetryAfter *int `json:"retry_after,omitempty"`
    	Result UploadContent202DataResult `json:"result,omitempty"`
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    }

    type UploadContent202DataResult struct {
    	Cid *string `json:"cid,omitempty"`
    }
    ```
