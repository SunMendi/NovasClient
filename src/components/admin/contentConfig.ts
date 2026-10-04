export type Section = 'products' | 'consultancy' | 'projects' | 'defence' | 'industry';
export type ContentKind = Section | 'vessels';
export const VESSEL_CATEGORY = '__vessels__';
export type Field = { key: string; label: string; required?: boolean; kind?: 'text' | 'textarea' | 'lines' | 'number'; maxLength?: number };
const field = (key: string, label: string, required = false, kind: Field['kind'] = 'text', maxLength?: number): Field => ({ key, label, required, kind, maxLength });
const baseContentTypes: Record<'products' | 'consultancy' | 'projects' | 'vessels', { label: string; singular: string; endpoint: string; identifier: string; fields: Field[] }> = {
  products: { label: 'Products', singular: 'product', endpoint: '/catalog/products/', identifier: 'sku', fields: [
    field('sku', 'SKU', true, 'text', 100), field('tagline', 'Short description', false, 'text', 255), field('description', 'Description', true, 'textarea'), field('origin', 'Origin', false, 'text', 100), field('lead_time', 'Lead time', false, 'text', 100), field('warranty', 'Warranty', false, 'text', 100), field('certifications', 'Certifications', false, 'lines'),
  ] },
  consultancy: { label: 'Consultancy', singular: 'consultancy service', endpoint: '/consultancy/services/', identifier: 'service_id', fields: [
    field('service_id', 'Service reference', true, 'text', 100), field('tagline', 'Tagline', true, 'text', 255), field('summary', 'Card summary', true, 'textarea'), field('description', 'Service description', true, 'textarea'), field('deliverables', 'Scope and deliverables', false, 'lines'), field('target_clients', 'Target clients', false, 'lines'), field('standards', 'Standards', false, 'lines'), field('duration', 'Duration', false, 'text', 100), field('lead_advisors', 'Lead advisors', false, 'text', 255),
  ] },
  projects: { label: 'Projects', singular: 'project', endpoint: '/projects/projects/', identifier: 'project_id', fields: [
    field('project_id', 'Project reference', true, 'text', 150), field('sector_name', 'Sector display name', true, 'text', 150), field('client', 'Client', true, 'text', 255), field('location', 'Location', true, 'text', 255), field('year', 'Year', true, 'text', 20), field('summary', 'Card summary', true, 'textarea'), field('description', 'Project description', true, 'textarea'), field('features', 'Project highlights', false, 'lines'),
  ] },
  vessels: { label: 'Vessels', singular: 'vessel', endpoint: '/catalog/vessels/', identifier: 'vessel_id', fields: [
    field('vessel_id', 'Vessel reference', true, 'text', 100), field('vessel_type', 'Vessel type', true, 'text', 150), field('tagline', 'Short description', false, 'text', 255), field('description', 'Description', true, 'textarea'), field('length_overall', 'Length overall', true, 'text', 50), field('beam', 'Beam', true, 'text', 50), field('draft', 'Draft', true, 'text', 50), field('max_speed', 'Maximum speed', true, 'text', 50), field('bollard_pull', 'Bollard pull', false, 'text', 50), field('engine_power', 'Engine power', true, 'text', 100), field('hull_material', 'Hull material', true, 'text', 100), field('classification_society', 'Classification society', true, 'text', 100), field('crew_capacity', 'Crew capacity', true, 'number'), field('delivery_lead_time', 'Delivery lead time', true, 'text', 100), field('features', 'Vessel features', false, 'lines'),
  ] },
};
export const contentTypes = {
  ...baseContentTypes,
  defence: { ...baseContentTypes.products, label: 'Defence', singular: 'defence entry' },
  industry: { ...baseContentTypes.products, label: 'Industry', singular: 'industry entry' },
};
// Only navbar destinations belong in the top-level content selector.
export const sections: Record<Section, typeof baseContentTypes.products> = {
  products: contentTypes.products,
  consultancy: contentTypes.consultancy,
  projects: contentTypes.projects,
  defence: contentTypes.defence,
  industry: contentTypes.industry,
};
export const isProductSection = (section: ContentKind) => ['products', 'defence', 'industry'].includes(section);
export const getContentKind = (section: Section, category: string): ContentKind =>
  section === 'products' && category === VESSEL_CATEGORY ? 'vessels' : section;
