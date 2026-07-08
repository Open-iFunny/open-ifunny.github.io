=== "JSON"

    ```json
    // SmileComment423Response
    "SmileComment423Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type SmileComment423Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type SmileComment423Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
