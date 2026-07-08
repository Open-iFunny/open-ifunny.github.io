=== "JSON"

    ```json
    // ChatType
    "ChatType": "enum(1, 2, 3)"
    ```

=== "TypeScript"

    ```typescript
    type ChatType = 1 | 2 | 3;
    ```

=== "Go"

    ```go
    type chatTypeKind int

    const (
    	CHAT_TYPE_1 = chatTypeKind(iota + 1)
    	CHAT_TYPE_2 = chatTypeKind(iota + 1)
    	CHAT_TYPE_3 = chatTypeKind(iota + 1)
    )
    ```
