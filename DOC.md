# SimpleCRM Doc:

## Overview

A minimal CRM with two core tables: Customer and InteractionLog. The system enables tracking customer data and their engagement history for effective follow-up.

## Database Schema

### Customer table:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique identifier (Primary Key). |
| `name` | String | Customer's full name or company name. |
| `email` | String | Primary contact email address. |
| `phone` | String | Primary contact phone number. |
| `address` | Text | Full mailing address (Optional). |
| `created_at` | DateTime | Timestamp when the customer was added. |

### InteractionLog Table:

| Field | Type | Purpose |
| :--- | :--- | :--- |
| `id` | Integer (Primary Key) | Unique identifier for the log entry. |
| `customer_id` | Integer (Foreign Key) | Links the interaction to a specific Customer. |
| `interaction_type` | String (e.g., call, email, meeting, note) | Categorizes the type of interaction. |
| `subject` | String | A brief summary of the interaction. |
| `notes` | Text | Detailed description of what was discussed. |
| `created_at` | DateTime | Timestamp when the interaction was logged (automatically set). |
| `created_by` | String (Optional) | Who logged the interaction (e.g., "system", "admin"). |



## Backend API

### Customer Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/customers` | List all customers |
| `GET` | `/customers/{id}` | Get customer + related logs |
| `GET` | `/customers/latest` | Get latest customer interaction |
| `POST` | `/customers` | Create customer |
| `PATCH` | `/customers/{id}` | Update customer |
| `DELETE` | `/customers/{id}` | Delete customer |

### InteractionLog Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/customers/{customerId}/logs` | Get all logs for a customer |
| `POST` | `/customers/{customerId}/logs` | Add new log |
| `GET` | `/logs/{id}` | Get specific log |

✅ Use JPA @OneToMany mapping; return logs with customer on GET /customers/{id}.

## Frontend Architecture
### Tech Stack
- React + MUI: Polished UI with reusable components.
- React Router: Navigation via /customers/:id.
- Axios: HTTP client for API communication.

### Components
#### Master Section: CustomerView
- Card displays:
-- Name, Email, Phone, Address, created_at
- Search Icon on fields opens modal to find another customer.
#### Detail Section: InteractionManagement
- DataGrid shows:
-- interaction_type, subject, created_at
- "Create Log" Button → opens form modal.
- Click Row → opens read-only modal with full log details.

## Behavior
- Load the most recently interacted customer by default.
- Master-detail layout ensures one customer is viewed at a time.
- Full navigation via search or create new.

We are preventing remove by not including CascadeType.REMOVE in the cascade configuration.

Currently, cascade is:

cascade = {CascadeType.PERSIST, CascadeType.MERGE}

This means:

✅ New interaction logs are saved when the customer is saved (PERSIST)
✅ Updated logs are synchronized (MERGE)
❌ Deleting the customer will NOT automatically delete logs
❌ Deleting a log from the set will NOT persist unless explicitly handled
So, no cascade delete occurs, protecting your data — exactly what you want for a CRM.

## **Optional features**

| Feature | Why It Helps |
|-------|------------|
| **Soft Deletes** (`deleted_at` timestamp) | Shows advanced data modeling; allows recovery |
| **Authentication (JWT/OAuth2)** | Demonstrates security awareness |
| **Filtering & Pagination** | Scales well; expected in real apps |
| **Export to CSV/PDF** | Practical business feature |
| **Unit/Integration Tests** | Proves code quality and reliability |

## How to level this up from 7.5/10 → 9/10 🚀

You don’t need a new project. Just add 1–2 of these:

🔹 Backend polish
DTOs + mapper (MapStruct or manual)
Validation annotations (@NotNull, @Email)
Global exception handler (@ControllerAdvice)
Soft delete for Customer (active flag)

🔹 Frontend polish
Loading & empty states
Server-side pagination for logs
Optimistic UI update when adding a log
Error toast handling (MUI Snackbar)

🔹 Resume/README boost (huge impact)
In your README, explicitly call out:
Why you avoided cascade delete
Why master-detail was chosen
Tradeoffs you made
That turns this from:

“I built a CRM”

into:

“I designed a CRM with real-world constraints”

** Top 3 Flashy Modules That Fit Your CRM PERFECTLY
🥇 1. Task & Follow-Up Automation (Highly recommended)

This one kills in interviews.

Concept

Every interaction can generate follow-up tasks:

“Call back in 3 days”

“Send proposal next week”

