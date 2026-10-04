const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const exportsObject = {};
new Function('exports',ts.transpileModule(fs.readFileSync('src/services/submissionResponse.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(exportsObject);
const {readSavedSubmission}=exportsObject;
const response=(status,body)=>({ok:status>=200&&status<300,json:async()=>body});
test('only saved submissions with genuine server references confirm success',async()=>{
 const body={data:{id:1,reference_id:'RFQ-20261004-ABC123'}};
 assert.deepEqual(await readSavedSubmission(response(201,body),true),body);
 assert.equal((await readSavedSubmission(response(201,{data:{id:2}}))).data.id,2);
 await assert.rejects(readSavedSubmission(response(201,{data:{id:1}}),true),/did not confirm/);
 await assert.rejects(readSavedSubmission(response(200,{})),/did not confirm/);
 await assert.rejects(readSavedSubmission(response(400,{email:['Enter a valid email.']})),/valid email/);
 await assert.rejects(readSavedSubmission(response(500,{message:'Service unavailable'})),/Service unavailable/);
 await assert.rejects(readSavedSubmission({ok:true,json:async()=>{throw new Error('Invalid JSON')}}),/did not confirm/);
});

test('RFQ, contact and newsletter services reject network failures instead of faking success',async()=>{
 const loaded={};
 const source=fs.readFileSync('src/services/api.ts','utf8').replace('import.meta.env.VITE_API_BASE_URL','undefined');
 const output=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 new Function('exports','require','fetch',output)(loaded,path=>path==='./submissionResponse'?exportsObject:{},async()=>{throw new Error('Network unavailable')});
 const original=console.error;
 console.error=()=>{};
 try {
  await assert.rejects(loaded.api.submitRFQ({organizationName:'Test',contactName:'Test',email:'test@example.com',phone:'123',deliveryPort:'Dhaka',timeframe:'30 days',endUserConfirmed:true,items:[]}),/Network unavailable/);
  await assert.rejects(loaded.api.submitContactMessage({fullName:'Test',email:'test@example.com',subject:'Question',message:'Details'}),/Network unavailable/);
  await assert.rejects(loaded.api.subscribeNewsletter('test@example.com'),/Network unavailable/);
 } finally { console.error=original; }
});
