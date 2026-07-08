=== "JSON"

    ```json
    // SearchTags200Response
    {
      "data"?: "SearchTags200Data",
      "status"?: "200"
    }

    // SearchTags200Data
    {
      "tags"?: "SearchTags200DataTags"
    }

    // SearchTags200DataTags
    {
      "items"?: "Tag[]"
    }

    // Tag
    {
      "title"?: "string"
    }
    ```

=== "TypeScript"

    ```typescript
    interface SearchTags200Response {
      data?: SearchTags200Data;
      status?: 200;
    }

    interface SearchTags200Data {
      tags?: SearchTags200DataTags;
    }

    interface SearchTags200DataTags {
      items?: Tag[];
    }

    interface Tag {
      title?: string;
    }
    ```

=== "Go"

    ```go
    type SearchTags200Response struct {
    	Data SearchTags200Data `json:"data,omitempty"`
    	Status *int `json:"status,omitempty"`
    }

    type SearchTags200Data struct {
    	Tags SearchTags200DataTags `json:"tags,omitempty"`
    }

    type SearchTags200DataTags struct {
    	Items []Tag `json:"items,omitempty"`
    }

    type Tag struct {
    	Title *string `json:"title,omitempty"`
    }
    ```
