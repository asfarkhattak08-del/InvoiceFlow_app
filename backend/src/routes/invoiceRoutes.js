import { Router } from 'express';
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  listInvoices,
  updateInvoice,
  updateInvoiceStatus,
  uploadInvoice,
} from '../controllers/invoiceController.js';
import { uploadInvoiceFile } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/', listInvoices);
router.get('/:id', getInvoice);
router.post('/', createInvoice);
router.post('/upload', uploadInvoiceFile.single('file'), uploadInvoice);
router.put('/:id', updateInvoice);
router.patch('/:id/status', updateInvoiceStatus);
router.delete('/:id', deleteInvoice);

export default router;

