=== "JSON"

    ```json
    // Channel
    {
      "id"?: "string",
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface Channel {
      id?: string;
      title?: string;
    }
    ```

=== "Go"

    ```go
    type Channel struct {
    	Id *string `json:"id,omitempty"`
    	Title *string `json:"title,omitempty"`
    }
    ```
