=== "JSON"

    ```json
    // UserProfile
    {
      "about"?: "string",
      "are_you_blocked"?: "boolean",
      "bans"?: "SmallBan[]",
      "block_type"?: "enum(installation, user)",
      "cover_bg_color"?: "string",
      "cover_url"?: "string",
      "id"?: "string",
      "is_available_for_chat"?: "boolean",
      "is_banned"?: "boolean",
      "is_blocked"?: "boolean",
      "is_deleted"?: "boolean",
      "is_in_subscribers"?: "boolean",
      "is_in_subscriptions"?: "boolean",
      "is_private"?: "boolean",
      "is_subscribed_to_updates"?: "boolean",
      "is_verified"?: "boolean",
      "meme_experience"?: "MemeExperience",
      "messaging_privacy_status"?: "enum(closed, public, subscribers)",
      "messenger_active"?: "boolean",
      "messenger_token"?: "string",
      "nick_color"?: "string",
      "nick"?: "string",
      "num"?: "UserProfileNums",
      "original_nick"?: "string",
      "photo"?: "ProfilePhoto",
      "rating"?: "UserRating",
      "social"?: "UserSocials",
      "web_url"?: "string"
    }

    // SmallBan
    {
      "date_until"?: "integer",
      "id"?: "string",
      "type"?: "string"
    }

    // MemeExperience
    {
      "badge_size"?: "MemeExperienceBadgeSize",
      "badge_url"?: "string",
      "days"?: "integer",
      "next_milestone"?: "integer",
      "rank"?: "integer"
    }

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

    // ProfilePhoto
    {
      "bg_color"?: "string",
      "thumb"?: "ProfilePhotoThumb",
      "url"?: "string"
    }

    // UserRating
    {
      "points"?: "integer",
      "current_level"?: "UserRatingLevel",
      "next_level"?: "UserRatingLevel",
      "max_level"?: "UserRatingLevel",
      "is_show_level"?: "boolean"
    }

    // UserSocials
    {
      "apple"?: "UserSocial",
      "fb"?: "UserSocial",
      "ggl"?: "UserSocial",
      "ok"?: "UserSocial",
      "tw"?: "UserSocial",
      "vk"?: "UserSocial"
    }

    // MemeExperienceBadgeSize
    {
      "h"?: "integer",
      "w"?: "integer"
    }

    // ProfilePhotoThumb
    {
      "large_url"?: "string",
      "medium_url"?: "string",
      "small_url"?: "string"
    }

    // UserRatingLevel
    {
      "id"?: "string",
      "value"?: "integer",
      "points"?: "integer"
    }

    // UserSocial
    {
      "id"?: "string",
      "is_hidden"?: "boolean",
      "link"?: "string",
      "nick"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UserProfile {
      about?: string;
      are_you_blocked?: boolean;
      bans?: SmallBan[];
      block_type?: 'installation' | 'user';
      cover_bg_color?: string;
      cover_url?: string;
      id?: string;
      is_available_for_chat?: boolean;
      is_banned?: boolean;
      is_blocked?: boolean;
      is_deleted?: boolean;
      is_in_subscribers?: boolean;
      is_in_subscriptions?: boolean;
      is_private?: boolean;
      is_subscribed_to_updates?: boolean;
      is_verified?: boolean;
      meme_experience?: MemeExperience;
      messaging_privacy_status?: 'closed' | 'public' | 'subscribers';
      messenger_active?: boolean;
      messenger_token?: string;
      nick_color?: string;
      nick?: string;
      num?: UserProfileNums;
      original_nick?: string;
      photo?: ProfilePhoto;
      rating?: UserRating;
      social?: UserSocials;
      web_url?: string;
    }

    interface SmallBan {
      date_until?: number;
      id?: string;
      type?: string;
    }

    interface MemeExperience {
      badge_size?: MemeExperienceBadgeSize;
      badge_url?: string;
      days?: number;
      next_milestone?: number;
      rank?: number;
    }

    interface UserProfileNums {
      achievements?: number;
      created?: number;
      featured?: number;
      subscribers?: number;
      subscriptions?: number;
      total_posts?: number;
      total_smiles?: number;
    }

    interface ProfilePhoto {
      bg_color?: string;
      thumb?: ProfilePhotoThumb;
      url?: string;
    }

    interface UserRating {
      points?: number;
      current_level?: UserRatingLevel;
      next_level?: UserRatingLevel;
      max_level?: UserRatingLevel;
      is_show_level?: boolean;
    }

    interface UserSocials {
      apple?: UserSocial;
      fb?: UserSocial;
      ggl?: UserSocial;
      ok?: UserSocial;
      tw?: UserSocial;
      vk?: UserSocial;
    }

    interface MemeExperienceBadgeSize {
      h?: number;
      w?: number;
    }

    interface ProfilePhotoThumb {
      large_url?: string;
      medium_url?: string;
      small_url?: string;
    }

    interface UserRatingLevel {
      id?: string;
      value?: number;
      points?: number;
    }

    interface UserSocial {
      id?: string;
      is_hidden?: boolean;
      link?: string;
      nick?: string;
    }
    ```

