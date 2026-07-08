=== "JSON"

    ```json
    // CommentNums
    {
      "smiles"?: "integer",
      "unsmiles"?: "integer",
      "replies"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface CommentNums {
      smiles?: number;
      unsmiles?: number;
      replies?: number;
    }
    ```

=== "Go"

    ```go
    type CommentNums struct {
    	Smiles *int `json:"smiles,omitempty"`
    	Unsmiles *int `json:"unsmiles,omitempty"`
    	Replies *int `json:"replies,omitempty"`
    }
    ```
