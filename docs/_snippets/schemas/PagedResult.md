=== "JSON"

    ```json
    // PagedResult
    {
      "items"?: "any[]",
      "paging"?: "PagingCursors"
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

    // PagingCursorsCursors
    {
      "next"?: "string",
      "prev"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface PagedResult {
      items?: unknown[];
      paging?: PagingCursors;
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

    interface PagingCursorsCursors {
      next?: string;
      prev?: string;
    }
    ```

=== "Go"

    ```go
    type PagedResult struct {
    	Items []interface{} `json:"items,omitempty"`
    	Paging PagingCursors `json:"paging,omitempty"`
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

    type PagingCursorsCursors struct {
    	Next *string `json:"next,omitempty"`
    	Prev *string `json:"prev,omitempty"`
    }
    ```
