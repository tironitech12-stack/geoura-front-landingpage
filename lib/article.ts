import fs from 'node:fs';
import path from 'node:path';
import {entries,type Locale} from '@/lib/data';
import {editorialStatus,isIndexable} from '@/lib/editorial';

export function article(locale:Locale,slug:string){
  const t=entries.find(e=>e.slug===slug);
  if(!t)return null;
  const filePath=path.join(process.cwd(),'content',locale,slug+'.md');
  if(!fs.existsSync(filePath))return null;
  const body=fs.readFileSync(filePath,'utf8');
  const st=fs.statSync(filePath);
  const modified=st.mtime.toISOString();
  const publishedAt=(st.birthtimeMs>0&&st.birthtimeMs<st.mtimeMs?st.birthtime:st.mtime).toISOString();
  const status=editorialStatus(slug);
  return {
    topic:t,
    body,
    status,
    published:isIndexable(slug),
    datePublished:publishedAt,
    dateModified:modified
  };
}
