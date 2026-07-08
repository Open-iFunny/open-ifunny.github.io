=== "JSON"

    ```json
    // GetChannels200Response
    {
      "data"?: "GetChannels200Data",
      "status"?: "200"
    }

    // GetChannels200Data
    {
      "channels"?: "GetChannels200DataChannels"
    }

    // GetChannels200DataChannels
    {
      "items"?: "Channel[]"
    }

    // Channel
    {
      "id"?: "string",
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetChannels200Response {
      data?: GetChannels200Data;
      status?: 200;
    }

    interface GetChannels200Data {
      channels?: GetChannels200DataChannels;
    }

    interface GetChannels200DataChannels {
      items?: Channel[];
    }

    interface Channel {
      id?: string;
      title?: string;
    }
    ```

=== "Go"

    ```go
    type GetChannels200Response struct {
    	Data GetChannels200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetChannels200Data struct {
    	Channels GetChannels200DataChannels `json:"channels,omitempty"`
    }

    type GetChannels200DataChannels struct {
    	Items []Channel `json:"items,omitempty"`
    }

    type Channel struct {
    	Id *string `json:"id,omitempty"`
    	Title *string `json:"title,omitempty"`
    }
    ```
