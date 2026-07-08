=== "JSON"

    ```json
    // LoginOrRefreshRequest
    "LoginOrRefreshRequest": "PasswordGrant | RefreshGrant"

    // PasswordGrant
    {
      "username": "string",
      "password": "string",
      "grant_type": "password"
    }

    // RefreshGrant
    {
      "token": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    type LoginOrRefreshRequest = PasswordGrant | RefreshGrant;

    interface PasswordGrant {
      username: string;
      password: string;
      grant_type: 'password';
    }

    interface RefreshGrant {
      token: string;
    }
    ```

=== "Go"

    ```go
    type LoginOrRefreshRequest PasswordGrant /* or */ RefreshGrant

    type PasswordGrant struct {
    	Username string `json:"username"`
    	Password string `json:"password"`
    	GrantType string `json:"grant_type"`
    }

    type RefreshGrant struct {
    	Token string `json:"token"`
    }
    ```
