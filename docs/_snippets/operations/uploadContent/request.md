=== "JSON"

    ```json
    // UploadContentRequest
    {
      "type": "string",
      "tags": "string[]",
      "video"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UploadContentRequest {
      type: string;
      tags: string[];
      video?: string;
    }
    ```

=== "Go"

    ```go
    type UploadContentRequest struct {
    	Type string `json:"type"`
    	Tags []string `json:"tags"`
    	Video *string `json:"video,omitempty"`
    }
    ```
