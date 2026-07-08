=== "JSON"

    ```json
    // LoginOrRefresh403Response
    "LoginOrRefresh403Response": "CaptchaError"

    // CaptchaError
    {
      "error"?: "captcha_required",
      "error_description"?: "Human verification is required",
      "data"?: "CaptchaErrorData",
      "status"?: "403"
    }

    // CaptchaErrorData
    {
      "captcha_url"?: "string",
      "type"?: "enum(fun_captcha, recaptcha)"
    }
    ```

=== "TypeScript"

    ```typescript
    type LoginOrRefresh403Response = CaptchaError;

    interface CaptchaError {
      error?: 'captcha_required';
      error_description?: 'Human verification is required';
      data?: CaptchaErrorData;
      status?: 403;
    }

    interface CaptchaErrorData {
      captcha_url?: string;
      type?: 'fun_captcha' | 'recaptcha';
    }
    ```

=== "Go"

    ```go
    type LoginOrRefresh403Response CaptchaError

    type CaptchaError struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Data CaptchaErrorData `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type CaptchaErrorData struct {
    	CaptchaUrl *string `json:"captcha_url,omitempty"`
    	Type *string `json:"type,omitempty"`
    }
    ```
