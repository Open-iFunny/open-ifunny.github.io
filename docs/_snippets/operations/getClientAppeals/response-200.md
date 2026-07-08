=== "JSON"

    ```json
    // GetClientAppeals200Response
    {
      "data"?: "GetClientAppeals200Data",
      "status"?: "200"
    }

    // GetClientAppeals200Data
    {
      "appeals"?: "Appeal[]"
    }

    // Appeal
    {
      "ban_id"?: "string",
      "ban_reason"?: "string",
      "created_at"?: "integer",
      "id"?: "string",
      "status"?: "enum(pending, denied)",
      "strike_id"?: "string",
      "type"?: "enum(ban, strike)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetClientAppeals200Response {
      data?: GetClientAppeals200Data;
      status?: 200;
    }

    interface GetClientAppeals200Data {
      appeals?: Appeal[];
    }

    interface Appeal {
      ban_id?: string;
      ban_reason?: string;
      created_at?: number;
      id?: string;
      status?: 'pending' | 'denied';
      strike_id?: string;
      type?: 'ban' | 'strike';
    }
    ```

=== "Go"

    ```go
    type GetClientAppeals200Response struct {
    	Data GetClientAppeals200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetClientAppeals200Data struct {
    	Appeals []Appeal `json:"appeals,omitempty"`
    }

    type Appeal struct {
    	BanId *string `json:"ban_id,omitempty"`
    	BanReason *string `json:"ban_reason,omitempty"`
    	CreatedAt *int `json:"created_at,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Status *string `json:"status,omitempty"`
    	StrikeId *string `json:"strike_id,omitempty"`
    	Type *string `json:"type,omitempty"`
    }
    ```
