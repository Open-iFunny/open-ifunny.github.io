=== "JSON"

    ```json
    // UserRating
    {
      "points"?: "integer",
      "current_level"?: "UserRatingLevel",
      "next_level"?: "UserRatingLevel",
      "max_level"?: "UserRatingLevel",
      "is_show_level"?: "boolean"
    }

    // UserRatingLevel
    {
      "id"?: "string",
      "value"?: "integer",
      "points"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UserRating {
      points?: number;
      current_level?: UserRatingLevel;
      next_level?: UserRatingLevel;
      max_level?: UserRatingLevel;
      is_show_level?: boolean;
    }

    interface UserRatingLevel {
      id?: string;
      value?: number;
      points?: number;
    }
    ```

=== "Go"

    ```go
    type UserRating struct {
    	Points *int `json:"points,omitempty"`
    	CurrentLevel UserRatingLevel `json:"current_level,omitempty"`
    	NextLevel UserRatingLevel `json:"next_level,omitempty"`
    	MaxLevel UserRatingLevel `json:"max_level,omitempty"`
    	IsShowLevel *bool `json:"is_show_level,omitempty"`
    }

    type UserRatingLevel struct {
    	Id *string `json:"id,omitempty"`
    	Value *int `json:"value,omitempty"`
    	Points *int `json:"points,omitempty"`
    }
    ```
