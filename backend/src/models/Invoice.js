import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    vendorName: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    department: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Review', 'Paid', 'Overdue'],
      default: 'Pending',
    },
    fileUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

invoiceSchema.index({ vendorName: 'text', invoiceNumber: 'text', department: 'text' });

export default mongoose.model('Invoice', invoiceSchema);

