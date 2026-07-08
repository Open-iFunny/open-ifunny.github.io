=== "JSON"

    ```json
    // CheckNickAvailability200Response
    {
      "data"?: "CheckNickAvailability200Data",
      "status"?: "200"
    }

    // CheckNickAvailability200Data
    {
      "available"?: "boolean"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CheckNickAvailability200Response {
      data?: CheckNickAvailability200Data;
      status?: 200;
    }

    interface CheckNickAvailability200Data {
      available?: boolean;
    }
    ```

=== "Go"

    ```go
    type CheckNickAvailability200Response struct {
    	Data CheckNickAvailability200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CheckNickAvailability200Data struct {
    	Available *bool `json:"available,omitempty"`
    }
    ```
