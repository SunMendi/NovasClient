import React, { useEffect, useState } from 'react';
import { adminRequest } from '../../services/admin';

type Kind = 'rfq' | 'contact' | 'newsletter';
type Inquiry = { id: number; [key: string]: any };
type InboxPage = { results: Inquiry[]; count: number; page: number; pages: number };
const kinds: Record<Kind, string> = { rfq: 'Tender RFQs', contact: 'Contact Messages', newsletter: 'Newsletter Subscribers' };
const statuses: Record<Kind, [string, string][]> = {
  rfq: [['pending', 'Pending review'], ['reviewed', 'Reviewed'], ['contacted', 'Contacted client'], ['fulfilled', 'Fulfilled'], ['closed', 'Closed']],
  contact: [['false', 'Unread'], ['true', 'Read']],
  newsletter: [['true', 'Active'], ['false', 'Inactive']],
};
const fieldNames: Record<string, string> = { id: 'Submission ID', reference_id: 'RFQ reference', organization_name: 'Organization', department: 'Department', contact_name: 'Contact name', full_name: 'Name', email: 'Email', phone: 'Phone', tender_ref_number: 'Tender reference', delivery_port: 'Delivery address / port', timeframe: 'Timeframe', end_user_confirmed: 'End user confirmed', notes: 'Request details', company: 'Company', subject: 'Subject', message: 'Message', created_at: 'Submitted', subscribed_at: 'Subscribed' };
const input = 'rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm';
const stateOf = (kind: Kind, item: Inquiry) => kind === 'rfq' ? item.status : String(kind === 'contact' ? item.is_read : item.is_active);
const date = (value: string) => new Date(value).toLocaleString();

