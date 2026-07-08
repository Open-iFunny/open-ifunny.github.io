=== "JSON"

    ```json
    // UserSocial
    {
      "id"?: "string",
      "is_hidden"?: "boolean",
      "link"?: "string",
      "nick"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UserSocial {
      id?: string;
      is_hidden?: boolean;
      link?: string;
      nick?: string;
    }
    ```

=== "Go"

    ```go
    type UserSocial struct {
    	Id *string `json:"id,omitempty"`
    	IsHidden *bool `json:"is_hidden,omitempty"`
    	Link *string `json:"link,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    }
    ```
