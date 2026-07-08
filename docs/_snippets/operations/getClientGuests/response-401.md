=== "JSON"

    ```json
    // GetClientGuests401Response
    "GetClientGuests401Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetClientGuests401Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetClientGuests401Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
