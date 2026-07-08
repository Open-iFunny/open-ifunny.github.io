=== "JSON"

    ```json
    // RepublishContent200Response
    {
      "data"?: "RepublishContent200Data",
      "status"?: "200"
    }

    // RepublishContent200Data
    {
      "id"?: "string",
      "num_republished"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RepublishContent200Response {
      data?: RepublishContent200Data;
      status?: 200;
    }

    interface RepublishContent200Data {
      id?: string;
      num_republished?: number;
    }
    ```

=== "Go"

    ```go
    type RepublishContent200Response struct {
    	Data RepublishContent200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type RepublishContent200Data struct {
    	Id *string `json:"id,omitempty"`
    	NumRepublished *int `json:"num_republished,omitempty"`
    }
    ```
