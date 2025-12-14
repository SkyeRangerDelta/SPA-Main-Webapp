# SPA Main Webapp Backend API Documentation

**Version:** 1.0
**Base URL:** `/api/v1`
**Last Updated:** 2025-12-14

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Data Models](#data-models)
4. [Departments Endpoints](#departments-endpoints)
5. [Notices Endpoints](#notices-endpoints)
6. [Records Endpoints](#records-endpoints)
7. [Ports Endpoints](#ports-endpoints)
8. [Error Handling](#error-handling)

---

## Overview

This API provides access to the SPA (Seaport Authority) Main Webapp backend services. The API supports operations for managing departments, notices, registry records, and port information.

**Technology Stack:**
- Runtime: Deno
- Framework: Oak Router
- Database: MongoDB

---

## Authentication

Certain endpoints require authentication using an admin token.

### Authentication Method

Protected endpoints require the `x-admin-token` header:

```http
x-admin-token: <ADMIN_TOKEN>
```

The token is validated against the `ADMIN_TOKEN` environment variable.

### Protected Endpoints

- `POST /PostNewNotice`
- `POST /PostNewRecords`
- `POST /PostNewPorts`

---

## Data Models

### Department

```typescript
interface Department {
  id: number;
  name: string;
  shortName: string;
  description: string;
  href: string;
}
```

### Notice

```typescript
interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdAtFriendly: string;
  updatedAtFriendly: string;
  class: string;
  author: string;
}
```

### RegistryRecord

```typescript
interface RegistryRecord {
  id: number;
  title: string;
  description: string;
  content: string;
  fileUrl?: string;
  status: RecordStatus;
  createdAt: Date;
  updatedAt: Date;
  createdAtFriendly: string;
  updatedAtFriendly: string;
  recordType: RecordType;
  department?: string;
  author: string;
}
```

### RecordType (Enum)

```typescript
enum RecordType {
  VESSEL_REGISTRATION = 'vessel_registration',
  CARGO_MANIFEST = 'cargo_manifest',
  CREW_ROSTER = 'crew_roster',
  PORT_ENTRY_LOG = 'port_entry_log',
  PORT_DEPARTURE_LOG = 'port_departure_log',
  TRADE_AGREEMENT = 'trade_agreement',
  CUSTOMS_DECLARATION = 'customs_declaration',
  CHARTER_DOCUMENT = 'charter_document',
  ADMINISTRATIVE_POLICY = 'administrative_policy',
  CORRESPONDENCE = 'correspondence',
  INCIDENT_REPORT = 'incident_report',
  OTHER = 'other'
}
```

### RecordStatus (Enum)

```typescript
enum RecordStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  PENDING_REVIEW = 'pending_review',
  DRAFT = 'draft',
  EXPIRED = 'expired'
}
```

### PortRecord

```typescript
interface PortRecord {
  id: number;
  name: string;
  parentMunicipality: string;
  alignment: string;
  description: string;
  services: Service[];
  harbormaster: string;
  docks: number;
  berths: number;
}
```

### Service

```typescript
interface Service {
  type: ServiceType;
  category: ServiceCategory;
  available: boolean;
  notes?: string;
}
```

---

## Departments Endpoints

### Get Departments

Retrieves all departments from the database.

**Endpoint:** `GET /GetDepartments`

**Authentication:** None

**Query Parameters:** None

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  departments: Department[];
}
```

**Example Request:**

```bash
curl -X GET http://localhost:8000/api/v1/GetDepartments
```

**Example Response (Success - 200):**

```json
{
  "status": 200,
  "message": "Success",
  "success": true,
  "departments": [
    {
      "id": 1,
      "name": "Office of the Harbour Registry",
      "shortName": "OHR",
      "description": "Manages vessel registrations and port records",
      "href": "/departments/harbour-registry"
    }
  ]
}
```

**Example Response (Not Found - 404):**

```json
{
  "status": 404,
  "message": "No departments found",
  "success": false,
  "departments": []
}
```

---

## Notices Endpoints

### Get Notices Count

Retrieves the total count of notices in the database.

**Endpoint:** `GET /GetNoticesCount`

**Authentication:** None

**Query Parameters:** None

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  count: number;
}
```

**Example Request:**

```bash
curl -X GET http://localhost:8000/api/v1/GetNoticesCount
```

**Example Response (200):**

```json
{
  "status": 200,
  "message": "Notices retrieved successfully.",
  "success": true,
  "count": 42
}
```

---

### Get Notices

Retrieves notices from the database. Can fetch a single notice by ID or a paginated list.

**Endpoint:** `GET /GetNotices`

**Authentication:** None

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | number | No | - | Specific notice ID to retrieve |
| `limit` | number | No | 6 | Number of notices to return (when not using `id`) |
| `offset` | number | No | 0 | Number of notices to skip (pagination) |

**Response (Single Notice):**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  notice?: Notice | null;
}
```

**Response (Multiple Notices):**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  notices: Notice[];
}
```

**Example Request (Single Notice):**

```bash
curl -X GET "http://localhost:8000/api/v1/GetNotices?id=1"
```

**Example Response (Single Notice - 200):**

```json
{
  "status": 200,
  "message": "Success",
  "success": true,
  "notice": {
    "id": 1,
    "title": "Port Closure Notice",
    "content": "The eastern dock will be closed for maintenance.",
    "createdAt": "2025-12-01T10:00:00.000Z",
    "updatedAt": "2025-12-01T10:00:00.000Z",
    "createdAtFriendly": "Fri Dec 01 2025",
    "updatedAtFriendly": "Fri Dec 01 2025",
    "class": "warning",
    "author": "Harbour Master"
  }
}
```

**Example Request (Multiple Notices):**

```bash
curl -X GET "http://localhost:8000/api/v1/GetNotices?limit=10&offset=0"
```

**Example Response (Multiple Notices - 200):**

```json
{
  "status": 200,
  "message": "Success",
  "success": true,
  "notices": [
    {
      "id": 2,
      "title": "New Trading Hours",
      "content": "Updated trading hours for the customs office.",
      "createdAt": "2025-12-14T08:00:00.000Z",
      "updatedAt": "2025-12-14T08:00:00.000Z",
      "createdAtFriendly": "Sat Dec 14 2025",
      "updatedAtFriendly": "Sat Dec 14 2025",
      "class": "info",
      "author": "Administrator"
    }
  ]
}
```

**Example Response (Not Found - 404):**

```json
{
  "status": 404,
  "message": "Notice not found",
  "success": false,
  "notice": null
}
```

---

### Post New Notice

Creates a new notice in the database.

**Endpoint:** `POST /PostNewNotice`

**Authentication:** Required (`x-admin-token` header)

**Request Headers:**

```http
Content-Type: application/json
x-admin-token: <ADMIN_TOKEN>
```

**Request Body:**

```typescript
{
  title: string;
  content: string;
  class: string;
  author: string;
  createdAt?: string; // Optional, defaults to current date
}
```

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  postId?: number;
}
```

**Example Request:**

```bash
curl -X POST http://localhost:8000/api/v1/PostNewNotice \
  -H "Content-Type: application/json" \
  -H "x-admin-token: your-admin-token" \
  -d '{
    "title": "Emergency Alert",
    "content": "All vessels must evacuate the north pier immediately.",
    "class": "danger",
    "author": "Port Director"
  }'
```

**Example Response (Success - 200):**

```json
{
  "status": 200,
  "message": "Notice drafted successfully.",
  "success": true,
  "postId": 3
}
```

**Example Response (Unauthorized - 401):**

```json
{
  "status": 401,
  "message": "Unauthorized. Invalid or missing token.",
  "success": false
}
```

**Example Response (Server Error - 500):**

```json
{
  "status": 500,
  "message": "Failed to post notice.",
  "success": false
}
```

---

## Records Endpoints

### Get Records Count

Retrieves the total count of registry records in the database.

**Endpoint:** `GET /GetRecordsCount`

**Authentication:** None

**Query Parameters:** None

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  count: number;
}
```

**Example Request:**

```bash
curl -X GET http://localhost:8000/api/v1/GetRecordsCount
```

**Example Response (200):**

```json
{
  "status": 200,
  "message": "Records retrieved successfully.",
  "success": true,
  "count": 156
}
```

---

### Get Records

Retrieves registry records from the database. Can fetch a single record by ID or a filtered/paginated list.

**Endpoint:** `GET /GetRecords`

**Authentication:** None

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | number | No | - | Specific record ID to retrieve |
| `department` | number | No | - | Filter by department ID |
| `recordType` | string | No | - | Filter by record type (see RecordType enum) |
| `limit` | number | No | 10 | Number of records to return |
| `offset` | number | No | 0 | Number of records to skip (pagination) |

**Response (Single Record):**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  record?: RegistryRecord | null;
}
```

**Response (Multiple Records):**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  records: RegistryRecord[];
}
```

**Example Request (Single Record):**

```bash
curl -X GET "http://localhost:8000/api/v1/GetRecords?id=1"
```

**Example Response (Single Record - 200):**

```json
{
  "status": 200,
  "message": "Success",
  "success": true,
  "record": {
    "id": 1,
    "title": "HMS Victory Registration",
    "description": "Vessel registration for HMS Victory",
    "content": "Full registration details...",
    "fileUrl": "https://example.com/files/record-1.pdf",
    "status": "active",
    "createdAt": "2025-01-15T12:00:00.000Z",
    "updatedAt": "2025-01-15T12:00:00.000Z",
    "createdAtFriendly": "Wed Jan 15 2025",
    "updatedAtFriendly": "Wed Jan 15 2025",
    "recordType": "vessel_registration",
    "department": "Office of the Harbour Registry",
    "author": "Registry Clerk"
  }
}
```

**Example Request (Filtered Records):**

```bash
curl -X GET "http://localhost:8000/api/v1/GetRecords?recordType=cargo_manifest&limit=20&offset=0"
```

**Example Response (Multiple Records - 200):**

```json
{
  "status": 200,
  "message": "Success",
  "success": true,
  "records": [
    {
      "id": 5,
      "title": "Cargo Manifest - Tea Shipment",
      "description": "Manifest for incoming tea shipment",
      "content": "100 crates of tea from India...",
      "status": "active",
      "createdAt": "2025-12-10T09:30:00.000Z",
      "updatedAt": "2025-12-10T09:30:00.000Z",
      "createdAtFriendly": "Tue Dec 10 2025",
      "updatedAtFriendly": "Tue Dec 10 2025",
      "recordType": "cargo_manifest",
      "author": "Customs Officer"
    }
  ]
}
```

**Example Response (Not Found - 404):**

```json
{
  "status": 404,
  "message": "Record not found",
  "success": false,
  "record": null
}
```

---

### Get Record Types

Retrieves all available record type enums with their labels.

**Endpoint:** `GET /GetRecordTypes`

**Authentication:** None

**Query Parameters:** None

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  recordTypes: Array<{ value: string; label: string }>;
}
```

**Example Request:**

```bash
curl -X GET http://localhost:8000/api/v1/GetRecordTypes
```

**Example Response (200):**

```json
{
  "status": 200,
  "message": "Record types retrieved successfully.",
  "success": true,
  "recordTypes": [
    { "value": "vessel_registration", "label": "Vessel Registration" },
    { "value": "cargo_manifest", "label": "Cargo Manifest" },
    { "value": "crew_roster", "label": "Crew Roster" },
    { "value": "port_entry_log", "label": "Port Entry Log" },
    { "value": "port_departure_log", "label": "Port Departure Log" },
    { "value": "trade_agreement", "label": "Trade Agreement" },
    { "value": "customs_declaration", "label": "Customs Declaration" },
    { "value": "charter_document", "label": "Charter Document" },
    { "value": "administrative_policy", "label": "Administrative Policy" },
    { "value": "correspondence", "label": "Official Correspondence" },
    { "value": "incident_report", "label": "Incident Report" },
    { "value": "other", "label": "Other" }
  ]
}
```

---

### Get Record Statuses

Retrieves all available record status enums with their labels.

**Endpoint:** `GET /GetRecordStatuses`

**Authentication:** None

**Query Parameters:** None

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  recordStatuses: Array<{ value: string; label: string }>;
}
```

