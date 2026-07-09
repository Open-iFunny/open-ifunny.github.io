---
title: Users
description: "Methods for interacting with other users"
---

# 🫂 Users

Methods for interacting with other users

### Search Users  {: #op-searchusers }

**`GET /search/users`**

Search users by nick.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `q` | `String` | yes | Nick to search for |
    | `limit` | `Number` | no |  |

=== "JSON"

    ```json
    // SearchUsersQuery
    {
      "q": "string",
      "limit"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchUsersQuery {
      q: string;
      limit?: number;
    }
    ```

=== "Go"

    ```go
    type SearchUsersQuery struct {
    	Q string `query:"q"`
    	Limit *int `query:"limit,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — Possible Users

=== "JSON"

    ```json
    // SearchUsers200Response
    {
      "data"?: "SearchUsers200Data",
      "status"?: "200"
    }

    // SearchUsers200Data
    {
      "num"?: "any[]",
      "users"?: "User[]"
    }

    // Minimal user representation used in lists (comments, timelines, etc).
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
    interface SearchUsers200Response {
      data?: SearchUsers200Data;
      status?: 200;
    }

    interface SearchUsers200Data {
      num?: unknown[];
      users?: User[];
    }

    // Minimal user representation used in lists (comments, timelines, etc).
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
    type SearchUsers200Response struct {
    	Data SearchUsers200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SearchUsers200Data struct {
    	Num []interface{} `json:"num,omitempty"`
    	Users []User `json:"users,omitempty"`
    }

    // Minimal user representation used in lists (comments, timelines, etc).
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

##### `400 Bad Request` — Empty Query

=== "JSON"

    ```json
    // SearchUsers400Response
    "SearchUsers400Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type SearchUsers400Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type SearchUsers400Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### User by ID  {: #op-getuserbyid }

**`GET /users/{id}`**

Fetch user profile by their unique ID.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes | The ID of the user |

=== "JSON"

    ```json
    // GetUserByIdPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetUserByIdPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type GetUserByIdPath struct {
    	Id string `path:"id"`
    }
    ```

#### Responses

##### `200 OK` — User Data

=== "JSON"

    ```json
    // GetUserById200Response
    {
      "data"?: "UserProfile",
      "status"?: "200"
    }

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
    interface GetUserById200Response {
      data?: UserProfile;
      status?: 200;
    }

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
    type GetUserById200Response struct {
    	Data UserProfile `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

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

##### `400 Bad Request` — Invalid User Id

