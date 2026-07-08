=== "JSON"

    ```json
    // NotificationCounters
    {
      "featured"?: "integer",
      "subscriptions"?: "integer",
      "collective"?: "integer",
      "news"?: "integer",
      "map"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface NotificationCounters {
      featured?: number;
      subscriptions?: number;
      collective?: number;
      news?: number;
      map?: number;
    }
    ```

=== "Go"

    ```go
    type NotificationCounters struct {
    	Featured *int `json:"featured,omitempty"`
    	Subscriptions *int `json:"subscriptions,omitempty"`
    	Collective *int `json:"collective,omitempty"`
    	News *int `json:"news,omitempty"`
    	Map *int `json:"map,omitempty"`
    }
    ```
