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








For your React + Spring Boot master-detail CRM page, use these libraries and components:

Material UI (MUI): Use its Card, List, Typography, and Modal components for a polished UI. The DataGrid component is excellent for the interaction logs list.
React Router: Handle navigation (e.g., between customers) within the single page.
Axios: For making HTTP requests from React to your Spring Boot backend.
This combination provides pre-built, customizable components for the master-detail layout, modals for creating logs/search, and the necessary tools for state management and API communication.



Master Section (Customer View)
Purpose: Display the primary customer data.
Components:
A Card showing all Customer fields (name, email, phone, address, created_at).
A search icon on fields (e.g., email, phone) that opens a search modal to find a different customer.
Detail Section (Interaction Management)
Purpose: Manage and view interaction logs for the selected customer.
Components:
A List or DataGrid displaying a summary of all InteractionLog entries.
A "Create Log" button that opens a modal form to add a new interaction.
Clicking on an interaction in the list opens a read-only modal displaying all its detail fields.
The application will load the most recently interacted customer by default.

If a CRM has only two tables and contact data is included within the Customer table, the second most important table would typically be the Interaction (or Activity) table. This table tracks all communications and engagements with customers, such as calls, emails, meetings, and notes, enabling the CRM to maintain a history of customer interactions and support follow-ups.

 in a minimal CRM with only two tables, the second table is best used as an Interaction Log (or simply Log) table. This table records each customer interaction — such as calls, emails, or meetings — with fields like timestamp, interaction type, notes, and the associated customer (linked via email or phone number).

When a customer calls, you:

Search the Customer table by email or phone to find their record.
Retrieve their last interaction from the Log table.
Add the new interaction as a new row in the Log table.
This setup maintains a chronological history and supports effective follow-up, making the Log table the ideal second table in a two-table CRM.