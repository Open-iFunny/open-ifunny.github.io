=== "JSON"

    ```json
    // ChatMessage
    {
      "payload"?: "ChatMessagePayload",
      "user"?: "ChatMessageUser",
      "id"?: "string",
      "type"?: "integer",
      "pub_at"?: "integer",
      "status"?: "integer",
      "text"?: "string"
    }

    // ChatMessagePayload
    {
      "local_id"?: "string"
    }

    // ChatMessageUser
    {
      "nick"?: "string",
      "is_verified"?: "boolean",
      "last_seen_at"?: "integer",
      "id"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ChatMessage {
      payload?: ChatMessagePayload;
      user?: ChatMessageUser;
      id?: string;
      type?: number;
      pub_at?: number;
      status?: number;
      text?: string;
    }

    interface ChatMessagePayload {
      local_id?: string;
    }

    interface ChatMessageUser {
      nick?: string;
      is_verified?: boolean;
      last_seen_at?: number;
      id?: string;
    }
    ```

=== "Go"

    ```go
    type ChatMessage struct {
    	Payload ChatMessagePayload `json:"payload,omitempty"`
    	User ChatMessageUser `json:"user,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *int `json:"type,omitempty"`
    	PubAt *int `json:"pub_at,omitempty"`
    	Status *int `json:"status,omitempty"`
    	Text *string `json:"text,omitempty"`
    }

    type ChatMessagePayload struct {
    	LocalId *string `json:"local_id,omitempty"`
    }

    type ChatMessageUser struct {
    	Nick *string `json:"nick,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	LastSeenAt *int `json:"last_seen_at,omitempty"`
    	Id *string `json:"id,omitempty"`
    }
    ```
