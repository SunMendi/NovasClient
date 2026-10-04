const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(path, dependencies, fetch, storage) {
  const result = {};
  const source = fs.readFileSync(path, 'utf8').replace('import.meta.env.VITE_API_BASE_URL', 'undefined');
  const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  new Function('exports','require','fetch','localStorage',compiled)(result, name => dependencies[name] || {}, fetch, storage);
  return result;
}
const response = (status, data) => ({ok:status >= 200 && status < 300, status, json:async()=>data});
function setup(reply) {
  const values = new Map();
  const storage = {getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
  const {authService} = load('src/services/auth.ts', {'./api':{API_BASE_URL:'/api'}}, async()=>reply(), storage);
  return {authService, storage};
}
test('staff login stores credentials; nonstaff and rejected logins do not', async()=>{
  const {authService, storage} = setup(()=>response(200,{data:{token:'test-token',user:{id:1,is_staff:true}}}));
  await authService.login('editor','password');
  assert.equal(authService.getToken(),'test-token');
  assert.equal(authService.getCurrentUser().id,1);
  const denied = setup(()=>response(200,{data:{token:'test-token',user:{id:2,is_staff:false}}}));
  await assert.rejects(denied.authService.login('visitor','password'),/Administrator/);
  assert.equal(denied.authService.getToken(),null);
  const bad = setup(()=>response(400,{errors:{non_field_errors:['Invalid credentials']}}));
  await assert.rejects(bad.authService.login('editor','bad'),/Invalid credentials/);
  assert.equal(bad.authService.getToken(),null);
  storage.setItem('novas_auth_user','broken json');
  assert.equal(authService.getCurrentUser(),null);
});
test('session validation rejects expired and nonstaff sessions and preserves tokens on outages', async()=>{
  for (const code of [401,403]) {
    const {authService, storage} = setup(()=>response(code,{}));
    storage.setItem('novas_auth_token','expired');
    assert.equal(await authService.validateSession(),null);
    assert.equal(authService.getToken(),null);
  }
  const {authService,storage} = setup(()=>response(503,{}));
  storage.setItem('novas_auth_token','valid');
  await assert.rejects(authService.validateSession(),/Cannot verify/);
  assert.equal(authService.getToken(),'valid');
  const nonstaff = setup(()=>response(200,{data:{is_staff:false}}));
  nonstaff.storage.setItem('novas_auth_token','visitor');
  assert.equal(await nonstaff.authService.validateSession(),null);
  assert.equal(nonstaff.authService.getToken(),null);
  const valid = setup(()=>response(200,{data:{id:1,is_staff:true}}));
  valid.storage.setItem('novas_auth_token','admin');
  assert.equal((await valid.authService.validateSession()).id,1);
});
test('project lookup supports a page slug different from its reference ID', async()=>{
  const {api} = load('src/services/api.ts',{},async()=>response(200,{data:[{project_id:'REF-123',slug:'new-project',title:'New project'}]}));
  assert.equal((await api.getProjectBySlug('new-project')).id,'REF-123');
  assert.equal((await api.getProjectBySlug('REF-123')).slug,'new-project');
  assert.equal(await api.getProjectBySlug('missing'),undefined);
});
test('successful empty public lists remain empty instead of restoring sample records', async()=>{
  const {api} = load('src/services/api.ts',{},async()=>response(200,{data:[]}));
  for (const method of ['getProducts','getVessels','getProjects','getConsultancyServices']) {
    assert.deepEqual(await api[method](),[]);
  }
});
