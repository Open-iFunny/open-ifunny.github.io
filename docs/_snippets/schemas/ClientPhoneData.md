=== "JSON"

    ```json
    // ClientPhoneData
    {
      "code"?: "string",
      "number"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ClientPhoneData {
      code?: string;
      number?: string;
    }
    ```

=== "Go"

    ```go
    type ClientPhoneData struct {
    	Code *string `json:"code,omitempty"`
    	Number *string `json:"number,omitempty"`
    }
    ```
