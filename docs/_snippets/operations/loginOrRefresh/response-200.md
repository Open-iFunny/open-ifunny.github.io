=== "JSON"

    ```json
    // LoginOrRefresh200Response
    {
      "access_token"?: "string",
      "token_type"?: "bearer",
      "expires_in"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface LoginOrRefresh200Response {
      access_token?: string;
      token_type?: 'bearer';
      expires_in?: number;
    }
    ```

=== "Go"

    ```go
    type LoginOrRefresh200Response struct {
    	AccessToken *string `json:"access_token,omitempty"`
    	TokenType *string `json:"token_type,omitempty"`
    	ExpiresIn *int `json:"expires_in,omitempty"`
    }
    ```
