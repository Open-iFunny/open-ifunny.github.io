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
