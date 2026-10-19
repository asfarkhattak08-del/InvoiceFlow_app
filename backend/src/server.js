import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import Invoice from './models/Invoice.js';

dotenv.config();
const port = process.env.PORT || 5000;

const sampleInvoices = [
  ['INV-2026-1042', 'Vertex Cloud Services', 12450, 'Engineering', 'Approved'],
  ['INV-2026-1041', 'Northstar Office Supply', 2840, 'Operations', 'Pending'],
  ['INV-2026-1038', 'Brightline Logistics', 8675, 'Supply Chain', 'Paid'],
  ['INV-2026-1035', 'Apex Marketing Group', 15200, 'Marketing', 'Review'],
  ['INV-2026-1029', 'Civic Power & Utilities', 4930, 'Facilities', 'Overdue'],
].map(([invoiceNumber, vendorName, amount, department, status], index) => ({
  invoiceNumber,
  vendorName,
  amount,
  department,
  status,
  issueDate: new Date(Date.now() - (index + 1) * 86400000 * 5),
  dueDate: new Date(Date.now() + (20 - index * 5) * 86400000),
}));

async function seedInvoices() {
  if (await Invoice.exists()) return;
  await Invoice.insertMany(sampleInvoices);
  console.log('Seeded five sample invoices.');
}

async function start() {
  await connectDatabase();
  await seedInvoices();
  app.listen(port, () => console.log(`InvoiceFlow API listening on port ${port}`));
}

start().catch((error) => {
  console.error('Unable to start InvoiceFlow API.', error);
  process.exit(1);
});

