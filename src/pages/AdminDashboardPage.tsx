import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, Search, ShieldCheck, LogOut } from 'lucide-react';
import { NovasLogo } from '../components/common/NovasLogo';
import { ContentForm } from '../components/admin/ContentForm';
import { Section, sections } from '../components/admin/contentConfig';
import { authService, AuthUser } from '../services/auth';
import { adminRequest } from '../services/admin';

type Entry = { id: number; name?: string; title?: string; sku?: string; service_id?: string; project_id?: string; vessel_id?: string; vessel_type?: string; category?: string | { name: string }; image_url?: string; image?: string; tagline?: string; summary?: string };
export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [section, setSection] = useState<Section>('products');
  const [adding, setAdding] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const current = authService.getCurrentUser();
    if (!current || !authService.isAuthenticated()) navigate('/login', { replace: true });
    else setUser(current);
  }, [navigate]);
  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    setLoading(true); setError(''); setEntries([]);
    adminRequest<Entry[]>(sections[section].endpoint, { signal: controller.signal })
      .then(data => { if (!controller.signal.aborted) setEntries(data); })
      .catch(e => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : 'Could not load entries.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [section, refresh, user]);
  if (!user) return null;
  const config = sections[section];
  const filtered = entries.filter(entry => [entry.name, entry.title, entry.sku, entry.service_id, entry.project_id, entry.vessel_id, entry.summary, entry.tagline, typeof entry.category === 'object' ? entry.category.name : entry.category].join(' ').toLowerCase().includes(search.toLowerCase()));
  return <div className="min-h-screen bg-[#f8f9fc] text-[#133057]">
    <header className="border-b border-slate-200 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4"><Link to="/"><NovasLogo variant="navy" height={36} showSubtitle={false} /></Link><span className="hidden sm:flex items-center gap-2 text-xs font-bold bg-slate-50 px-3 py-2 rounded-lg"><ShieldCheck size={15} />Admin Console</span></div>
      <div className="flex items-center gap-4 text-sm"><Link to="/" className="font-semibold">View website</Link><span className="hidden md:block text-slate-500">{user.username}</span><button onClick={() => { authService.logout(); navigate('/login', { replace: true }); }} className="flex items-center gap-2 border rounded-lg px-3 py-2"><LogOut size={15} />Sign out</button></div>
    </div></header>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><h1 className="text-2xl font-bold">Manage website content</h1><p className="text-sm text-slate-500 mt-2">Add an entry with its category, details and image in one place.</p></div>{!adding && <button onClick={() => { setAdding(true); setMessage(''); }} className="flex items-center justify-center gap-2 rounded-xl bg-[#ed145b] px-5 py-3 text-white font-bold text-sm"><Plus size={18} />Add {config.singular}</button>}</div>
      <label className="block max-w-sm space-y-2 text-sm font-semibold"><span>Content section</span><select disabled={adding} value={section} onChange={e => { setSection(e.target.value as Section); setSearch(''); setMessage(''); }} className="w-full border border-slate-300 bg-white rounded-lg px-3 py-3 disabled:opacity-60">{Object.entries(sections).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select>{adding && <span className="block text-xs text-slate-500 font-normal">Save or cancel this entry before changing sections.</span>}</label>
      {message && <p role="status" className="rounded-lg bg-emerald-50 text-emerald-800 p-4 text-sm">{message}</p>}
      {adding ? <ContentForm key={section} section={section} onCancel={() => setAdding(false)} onSaved={() => { setAdding(false); setMessage(`${config.singular.charAt(0).toUpperCase() + config.singular.slice(1)} saved successfully.`); setRefresh(r => r + 1); }} /> : <>
        <div className="flex gap-3 rounded-xl bg-white border border-slate-200 p-4"><label className="relative flex-1"><span className="sr-only">Search {config.label}</span><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${config.label.toLowerCase()} by name or reference…`} className="w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm" /></label><button type="button" aria-label="Refresh entries" onClick={() => setRefresh(r => r + 1)} disabled={loading} className="border rounded-lg px-3 text-sm font-semibold flex items-center gap-2 disabled:opacity-50"><RefreshCw size={16} className={loading ? 'animate-spin' : ''} /><span className="hidden sm:inline">Refresh</span></button></div>
        {error ? <p role="alert" className="bg-red-50 text-red-700 rounded-lg p-4 text-sm">{error} Use Refresh to try again.</p> : loading ? <p role="status" className="py-12 text-center text-slate-500">Loading {config.label.toLowerCase()}…</p> : filtered.length === 0 ? <p className="rounded-xl border bg-white p-12 text-center text-slate-500">{search ? 'No entries match your search.' : `No ${config.label.toLowerCase()} yet. Add your first entry above.`}</p> : <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-5">{config.label}</th><th className="p-5">Reference</th><th className="p-5">Category / type</th></tr></thead><tbody>{filtered.map(entry => <tr key={entry.id} className="border-t border-slate-100"><td className="p-5"><div className="flex items-center gap-3">{(entry.image_url || entry.image) && <img src={entry.image_url || entry.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />}<div><p className="font-semibold">{entry.name || entry.title}</p><p className="text-xs text-slate-500 line-clamp-2 max-w-md mt-1">{entry.tagline || entry.summary}</p></div></div></td><td className="p-5 font-mono text-xs">{entry.sku || entry.service_id || entry.project_id || entry.vessel_id}</td><td className="p-5">{typeof entry.category === 'object' ? entry.category.name : entry.category || entry.vessel_type}</td></tr>)}</tbody></table></div>}
      </>}
    </main>
  </div>;
};
