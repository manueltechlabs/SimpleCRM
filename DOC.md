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
| `PUT` | `/customers/{id}` | Update customer |
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