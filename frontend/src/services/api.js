import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchInvoices(params = {}) {
  const response = await api.get('/invoices', { params });
  return response.data;
}

export async function uploadInvoice(formData) {
  const response = await api.post('/invoices/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function updateInvoiceStatus(id, status) {
  const response = await api.patch(`/invoices/${id}/status`, { status });
  return response.data;
}

export default api;

