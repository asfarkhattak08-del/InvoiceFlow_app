import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const storageDirectory = path.resolve(currentDirectory, '../../storage');
fs.mkdirSync(storageDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, storageDirectory),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = path.basename(file.originalname, extension).replace(/[^a-z0-9-_]/gi, '-');
    callback(null, `${Date.now()}-${safeName || 'invoice'}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx'];
  if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
    const error = new Error('Only PDF, PNG, JPG, DOC, and DOCX files are supported.');
    error.status = 400;
    return callback(error);
  }
  callback(null, true);
};

export const uploadInvoiceFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
