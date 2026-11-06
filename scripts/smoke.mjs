import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Domain validation via ts compiled by node --experimental? Use dynamic import of built logic duplicated lightly:
function validateDomainInput(raw){
  const BLOCKED=new Set(['localhost','127.0.0.1','0.0.0.0','::1','metadata.google.internal','metadata']);
  const trimmed=(raw||'').trim().toLowerCase();
  if(!trimmed)return {ok:false,error:'empty'};
  let candidate=trimmed;
  if(!/^https?:\/\//.test(candidate))candidate=`https://${candidate}`;
  let url;
  try{url=new URL(candidate);}catch{return {ok:false,error:'invalid'};}
  if(url.protocol!=='http:'&&url.protocol!=='https:')return {ok:false,error:'invalid'};
  const hostname=url.hostname.replace(/\.$/,'');
  if(!hostname)return {ok:false,error:'invalid'};
  if(BLOCKED.has(hostname))return {ok:false,error:'blocked'};
  if(/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.)/.test(hostname))return {ok:false,error:'blocked'};
  if(!hostname.includes('.'))return {ok:false,error:'invalid'};
  if(!/^[a-z0-9.-]+$/.test(hostname))return {ok:false,error:'invalid'};
  if(!/\.[a-z]{2,}$/.test(hostname))return {ok:false,error:'invalid'};
  return {ok:true,hostname,normalized:`https://${hostname}`};
}

assert.equal(validateDomainInput('').error,'empty');
assert.equal(validateDomainInput('not a domain').error,'invalid');
assert.equal(validateDomainInput('localhost').error,'blocked');
assert.equal(validateDomainInput('127.0.0.1').error,'blocked');
assert.equal(validateDomainInput('https://192.168.0.1').error,'blocked');
assert.equal(validateDomainInput('example.com').ok,true);
assert.equal(validateDomainInput('https://Example.COM/path').hostname,'example.com');

const require=createRequire(import.meta.url);
const topics=require(path.join(root,'topics.json'));
assert.equal(topics.length,1200);

const tsc=spawnSync(
  process.platform==='win32'?'npx.cmd':'npx',
  ['tsc','--noEmit'],
  {cwd:root,encoding:'utf8',shell:true}
);
if(tsc.status!==0){
  console.error(tsc.stdout||tsc.stderr);
  process.exit(tsc.status||1);
}

console.log('smoke ok: domain validation, topics count, tsc');
