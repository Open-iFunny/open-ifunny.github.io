=== "JSON"

    ```json
    // Tag
    {
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface Tag {
      title?: string;
    }
    ```

=== "Go"

    ```go
    type Tag struct {
    	Title *string `json:"title,omitempty"`
    }
    ```
