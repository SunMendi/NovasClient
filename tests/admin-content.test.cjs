const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const mod = { exports: {} };
new Function('exports', ts.transpileModule(fs.readFileSync('src/components/admin/contentConfig.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(mod.exports);
const { buildPayload } = mod.exports;

test('product creation uses numeric backend category ID and structured specifications', () => {
  const payload = buildPayload('products', { name: 'Radar', slug: 'radar', sku: 'R-01', description: 'Marine radar', certifications: 'ISO\n\nCE' }, '7', 'defence', [{ label: 'Range', value: '24 NM' }], [], true);
  assert.equal(payload.category_id, 7);
  assert.equal(payload.sector_id, 'defence');
  assert.equal(payload.category_slug, undefined);
  assert.deepEqual(payload.certifications, ['ISO', 'CE']);
  assert.deepEqual(payload.specs, [{ label: 'Range', value: '24 NM', sort_order: 0 }]);
  assert.equal(payload.featured, true);
});
test('consultancy uses its category identifier and methodology without product fields', () => {
  const steps = [{ step: '01', title: 'Review', desc: 'Review the requirements' }];
  const payload = buildPayload('consultancy', { name: 'Advisory', slug: 'advisory', service_id: 'A-1', tagline: 'Advisory', summary: 'Summary', description: 'Details', deliverables: 'Survey\nReport', duration: '' }, 'project', '', [], steps, false);
  assert.equal(payload.category_id, 'project');
  assert.deepEqual(payload.deliverables, ['Survey', 'Report']);
  assert.deepEqual(payload.methodology, steps);
  assert.equal('duration' in payload, false);
  assert.equal('sku' in payload, false);
  assert.equal('specs' in payload, false);
});
test('projects use title, category, status and project-specific featured field', () => {
  const payload = buildPayload('projects', { name: 'Shipyard', slug: 'shipyard', project_id: 'P-1', status: 'Active' }, 'maritime', '', [], [], true);
  assert.equal(payload.title, 'Shipyard');
  assert.equal(payload.name, undefined);
  assert.equal(payload.category, 'maritime');
  assert.equal(payload.status, 'Active');
  assert.equal(payload.is_featured, true);
  assert.equal(payload.featured, undefined);
});
test('vessels send numeric crew capacity without unrelated category fields', () => {
  const payload = buildPayload('vessels', { name: 'Tug', slug: 'tug', crew_capacity: '8' }, '', '', [], [], false);
  assert.equal(payload.crew_capacity, 8);
  assert.equal('category_id' in payload, false);
  assert.equal('featured' in payload, false);
});

test('admin requests preserve server validation errors and reject malformed success responses', async () => {
  const api = {};
  const source = ts.transpileModule(fs.readFileSync('src/services/admin.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const requests = [];
  let response = { ok: false, status: 400, json: async () => ({ category_id: ['Invalid category.'] }) };
  new Function('exports', 'require', 'fetch', source)(api, name => name === './api' ? { API_BASE_URL: 'https://example.test/api' } : { authService: { getToken: () => 'test-token' } }, async (url, options) => { requests.push({ url, options }); return response; });
  await assert.rejects(api.adminRequest('/catalog/products/', { method: 'POST', body: '{}' }), /category id: Invalid category/);
  assert.equal(requests[0].options.headers.Authorization, 'Token test-token');
  assert.equal(requests[0].options.headers['Content-Type'], 'application/json');
  response = { ok: true, status: 201, json: async () => ({ data: { id: 3 } }) };
  assert.deepEqual(await api.adminRequest('/catalog/products/'), { id: 3 });
  response = { ok: true, status: 200, json: async () => ({}) };
  await assert.rejects(api.adminRequest('/catalog/products/'), /unexpected response/);
});

test('content sections match the navbar and vessels are nested under products', () => {
  const { sections, getContentKind, VESSEL_CATEGORY, contentTypes } = mod.exports;
  assert.deepEqual(Object.keys(sections), ['products', 'consultancy', 'projects', 'defence', 'industry']);
  assert.equal(getContentKind('products', VESSEL_CATEGORY), 'vessels');
  assert.equal(getContentKind('products', '7'), 'products');
  assert.equal(getContentKind('defence', VESSEL_CATEGORY), 'defence');
  assert.equal(contentTypes[getContentKind('products', VESSEL_CATEGORY)].endpoint, '/catalog/vessels/');
  assert.ok(contentTypes.vessels.fields.some(field => field.key === 'length_overall'));
  assert.ok(!contentTypes.vessels.fields.some(field => field.key === 'sku'));
});

test('Defence and Industry isolate their lists and assign new entries to the selected sector', () => {
  const { getListEndpoint } = mod.exports;
  for (const section of ['defence', 'industry']) {
    assert.equal(getListEndpoint(section), `/catalog/products/?sector=${section}`);
    const payload = buildPayload(section, { name: 'Entry', slug: 'entry', sku: 'A-1', description: 'Details' }, '7', 'wrong-sector', [{ label: 'Capacity', value: '20' }], [], false);
    assert.equal(payload.sector_id, section);
    assert.equal(payload.category_id, 7);
    assert.equal(payload.specs[0].label, 'Capacity');
  }
});

test('product category list uses the appropriate backend collection', () => {
  const { getListEndpoint, VESSEL_CATEGORY } = mod.exports;
  assert.equal(getListEndpoint('products', VESSEL_CATEGORY), '/catalog/vessels/');
  assert.equal(getListEndpoint('products', 'medical'), '/catalog/products/?category=medical');
  assert.equal(getListEndpoint('products'), '/catalog/products/');
});

test('editing hydrates fields, specifications, image and category for every content type', () => {
  const { getEditState, getEntryEndpoint, VESSEL_CATEGORY } = mod.exports;
  const entry = { id: 1, slug: 'original', name: 'Name', sku: 'SKU', category: { id: 7, category_id: 'project', slug: 'project' }, image_url: 'https://example.com/image.png', certifications: ['A','B'], specs: [{id: 22, label:'Capacity',value:'20'}], sector_id:'industry' };
  const product = getEditState('products', entry);
  assert.equal(product.category, '7');
  assert.equal(product.values.certifications, 'A\nB');
  assert.equal(product.image, entry.image_url);
  assert.deepEqual(product.specs, [{label:'Capacity',value:'20'}]);
  assert.equal(getEditState('consultancy', entry).category, 'project');
  assert.equal(getEditState('projects', { ...entry, title:'Project', name:undefined, category:'defence', image:'image.png', image_url:undefined }).image, 'image.png');
  const vessel = { ...entry, vessel_id:'V-1', crew_capacity:3 };
  assert.equal(getEditState('products', vessel).category, VESSEL_CATEGORY);
  assert.equal(getEditState('products', vessel).values.crew_capacity, '3');
  assert.equal(getEntryEndpoint('products', vessel), '/catalog/vessels/original/');
  assert.equal(getEntryEndpoint('defence', entry), '/catalog/products/original/');
});

test('edits send empty optional fields so existing values can be cleared', () => {
  const payload = buildPayload('products', {name:'Name',slug:'name',sku:'SKU',description:'Details'}, '7', 'defence', [], [], false, true);
  assert.equal(payload.warranty, '');
  assert.deepEqual(payload.certifications, []);
  assert.deepEqual(payload.specs, []);
  assert.equal(payload.featured, false);
});

test('successful deletion accepts an empty 204 response', async () => {
  const api = {};
  const source = ts.transpileModule(fs.readFileSync('src/services/admin.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  new Function('exports','require','fetch',source)(api, name => name === './api' ? {API_BASE_URL:'https://example.test'} : {authService:{getToken:()=> 'token'}}, async () => ({ok:true,status:204,json:async()=>{throw new Error('No body');}}));
  assert.equal(await api.adminRequest('/catalog/products/test/',{method:'DELETE'}), undefined);
});
