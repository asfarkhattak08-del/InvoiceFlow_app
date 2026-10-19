import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import KpiCards from './components/KpiCards';
import LedgerTable from './components/LedgerTable';
import UploadInvoiceModal from './components/UploadInvoiceModal';
import { fetchInvoices, updateInvoiceStatus, uploadInvoice } from './services/api';

const emptySummary = { totalSpend: 0, pendingApproval: 0, paidInvoices: 0, overdueExposure: 0 };

export default function App() {
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInvoices = async () => {
    try { setError(''); const result = await fetchInvoices(); setInvoices(result.data); setSummary(result.summary); } catch (requestError) { setError(requestError.response?.data?.error || 'Unable to connect to the InvoiceFlow API.'); } finally { setLoading(false); }
  };
  useEffect(() => { loadInvoices(); }, []);
  const handleUpload = async (form, file) => {
    const data = new FormData(); Object.entries(form).forEach(([key, value]) => data.append(key, value)); if (file) data.append('file', file);
    try { await uploadInvoice(data); setModalOpen(false); await loadInvoices(); } catch (requestError) { setError(requestError.response?.data?.error || 'Invoice upload failed.'); }
  };
  const handleStatus = async (id, status) => { try { await updateInvoiceStatus(id, status); await loadInvoices(); } catch (requestError) { setError(requestError.response?.data?.error || 'Status update failed.'); } };

  return <div className="flex min-h-screen bg-[#f8fbfb] text-[#122030]"><Sidebar /><main className="min-w-0 flex-1"><TopHeader onUpload={() => setModalOpen(true)} /><div className="mx-auto max-w-[1500px] p-5 sm:p-9"><div className="mb-7 flex items-end justify-between"><div><p className="text-sm text-slate-500">Good morning, Jordan <span aria-hidden="true">👋</span></p><p className="mt-1 text-xs text-slate-400">Here&apos;s what&apos;s happening with your procurement today.</p></div><button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 sm:flex"><span className="material-symbols-outlined text-[17px]">calendar_month</span> Oct 01 - Oct 31, 2026 <span className="material-symbols-outlined text-[17px]">expand_more</span></button></div>{error && <div className="mb-5 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button onClick={() => setError('')}><span className="material-symbols-outlined text-[18px]">close</span></button></div>}{loading ? <div className="rounded-2xl bg-white p-12 text-center text-sm text-slate-400">Loading your invoice ledger...</div> : <><KpiCards summary={summary} /><LedgerTable invoices={invoices} onStatusChange={handleStatus} onUpload={() => setModalOpen(true)} /></>}</div></main><UploadInvoiceModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleUpload} /></div>;
}

