# Ummon Hostel Security Specification

## 1. Data Invariants
1. **Public Booking Creation**: Unauthenticated or authenticated guests can create bookings with valid payload constraints (safe strings, positive price & nights). Bookings cannot be deleted or forged to arbitrary status (default status 'pending').
2. **PII Isolation**: Guest contact details, phone numbers, and passport numbers in `bookings` and `messages` must only be readable by authorized staff and administrators (`isAdmin()` or staff).
3. **Public Reviews**: Public users can submit reviews with `isApproved: false`. Public read access is strictly limited to approved reviews (`isApproved == true`). Only admins can approve, update, or delete reviews.
4. **Rooms Catalog**: Rooms are readable publicly (active rooms) so travelers can view and pick rooms, but can only be created, modified, or deleted by authorized administrators and staff.
5. **Contact Messages**: Public visitors can submit inquiries (`messages`), but cannot read messages from others. Only staff/admins can list, read, or mark as read.
6. **Financial Integrity**: `payments` and `expenses` collections can only be accessed or modified by authenticated hostel staff and owners.
7. **Role & Admin Guard**: Admin operations check existence in `/databases/$(database)/documents/admins/$(request.auth.uid)`. Self-privilege escalation is forbidden.

## 2. The "Dirty Dozen" Payloads (Adversarial Testing)
1. **D1 - Injected Admin Self-Creation**: Anonymous attacker attempts to write to `/admins/{uid}` with `{ isAdmin: true }` -> REJECTED.
2. **D2 - Room Price Sabotage**: Unauthenticated attacker attempts `update` on `/rooms/dorm-4` to set `priceUsd: 0.01` -> REJECTED.
3. **D3 - Status Poisoning on Booking**: Public user attempts to create a booking with `status: 'checked_in'` and `paymentStatus: 'paid'` without payment -> REJECTED (only status: 'pending' allowed on public create).
4. **D4 - Booking Update Hijacking**: Random visitor attempts to alter existing booking guest name or status -> REJECTED.
5. **D5 - PII Mass Scrape**: Unauthenticated visitor attempts to list all documents in `/bookings` or `/messages` -> REJECTED.
6. **D6 - Review Self-Approval**: Public submitter posts review with `isApproved: true` -> REJECTED (public create must have `isApproved == false`).
7. **D7 - Shadow Field Injection**: Injected malicious fields in `/bookings` (e.g. `{ backdoorRole: 'superadmin' }`) -> REJECTED via strict schema validation.
8. **D8 - Financial Record Insertion**: Anonymous attacker attempts to insert a record into `/payments` -> REJECTED.
9. **D9 - Expense Deletion**: Unauthenticated actor attempts to delete records from `/expenses` -> REJECTED.
10. **D10 - Excessive String Payload (Denial of Wallet)**: Submitting a 5MB message string to `/messages` -> REJECTED by string size bounds (`size() <= 2000`).
11. **D11 - Spoofed Timestamp / Clock Drift**: Submitting client timestamps rather than valid ISO strings / server verification -> REJECTED.
12. **D12 - Gallery Defacement**: Unauthenticated actor attempting to delete or overwrite `/gallery` images -> REJECTED.

## 3. Test Runner
Included in security verification suite.
