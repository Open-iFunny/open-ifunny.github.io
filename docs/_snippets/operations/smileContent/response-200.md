=== "JSON"

    ```json
    // SmileContent200Response
    "SmileContent200Response": "SmileCountsResponse"

    // SmileCountsResponse
    {
      "data"?: "SmileCountsResponseData",
      "status"?: "200"
    }

    // SmileCountsResponseData
    {
      "num_smiles"?: "integer",
      "num_unsmiles"?: "integer",
      "num_guest_smiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type SmileContent200Response = SmileCountsResponse;

    interface SmileCountsResponse {
      data?: SmileCountsResponseData;
      status?: 200;
    }

    interface SmileCountsResponseData {
      num_smiles?: number;
      num_unsmiles?: number;
      num_guest_smiles?: number;
    }
    ```

=== "Go"

    ```go
    type SmileContent200Response SmileCountsResponse

    type SmileCountsResponse struct {
    	Data SmileCountsResponseData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SmileCountsResponseData struct {
    	NumSmiles *int `json:"num_smiles,omitempty"`
    	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
    	NumGuestSmiles *int `json:"num_guest_smiles,omitempty"`
    }
    ```
