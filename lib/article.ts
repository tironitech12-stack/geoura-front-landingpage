import fs from 'node:fs';
import path from 'node:path';
import {entries,publishedSlugs,type Locale} from '@/lib/data';

export function article(locale:Locale,slug:string){
  const t=entries.find(e=>e.slug===slug);
  if(!t)return null;
  const filePath=path.join(process.cwd(),'content',locale,slug+'.md');
  const body=fs.readFileSync(filePath,'utf8');
  const st=fs.statSync(filePath);
  const modified=st.mtime.toISOString();
  // Prefer birthtime when available; fall back to mtime (honest file-derived dates).
  const published=(st.birthtimeMs>0&&st.birthtimeMs<st.mtimeMs?st.birthtime:st.mtime).toISOString();
  return {
    topic:t,
    body,
    published:publishedSlugs.has(slug),
    datePublished:published,
    dateModified:modified
  };
}
