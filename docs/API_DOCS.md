# InvoiceFlow REST API

Base URL: `http://localhost:5000/api`

## Health

### `GET /health`

Returns:

```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 12.31,
  "timestamp": "2026-10-19T08:00:00.000Z"
}
```

## Invoices

Invoice statuses are `Pending`, `Approved`, `Review`, `Paid`, and `Overdue`.

### `GET /invoices`

Optional query parameters:

- `search`: searches invoice number, vendor, or department
- `status`: exact status filter
- `department`: exact department filter
- `page`: one-based page number (default `1`)
- `limit`: page size (default `50`, maximum `100`)

The response includes `data`, `pagination`, and aggregate `summary` values.

### `GET /invoices/:id`

Returns a single invoice document.

### `POST /invoices`

Creates JSON invoice metadata:

```json
{
  "invoiceNumber": "INV-2026-001",
  "vendorName": "Acme Cloud",
  "amount": 12500,
  "issueDate": "2026-10-01",
  "dueDate": "2026-10-31",
  "department": "Engineering",
  "status": "Pending"
}
```

### `POST /invoices/upload`

Uses `multipart/form-data`. Send the same fields as the JSON endpoint and a single `file` field. Accepted files are PDF, PNG, JPG, JPEG, DOC, and DOCX up to 10 MB. The returned `fileUrl` is relative to the API host.

### `PUT /invoices/:id`

Updates any invoice metadata fields. It does not replace the file.

### `PATCH /invoices/:id/status`

Body:

```json
{ "status": "Approved" }
```

### `DELETE /invoices/:id`

Deletes invoice metadata and removes its locally stored attachment when present.

## Error format

Errors use a consistent response:

```json
{
  "error": "Validation failed",
  "details": ["invoiceNumber is required"]
}
```

