=== "JSON"

    ```json
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