**Example Request:**

```bash
curl -X GET http://localhost:8000/api/v1/GetRecordStatuses
```

**Example Response (200):**

```json
{
  "status": 200,
  "message": "Record statuses retrieved successfully.",
  "success": true,
  "recordStatuses": [
    { "value": "active", "label": "Active" },
    { "value": "archived", "label": "Archived" },
    { "value": "pending_review", "label": "Pending Review" },
    { "value": "draft", "label": "Draft" },
    { "value": "expired", "label": "Expired" }
  ]
}
```

---

### Post New Records

Creates one or more registry records in the database (bulk insert supported).

**Endpoint:** `POST /PostNewRecords`

**Authentication:** Required (`x-admin-token` header)

**Request Headers:**

```http
Content-Type: application/json
x-admin-token: <ADMIN_TOKEN>
```

**Request Body:**

Array of record objects:

```typescript
[
  {
    title: string;
    description?: string;
    content?: string;
    fileUrl?: string;
    status: RecordStatus;
    recordType: RecordType;
    department?: string;
    author: string;
    createdAt?: string; // Optional, defaults to current date
  }
]
```

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  insertedCount?: number;
  insertedIds?: number[];
}
```

**Example Request:**

```bash
curl -X POST http://localhost:8000/api/v1/PostNewRecords \
  -H "Content-Type: application/json" \
  -H "x-admin-token: your-admin-token" \
  -d '[
    {
      "title": "Port Entry - Merchant Vessel Aurora",
      "description": "Entry log for merchant vessel Aurora",
      "content": "Vessel entered port at 08:00 hours...",
      "status": "active",
      "recordType": "port_entry_log",
      "department": "Office of the Harbour Registry",
      "author": "Port Watch Officer"
    }
  ]'
