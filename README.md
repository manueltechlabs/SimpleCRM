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

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer (Primary Key) | Unique identifier for the log entry. |
| `customer_id` | Integer (Foreign Key) | Links the interaction to a specific Customer. |
| `interaction_type` | String (e.g., call, email, meeting, note) | Categorizes the type of interaction. |
| `subject` | String | A brief summary of the interaction. |
| `notes` | Text | Detailed description of what was discussed. |
| `created_at` | DateTime | Timestamp when the interaction was logged (automatically set). |
| `created_by` | String (Optional) | Who logged the interaction (e.g., "system", "admin"). |

### Task Table

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer (Primary Key) | Unique identifier for the task |
| `customer_id` | Integer (Foreign Key) | References the associated customer |
| `interaction_id` | Integer (Foreign Key, Optional) | Links the task to a specific interaction |
| `title` | String | Short description of the task |
| `due_date` | DateTime | Deadline for completing the task |
| `status` | Enum (`OPEN`, `COMPLETED`, `OVERDUE`) | Current state of the task |
| `priority` | Enum (`LOW`, `MEDIUM`, `HIGH`) | Indicates task importance |
| `created_at` | DateTime | Timestamp when the task was created |

**Notes:**
- `status = OVERDUE` can be derived automatically based on `due_date`
- `priority` is used for task ordering and attention dashboards

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
|`DELETE`| `/logs/{id}`| Soft delete a sprcific log (marks it as deleted without permanent removal)|
|`PUT` or `PATCH`| /logs/{id}| Update/Edit a specific interaction log |

### Task Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all tasks (supports filtering by status, priority, due date) |
| `GET` | `/tasks/{id}` | Retrieve a specific task by ID |
| `POST` | `/tasks` | Create a new task |
| `PATCH` | `/tasks/{id}` | Update task fields (title, due_date, status, priority) |
| `DELETE` | `/tasks/{id}` | Soft delete a task |
| `GET` | `/customers/{customerId}/tasks` | Retrieve all tasks for a specific customer |
| `POST` | `/customers/{customerId}/tasks` | Create a task for a specific customer |
| `GET` | `/tasks/overdue` | Retrieve all overdue tasks |
| `GET` | `/tasks/upcoming` | Retrieve tasks due soon (e.g., next 7 days) |
| `GET` | `/tasks/priority/{level}` | Retrieve tasks filtered by priority (LOW, MEDIUM, HIGH) |
| `GET` | `/customers?sort=healthScore,asc` | Retrive needs attention customers |
| `GET` | `/customers/needs-attention` | Retrive needs attention customers |
| `PATCH` | `/tasks/{id}/complete` | Mark task as COMPLETED |
| `PATCH` | `/tasks/{id}/reopen` | Reopen a completed task (set to OPEN) |

## Project Setup

- 1. clone the repository:

```
git clone https://github.com/manueltechlabs/SimpleCRM.git
```

- 2. Start the services

```
docker compose up
```



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

| Feature | Description |
|-------|------------|
| **Soft Deletes** (`deleted_at` timestamp) | allows recovery |
| **Authentication (JWT/OAuth2)** | Role-based access control, sales rep vs manager vs admin |
| **Filtering & Pagination** | Scales well; expected in real apps |
| **Export to CSV/PDF** | Practical business feature |
| **Unit/Integration Tests** | Proves code quality and reliability |
| **Machine learning in Python: customer financial ratio** | Enables predictive analytics for financial health, risk assessment, or credit scoring using historical customer data |
| **Error Notifications** | User-friendly error handling using MUI Snackbar alerts | User-friendly error handling using MUI Snackbar alerts |
| **DTOs + mapper (MapStruct or manual)** | 	Ensures clean separation between layers; prevents exposing entities directly to API consumers |
| **Validation annotations (@NotNull, @Email)** | Enforces data integrity and input correctness at the API level |
| **Global exception handler (@ControllerAdvice)** | Centralizes error handling across the application, improving maintainability and consistency |
| **Integration layer** | ERP sync (SAP / Dynamics / etc.) webhook or ETL pipeline |
| **Audit loggin** | who changed what and when |


