=== "JSON"

    ```json
    // UnsmileComment403Response
    "UnsmileComment403Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type UnsmileComment403Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnsmileComment403Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
