const primaryLinks = [
  ['grid_view', 'Overview'],
  ['receipt_long', 'Invoices'],
  ['account_balance_wallet', 'Payments'],
  ['groups', 'Vendors'],
];
const secondaryLinks = [
  ['analytics', 'Reports'],
  ['settings', 'Settings'],
];

function NavItem({ icon, label, active }) {
  return (
    <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${active ? 'bg-[#e1f9f2] text-[#0c8b70]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      {label}
      {label === 'Invoices' && <span className="ml-auto rounded-full bg-[#0c8b70] px-2 py-0.5 text-[10px] font-bold text-white">24</span>}
    </button>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-100 bg-white px-5 py-7 lg:block">
      <div className="mb-11 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123a4f] text-white shadow-sm">
          <span className="material-symbols-outlined">stacked_line_chart</span>
        </div>
        <span className="text-lg font-bold tracking-tight text-[#122030]">invoice<span className="text-[#0c9e7d]">flow</span></span>
      </div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
      <nav className="space-y-1">{primaryLinks.map(([icon, label]) => <NavItem key={label} icon={icon} label={label} active={label === 'Invoices'} />)}</nav>
      <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Manage</p>
      <nav className="space-y-1">{secondaryLinks.map(([icon, label]) => <NavItem key={label} icon={icon} label={label} />)}</nav>
      <div className="mt-16 rounded-2xl bg-[#f2f8f7] p-4">
        <span className="material-symbols-outlined text-[#0c9e7d]">support_agent</span>
        <p className="mt-3 text-sm font-bold text-[#173246]">Need a hand?</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Our support team is available to help.</p>
        <button className="mt-3 text-xs font-bold text-[#0c9e7d]">Contact support <span aria-hidden="true">→</span></button>
      </div>
    </aside>
  );
}

