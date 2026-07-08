=== "JSON"

    ```json
    // ModifyContentRequest
    {
      "publish_at"?: "integer",
      "visibility"?: "enum(public, subscribers)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ModifyContentRequest {
      publish_at?: number;
      visibility?: 'public' | 'subscribers';
    }
    ```

=== "Go"

    ```go
    type ModifyContentRequest struct {
    	PublishAt *int `json:"publish_at,omitempty"`
    	Visibility *string `json:"visibility,omitempty"`
    }
    ```