=== "JSON"

    ```json
    // GetUserById400Response
    "GetUserById400Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserById400Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserById400Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // GetUserById404Response
    "GetUserById404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserById404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserById404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### User By Nick  {: #op-getuserbynick }

**`GET /users/by_nick/{nick}`**

Fetch a user profile by their nick.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `nick` | `String` | yes | The nick of the user |

=== "JSON"

    ```json
    // GetUserByNickPath
    {
      "nick": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetUserByNickPath {
      nick: string;
    }
    ```

=== "Go"

    ```go
    type GetUserByNickPath struct {
    	Nick string `path:"nick"`
    }
    ```

#### Responses

##### `200 OK` — User Profile

=== "JSON"

    ```json
    // GetUserByNick200Response
    {
      "data"?: "UserProfile",
      "status"?: "200"
    }

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
    interface GetUserByNick200Response {
      data?: UserProfile;
      status?: 200;
    }

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
    type GetUserByNick200Response struct {
    	Data UserProfile `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

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

##### `400 Bad Request` — Bad Request

=== "JSON"

    ```json
    // GetUserByNick400Response
    "GetUserByNick400Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserByNick400Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserByNick400Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // GetUserByNick404Response
    "GetUserByNick404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserByNick404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserByNick404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Subscribe to User  {: #op-subscribetouser }

**`PUT /users/{id}/subscribers`**

Add user to the Client's subscriptions.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // SubscribeToUserPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SubscribeToUserPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type SubscribeToUserPath struct {
    	Id string `path:"id"`
    }
    ```

#### Responses

##### `200 OK` — Subscribed

=== "JSON"

    ```json
    // SubscribeToUser200Response
    {
      "status"?: "200"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SubscribeToUser200Response {
      status?: 200;
    }
    ```

=== "Go"

    ```go
    type SubscribeToUser200Response struct {
    	Status *int `json:"status,omitempty"`
    }
    ```

### Unsubscribe to User  {: #op-unsubscribefromuser }

**`DELETE /users/{id}/subscribers`**

Removes the user from the Client's subscriptions.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // UnsubscribeFromUserPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnsubscribeFromUserPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type UnsubscribeFromUserPath struct {
    	Id string `path:"id"`
    }
    ```

#### Responses

##### `200 OK` — Unsubscribed

=== "JSON"

    ```json
    // UnsubscribeFromUser200Response
    {
      "status"?: "200"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnsubscribeFromUser200Response {
      status?: 200;
    }
    ```

=== "Go"

    ```go
    type UnsubscribeFromUser200Response struct {
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // UnsubscribeFromUser404Response
    "UnsubscribeFromUser404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type UnsubscribeFromUser404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnsubscribeFromUser404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Subscribe to User Updates  {: #op-subscribetouserupdates }

**`PUT /users/{id}/updates_subcribers`**

Add the user to the Client's "updates" subscriptions.
This will notify the client when the user uploads new content.

Note: path spelling ("subcribers") matches the live API and is preserved as-is.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // SubscribeToUserUpdatesPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SubscribeToUserUpdatesPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type SubscribeToUserUpdatesPath struct {
    	Id string `path:"id"`
    }
    ```

#### Responses

##### `200 OK` — Subscribed to Updates

=== "JSON"

    ```json
    // SubscribeToUserUpdates200Response
    {
      "status"?: "200"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SubscribeToUserUpdates200Response {
      status?: 200;
    }
    ```

=== "Go"

    ```go
    type SubscribeToUserUpdates200Response struct {
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // SubscribeToUserUpdates404Response
    "SubscribeToUserUpdates404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type SubscribeToUserUpdates404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type SubscribeToUserUpdates404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Unsubscribe to User Updates  {: #op-unsubscribefromuserupdates }

**`DELETE /users/{id}/updates_subscribers`**

Remove the user from the Client's "updates" subscriptions.
This will stop iFunny notifying the Client when the user uploads new content.

Note: this path is spelled "subscribers" (unlike the PUT variant's "subcribers"),
matching the live API's inconsistency.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // UnsubscribeFromUserUpdatesPath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnsubscribeFromUserUpdatesPath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type UnsubscribeFromUserUpdatesPath struct {
    	Id string `path:"id"`
    }
    ```

#### Responses

##### `200 OK` — Unsubscribed to Updates

=== "JSON"

    ```json
    // UnsubscribeFromUserUpdates200Response
    {
      "status"?: "200"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnsubscribeFromUserUpdates200Response {
      status?: 200;
    }
    ```

=== "Go"

    ```go
    type UnsubscribeFromUserUpdates200Response struct {
    	Status *int `json:"status,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // UnsubscribeFromUserUpdates404Response
    "UnsubscribeFromUserUpdates404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type UnsubscribeFromUserUpdates404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnsubscribeFromUserUpdates404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Scroll Timeline  {: #op-getusertimeline }

**`GET /timelines/user/{id}`**

Paginate through content on the user's timeline.

If a Basic token is used, it will only show original content, not republished content.
If a Bearer token is used, it will include republished content.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BasicAuth + ProjectId or BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `id` | `String` | yes |  |

=== "JSON"

    ```json
    // GetUserTimelinePath
    {
      "id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetUserTimelinePath {
      id: string;
    }
    ```

=== "Go"

    ```go
    type GetUserTimelinePath struct {
    	Id string `path:"id"`
    }
    ```

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `limit` | `Number` | no |  |

=== "JSON"

    ```json
    // GetUserTimelineQuery
    {
      "limit"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface GetUserTimelineQuery {
      limit?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserTimelineQuery struct {
    	Limit *int `query:"limit,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — User Timeline

=== "JSON"

    ```json
    // GetUserTimeline200Response
    {
      "data"?: "GetUserTimeline200Data",
      "status"?: "200"
    }

    // GetUserTimeline200Data
    {
      "content"?: "GetUserTimeline200DataContent"
    }

    // GetUserTimeline200DataContent
    {
      "items"?: "Content[]",
      "paging"?: "PagingCursors"
    }

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    // Content
    {
      "id"?: "string",
      "type"?: "ContentType",
      "state"?: "enum(delayed, deleted, draft, published)",
      "title"?: "string",
      "url"?: "string",

      "fixed_title"?: "string",
      "description"?: "string",
      "tags"?: "string[]",
      "share_url"?: "string",
      "canonical_url"?: "string",
      "link"?: "string",
      "date_create"?: "integer",
      "publish_at"?: "integer",
      "issue_at"?: "integer",

      "creator"?: "User",
      "num"?: "ContentNums",

      "is_smiled"?: "boolean",
      "is_unsmiled"?: "boolean",
      "is_abused"?: "boolean",
      "is_featured"?: "boolean",
      "is_republished"?: "boolean",
      "is_pinned"?: "boolean",

      "thumb"?: "ContentThumbnail",
      "bg_color"?: "string",
      "size"?: "ContentSize",
      "has_header"?: "boolean",
      "subtitle"?: "ContentSubtitle",

      "pic"?: "ContentPic",
      "caption"?: "ContentCaption",
      "comics"?: "ContentComics",
      "mem"?: "ContentMem",
      "video_clip"?: "ContentVideoClip",
      "video"?: "ContentVideo",
      "vine"?: "ContentVine",
      "coub"?: "ContentCoub",
      "gif"?: "ContentGif",
      "app"?: "ContentApp",

      "visibility"?: "enum(public, subscribers, closed, chats)",
      "shot_status"?: "enum(approved, shot, hardShot)",
      "fast_start"?: "boolean",
      "risk"?: "integer",
      "can_be_boosted"?: "boolean",
      "old_watermark"?: "boolean",

      "copyright"?: "ContentCopyright",
      "source"?: "ContentSource",
      "traceback_url"?: "string",
      "ftag"?: "string",

      "engagement_rate"?: "string",
      "engagement_rate_explain"?: "string",
      "ocr_text"?: "string",
      "lat"?: "number",
      "lon"?: "number"
    }

    // Cursor pagination block. Field naming (`hasNext`/`hasPrev` vs
    // `has_next`/`has_prev`) is inconsistent across endpoints in the source API;
    // both are accepted here.
    // PagingCursors
    {
      "cursors"?: "PagingCursorsCursors",
      "hasNext"?: "boolean",
      "hasPrev"?: "boolean",
      "has_next"?: "boolean",
      "has_prev"?: "boolean"
    }

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    // ContentType
    "ContentType": "enum(pic, mem, comics, caption, video_clip, video, vine, coub, gif, gif_caption, app, old, dem, special)"

    // Minimal user representation used in lists (comments, timelines, etc).
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

    // ContentNums
    {
      "smiles"?: "integer",
      "unsmiles"?: "integer",
      "guest_smiles"?: "integer",
      "comments"?: "integer",
      "views"?: "integer",
      "republished"?: "integer",
      "shares"?: "integer"
    }

    // ContentThumbnail
    {
      "small_url"?: "string",
      "url"?: "string",
      "large_url"?: "string",
      "x640_url"?: "string",
      "webp_url"?: "string",
      "large_webp_url"?: "string",
      "x640_webp_url"?: "string",
      "proportional_url"?: "string",
      "proportional_webp_url"?: "string",
      "proportional_size"?: "ContentThumbnailProportionalSize"
    }

    // ContentSize
    {
      "w"?: "integer",
      "h"?: "integer"
    }

    // ContentSubtitle
    {
      "lang"?: "string",
      "url"?: "string"
    }

    // ContentPic
    {
      "webp_url"?: "string"
    }

    // ContentCaption
    {
      "caption_text"?: "string"
    }

    // ContentComics
    {
      "webp_url"?: "string"
    }

    // ContentMem
    {
      "webp_url"?: "string"
    }

    // ContentVideoClip
    {
      "screen_url"?: "string",
      "bytes"?: "integer",
      "source_type"?: "enum(user, instagram)",
      "logo_url"?: "string",
      "duration"?: "integer"
    }

    // ContentVideo
    {
      "url"?: "string",
      "duration"?: "integer",
      "length"?: "integer"
    }

    // ContentVine
    {
      "screen_url"?: "string",
      "bytes"?: "integer"
    }

    // ContentCoub
    {
      "screen_url"?: "string",
      "bytes"?: "integer",
      "traceback_url"?: "string",
      "duration"?: "integer"
    }

    // ContentGif
    {
      "caption"?: "string",
      "screen_url"?: "string",
      "bytes"?: "integer",
      "mp4_url"?: "string",
      "mp4_bytes"?: "integer",
      "webm_url"?: "string"
    }

    // ContentApp
    {
      "url"?: "string",
      "is_scroll_allowed"?: "boolean"
    }

    // ContentCopyright
    {
      "note"?: "string",
      "url"?: "string"
    }

    // ContentSource
    {
      "id"?: "string",
      "date_create"?: "integer",
      "creator"?: "User"
    }

    // PagingCursorsCursors
    {
      "next"?: "string",
      "prev"?: "string"
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

    // ContentThumbnailProportionalSize
    {
      "w"?: "integer",
      "h"?: "integer"
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
    interface GetUserTimeline200Response {
      data?: GetUserTimeline200Data;
      status?: 200;
    }

    interface GetUserTimeline200Data {
      content?: GetUserTimeline200DataContent;
    }

    interface GetUserTimeline200DataContent {
      items?: Content[];
      paging?: PagingCursors;
    }

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    interface Content {
      id?: string;
      type?: ContentType;
      state?: 'delayed' | 'deleted' | 'draft' | 'published';
      title?: string;
      url?: string;

      fixed_title?: string;
      description?: string;
      tags?: string[];
      share_url?: string;
      canonical_url?: string;
      link?: string;
      date_create?: number;
      publish_at?: number;
      issue_at?: number;

      creator?: User;
      num?: ContentNums;

      is_smiled?: boolean;
      is_unsmiled?: boolean;
      is_abused?: boolean;
      is_featured?: boolean;
      is_republished?: boolean;
      is_pinned?: boolean;

      thumb?: ContentThumbnail;
      bg_color?: string;
      size?: ContentSize;
      has_header?: boolean;
      subtitle?: ContentSubtitle;

      pic?: ContentPic;
      caption?: ContentCaption;
      comics?: ContentComics;
      mem?: ContentMem;
      video_clip?: ContentVideoClip;
      video?: ContentVideo;
      vine?: ContentVine;
      coub?: ContentCoub;
      gif?: ContentGif;
      app?: ContentApp;

      visibility?: 'public' | 'subscribers' | 'closed' | 'chats';
      shot_status?: 'approved' | 'shot' | 'hardShot';
      fast_start?: boolean;
      risk?: number;
      can_be_boosted?: boolean;
      old_watermark?: boolean;

      copyright?: ContentCopyright;
      source?: ContentSource;
      traceback_url?: string;
      ftag?: string;

      engagement_rate?: string;
      engagement_rate_explain?: string;
      ocr_text?: string;
      lat?: number;
      lon?: number;
    }

    // Cursor pagination block. Field naming (`hasNext`/`hasPrev` vs
    // `has_next`/`has_prev`) is inconsistent across endpoints in the source API;
    // both are accepted here.
    interface PagingCursors {
      cursors?: PagingCursorsCursors;
      hasNext?: boolean;
      hasPrev?: boolean;
      has_next?: boolean;
      has_prev?: boolean;
    }

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType = 'pic' | 'mem' | 'comics' | 'caption' | 'video_clip' | 'video' | 'vine' | 'coub' | 'gif' | 'gif_caption' | 'app' | 'old' | 'dem' | 'special';

    // Minimal user representation used in lists (comments, timelines, etc).
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

    interface ContentNums {
      smiles?: number;
      unsmiles?: number;
      guest_smiles?: number;
      comments?: number;
      views?: number;
      republished?: number;
      shares?: number;
    }

    interface ContentThumbnail {
      small_url?: string;
      url?: string;
      large_url?: string;
      x640_url?: string;
      webp_url?: string;
      large_webp_url?: string;
      x640_webp_url?: string;
      proportional_url?: string;
      proportional_webp_url?: string;
      proportional_size?: ContentThumbnailProportionalSize;
    }

    interface ContentSize {
      w?: number;
      h?: number;
    }

    interface ContentSubtitle {
      lang?: string;
      url?: string;
    }

    interface ContentPic {
      webp_url?: string;
    }

    interface ContentCaption {
      caption_text?: string;
    }

    interface ContentComics {
      webp_url?: string;
    }

    interface ContentMem {
      webp_url?: string;
    }

    interface ContentVideoClip {
      screen_url?: string;
      bytes?: number;
      source_type?: 'user' | 'instagram';
      logo_url?: string;
      duration?: number;
    }

    interface ContentVideo {
      url?: string;
      duration?: number;
      length?: number;
    }

    interface ContentVine {
      screen_url?: string;
      bytes?: number;
    }

    interface ContentCoub {
      screen_url?: string;
      bytes?: number;
      traceback_url?: string;
      duration?: number;
    }

    interface ContentGif {
      caption?: string;
      screen_url?: string;
      bytes?: number;
      mp4_url?: string;
      mp4_bytes?: number;
      webm_url?: string;
    }

    interface ContentApp {
      url?: string;
      is_scroll_allowed?: boolean;
    }

    interface ContentCopyright {
      note?: string;
      url?: string;
    }

    interface ContentSource {
      id?: string;
      date_create?: number;
      creator?: User;
    }

    interface PagingCursorsCursors {
      next?: string;
      prev?: string;
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

    interface ContentThumbnailProportionalSize {
      w?: number;
      h?: number;
    }

    interface ProfilePhotoThumb {
      large_url?: string;
      medium_url?: string;
      small_url?: string;
    }
    ```

=== "Go"

    ```go
    type GetUserTimeline200Response struct {
    	Data GetUserTimeline200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type GetUserTimeline200Data struct {
    	Content GetUserTimeline200DataContent `json:"content,omitempty"`
    }

    type GetUserTimeline200DataContent struct {
    	Items []Content `json:"items,omitempty"`
    	Paging PagingCursors `json:"paging,omitempty"`
    }

    // A single piece of iFunny content. The `type` field discriminates the
    // variant, and exactly one of the media-variant fields (`pic`, `caption`,
    // `comics`, `mem`, `video_clip`, `video`, `vine`, `coub`, `gif`, `app`)
    // will be present per item — they are mutually exclusive.
    type Content struct {
    	Id *string `json:"id,omitempty"`
    	Type ContentType `json:"type,omitempty"`
    	State *string `json:"state,omitempty"`
    	Title *string `json:"title,omitempty"`
    	Url *string `json:"url,omitempty"`

    	FixedTitle *string `json:"fixed_title,omitempty"`
    	Description *string `json:"description,omitempty"`
    	Tags []string `json:"tags,omitempty"`
    	ShareUrl *string `json:"share_url,omitempty"`
    	CanonicalUrl *string `json:"canonical_url,omitempty"`
    	Link *string `json:"link,omitempty"`
    	DateCreate *int `json:"date_create,omitempty"`
    	PublishAt *int `json:"publish_at,omitempty"`
    	IssueAt *int `json:"issue_at,omitempty"`

    	Creator User `json:"creator,omitempty"`
    	Num ContentNums `json:"num,omitempty"`

    	IsSmiled *bool `json:"is_smiled,omitempty"`
    	IsUnsmiled *bool `json:"is_unsmiled,omitempty"`
    	IsAbused *bool `json:"is_abused,omitempty"`
    	IsFeatured *bool `json:"is_featured,omitempty"`
    	IsRepublished *bool `json:"is_republished,omitempty"`
    	IsPinned *bool `json:"is_pinned,omitempty"`

    	Thumb ContentThumbnail `json:"thumb,omitempty"`
    	BgColor *string `json:"bg_color,omitempty"`
    	Size ContentSize `json:"size,omitempty"`
    	HasHeader *bool `json:"has_header,omitempty"`
    	Subtitle ContentSubtitle `json:"subtitle,omitempty"`

    	Pic ContentPic `json:"pic,omitempty"`
    	Caption ContentCaption `json:"caption,omitempty"`
    	Comics ContentComics `json:"comics,omitempty"`
    	Mem ContentMem `json:"mem,omitempty"`
    	VideoClip ContentVideoClip `json:"video_clip,omitempty"`
    	Video ContentVideo `json:"video,omitempty"`
    	Vine ContentVine `json:"vine,omitempty"`
    	Coub ContentCoub `json:"coub,omitempty"`
    	Gif ContentGif `json:"gif,omitempty"`
    	App ContentApp `json:"app,omitempty"`

    	Visibility *string `json:"visibility,omitempty"`
    	ShotStatus *string `json:"shot_status,omitempty"`
    	FastStart *bool `json:"fast_start,omitempty"`
    	Risk *int `json:"risk,omitempty"`
    	CanBeBoosted *bool `json:"can_be_boosted,omitempty"`
    	OldWatermark *bool `json:"old_watermark,omitempty"`

    	Copyright ContentCopyright `json:"copyright,omitempty"`
    	Source ContentSource `json:"source,omitempty"`
    	TracebackUrl *string `json:"traceback_url,omitempty"`
    	Ftag *string `json:"ftag,omitempty"`

    	EngagementRate *string `json:"engagement_rate,omitempty"`
    	EngagementRateExplain *string `json:"engagement_rate_explain,omitempty"`
    	OcrText *string `json:"ocr_text,omitempty"`
    	Lat *float64 `json:"lat,omitempty"`
    	Lon *float64 `json:"lon,omitempty"`
    }

    // Cursor pagination block. Field naming (`hasNext`/`hasPrev` vs
    // `has_next`/`has_prev`) is inconsistent across endpoints in the source API;
    // both are accepted here.
    type PagingCursors struct {
    	Cursors PagingCursorsCursors `json:"cursors,omitempty"`
    	HasNext *bool `json:"hasNext,omitempty"`
    	HasPrev *bool `json:"hasPrev,omitempty"`
    	HasNext *bool `json:"has_next,omitempty"`
    	HasPrev *bool `json:"has_prev,omitempty"`
    }

    // Images: pic, mem, comics, caption.
    // Videos: video_clip, video, vine, coub.
    // Gif: gif, gif_caption.
    // Unknown/likely deprecated: app, old, dem, special.
    type ContentType string

    // Minimal user representation used in lists (comments, timelines, etc).
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

    type ContentNums struct {
    	Smiles *int `json:"smiles,omitempty"`
    	Unsmiles *int `json:"unsmiles,omitempty"`
    	GuestSmiles *int `json:"guest_smiles,omitempty"`
    	Comments *int `json:"comments,omitempty"`
    	Views *int `json:"views,omitempty"`
    	Republished *int `json:"republished,omitempty"`
    	Shares *int `json:"shares,omitempty"`
    }

    type ContentThumbnail struct {
    	SmallUrl *string `json:"small_url,omitempty"`
    	Url *string `json:"url,omitempty"`
    	LargeUrl *string `json:"large_url,omitempty"`
    	X640Url *string `json:"x640_url,omitempty"`
    	WebpUrl *string `json:"webp_url,omitempty"`
    	LargeWebpUrl *string `json:"large_webp_url,omitempty"`
    	X640WebpUrl *string `json:"x640_webp_url,omitempty"`
    	ProportionalUrl *string `json:"proportional_url,omitempty"`
    	ProportionalWebpUrl *string `json:"proportional_webp_url,omitempty"`
    	ProportionalSize ContentThumbnailProportionalSize `json:"proportional_size,omitempty"`
    }

    type ContentSize struct {
    	W *int `json:"w,omitempty"`
    	H *int `json:"h,omitempty"`
    }

    type ContentSubtitle struct {
    	Lang *string `json:"lang,omitempty"`
    	Url *string `json:"url,omitempty"`
    }

    type ContentPic struct {
    	WebpUrl *string `json:"webp_url,omitempty"`
    }

    type ContentCaption struct {
    	CaptionText *string `json:"caption_text,omitempty"`
    }

    type ContentComics struct {
    	WebpUrl *string `json:"webp_url,omitempty"`
    }

    type ContentMem struct {
    	WebpUrl *string `json:"webp_url,omitempty"`
    }

    type ContentVideoClip struct {
    	ScreenUrl *string `json:"screen_url,omitempty"`
    	Bytes *int `json:"bytes,omitempty"`
    	SourceType *string `json:"source_type,omitempty"`
    	LogoUrl *string `json:"logo_url,omitempty"`
    	Duration *int `json:"duration,omitempty"`
    }

    type ContentVideo struct {
    	Url *string `json:"url,omitempty"`
    	Duration *int `json:"duration,omitempty"`
    	Length *int `json:"length,omitempty"`
    }

    type ContentVine struct {
    	ScreenUrl *string `json:"screen_url,omitempty"`
    	Bytes *int `json:"bytes,omitempty"`
    }

    type ContentCoub struct {
    	ScreenUrl *string `json:"screen_url,omitempty"`
    	Bytes *int `json:"bytes,omitempty"`
    	TracebackUrl *string `json:"traceback_url,omitempty"`
    	Duration *int `json:"duration,omitempty"`
    }

    type ContentGif struct {
    	Caption *string `json:"caption,omitempty"`
    	ScreenUrl *string `json:"screen_url,omitempty"`
    	Bytes *int `json:"bytes,omitempty"`
    	Mp4Url *string `json:"mp4_url,omitempty"`
    	Mp4Bytes *int `json:"mp4_bytes,omitempty"`
    	WebmUrl *string `json:"webm_url,omitempty"`
    }

    type ContentApp struct {
    	Url *string `json:"url,omitempty"`
    	IsScrollAllowed *bool `json:"is_scroll_allowed,omitempty"`
    }

    type ContentCopyright struct {
    	Note *string `json:"note,omitempty"`
    	Url *string `json:"url,omitempty"`
    }

    type ContentSource struct {
    	Id *string `json:"id,omitempty"`
    	DateCreate *int `json:"date_create,omitempty"`
    	Creator User `json:"creator,omitempty"`
    }

    type PagingCursorsCursors struct {
    	Next *string `json:"next,omitempty"`
    	Prev *string `json:"prev,omitempty"`
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

    type ContentThumbnailProportionalSize struct {
    	W *int `json:"w,omitempty"`
    	H *int `json:"h,omitempty"`
    }

    type ProfilePhotoThumb struct {
    	LargeUrl *string `json:"large_url,omitempty"`
    	MediumUrl *string `json:"medium_url,omitempty"`
    	SmallUrl *string `json:"small_url,omitempty"`
    }
    ```

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // GetUserTimeline404Response
    "GetUserTimeline404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type GetUserTimeline404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type GetUserTimeline404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Block User  {: #op-blockuser }

**`PUT /users/my/blocked/{user_id}`**

Block a user. `type=user` blocks only the target account; `type=installation`
blocks every account associated with that user's install (device).

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `user_id` | `String` | yes |  |

=== "JSON"

    ```json
    // BlockUserPath
    {
      "user_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface BlockUserPath {
      user_id: string;
    }
    ```

=== "Go"

    ```go
    type BlockUserPath struct {
    	UserId string `path:"user_id"`
    }
    ```

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `String` | yes | One of: user, installation |

=== "JSON"

    ```json
    // BlockUserQuery
    {
      "type": "enum(user, installation)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface BlockUserQuery {
      type: 'user' | 'installation';
    }
    ```

=== "Go"

    ```go
    type BlockUserQuery struct {
    	Type string `query:"type"`
    }
    ```

#### Responses

##### `200 OK` — User blocked

No response body.

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // BlockUser404Response
    "BlockUser404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type BlockUser404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type BlockUser404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Unblock User  {: #op-unblockuser }

**`DELETE /users/my/blocked/{user_id}`**

Remove a user from the client's block list.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `user_id` | `String` | yes |  |

=== "JSON"

    ```json
    // UnblockUserPath
    {
      "user_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnblockUserPath {
      user_id: string;
    }
    ```

=== "Go"

    ```go
    type UnblockUserPath struct {
    	UserId string `path:"user_id"`
    }
    ```

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `String` | no | One of: user, installation |

=== "JSON"

    ```json
    // UnblockUserQuery
    {
      "type"?: "enum(user, installation)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface UnblockUserQuery {
      type?: 'user' | 'installation';
    }
    ```

=== "Go"

    ```go
    type UnblockUserQuery struct {
    	Type *string `query:"type,omitempty"`
    }
    ```

#### Responses

##### `200 OK` — User unblocked

No response body.

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // UnblockUser404Response
    "UnblockUser404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type UnblockUser404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type UnblockUser404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```

### Report User  {: #op-reportuser }

**`PUT /users/{user_id}/abuses`**

Report a user for abuse. `type` categorizes the report.

**Base URL:** `https://api.ifunny.mobi/v4`  
**Auth:** BearerAuth + ProjectId

#### Path parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `user_id` | `String` | yes |  |

=== "JSON"

    ```json
    // ReportUserPath
    {
      "user_id": "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ReportUserPath {
      user_id: string;
    }
    ```

=== "Go"

    ```go
    type ReportUserPath struct {
    	UserId string `path:"user_id"`
    }
    ```

#### Query parameters

=== "Fields"

    | Name | Type | Required | Description |
    | ---- | ---- | -------- | ----------- |
    | `type` | `String` | yes | One of: hate, nude, spam, harm, target |

=== "JSON"

    ```json
    // ReportUserQuery
    {
      "type": "enum(hate, nude, spam, harm, target)"
    }
    ```

=== "TypeScript"

    ```typescript
    interface ReportUserQuery {
      type: 'hate' | 'nude' | 'spam' | 'harm' | 'target';
    }
    ```

=== "Go"

    ```go
    type ReportUserQuery struct {
    	Type string `query:"type"`
    }
    ```

#### Responses

##### `200 OK` — Report accepted

No response body.

##### `404 Not Found` — Not Found

=== "JSON"

    ```json
    // ReportUser404Response
    "ReportUser404Response": "Error"

    // Error
    {
      "error"?: "string",
      "error_description"?: "string",
      "status"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    type ReportUser404Response = Error;

    interface Error {
      error?: string;
      error_description?: string;
      status?: number;
    }
    ```

=== "Go"

    ```go
    type ReportUser404Response Error

    type Error struct {
    	Error *string `json:"error,omitempty"`
    	ErrorDescription *string `json:"error_description,omitempty"`
    	Status *int `json:"status,omitempty"`
    }
    ```