export function getListEndpoint(section: Section, categorySlug = '') {
  if (section === 'products' && categorySlug === VESSEL_CATEGORY) return contentTypes.vessels.endpoint;
  if (section === 'defence' || section === 'industry') return `${contentTypes.products.endpoint}?sector=${section}`;
  if (section === 'products' && categorySlug) return `${contentTypes.products.endpoint}?category=${encodeURIComponent(categorySlug)}`;
  return sections[section].endpoint;
}
export const projectCategories = [ ['defence', 'Defence'], ['maritime', 'Maritime'], ['industry', 'Industry'], ['consultancy', 'Consultancy'], ['geospatial', 'Geospatial'] ];
export interface Category { id: number; name: string; slug: string; category_id?: string; sector_id?: string; is_active?: boolean }
export type Spec = { label: string; value: string };
export type Step = { step: string; title: string; desc: string };
export function buildPayload(section: ContentKind, values: Record<string, string>, category: string, sector: string, specs: Spec[], steps: Step[], featured: boolean, editing = false) {
  const config = contentTypes[section];
  const payload: Record<string, unknown> = { priority: Number(values.priority || 100), slug: values.slug, [section === 'projects' ? 'title' : 'name']: values.name };
  for (const field of config.fields) {
    const value = (values[field.key] || '').trim();
    if (!value && !field.required && !editing) continue;
    payload[field.key] = field.kind === 'lines' ? value.split('\n').map(v => v.trim()).filter(Boolean) : field.kind === 'number' ? Number(value) : value;
  }
  if (isProductSection(section)) { payload.category_id = Number(category); payload.sector_id = section === 'defence' || section === 'industry' ? section : sector; }
  if (section === 'consultancy') { payload.category_id = category; payload.methodology = steps; }
  if (section === 'projects') { payload.category = category; payload.status = values.status || 'Delivered'; }
  if (isProductSection(section) || section === 'projects') payload.specs = specs.map((spec, sort_order) => ({ ...spec, sort_order }));
  if (section !== 'vessels') payload[section === 'projects' ? 'is_featured' : 'featured'] = featured;
  return payload;
}


export type ContentEntry = Record<string, any> & { id: number; slug: string };
export function getEditState(section: Section, entry?: ContentEntry) {
  const kind = entry?.vessel_id ? 'vessels' : section;
  const values: Record<string, string> = { priority: String(entry?.priority ?? 100) };
  if (entry) {
    values.name = entry.name || entry.title || '';
    values.slug = entry.slug;
    values.status = entry.status || 'Delivered';
    for (const field of contentTypes[kind].fields) {
      const value = entry[field.key];
      values[field.key] = field.kind === 'lines' ? (Array.isArray(value) ? value.join('\n') : '') : String(value ?? '');
    }
  }
  const category = kind === 'vessels' ? VESSEL_CATEGORY : section === 'projects' ? entry?.category || '' : section === 'consultancy' ? entry?.category?.category_id || entry?.category?.slug || '' : String(entry?.category?.id || '');
  return { values, category, sector: entry?.sector_id || '', specs: (entry?.specs || []).map((s: Spec) => ({ label: s.label, value: s.value })), steps: (entry?.methodology || []).map((s: Step) => ({ ...s })), featured: Boolean(entry?.featured || entry?.is_featured), image: entry?.image_url || entry?.image || '' };
}
export function getEntryEndpoint(section: Section, entry: ContentEntry) {
  return `${contentTypes[entry.vessel_id ? 'vessels' : section].endpoint}${encodeURIComponent(entry.slug)}/`;
}
