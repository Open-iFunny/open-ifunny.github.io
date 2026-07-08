=== "JSON"

    ```json
    // RegisterAccountRequest
    {
      "reg_type": "pwd",
      "nick": "string",
      "email": "string",
      "password": "string",
      "accepted_mailing": "enum(0, 1)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface RegisterAccountRequest {
      reg_type: 'pwd';
      nick: string;
      email: string;
      password: string;
      accepted_mailing: 0 | 1;
    }
    ```

=== "Go"

    ```go
    type RegisterAccountRequest struct {
    	RegType string `json:"reg_type"`
    	Nick string `json:"nick"`
    	Email string `json:"email"`
    	Password string `json:"password"`
    	AcceptedMailing registerAccountRequestAcceptedMailingKind `json:"accepted_mailing"`
    }

    type registerAccountRequestAcceptedMailingKind int

    const (
    	REGISTER_ACCOUNT_REQUEST_ACCEPTED_MAILING_0 = registerAccountRequestAcceptedMailingKind(iota)
    	REGISTER_ACCOUNT_REQUEST_ACCEPTED_MAILING_1 = registerAccountRequestAcceptedMailingKind(iota)
    )
    ```