=== "Go"

    ```go
    type UserProfile struct {
    	About *string `json:"about,omitempty"`
    	AreYouBlocked *bool `json:"are_you_blocked,omitempty"`
    	Bans []SmallBan `json:"bans,omitempty"`
    	BlockType *string `json:"block_type,omitempty"`
    	CoverBgColor *string `json:"cover_bg_color,omitempty"`
    	CoverUrl *string `json:"cover_url,omitempty"`
    	Id *string `json:"id,omitempty"`
    	IsAvailableForChat *bool `json:"is_available_for_chat,omitempty"`
    	IsBanned *bool `json:"is_banned,omitempty"`
    	IsBlocked *bool `json:"is_blocked,omitempty"`
    	IsDeleted *bool `json:"is_deleted,omitempty"`
    	IsInSubscribers *bool `json:"is_in_subscribers,omitempty"`
    	IsInSubscriptions *bool `json:"is_in_subscriptions,omitempty"`
    	IsPrivate *bool `json:"is_private,omitempty"`
    	IsSubscribedToUpdates *bool `json:"is_subscribed_to_updates,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	MemeExperience MemeExperience `json:"meme_experience,omitempty"`
    	MessagingPrivacyStatus *string `json:"messaging_privacy_status,omitempty"`
    	MessengerActive *bool `json:"messenger_active,omitempty"`
    	MessengerToken *string `json:"messenger_token,omitempty"`
    	NickColor *string `json:"nick_color,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    	Num UserProfileNums `json:"num,omitempty"`
    	OriginalNick *string `json:"original_nick,omitempty"`
    	Photo ProfilePhoto `json:"photo,omitempty"`
    	Rating UserRating `json:"rating,omitempty"`
    	Social UserSocials `json:"social,omitempty"`
    	WebUrl *string `json:"web_url,omitempty"`
    }

    type SmallBan struct {
    	DateUntil *int `json:"date_until,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Type *string `json:"type,omitempty"`
    }

    type MemeExperience struct {
    	BadgeSize MemeExperienceBadgeSize `json:"badge_size,omitempty"`
    	BadgeUrl *string `json:"badge_url,omitempty"`
    	Days *int `json:"days,omitempty"`
    	NextMilestone *int `json:"next_milestone,omitempty"`
    	Rank *int `json:"rank,omitempty"`
    }

    type UserProfileNums struct {
    	Achievements *int `json:"achievements,omitempty"`
    	Created *int `json:"created,omitempty"`
    	Featured *int `json:"featured,omitempty"`
    	Subscribers *int `json:"subscribers,omitempty"`
    	Subscriptions *int `json:"subscriptions,omitempty"`
    	TotalPosts *int `json:"total_posts,omitempty"`
    	TotalSmiles *int `json:"total_smiles,omitempty"`
    }

    type ProfilePhoto struct {
    	BgColor *string `json:"bg_color,omitempty"`
    	Thumb ProfilePhotoThumb `json:"thumb,omitempty"`
    	Url *string `json:"url,omitempty"`
    }

    type UserRating struct {
    	Points *int `json:"points,omitempty"`
    	CurrentLevel UserRatingLevel `json:"current_level,omitempty"`
    	NextLevel UserRatingLevel `json:"next_level,omitempty"`
    	MaxLevel UserRatingLevel `json:"max_level,omitempty"`
    	IsShowLevel *bool `json:"is_show_level,omitempty"`
    }

    type UserSocials struct {
    	Apple UserSocial `json:"apple,omitempty"`
    	Fb UserSocial `json:"fb,omitempty"`
    	Ggl UserSocial `json:"ggl,omitempty"`
    	Ok UserSocial `json:"ok,omitempty"`
    	Tw UserSocial `json:"tw,omitempty"`
    	Vk UserSocial `json:"vk,omitempty"`
    }

    type MemeExperienceBadgeSize struct {
    	H *int `json:"h,omitempty"`
    	W *int `json:"w,omitempty"`
    }

    type ProfilePhotoThumb struct {
    	LargeUrl *string `json:"large_url,omitempty"`
    	MediumUrl *string `json:"medium_url,omitempty"`
    	SmallUrl *string `json:"small_url,omitempty"`
    }

    type UserRatingLevel struct {
    	Id *string `json:"id,omitempty"`
    	Value *int `json:"value,omitempty"`
    	Points *int `json:"points,omitempty"`
    }

    type UserSocial struct {
    	Id *string `json:"id,omitempty"`
    	IsHidden *bool `json:"is_hidden,omitempty"`
    	Link *string `json:"link,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    }
    ```
