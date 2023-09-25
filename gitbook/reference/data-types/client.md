---
description: Collection of data structures related to the Client
---

# 🤖 Client

## Appeal

```typescript
{
    ban_reason: string; // Reason for strikes as well
    id: string;
    created_at: number; // UNIX in Seconds
    status: "pending" | "denied";
    type: "ban" | "strike";
    strike_id?: string;
    ban_id?: string;
}
```
