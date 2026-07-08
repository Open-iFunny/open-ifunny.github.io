=== "JSON"

    ```json
    // RegisterAccount200Response
    {
      "data"?: "RegisterAccount200Data",
      "status"?: "200"
    }

    // RegisterAccount200Data
    {
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RegisterAccount200Response {
      data?: RegisterAccount200Data;
      status?: 200;
    }

    interface RegisterAccount200Data {
      id?: string;
    }
    ```

=== "Go"

    ```go
    type RegisterAccount200Response struct {
    	Data RegisterAccount200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type RegisterAccount200Data struct {
    	Id *string `json:"id,omitempty"`
    }
    ```
