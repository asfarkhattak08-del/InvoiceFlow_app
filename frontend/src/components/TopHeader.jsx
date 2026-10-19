export default function TopHeader({ onUpload }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 sm:px-9">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400"><span>Workspace</span><span>/</span><span className="font-semibold text-slate-600">Invoices</span></div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#122030]">Invoices</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-[#bcecdf] bg-[#f0fcf8] px-3 py-2 text-xs font-bold text-[#0c8b70] sm:flex"><span className="h-2 w-2 rounded-full bg-[#20c998]" /> OCR ready</div>
        <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-500 hover:bg-slate-50 sm:flex"><span className="material-symbols-outlined">notifications</span></button>
        <div className="hidden items-center gap-2 border-l border-slate-100 pl-4 sm:flex"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e9ee] text-xs font-bold text-[#285466]">JD</div><div><p className="text-xs font-bold text-slate-700">Jordan Davis</p><p className="text-[10px] text-slate-400">Finance Admin</p></div></div>
        <button onClick={onUpload} className="flex items-center gap-2 rounded-xl bg-[#123a4f] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1b5066]"><span className="material-symbols-outlined text-[19px]">add</span> Upload invoice</button>
      </div>
    </header>
  );
}

