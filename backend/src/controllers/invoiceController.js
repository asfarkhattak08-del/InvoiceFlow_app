import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Invoice from '../models/Invoice.js';

const allowedStatuses = ['Pending', 'Approved', 'Review', 'Paid', 'Overdue'];
const storageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../storage');

function normalizePayload(body) {
  return {
    invoiceNumber: body.invoiceNumber,
    vendorName: body.vendorName,
    amount: Number(body.amount),
    issueDate: body.issueDate,
    dueDate: body.dueDate,
    department: body.department,
    status: body.status || 'Pending',
  };
}

export async function listInvoices(req, res, next) {
  try {
    const { search, status, department } = req.query;
    const page = Math.max(Number.parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '50', 10), 1), 100);
    const filter = {};

    if (status) filter.status = status;
    if (department) filter.department = department;
    if (search) {
      filter.$or = [
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { vendorName: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total, aggregates] = await Promise.all([
      Invoice.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Invoice.countDocuments(filter),
      Invoice.aggregate([
        { $group: { _id: '$status', amount: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
    ]);

    const summary = { totalSpend: 0, pendingApproval: 0, paidInvoices: 0, overdueExposure: 0 };
    aggregates.forEach(({ _id, amount, count }) => {
      if (_id === 'Paid') summary.paidInvoices = count;
      if (_id === 'Pending' || _id === 'Review') summary.pendingApproval += amount;
      if (_id === 'Overdue') summary.overdueExposure += amount;
      summary.totalSpend += amount;
    });

    res.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) }, summary });
  } catch (error) {
    next(error);
  }
}

export async function getInvoice(req, res, next) {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found.' });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
}

export async function createInvoice(req, res, next) {
  try {
    const invoice = await Invoice.create(normalizePayload(req.body));
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
}

export async function uploadInvoice(req, res, next) {
  try {
    const payload = normalizePayload(req.body);
    if (req.file) payload.fileUrl = `/storage/${req.file.filename}`;
    const invoice = await Invoice.create(payload);
    res.status(201).json(invoice);
  } catch (error) {
    if (req.file?.path) await fs.unlink(req.file.path).catch(() => {});
    next(error);
  }
}

export async function updateInvoice(req, res, next) {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, normalizePayload(req.body), {
      new: true,
      runValidators: true,
    });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found.' });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
}

export async function updateInvoiceStatus(req, res, next) {
  try {
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ error: 'Invalid invoice status.' });
    }
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!invoice) return res.status(404).json({ error: 'Invoice not found.' });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
}

export async function deleteInvoice(req, res, next) {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found.' });
    if (invoice.fileUrl) {
      const filename = path.basename(invoice.fileUrl);
      await fs.unlink(path.join(storageDirectory, filename)).catch(() => {});
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