export function InquiriesPanel() {
  const [kind, setKind] = useState<Kind>('rfq');
  const [data, setData] = useState<InboxPage>({results:[],count:0,page:1,pages:1});
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    const params = new URLSearchParams({page:String(page), search:query, status:filter});
    adminRequest<InboxPage>(`/inquiries/admin/${kind}/?${params}`, {signal:controller.signal})
      .then(result => { if (!controller.signal.aborted) setData(result); })
      .catch(e => { if (!controller.signal.aborted) setError(e.message || 'Could not load inquiries.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [kind, page, query, filter, refresh]);
  const open = (item: Inquiry) => { setSelected(item); setState(stateOf(kind,item)); setError(''); setNotice(''); };
  const save = async () => {
    if (!selected || busy) return;
    setBusy(true); setError(''); setNotice('');
    const field = kind === 'rfq' ? 'status' : kind === 'contact' ? 'is_read' : 'is_active';
    try {
      const result = await adminRequest<Inquiry>(`/inquiries/admin/${kind}/${selected.id}/`, {method:'PATCH', body:JSON.stringify({[field]:kind === 'rfq' ? state : state === 'true'})});
      setSelected(result); setNotice('Status saved.'); setRefresh(r=>r+1);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save.'); }
    finally { setBusy(false); }
  };
  const remove = async () => {
    if (!selected || busy || !window.confirm(`Permanently delete ${selected.reference_id || selected.email}? This cannot be undone.`)) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await adminRequest(`/inquiries/admin/${kind}/${selected.id}/`, {method:'DELETE'});
      setSelected(null); setNotice('Submission deleted.'); setRefresh(r=>r+1);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not delete.'); }
    finally { setBusy(false); }
  };
  return <section className="space-y-6">
    <div><h1 className="text-2xl font-bold">Inquiries</h1><p className="mt-2 text-sm text-slate-500">Review customer requests, track follow-up, and manage newsletter subscriptions.</p></div>
    <div className="flex flex-wrap gap-2" aria-label="Inquiry type">{Object.entries(kinds).map(([key,label])=><button key={key} type="button" disabled={busy} aria-pressed={kind===key} onClick={()=>{setKind(key as Kind);setSelected(null);setSearch('');setQuery('');setFilter('');setPage(1);setNotice('');}} className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${kind===key?'bg-[#133057] text-white':'bg-white border border-slate-200'}`}>{label}</button>)}</div>
    {notice && <p role="status" className="bg-emerald-50 text-emerald-800 p-3 rounded-lg text-sm">{notice}</p>}
    {error && <p role="alert" className="bg-red-50 text-red-700 p-3 rounded-lg text-sm whitespace-pre-line">{error}</p>}
    {selected ? <div className="rounded-xl border bg-white p-5 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold break-all">{selected.reference_id || selected.subject || selected.email}</h2><button disabled={busy} type="button" className={input} onClick={()=>{setSelected(null);setError('');}}>Back to list</button></div>
      <dl className="grid sm:grid-cols-2 gap-5">{Object.entries(fieldNames).filter(([key])=>key in selected).map(([key,label])=><div key={key} className={key==='notes'||key==='message'?'sm:col-span-2':''}><dt className="text-xs uppercase font-semibold text-slate-500">{label}</dt><dd className="mt-1 text-sm whitespace-pre-wrap break-words">{key==='email'?<a href={`mailto:${selected[key]}`} className="underline">{selected[key]}</a>:key.endsWith('_at')?date(selected[key]):typeof selected[key]==='boolean'?(selected[key]?'Yes':'No'):selected[key] || '—'}</dd></div>)}</dl>
      {kind==='rfq' && <div><h3 className="font-bold mb-3">Requested items</h3>{selected.items?.length?<div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50"><tr><th className="p-3">Item</th><th className="p-3">Category</th><th className="p-3">Quantity</th></tr></thead><tbody>{selected.items.map((item:Inquiry)=><tr key={item.id} className="border-t"><td className="p-3">{item.item_name}</td><td className="p-3">{item.category || '—'}</td><td className="p-3">{item.quantity}</td></tr>)}</tbody></table></div>:<p className="text-sm text-slate-500">No items specified.</p>}</div>}
      <div className="flex flex-wrap items-end gap-3 border-t pt-5"><label className="space-y-2 text-sm font-semibold"><span className="block">Status</span><select disabled={busy} className={input} value={state} onChange={e=>setState(e.target.value)}>{statuses[kind].map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><button type="button" disabled={busy || state===stateOf(kind,selected)} onClick={()=>void save()} className="rounded-lg bg-[#133057] text-white px-4 py-2.5 text-sm font-bold disabled:opacity-50">{busy?'Please wait…':'Save status'}</button><button type="button" disabled={busy} onClick={()=>void remove()} className="rounded-lg border border-red-200 text-red-600 px-4 py-2.5 text-sm sm:ml-auto">Delete submission</button></div>
    </div> : <>
      <form className="flex flex-wrap gap-3" onSubmit={e=>{e.preventDefault();setQuery(search.trim());setPage(1);setRefresh(r=>r+1);}}><label className="flex-1 min-w-[200px]"><span className="sr-only">Search inquiries</span><input className={`${input} w-full`} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, organization or reference…" /></label><button type="submit" className={input}>Search</button><label><span className="sr-only">Filter status</span><select className={input} value={filter} onChange={e=>{setFilter(e.target.value);setPage(1);}}><option value="">All statuses</option>{statuses[kind].map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><button type="button" disabled={loading} onClick={()=>setRefresh(r=>r+1)} className={input}>Refresh</button></form>
      {loading?<p role="status" className="py-10 text-center">Loading submissions…</p>:error?null:data.results.length===0?<p className="rounded-xl border bg-white p-10 text-center text-slate-500">No submissions match this view.</p>:<div className="overflow-x-auto rounded-xl border bg-white"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-4">{kind==='rfq'?'Reference / Organization':'Name / Subject'}</th><th className="p-4">Email</th><th className="p-4">Submitted</th><th className="p-4">Status</th><th className="p-4">Details</th></tr></thead><tbody>{data.results.map(item=><tr key={item.id} className="border-t"><td className="p-4"><p className="font-semibold">{item.reference_id || item.full_name || `Subscriber #${item.id}`}</p><p className="text-xs text-slate-500 mt-1">{item.organization_name || item.subject}</p>{kind==='contact'&&<p className="text-xs mt-1 font-mono">INQ-{item.id}</p>}{kind==='rfq'&&<p className="text-xs mt-1">{item.contact_name}</p>}</td><td className="p-4 break-all">{item.email}</td><td className="p-4 whitespace-nowrap">{date(item.created_at || item.subscribed_at)}</td><td className="p-4">{statuses[kind].find(([value])=>value===stateOf(kind,item))?.[1]}</td><td className="p-4"><button type="button" onClick={()=>open(item)} className="font-semibold text-[#ed145b]">View details</button></td></tr>)}</tbody></table></div>}
      {!loading&&!error&&<div className="flex justify-between items-center gap-3 text-sm"><span>{data.count} total · Page {data.page} of {data.pages}</span><div className="flex gap-2"><button disabled={data.page<=1} className={`${input} disabled:opacity-40`} onClick={()=>setPage(data.page-1)}>Previous</button><button disabled={data.page>=data.pages} className={`${input} disabled:opacity-40`} onClick={()=>setPage(data.page+1)}>Next</button></div></div>}
    </>}
  </section>;
}
