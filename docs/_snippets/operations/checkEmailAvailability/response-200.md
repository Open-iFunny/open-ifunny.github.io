=== "JSON"

    ```json
    // CheckEmailAvailability200Response
    {
      "data"?: "CheckEmailAvailability200Data",
      "status"?: "200"
    }

    // CheckEmailAvailability200Data
    {
      "available"?: "boolean"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CheckEmailAvailability200Response {
      data?: CheckEmailAvailability200Data;
      status?: 200;
    }

    interface CheckEmailAvailability200Data {
      available?: boolean;
    }
    ```

=== "Go"

    ```go
    type CheckEmailAvailability200Response struct {
    	Data CheckEmailAvailability200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CheckEmailAvailability200Data struct {
    	Available *bool `json:"available,omitempty"`
    }
    ```
