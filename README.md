# InvoiceFlow Procurement Dashboard

InvoiceFlow is a full-stack MERN procurement dashboard for tracking enterprise invoices, approvals, payment exposure, and supporting documents. It is intentionally zero-API: the Express service owns the REST API, MongoDB stores invoice metadata, and Multer stores uploaded files locally.

## Architecture

- **Frontend:** Vite, React, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose, Multer, Morgan, CORS
- **Data:** MongoDB database `invoice_vault`
- **Files:** local `backend/storage/` directory, exposed through `/storage`
- **Bootstrap:** server startup creates five sample invoices when the collection is empty

## Project layout

```text
backend/
  src/config       MongoDB connection
  src/controllers  Invoice business logic
  src/middleware   Upload and error middleware
  src/models       Mongoose schemas
  src/routes       Health and invoice routes
frontend/
  src/components   Dashboard UI
  src/services     Axios API client
```

## Prerequisites

- Node.js 18+
- MongoDB 6+ running locally

## Setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Install dependencies:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. Run the API:

   ```bash
   cd backend
   npm run dev
   ```

5. Run the dashboard in a second terminal:

   ```bash
   cd frontend
   npm run dev
   ```

The dashboard is available at `http://localhost:5173` and the API at `http://localhost:5000`.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Server and MongoDB health |
| GET | `/api/invoices` | List invoices with search, status, department, and pagination |
| GET | `/api/invoices/:id` | Read one invoice |
| POST | `/api/invoices` | Create invoice metadata |
| POST | `/api/invoices/upload` | Create invoice with a `file` multipart upload |
| PATCH | `/api/invoices/:id/status` | Change invoice status |
| PUT | `/api/invoices/:id` | Update invoice metadata |
| DELETE | `/api/invoices/:id` | Delete invoice and its local file |

See [docs/API_DOCS.md](docs/API_DOCS.md) for request and response details.

## Production notes

Set `MONGO_URI`, `PORT`, and `VITE_API_URL` for the target environment. For production deployments, replace local file storage with object storage and put the API behind a reverse proxy with authentication and rate limiting.

