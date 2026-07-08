=== "JSON"

    ```json
    // GetNotificationCounters200Response
    {
      "data"?: "NotificationCounters",
      "status"?: "200"
    }

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
    interface GetNotificationCounters200Response {
      data?: NotificationCounters;
      status?: 200;
    }

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
    type GetNotificationCounters200Response struct {
    	Data NotificationCounters `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type NotificationCounters struct {
    	Featured *int `json:"featured,omitempty"`
    	Subscriptions *int `json:"subscriptions,omitempty"`
    	Collective *int `json:"collective,omitempty"`
    	News *int `json:"news,omitempty"`
    	Map *int `json:"map,omitempty"`
    }
    ```
