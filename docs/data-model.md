# Data Model: Reg Points vs User Points

Both are **Qdrant points in a single collection `i`**, separated by the tenant
field `s`. A **reg point** records a chess-championship registration; a **user
point** records a signed-in account. They are linked by email `e`.

## Entity diagram

```mermaid
erDiagram
    REG_POINT {
        string s "always 'reg'"
        string e "email (link key)"
        string fn "first name / school"
        string ln "last name / school"
        string sn "school name"
        string p "phone"
        number amt "amount in kobo"
        string st "pending | paid"
        number v "0 | 1 | 2"
        number d "created ms"
        string ref "paystack reference"
        string ac "partner code"
        string pw "transient bcrypt pw (pending only)"
    }
    USER_POINT {
        string s "always 'u'"
        string e "email (link key)"
        string p "bcrypt password hash"
        string n "display name"
        string c "['rpb'] player | ['fab'] partner"
        string ac "partner code (sqids)"
        string ba "bank account"
        string bn "bank name"
        string bk "bank code"
        number d "joined ms"
    }
    PARTNER_USER {
        string s "always 'u'"
        string c "['fab']"
        string ac "partner code"
    }

    REG_POINT ||--o| USER_POINT : "linked by email e"
    REG_POINT }o--|| PARTNER_USER : "reg.ac -> partner.ac"
    USER_POINT ||--o| PARTNER_USER : "c includes 'fab'"
```

## Lifecycle (how a reg point becomes a user point)

```mermaid
flowchart TD
    A[Register form submit] --> B[register-init-payment]
    B -->|creates| C["REG POINT\n s:'reg' st:'pending'\npw = bcrypt(password)"]
    C -->|Paystack checkout| D[User pays]
    D -->|webhook charge.success| E[Verify amount + status]
    E -->|creates| F["REG POINT\n s:'reg' st:'paid'\n(pw dropped)"]
    E -->|find_or_create_player_user| G["USER POINT\n s:'u' c:['rpb']\npw reused as password"]
    F -->|ac matches| H["PARTNER USER\n s:'u' c:['fab'] ac"]
    G -->|ac matches| H
    H -->|dashboard lists| F
```

## Key rules

- **Link key is email `e`**, not the Qdrant point id.
- A `pending` reg point holds the password hash in `pw`; once payment is
  confirmed a `paid` reg point is written **without** `pw`, and the hash is
  moved onto the user point.
- A partner is just a user point with `c` containing `'fab'` and its own `ac`.
  A registration references its partner via `ac`; the partner dashboard queries
  `reg` points where `ac` equals the partner's code.
- `find_or_create_player_user` dedupes on email: an existing user only gets the
  `'rpb'` classification added, never a duplicate point.
