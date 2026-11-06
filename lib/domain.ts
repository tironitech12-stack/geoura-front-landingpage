/** Hostname / URL validation for interest capture — never fetches the target (SSRF-safe). */

const BLOCKED_HOSTS=new Set([
  'localhost','127.0.0.1','0.0.0.0','::1',
  'metadata.google.internal','metadata'
]);

export type DomainValidation=
  |{ok:true;hostname:string;normalized:string}
  |{ok:false;error:'empty'|'invalid'|'blocked'};

export function validateDomainInput(raw:string):DomainValidation{
  const trimmed=(raw||'').trim().toLowerCase();
  if(!trimmed)return {ok:false,error:'empty'};

  let candidate=trimmed;
  if(!/^https?:\/\//.test(candidate))candidate=`https://${candidate}`;

  let url:URL;
  try{url=new URL(candidate);}
  catch{return {ok:false,error:'invalid'};}

  if(url.protocol!=='http:'&&url.protocol!=='https:')return {ok:false,error:'invalid'};

  const hostname=url.hostname.replace(/\.$/,'');
  if(!hostname||hostname.includes(' '))return {ok:false,error:'invalid'};
  if(BLOCKED_HOSTS.has(hostname))return {ok:false,error:'blocked'};
  if(/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.)/.test(hostname))return {ok:false,error:'blocked'};
  if(!hostname.includes('.'))return {ok:false,error:'invalid'};
  if(!/^[a-z0-9.-]+$/.test(hostname)||hostname.startsWith('-')||hostname.endsWith('-'))return {ok:false,error:'invalid'};
  if(!/\.[a-z]{2,}$/.test(hostname))return {ok:false,error:'invalid'};

  return {ok:true,hostname,normalized:`https://${hostname}`};
}
