import {NextResponse} from 'next/server';
import {validateDomainInput} from '@/lib/domain';

export const runtime='nodejs';

const hits=new Map<string,number[]>();
const WINDOW_MS=60_000;
const MAX_PER_WINDOW=8;

function clientIp(req:Request){
  const xf=req.headers.get('x-forwarded-for');
  if(xf)return xf.split(',')[0]?.trim()||'unknown';
  return req.headers.get('x-real-ip')||'unknown';
}

function rateLimit(key:string){
  const now=Date.now();
  const recent=(hits.get(key)||[]).filter(t=>now-t<WINDOW_MS);
  if(recent.length>=MAX_PER_WINDOW){
    hits.set(key,recent);
    return false;
  }
  recent.push(now);
  hits.set(key,recent);
  return true;
}

/**
 * Early-access interest capture.
 * Validates hostname only — never fetches the submitted URL (SSRF-safe).
 */
export async function POST(req:Request){
  if(!rateLimit(clientIp(req))){
    return NextResponse.json({ok:false,error:'rate_limited'},{status:429});
  }

  let body:unknown;
  try{body=await req.json();}
  catch{return NextResponse.json({ok:false,error:'invalid_json'},{status:400});}

  const domain=typeof body==='object'&&body&&'domain' in body?(body as {domain:unknown}).domain:'';
  const locale=typeof body==='object'&&body&&'locale' in body?String((body as {locale:unknown}).locale):'en';
  const result=validateDomainInput(String(domain||''));

  if(!result.ok){
    return NextResponse.json({ok:false,error:result.error},{status:400});
  }

  // Intentionally no outbound fetch. Persist later via CRM / email provider.
  return NextResponse.json({
    ok:true,
    mode:'waitlist',
    hostname:result.hostname,
    normalized:result.normalized,
    locale:locale==='pt'?'pt':'en',
    message:'Interest recorded. Live website analysis is not available yet.'
  });
}
