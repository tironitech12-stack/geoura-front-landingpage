import {baseUrl,type Locale} from '@/lib/data';

export function htmlLang(locale:Locale){
  return locale==='pt'?'pt-BR':'en';
}

/** Path after locale, e.g. '', '/artigos', '/artigos/slug', '/plataforma' */
export function languageAlternates(pathAfterLocale=''){
  const suffix=pathAfterLocale===''||pathAfterLocale.startsWith('/')
    ?pathAfterLocale
    :`/${pathAfterLocale}`;
  return {
    en:`/en${suffix}`,
    'pt-BR':`/pt${suffix}`,
    'x-default':`/en${suffix}`
  };
}

export function absoluteUrl(path:string){
  if(path.startsWith('http'))return path;
  return `${baseUrl}${path.startsWith('/')?path:`/${path}`}`;
}

export function organizationId(){
  return `${baseUrl}/#organization`;
}

export function logoId(){
  return `${baseUrl}/#logo`;
}

export function defaultOgImage(){
  return {
    url:`${baseUrl}/opengraph-image`,
    width:1200,
    height:630,
    alt:'GEOura — AI search visibility across SEO, GEO and AEO'
  };
}

export function organizationJsonLd(){
  return {
    '@type':'Organization',
    '@id':organizationId(),
    name:'GEOura',
    url:baseUrl,
    email:'hello@geoura.com',
    description:'Organic discovery intelligence across SEO, GEO and AEO.',
    logo:{
      '@type':'ImageObject',
      '@id':logoId(),
      url:`${baseUrl}/icon`,
      width:512,
      height:512
    },
    image:{'@id':logoId()}
  };
}