“Waiting for customer response”

New Module: Task

Task Table
```
id
customer_id
interaction_id (optional)
title
due_date
status (OPEN, COMPLETED, OVERDUE)
priority
created_at
```
Why this is flashy

You can now show:

Scheduled jobs (Spring @Scheduled)

Derived state (OVERDUE)

Business rules

Cross-module behavior

Example behaviors

When an InteractionLog is created → optional task auto-created

Nightly job marks tasks as OVERDUE

Dashboard endpoint: “Customers needing attention”

Interview gold

“The CRM is interaction-driven, but value comes from follow-up discipline.”

That sentence alone sounds senior 😄

🥈 2. Customer Health Score & Insights (VERY flashy)

This looks simple, but it’s deceptively impressive.

Concept

Compute a Customer Health Score based on:

Number of interactions

Recency of last interaction

Interaction types (meeting > email)

Open follow-up tasks

Example
```
Health Score: 0–100
Status: GREEN / YELLOW / RED
```
Implementation ideas

Calculated dynamically (query + aggregation)

OR stored and recalculated via event

Read model / projection

Frontend

Color-coded badge

Sort customers by “needs attention”

Timeline visualization

Why recruiters love it

Shows business thinking

Introduces derived data

Not CRUD — it’s analysis

🥉 3. Activity Timeline (Audit + Read Model)

This one screams “enterprise”.

Concept

Unify everything into a timeline:

Customer created

Interaction logged

Task completed

Status changed

Table: ActivityEvent
```
id
customer_id
type
reference_id
payload (JSON)
created_at
```
Why it’s cool

Event-like thinking without Kafka

JSON payloads

Decoupled read model

You can even say:

“This prepares the system for future event-driven architecture.”

💼 Recruiter nods.

If you REALLY want Accounting or Stock Control

Here’s how to do it without being boring 👇

❌ Boring version

Invoice

Line items

Total

Paid flag

Nobody cares.

✅ Flashy version: Lightweight Invoicing + CRM tie-in
Concepts

Invoices linked to customers + interactions

Status machine: DRAFT → SENT → PAID → OVERDUE

Auto-generated invoices after certain interactions

Why it works

Introduces state transitions

Business workflows

Time-based rules

Bonus points:

Scheduled job marks overdue invoices

Dashboard: “Customers with unpaid invoices”

What I’d personally recommend for YOU

Given your project’s DNA:

👉 Add ONE of these (in order):

Task & Follow-Up Automation ⭐⭐⭐

Customer Health Score

Lightweight Invoicing (state-driven)

And keep this rule:

If it doesn’t introduce a new architectural concern, don’t add it.

Final portfolio positioning (important)

You can now say:

“Started as a testing & CI/CD playground, evolved into a modular CRM showcasing domain modeling, lifecycle management, and cross-module workflows.”

That sounds very hireable.



TODO
1. extract logic into a custom hook to handle api calls
1. columns Array Not Memoized
The columns definition recreates on every render, causing unnecessary re-renders of DataGrid. 

✅ Fix with useMemo:

const columns = React.useMemo(
  () => [
    { field: 'interactionType', headerName: 'Type', width: 120 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 180,
      valueGetter: (value) => {
        if (!value) return '';
        const date = parseDate(value);
        return date ? date.toLocaleString() : '';
      },
    },
  ],
  [parseDate]
);


2. Modal Input State Not Validated
No validation on "Subject" before submitting. 

✅ Add simple validation:

const handleCreateLog = async () => {
  if (!newLog.subject.trim()) {
    alert("Subject is required");
    return;
  }
  await fetch(`http://127.0.0.1:8080/customers/${customerId}/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLog),
  });
  await refreshLogs();
  setOpen(false);
  setNewLog({ interactionType: 'note', subject: '', notes: '' });
};

3. Missing Loading State During Submit
User gets no feedback during log creation.

✅ Add loading state:

const [loading, setLoading] = useState(false);

const handleCreateLog = async () => {
  if (!newLog.subject.trim()) return;
  setLoading(true);
  try {
    await fetch(`http://127.0.0.1:8080/customers/${customerId}/logs`, { ... });
    await refreshLogs();
    setOpen(false);
    setNewLog({ interactionType: 'note', subject: '', notes: '' });
  } finally {
    setLoading(false);
  }
};

Update button:

<Button variant="contained" onClick={handleCreateLog} disabled={loading}>
  {loading ? 'Saving...' : 'Save'}
</Button>