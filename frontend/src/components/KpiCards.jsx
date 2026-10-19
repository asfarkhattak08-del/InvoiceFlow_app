const cards = [
  { key: 'totalSpend', label: 'Total spend', icon: 'payments', color: 'bg-[#e7f7f3] text-[#0b9879]', value: (v) => `$${(v / 1000).toFixed(1)}k`, trend: '+8.2%', note: 'vs. last month' },
  { key: 'pendingApproval', label: 'Pending approval', icon: 'pending_actions', color: 'bg-[#fff4dc] text-[#c17b17]', value: (v) => `$${(v / 1000).toFixed(1)}k`, trend: '12', note: 'invoices to review' },
  { key: 'paidInvoices', label: 'Paid invoices', icon: 'task_alt', color: 'bg-[#eaf0fb] text-[#5074b4]', value: (v) => v, trend: '+14.6%', note: 'vs. last month' },
  { key: 'overdueExposure', label: 'Overdue exposure', icon: 'warning', color: 'bg-[#fdebea] text-[#d1615a]', value: (v) => `$${(v / 1000).toFixed(1)}k`, trend: 'Needs attention', note: '' },
];

export default function KpiCards({ summary }) {
  return <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <div key={card.key} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_3px_14px_rgba(20,41,56,0.03)]"><div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}><span className="material-symbols-outlined">{card.icon}</span></div><span className={`text-[11px] font-bold ${card.key === 'overdueExposure' ? 'text-[#d1615a]' : 'text-[#0c9e7d]'}`}>{card.trend}</span></div><p className="mt-5 text-xs font-semibold text-slate-400">{card.label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-[#122030]">{card.value(summary[card.key] || 0)}</p><p className="mt-1 text-[11px] text-slate-400">{card.note || ' '}</p></div>)}</section>;
}

