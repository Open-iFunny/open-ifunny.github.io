=== "JSON"

    ```json
    // AddContentCategoriesRequest
    {
      "categories[]": "string[]"
    }
    ```

=== "TypeScript"

    ```typescript
    interface AddContentCategoriesRequest {
      'categories[]': string[];
    }
    ```

=== "Go"

    ```go
    type AddContentCategoriesRequest struct {
    	Categories []string `json:"categories[]"`
    }
    ```
