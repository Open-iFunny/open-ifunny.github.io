=== "JSON"

    ```json
    // DeleteRepublish200Response
    {
      "data"?: "DeleteRepublish200Data"
    }

    // DeleteRepublish200Data
    {
      "num_republished"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface DeleteRepublish200Response {
      data?: DeleteRepublish200Data;
    }

    interface DeleteRepublish200Data {
      num_republished?: number;
    }
    ```

=== "Go"

    ```go
    type DeleteRepublish200Response struct {
    	Data DeleteRepublish200Data `json:"data,omitempty"`
    }

    type DeleteRepublish200Data struct {
    	NumRepublished *int `json:"num_republished,omitempty"`
    }
    ```