```

**Example Response (Success - 200):**

```json
{
  "status": 200,
  "message": "Successfully inserted 1 of 1 records.",
  "success": true,
  "insertedCount": 1,
  "insertedIds": [157]
}
```

**Example Response (Unauthorized - 401):**

```json
{
  "status": 401,
  "message": "Unauthorized. Invalid or missing token.",
  "success": false
}
```

**Example Response (Bad Request - 400):**

```json
{
  "status": 400,
  "message": "Bad request. Expected non-empty array of records.",
  "success": false
}
```

**Example Response (Server Error - 500):**

```json
{
  "status": 500,
  "message": "Failed to insert any records.",
  "success": false
}
```

---

## Ports Endpoints

### Post New Ports

Creates one or more port records in the database (bulk insert supported).

**Endpoint:** `POST /PostNewPorts`

**Authentication:** Required (`x-admin-token` header)

**Request Headers:**

```http
Content-Type: application/json
x-admin-token: <ADMIN_TOKEN>
```

**Request Body:**

Array of port objects:

```typescript
[
  {
    name: string;
    parentMunicipality?: string;
    alignment?: string;
    description?: string;
    services?: Service[];
    harbormaster?: string;
    docks?: number;
    berths?: number;
  }
]
```

**Response:**

```typescript
{
  status: number;
  message: string;
  success: boolean;
  insertedCount?: number;
  insertedIds?: number[];
}
```

**Example Request:**

```bash
curl -X POST http://localhost:8000/api/v1/PostNewPorts \
  -H "Content-Type: application/json" \
  -H "x-admin-token: your-admin-token" \
  -d '[
    {
      "name": "Port of Alexandria",
      "parentMunicipality": "Alexandria",
      "alignment": "neutral",
      "description": "Major trading port on the Mediterranean",
      "services": [
        {
          "type": "port_registry",
          "category": "administration_registry",
          "available": true
        }
      ],
      "harbormaster": "Captain James Morrison",
      "docks": 8,
      "berths": 24
    }
  ]'
