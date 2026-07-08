=== "JSON"

    ```json
    // CommentSmileCountsResponse
    {
      "data"?: "CommentSmileCountsResponseData",
      "status"?: "200"
    }

    // CommentSmileCountsResponseData
    {
      "num_smiles"?: "integer",
      "num_unsmiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CommentSmileCountsResponse {
      data?: CommentSmileCountsResponseData;
      status?: 200;
    }

    interface CommentSmileCountsResponseData {
      num_smiles?: number;
      num_unsmiles?: number;
    }
    ```

=== "Go"

    ```go
    type CommentSmileCountsResponse struct {
    	Data CommentSmileCountsResponseData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CommentSmileCountsResponseData struct {
    	NumSmiles *int `json:"num_smiles,omitempty"`
    	NumUnsmiles *int `json:"num_unsmiles,omitempty"`
    }
    ```
