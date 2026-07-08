=== "JSON"

    ```json
    // UserProfileNums
    {
      "achievements"?: "integer",
      "created"?: "integer",
      "featured"?: "integer",
      "subscribers"?: "integer",
      "subscriptions"?: "integer",
      "total_posts"?: "integer",
      "total_smiles"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UserProfileNums {
      achievements?: number;
      created?: number;
      featured?: number;
      subscribers?: number;
      subscriptions?: number;
      total_posts?: number;
      total_smiles?: number;
    }
    ```

=== "Go"

    ```go
    type UserProfileNums struct {
    	Achievements *int `json:"achievements,omitempty"`
    	Created *int `json:"created,omitempty"`
    	Featured *int `json:"featured,omitempty"`
    	Subscribers *int `json:"subscribers,omitempty"`
    	Subscriptions *int `json:"subscriptions,omitempty"`
    	TotalPosts *int `json:"total_posts,omitempty"`
    	TotalSmiles *int `json:"total_smiles,omitempty"`
    }
    ```
