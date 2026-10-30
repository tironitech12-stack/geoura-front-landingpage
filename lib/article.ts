import fs from 'node:fs';
import path from 'node:path';
import {entries,publishedSlugs,type Locale} from '@/lib/data';

export function article(locale:Locale,slug:string){
  const t=entries.find(e=>e.slug===slug);
  if(!t)return null;
  return {
    topic:t,
    body:fs.readFileSync(path.join(process.cwd(),'content',locale,slug+'.md'),'utf8'),
    published:publishedSlugs.has(slug)
  };
}
