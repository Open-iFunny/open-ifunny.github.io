=== "JSON"

    ```json
    // UserMention
    {
      "id"?: "string",
      "creator"?: "User",
      "nick"?: "string",
      "start_index"?: "integer",
      "stop_index"?: "integer",
      "user_id"?: "string",
      "original_nick"?: "string"
    }

    // User
    {
      "block_type"?: "enum(installation, user)",
      "id"?: "string",
      "is_banned"?: "boolean",
      "is_blocked"?: "boolean",
      "is_deleted"?: "boolean",
      "is_in_subscribers"?: "boolean",
      "is_in_subscriptions"?: "boolean",
      "is_verified"?: "boolean",
      "nick"?: "string",
      "nick_color"?: "string",
      "num"?: "UserNum",
      "original_nick"?: "string",
      "photo"?: "ProfilePhoto",
      "total_posts"?: "integer"
    }

    // UserNum
    {
      "subscribers"?: "integer",
      "subscriptions"?: "integer"
    }

    // ProfilePhoto
    {
      "bg_color"?: "string",
      "thumb"?: "ProfilePhotoThumb",
      "url"?: "string"
    }

    // ProfilePhotoThumb
    {
      "large_url"?: "string",
      "medium_url"?: "string",
      "small_url"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UserMention {
      id?: string;
      creator?: User;
      nick?: string;
      start_index?: number;
      stop_index?: number;
      user_id?: string;
      original_nick?: string;
    }

    interface User {
      block_type?: 'installation' | 'user';
      id?: string;
      is_banned?: boolean;
      is_blocked?: boolean;
      is_deleted?: boolean;
      is_in_subscribers?: boolean;
      is_in_subscriptions?: boolean;
      is_verified?: boolean;
      nick?: string;
      nick_color?: string;
      num?: UserNum;
      original_nick?: string;
      photo?: ProfilePhoto;
      total_posts?: number;
    }

    interface UserNum {
      subscribers?: number;
      subscriptions?: number;
    }

    interface ProfilePhoto {
      bg_color?: string;
      thumb?: ProfilePhotoThumb;
      url?: string;
    }

    interface ProfilePhotoThumb {
      large_url?: string;
      medium_url?: string;
      small_url?: string;
    }
    ```

=== "Go"

    ```go
    type UserMention struct {
    	Id *string `json:"id,omitempty"`
    	Creator User `json:"creator,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    	StartIndex *int `json:"start_index,omitempty"`
    	StopIndex *int `json:"stop_index,omitempty"`
    	UserId *string `json:"user_id,omitempty"`
    	OriginalNick *string `json:"original_nick,omitempty"`
    }

    type User struct {
    	BlockType *string `json:"block_type,omitempty"`
    	Id *string `json:"id,omitempty"`
    	IsBanned *bool `json:"is_banned,omitempty"`
    	IsBlocked *bool `json:"is_blocked,omitempty"`
    	IsDeleted *bool `json:"is_deleted,omitempty"`
    	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
    	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    	NickColor *string `json:"nick_color,omitempty"`
    	Num UserNum `json:"num,omitempty"`
    	OriginalNick *string `json:"original_nick,omitempty"`
    	Photo ProfilePhoto `json:"photo,omitempty"`
    	TotalPosts *int `json:"total_posts,omitempty"`
    }

    type UserNum struct {
    	Subscribers *int `json:"subscribers,omitempty"`
    	Subscriptions *int `json:"subscriptions,omitempty"`
    }

    type ProfilePhoto struct {
    	BgColor *string `json:"bg_color,omitempty"`
    	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
    	Url *string `json:"url,omitempty"`
    }

    type ProfilePhotoThumb struct {
    	LargeUrl *string `json:"large_url,omitempty"`
    	MediumUrl *string `json:"medium_url,omitempty"`
    	SmallUrl *string `json:"small_url,omitempty"`
    }
    ```
