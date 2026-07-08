=== "JSON"

    ```json
    // GetUnreadMessageCount200Response
    {
      "data"?: "GetUnreadMessageCount200Data",
      "status"?: "200"
    }

    // GetUnreadMessageCount200Data
    {
      "unread_messages"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetUnreadMessageCount200Response {
      data?: GetUnreadMessageCount200Data;
      status?: 200;
    }

    interface GetUnreadMessageCount200Data {
      unread_messages?: number;
    }
    ```

=== "Go"

    ```go
    type GetUnreadMessageCount200Response struct {
    	Data GetUnreadMessageCount200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetUnreadMessageCount200Data struct {
    	UnreadMessages *int `json:"unread_messages,omitempty"`
    }
    ```
