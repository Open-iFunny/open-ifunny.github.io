=== "JSON"

    ```json
    // Not fully documented in the source Markdown; fields inferred from usage.
    // Channel
    {
      "id"?: "string",
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    // Not fully documented in the source Markdown; fields inferred from usage.
    interface Channel {
      id?: string;
      title?: string;
    }
    ```

=== "Go"

    ```go
    // Not fully documented in the source Markdown; fields inferred from usage.
    type Channel struct {
    	Id *string `json:"id,omitempty"`
    	Title *string `json:"title,omitempty"`
    }
    ```
