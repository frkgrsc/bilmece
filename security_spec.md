# Security Specification: Milyoner Bilgi Yarışması Scoreboard

## 1. Data Invariants

1.  **Identity Integrity**: Users can only write highscore records if their authenticated `request.auth.uid` matches the `userId` field of the document.
2.  **Immutability**: Highscore records are strictly read and write once. Updates (`update`) and deletions (`delete`) are blocked entirely to prevent leadboard cheating and retro-tampering.
3.  **Type & Value Boundaries**:
    *   `nickname` must be a string between 3 and 20 characters.
    *   `prize` must be a string up to 32 characters.
    *   `prizeAmount` must be an integer between 0 and 1,000,000.
    *   `levelReached` must be an integer between 0 and 15.
    *   `walkedAway` must be a boolean.
    *   `createdAt` must exactly match the server timestamp (`request.time`).
4.  **No Orphaned writes**: Path variables constraints must be enforced.

## 2. The "Dirty Dozen" Spoofing Payloads (Denied)

The following payload attempts must be strictly denied by Firestore Rules:

1.  **Anonymous Unauthenticated Write**: Attempting to write a score without being authenticated.
2.  **Identity Spoofing**: Signed in user `A` trying to set `userId` to user `B`.
3.  **Score Manipulation (Update)**: A user trying to update an existing score document to increase their prize.
4.  **Leaderboard Deletion**: A user trying to delete their own or other users' scores.
5.  **Junk Data Injection**: Setting `prizeAmount` to a negative scale or over 1,000,000 (e.g. `10,000,000 TL`).
6.  **Unbounded Name**: `nickname` longer than 20 characters (to avoid UI damage).
7.  **Short Name**: `nickname` shorter than 2 characters.
8.  **Type Poisoning**: `prizeAmount` passed as a string/boolean value.
9.  **Timestamp Spoofing**: Specifying a client-side hardcoded date instead of `request.time`.
10. **Shadow Hack Field Insertion**: Injecting a custom `isAdmin` field in highscores to escalate privileges.
11. **Malicious ID injection**: Attempting to create highscores with extremely large document IDs to trigger OOM/Quota attacks.
12. **Blanket Query Scraping**: Attempting listing queries without correct limits (max 100 rows).

## 3. Test Cases (Verification Blueprint)

We will implement strict validation functions inside `firestore.rules` and test using mock structures to verify that any of the above 12 exploits return a solid `PERMISSION_DENIED`.
