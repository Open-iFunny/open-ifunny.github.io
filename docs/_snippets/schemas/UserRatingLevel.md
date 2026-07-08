=== "JSON"

    ```json
    // UserRatingLevel
    {
      "id"?: "string",
      "value"?: "integer",
      "points"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UserRatingLevel {
      id?: string;
      value?: number;
      points?: number;
    }
    ```

=== "Go"

    ```go
    type UserRatingLevel struct {
    	Id *string `json:"id,omitempty"`
    	Value *int `json:"value,omitempty"`
    	Points *int `json:"points,omitempty"`
    }
    ```
