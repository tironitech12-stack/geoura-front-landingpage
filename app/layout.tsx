import type {Metadata,Viewport} from 'next';
import type {ReactNode} from 'react';

export const metadata:Metadata={
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://geoura.com'),
  title:{
    default:'GEOura — AI search visibility across SEO, GEO & AEO',
    template:'%s | GEOura'
  },
  description:'See how your brand appears in search, ChatGPT, Gemini and answer engines. Organic discovery intelligence for SEO, GEO and AEO.',
  keywords:['AI search visibility','GEO','AEO','SEO','generative engine optimization','answer engine optimization','ChatGPT visibility','brand mentions'],
  robots:{index:true,follow:true},
  manifest:'/manifest.webmanifest',
  openGraph:{
    type:'website',
    siteName:'GEOura',
    title:'GEOura — Become the answer in AI search',
    description:'See beyond rankings. Understand how customers discover your brand across search and AI answers.'
  },
  twitter:{
    card:'summary_large_image',
    title:'GEOura — Become the answer',
    description:'Organic discovery intelligence across SEO, GEO and AEO.'
  },
  icons:{
    icon:[{url:'/icon',type:'image/png'}],
    apple:[{url:'/apple-icon',type:'image/png'}]
  }
};

export const viewport:Viewport={
  width:'device-width',
  initialScale:1,
  themeColor:'#111b18'
};

/** Pass-through root so `[locale]/layout` can own `<html lang>`. */
export default function Root({children}:{children:ReactNode}){
  return children;
}