```

**Example Response (Success - 200):**

```json
{
  "status": 200,
  "message": "Successfully inserted 1 of 1 ports.",
  "success": true,
  "insertedCount": 1,
  "insertedIds": [1]
}
```

**Example Response (Unauthorized - 401):**

```json
{
  "status": 401,
  "message": "Unauthorized. Invalid or missing token.",
  "success": false
}
```

**Example Response (Bad Request - 400):**

```json
{
  "status": 400,
  "message": "Bad request. Expected non-empty array of port records.",
  "success": false
}
```

**Example Response (Server Error - 500):**

```json
{
  "status": 500,
  "message": "Failed to insert any ports.",
  "success": false
}
```

---

## Error Handling

### Standard Error Response Format

All endpoints return errors in the following format:

```typescript
{
  status: number;      // HTTP status code
  message: string;     // Human-readable error message
  success: boolean;    // Always false for errors
}
```

### Common HTTP Status Codes

| Status Code | Description | Common Causes |
|-------------|-------------|---------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid JSON, missing required fields, invalid array format |
| 401 | Unauthorized | Missing or invalid `x-admin-token` header |
| 404 | Not Found | Resource with specified ID not found, no results for query |
| 500 | Internal Server Error | Database operation failed, server-side error |

### Error Examples

**Missing Authentication:**

```json
{
  "status": 401,
  "message": "Unauthorized. Invalid or missing token.",
  "success": false
}
```

**Invalid Request Body:**

```json
{
  "status": 400,
  "message": "Bad request. Invalid or missing JSON body.",
  "success": false
}
```

**Resource Not Found:**

```json
{
  "status": 404,
  "message": "Notice not found",
  "success": false,
  "notice": null
}
```

**Database Error:**

```json
{
  "status": 500,
  "message": "Failed to insert any records.",
  "success": false
}
```

---

## Additional Notes

### Pagination

Endpoints that support pagination (`GetNotices`, `GetRecords`) use `limit` and `offset` parameters:

- `limit`: Maximum number of items to return
- `offset`: Number of items to skip (for page navigation)

**Example Pagination Calculation:**

```
Page 1: offset=0, limit=10
Page 2: offset=10, limit=10
Page 3: offset=20, limit=10
```

### Date Handling

- All dates are stored as ISO 8601 strings in the database
- `createdAtFriendly` and `updatedAtFriendly` provide human-readable date strings
- When posting records, `createdAt` is optional and defaults to the current timestamp

### Sorting

Records and notices are sorted by `createdAt` in descending order (newest first) by default.

### Database Collections

- Departments: `SPA_Departments`
- Notices: `SPA_Notices`
- Records: `SPA_Records`
- Ports: `SPA_Ports`

---

## Support & Contact

For API support or questions, please contact the development team or refer to the project repository documentation.
