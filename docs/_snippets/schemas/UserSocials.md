=== "JSON"

    ```json
    // UserSocials
    {
      "apple"?: "UserSocial",
      "fb"?: "UserSocial",
      "ggl"?: "UserSocial",
      "ok"?: "UserSocial",
      "tw"?: "UserSocial",
      "vk"?: "UserSocial"
    }

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
    interface UserSocials {
      apple?: UserSocial;
      fb?: UserSocial;
      ggl?: UserSocial;
      ok?: UserSocial;
      tw?: UserSocial;
      vk?: UserSocial;
    }

    interface UserSocial {
      id?: string;
      is_hidden?: boolean;
      link?: string;
      nick?: string;
    }
    ```

=== "Go"

    ```go
    type UserSocials struct {
    	Apple UserSocial `json:"apple,omitempty"`
    	Fb UserSocial `json:"fb,omitempty"`
    	Ggl UserSocial `json:"ggl,omitempty"`
    	Ok UserSocial `json:"ok,omitempty"`
    	Tw UserSocial `json:"tw,omitempty"`
    	Vk UserSocial `json:"vk,omitempty"`
    }

    type UserSocial struct {
    	Id *string `json:"id,omitempty"`
    	IsHidden *bool `json:"is_hidden,omitempty"`
    	Link *string `json:"link,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    }
    ```
