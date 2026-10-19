import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import healthRoutes from './routes/healthRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/storage', express.static(path.resolve(currentDirectory, '../storage')));
app.use('/api/health', healthRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

