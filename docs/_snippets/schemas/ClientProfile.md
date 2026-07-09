=== "JSON"

    ```json
    // Account Information for the authenticated client.
    // ClientProfile
    {
      "about"?: "string",
      "id"?: "string",
      "bans"?: "SmallBan[]",
      "birth_date"?: "string",
      "email"?: "string",
      "meme_experience"?: "MemeExperience",
      "nick"?: "string",
      "nick_color"?: "string",
      "num"?: "UserProfileNums",
      "original_nick"?: "string",
      "sex"?: "enum(male, female, other)",
      "web_url"?: "string",
      "is_available_for_chat"?: "boolean",
      "is_banned"?: "boolean",
      "is_blocked_in_messenger"?: "boolean",
      "is_deleted"?: "boolean",
      "is_ifunny_team_member"?: "boolean",
      "is_moderator"?: "boolean",
      "is_private"?: "boolean",
      "is_verified"?: "boolean",
      "have_unnotified_achievements"?: "boolean",
      "have_unnotified_bans"?: "boolean",
      "have_unnotified_levels"?: "boolean",
      "have_unnotified_strikes"?: "boolean",
      "messaging_privacy_status"?: "enum(public, subscribers, closed)",
      "messenger_active"?: "boolean",
      "messenger_token"?: "string",
      "need_account_setup"?: "boolean",
      "safe_mode"?: "boolean",
      "cover_bg_color"?: "string",
      "cover_url"?: "string",
      "photo"?: "ProfilePhoto",
      "phone_data"?: "ClientPhoneData",
      "phone"?: "string",
      "unconfirmed_phone_data"?: "ClientPhoneData",
      "unconfirmed_phone"?: "string",
      "location"?: "string",
      "hometown"?: "string"
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

    // ClientPhoneData
    {
      "code"?: "string",
      "number"?: "string"
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
    ```

=== "TypeScript"

    ```typescript
    // Account Information for the authenticated client.
    interface ClientProfile {
      about?: string;
      id?: string;
      bans?: SmallBan[];
      birth_date?: string;
      email?: string;
      meme_experience?: MemeExperience;
      nick?: string;
      nick_color?: string;
      num?: UserProfileNums;
      original_nick?: string;
      sex?: 'male' | 'female' | 'other';
      web_url?: string;
      is_available_for_chat?: boolean;
      is_banned?: boolean;
      is_blocked_in_messenger?: boolean;
      is_deleted?: boolean;
      is_ifunny_team_member?: boolean;
      is_moderator?: boolean;
      is_private?: boolean;
      is_verified?: boolean;
      have_unnotified_achievements?: boolean;
      have_unnotified_bans?: boolean;
      have_unnotified_levels?: boolean;
      have_unnotified_strikes?: boolean;
      messaging_privacy_status?: 'public' | 'subscribers' | 'closed';
      messenger_active?: boolean;
      messenger_token?: string;
      need_account_setup?: boolean;
      safe_mode?: boolean;
      cover_bg_color?: string;
      cover_url?: string;
      photo?: ProfilePhoto;
      phone_data?: ClientPhoneData;
      phone?: string;
      unconfirmed_phone_data?: ClientPhoneData;
      unconfirmed_phone?: string;
      location?: string;
      hometown?: string;
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

    interface ClientPhoneData {
      code?: string;
      number?: string;
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
    ```

=== "Go"

    ```go
    // Account Information for the authenticated client.
    type ClientProfile struct {
    	About *string `json:"about,omitempty"`
    	Id *string `json:"id,omitempty"`
    	Bans []SmallBan `json:"bans,omitempty"`
    	BirthDate *string `json:"birth_date,omitempty"`
    	Email *string `json:"email,omitempty"`
    	MemeExperience MemeExperience `json:"meme_experience,omitempty"`
    	Nick *string `json:"nick,omitempty"`
    	NickColor *string `json:"nick_color,omitempty"`
    	Num UserProfileNums `json:"num,omitempty"`
    	OriginalNick *string `json:"original_nick,omitempty"`
    	Sex *string `json:"sex,omitempty"`
    	WebUrl *string `json:"web_url,omitempty"`
    	IsAvailableForChat *bool `json:"is_available_for_chat,omitempty"`
    	IsBanned *bool `json:"is_banned,omitempty"`
    	IsBlockedInMessenger *bool `json:"is_blocked_in_messenger,omitempty"`
    	IsDeleted *bool `json:"is_deleted,omitempty"`
    	IsIfunnyTeamMember *bool `json:"is_ifunny_team_member,omitempty"`
    	IsModerator *bool `json:"is_moderator,omitempty"`
    	IsPrivate *bool `json:"is_private,omitempty"`
    	IsVerified *bool `json:"is_verified,omitempty"`
    	HaveUnnotifiedAchievements *bool `json:"have_unnotified_achievements,omitempty"`
    	HaveUnnotifiedBans *bool `json:"have_unnotified_bans,omitempty"`
    	HaveUnnotifiedLevels *bool `json:"have_unnotified_levels,omitempty"`
    	HaveUnnotifiedStrikes *bool `json:"have_unnotified_strikes,omitempty"`
    	MessagingPrivacyStatus *string `json:"messaging_privacy_status,omitempty"`
    	MessengerActive *bool `json:"messenger_active,omitempty"`
    	MessengerToken *string `json:"messenger_token,omitempty"`
    	NeedAccountSetup *bool `json:"need_account_setup,omitempty"`
    	SafeMode *bool `json:"safe_mode,omitempty"`
    	CoverBgColor *string `json:"cover_bg_color,omitempty"`
    	CoverUrl *string `json:"cover_url,omitempty"`
    	Photo ProfilePhoto `json:"photo,omitempty"`
    	PhoneData ClientPhoneData `json:"phone_data,omitempty"`
    	Phone *string `json:"phone,omitempty"`
    	UnconfirmedPhoneData ClientPhoneData `json:"unconfirmed_phone_data,omitempty"`
    	UnconfirmedPhone *string `json:"unconfirmed_phone,omitempty"`
    	Location *string `json:"location,omitempty"`
    	Hometown *string `json:"hometown,omitempty"`
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

    type ClientPhoneData struct {
    	Code *string `json:"code,omitempty"`
    	Number *string `json:"number,omitempty"`
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
    ```
