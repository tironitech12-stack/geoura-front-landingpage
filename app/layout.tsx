import './globals.css';
import type {Metadata} from 'next';

export const metadata:Metadata={
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://geoaura.com'),
  title:{
    default:'GeoAura — AI search visibility across SEO, GEO & AEO',
    template:'%s | GeoAura'
  },
  description:'See how your brand appears in search, ChatGPT, Gemini and answer engines. Organic discovery intelligence for SEO, GEO and AEO.',
  keywords:['AI search visibility','GEO','AEO','SEO','generative engine optimization','answer engine optimization','ChatGPT visibility','brand mentions'],
  robots:{index:true,follow:true},
  openGraph:{
    type:'website',
    siteName:'GeoAura',
    title:'GeoAura — Become the answer in AI search',
    description:'See beyond rankings. Understand how customers discover your brand across search and AI answers.'
  },
  twitter:{card:'summary_large_image',title:'GeoAura — Become the answer',description:'Organic discovery intelligence across SEO, GEO and AEO.'}
};

export default function Root({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
