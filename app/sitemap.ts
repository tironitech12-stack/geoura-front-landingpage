import type {MetadataRoute} from 'next';
import {baseUrl,entries,publishedSlugs} from '@/lib/data';

export default function sitemap():MetadataRoute.Sitemap{
  const staticPaths=['','/artigos','/plataforma','/sobre','/privacy','/terms'];
  const urls:MetadataRoute.Sitemap=[];

  for(const locale of ['en','pt'] as const){
    for(const p of staticPaths){
      urls.push({
        url:`${baseUrl}/${locale}${p}`,
        changeFrequency:p===''?'weekly':'monthly',
        priority:p?0.6:1,
        alternates:{
          languages:{
            en:`${baseUrl}/en${p}`,
            'pt-BR':`${baseUrl}/pt${p}`,
            'x-default':`${baseUrl}/en${p}`
          }
        }
      });
    }

    for(const t of entries.filter(t=>publishedSlugs.has(t.slug))){
      const path=`/artigos/${t.slug}`;
      urls.push({
        url:`${baseUrl}/${locale}${path}`,
        changeFrequency:'monthly',
        priority:0.75,
        alternates:{
          languages:{
            en:`${baseUrl}/en${path}`,
            'pt-BR':`${baseUrl}/pt${path}`,
            'x-default':`${baseUrl}/en${path}`
          }
        }
      });
    }
  }

  return urls;
}
