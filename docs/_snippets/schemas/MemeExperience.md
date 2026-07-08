=== "JSON"

    ```json
    // MemeExperience
    {
      "badge_size"?: "MemeExperienceBadgeSize",
      "badge_url"?: "string",
      "days"?: "integer",
      "next_milestone"?: "integer",
      "rank"?: "integer"
    }

    // MemeExperienceBadgeSize
    {
      "h"?: "integer",
      "w"?: "integer"
    }
    ```

=== "TypeScript"

    ```typescript
    interface MemeExperience {
      badge_size?: MemeExperienceBadgeSize;
      badge_url?: string;
      days?: number;
      next_milestone?: number;
      rank?: number;
    }

    interface MemeExperienceBadgeSize {
      h?: number;
      w?: number;
    }
    ```

=== "Go"

    ```go
    type MemeExperience struct {
    	BadgeSize MemeExperienceBadgeSize `json:"badge_size,omitempty"`
    	BadgeUrl *string `json:"badge_url,omitempty"`
    	Days *int `json:"days,omitempty"`
    	NextMilestone *int `json:"next_milestone,omitempty"`
    	Rank *int `json:"rank,omitempty"`
    }

    type MemeExperienceBadgeSize struct {
    	H *int `json:"h,omitempty"`
    	W *int `json:"w,omitempty"`
    }
    ```
