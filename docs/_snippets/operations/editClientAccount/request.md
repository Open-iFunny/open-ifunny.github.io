=== "JSON"

    ```json
    // EditClientAccountRequest
    {
      "nick"?: "string",
      "about"?: "string",
      "sex"?: "enum(male, female, other)",
      "birth_date"?: "string",
      "hometown"?: "string",
      "location"?: "string",
      "messaging_privacy_status"?: "enum(public, subscribers, closed)",
      "is_private"?: "enum(0, 1)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface EditClientAccountRequest {
      nick?: string;
      about?: string;
      sex?: 'male' | 'female' | 'other';
      birth_date?: string;
      hometown?: string;
      location?: string;
      messaging_privacy_status?: 'public' | 'subscribers' | 'closed';
      is_private?: 0 | 1;
    }
    ```

=== "Go"

    ```go
    type EditClientAccountRequest struct {
    	Nick *string `json:"nick,omitempty"`
    	About *string `json:"about,omitempty"`
    	Sex *string `json:"sex,omitempty"`
    	BirthDate *string `json:"birth_date,omitempty"`
    	Hometown *string `json:"hometown,omitempty"`
    	Location *string `json:"location,omitempty"`
    	MessagingPrivacyStatus *string `json:"messaging_privacy_status,omitempty"`
    	IsPrivate *editClientAccountRequestIsPrivateKind `json:"is_private,omitempty"`
    }

    type editClientAccountRequestIsPrivateKind int

    const (
    	EDIT_CLIENT_ACCOUNT_REQUEST_IS_PRIVATE_FALSE = editClientAccountRequestIsPrivateKind(iota)
    	EDIT_CLIENT_ACCOUNT_REQUEST_IS_PRIVATE_TRUE  = editClientAccountRequestIsPrivateKind(iota)
    )
    ```
