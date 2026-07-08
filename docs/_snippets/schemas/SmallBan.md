=== "JSON"

    ```json
    // SmallBan
    {
      "date_until"?: "integer",
      "id"?: "string",
      "type"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SmallBan {
      date_until?: number;
      id?: string;
      type?: string;
    }
    ```

=== "Go"

    ```go
    type SmallBan struct {
    	DateUntil *int `json:"date_until,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *string `json:"type,omitempty"`
    }
    ```