## Overdue tasks:
A task becomes overdue when:

due_date < now
AND status != COMPLETED

But:

The database doesn’t automatically update itself over time
You need a background process
⚙️ Solution: Scheduled Job

So create a scheduled job that runs periodically (e.g., every hour or night):
```java
@Scheduled(cron = "0 0 * * * *") // every hour
public void updateOverdueTasks() {
    List<Task> overdueTasks = taskRepository
        .findByDueDateBeforeAndStatusNot(LocalDateTime.now(), Status.COMPLETED);

    overdueTasks.forEach(task -> task.setStatus(Status.OVERDUE));

    taskRepository.saveAll(overdueTasks);
}
```

## Customer Health Score Feature
### 1. Health Score Formula
```
Health Score = 
  (Interaction Frequency * 30%)
+ (Recency Score * 30%)
+ (Interaction Quality * 20%)
+ (Task Status * 20%)
```

### Components:

#### 1. Interaction Frequency (0–100)

More interactions = healthier customer

Example:

- 0 interactions → 0
- 5+ interactions → 100

#### 2. Recency (VERY important)

Based on last interaction:

< 3 days     → 100
< 7 days     → 80
< 30 days    → 50
> 30 days    → 10

#### 3. Interaction Quality

Weight by type:

meeting = 100
call    = 70
email   = 50
note    = 30

Take average of recent interactions

#### 4. Task Status (Follow-ups)

No open tasks        → 100
Open tasks           → 60
Overdue tasks        → 20

#### Example

Customer A:
- Recency: 80
- Frequency: 60
- Quality: 70
- Tasks: 20 (has overdue)

Score:
= (60 * 0.3) + (80 * 0.3) + (70 * 0.2) + (20 * 0.2)
= 18 + 24 + 14 + 4 = 60

### 2. Map Score → Status
80–100 → GREEN 🟢
50–79  → YELLOW 🟡
0–49   → RED 🔴

### 3. Implementation
#### Dynamic Calculation (SQL + service layer)
#### Persisted Score
Ad fields to Customer:
- health_score INT
- health_status ENUM
- last_calculated_at

Update via:

Event (interaction created)
Scheduled job (@Scheduled)

### 4. Sorting "Needs Attention"
### 5. Front End

Add badge:
John Doe — 🔴 Needs Attention (Score: 42)

## Timeline Visualization
### Description
Instead of seeing separate tables ( customers, logs, tasks) show a single timeline like a story:

Esample:

Jan 10 → Customer created
Jan 12 → Email sent
Jan 15 → Meeting scheduled
Jan 18 → Task created: "Send proposal"
Jan 22 → Task overdue ⚠️
Jan 25 → Call completed

Example:

🟢 Customer created
   Jan 10, 2026

📧 Email sent
   “Intro email”
   Jan 12, 2026

📞 Call logged
   “Follow-up discussion”
   Jan 25, 2026

⚠️ Task overdue
   “Send proposal”
   Due: Jan 22, 2026

### Implementation

#### Creating a table Activity event

ActivityEvent table:

id
customer_id
type (CUSTOMER_CREATED, INTERACTION, TASK, etc.)
reference_id
payload (JSON)
created_at



#### Merge data in service layer
This is simpler than creating a table:

```java
List<Activity> timeline = new ArrayList<>();

timeline.addAll(interactions);
timeline.addAll(tasks);

timeline.sort(byCreatedAtDesc);
```

#### Front End Implementation

In React render:

- Vertical list
- Each item has:
  - Icon
  - Title
  - Date
  - Optional details

From MUI can use components like: Timeline and TimelineItem.

This design can evolve into an event-driven architecture.