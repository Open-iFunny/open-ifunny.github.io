=== "JSON"

    ```json
    // GetUserTimelineByNick404Response
    "GetUserTimelineByNick404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserTimelineByNick404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserTimelineByNick404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
