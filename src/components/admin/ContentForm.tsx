import React, { useEffect, useRef, useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { authService } from '../../services/auth';
import { adminRequest } from '../../services/admin';
import { buildPayload, Category, projectCategories, Section, sections, Spec, Step } from './contentConfig';

const input = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#133057]';
export function ContentForm({ section, onSaved, onCancel }: { section: Section; onSaved: () => void; onCancel: () => void }) {
  const config = sections[section];
  const [values, setValues] = useState<Record<string, string>>({});
  const [category, setCategory] = useState('');
  const [sector, setSector] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [sectors, setSectors] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const uploaded = useRef<{ file: File; url: string } | null>(null);
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    setLoading(true); setLoadError('');
    const load = async () => {
      try {
        const [cats, sectorList] = await Promise.all([
          section === 'products' ? adminRequest<Category[]>('/catalog/categories/') : section === 'consultancy' ? adminRequest<Category[]>('/consultancy/categories/') : Promise.resolve([]),
          section === 'products' ? adminRequest<Category[]>('/sectors/sectors/') : Promise.resolve([]),
        ]);
        if (live) { setCategories(cats.filter(c => c.is_active !== false)); setSectors(sectorList); }
      } catch (e) { if (live) setLoadError(e instanceof Error ? e.message : 'Could not load categories.'); }
      finally { if (live) setLoading(false); }
    };
    void load();
    return () => { live = false; };
  }, [section, attempt]);
  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  useEffect(() => {
    if (!busy) return;
    const prevent = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [busy]);
  const update = (key: string, value: string) => setValues(old => ({ ...old, [key]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting.current) return;
    setError('');
    if (!file) { setError('Select an image for this entry.'); return; }
    const payload = buildPayload(section, values, category, sector, specs, steps, featured);
    submitting.current = true; setBusy(true);
    try {
      setProgress('Uploading image…');
      if (uploaded.current?.file !== file) {
        const url = await authService.uploadImage(file, `novas/${section}`);
        if (!url) throw new Error('The image upload did not complete. Please try again.');
        uploaded.current = { file, url };
      }
      payload[section === 'projects' ? 'image' : 'image_url'] = uploaded.current!.url;
      setProgress('Saving details…');
      await adminRequest(config.endpoint, { method: 'POST', body: JSON.stringify(payload) });
      onSaved();
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save this entry. Your details are still here; please try again.'); }
    finally { submitting.current = false; setBusy(false); setProgress(''); }
  };
  const categoryOptions = section === 'projects' ? projectCategories : categories.map(c => [section === 'products' ? String(c.id) : c.category_id || c.slug, c.name]);
  return <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 space-y-7">
    <div><h2 className="text-xl font-bold">Add {config.singular}</h2><p className="text-sm text-slate-500 mt-1">Choose the category, add its details, and select an image. Fields marked * are required.</p></div>
    {loadError && <div role="alert" className="text-red-700 bg-red-50 rounded-lg p-3">{loadError} <button type="button" onClick={() => setAttempt(a => a + 1)} className="underline font-semibold">Retry loading categories</button></div>}
    <fieldset disabled={busy || loading || !!loadError} className="space-y-7 disabled:opacity-70">
      <div className="grid sm:grid-cols-2 gap-5">
        {section !== 'vessels' && <label className="space-y-2 text-sm font-semibold"><span>Category *</span><select className={input} required value={category} onChange={e => setCategory(e.target.value)}><option value="">{loading ? 'Loading categories…' : 'Select a category'}</option>{categoryOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{!loading && !loadError && categoryOptions.length === 0 && <span className="block text-red-700">No categories are available. Create a category in the backend admin first.</span>}</label>}
        {section === 'products' && <label className="space-y-2 text-sm font-semibold"><span>Website sector *</span><select required className={input} value={sector} onChange={e => setSector(e.target.value)}><option value="">Select Defence, Industry or another sector</option>{sectors.map(s => <option key={s.id} value={s.sector_id}>{s.name}</option>)}</select></label>}
        <label className="space-y-2 text-sm font-semibold"><span>{section === 'projects' ? 'Project title' : 'Name'} *</span><input className={input} required maxLength={255} value={values.name || ''} onChange={e => setValues(old => ({ ...old, name: e.target.value, ...(!old.slug || old.slug === (old.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100) ? { slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100) } : {}) }))} /></label>
        <label className="space-y-2 text-sm font-semibold"><span>Page slug *</span><input className={input} required maxLength={100} pattern="[-a-zA-Z0-9_]+" title="Use letters, numbers, hyphens or underscores." value={values.slug || ''} onChange={e => update('slug', e.target.value)} /><span className="block text-xs font-normal text-slate-500">Generated from the name. Must be unique.</span></label>
      </div>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 flex flex-col sm:flex-row gap-5">
        {preview ? <img src={preview} alt="Selected image preview" className="w-40 h-32 object-contain rounded-lg bg-white" /> : <div className="w-40 h-32 rounded-lg bg-white flex items-center justify-center text-slate-400"><Upload size={28} /></div>}
        <label className="flex-1 space-y-3 text-sm"><span className="block font-semibold">Image *</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" required={!file} onChange={e => {
          const selected = e.target.files?.[0];
          if (!selected) return;
          if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(selected.type) || selected.size > 10 * 1024 * 1024) { setError('Choose a JPG, PNG, WebP or GIF image up to 10 MB.'); setFile(null); uploaded.current = null; e.target.value = ''; return; }
          setFile(selected); uploaded.current = null; setError('');
        }} className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#133057] file:px-4 file:py-2 file:text-white" /><span className="block text-slate-500 text-xs">JPG, PNG, WebP or GIF, up to 10 MB. Your image uploads when you save.</span></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">{config.fields.map(field => <label key={field.key} className={`space-y-2 text-sm font-semibold ${field.kind === 'textarea' || field.kind === 'lines' ? 'sm:col-span-2' : ''}`}><span>{field.label}{field.required ? ' *' : ''}</span>{field.kind === 'textarea' || field.kind === 'lines' ? <textarea className={input} rows={field.kind === 'lines' ? 3 : 4} required={field.required} value={values[field.key] || ''} onChange={e => update(field.key, e.target.value)} /> : <input className={input} type={field.kind === 'number' ? 'number' : 'text'} min={field.kind === 'number' ? 1 : undefined} step={field.kind === 'number' ? 1 : undefined} maxLength={field.maxLength} required={field.required} value={values[field.key] || ''} onChange={e => update(field.key, e.target.value)} />}{field.kind === 'lines' && <span className="block text-xs font-normal text-slate-500">Enter one item per line.</span>}</label>)}</div>
      {(section === 'products' || section === 'projects') && <div className="space-y-3"><h3 className="font-bold">Category-specific details</h3><p className="text-sm text-slate-500">Add the details relevant to this category, such as material, capacity, coverage or dimensions.</p>{specs.map((spec, index) => <div key={index} className="flex flex-wrap sm:flex-nowrap gap-2"><input aria-label={`Detail ${index + 1} name`} placeholder="Detail name" required maxLength={150} className={input} value={spec.label} onChange={e => setSpecs(old => old.map((s, i) => i === index ? { ...s, label: e.target.value } : s))} /><input aria-label={`Detail ${index + 1} value`} placeholder="Value" required maxLength={255} className={input} value={spec.value} onChange={e => setSpecs(old => old.map((s, i) => i === index ? { ...s, value: e.target.value } : s))} /><button type="button" aria-label={`Remove detail ${index + 1}`} onClick={() => setSpecs(old => old.filter((_, i) => i !== index))} className="p-2 text-red-600"><Trash2 size={18} /></button></div>)}<button type="button" className="inline-flex items-center gap-2 text-sm font-bold" onClick={() => setSpecs(old => [...old, { label: '', value: '' }])}><Plus size={16} />Add detail</button></div>}
      {section === 'consultancy' && <div className="space-y-3"><h3 className="font-bold">Methodology</h3>{steps.map((step, index) => <div key={index} className="grid gap-2 rounded-lg border p-3"><input className={input} aria-label={`Step ${index + 1} title`} placeholder="Step title" required value={step.title} onChange={e => setSteps(old => old.map((s, i) => i === index ? { ...s, title: e.target.value } : s))} /><textarea className={input} aria-label={`Step ${index + 1} description`} placeholder="Step description" required value={step.desc} onChange={e => setSteps(old => old.map((s, i) => i === index ? { ...s, desc: e.target.value } : s))} /><button type="button" className="text-sm text-red-600 justify-self-start" onClick={() => setSteps(old => old.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: String(i + 1).padStart(2, '0') })))}>Remove step</button></div>)}<button type="button" className="inline-flex items-center gap-2 text-sm font-bold" onClick={() => setSteps(old => [...old, { step: String(old.length + 1).padStart(2, '0'), title: '', desc: '' }])}><Plus size={16} />Add step</button></div>}
      {section === 'projects' && <label className="block space-y-2 text-sm font-semibold"><span>Status</span><select className={input} value={values.status || 'Delivered'} onChange={e => update('status', e.target.value)}>{['Delivered', 'Active', 'Completed'].map(s => <option key={s}>{s}</option>)}</select></label>}
      {section !== 'vessels' && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />Feature this entry</label>}
    </fieldset>
    {error && <p role="alert" className="whitespace-pre-line rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    <div className="flex gap-3 border-t pt-5"><button disabled={busy || loading || !!loadError} className="rounded-lg bg-[#ed145b] px-6 py-3 text-white font-bold text-sm disabled:opacity-50" type="submit">{busy ? progress : `Save ${config.singular}`}</button><button type="button" disabled={busy} onClick={onCancel} className="rounded-lg border px-5 py-3 text-sm font-semibold disabled:opacity-50">Cancel</button></div>
  </form>;
}
