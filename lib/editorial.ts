import {publishedSlugs} from '@/lib/data';

export type EditorialStatus='draft'|'in_review'|'published'|'archived';

/** Explicit overrides. Anything not listed defaults to draft unless in publishedSlugs. */
const statusOverrides:Record<string,EditorialStatus>={
  // Flagships stay draft until editorial rewrite — do not index boilerplate.
};

export function editorialStatus(slug:string):EditorialStatus{
  if(statusOverrides[slug])return statusOverrides[slug];
  if(publishedSlugs.has(slug))return 'published';
  return 'draft';
}

export function isIndexable(slug:string){
  return editorialStatus(slug)==='published';
}

export function isListedInJournal(slug:string){
  const s=editorialStatus(slug);
  return s==='published'||s==='in_review'||s==='draft';
}
