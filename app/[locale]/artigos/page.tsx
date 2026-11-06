import {Suspense} from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {entries,getLanguage,publishedSlugs,articleHref} from '@/lib/data';
import ArticleExplorer from '@/components/article-explorer';
import {languageAlternates,absoluteUrl,defaultOgImage} from '@/lib/seo';
import type {Metadata} from 'next';
import Link from 'next/link';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'
    ?'Revista de busca e IA — guias SEO, GEO e AEO'
    :'AI Search Journal — SEO, GEO & AEO guides';
  const description=locale==='pt'
    ?'Biblioteca editorial sobre visibilidade em busca e IA. Apenas artigos revisados são indexados.'
    :'Editorial library on search and AI visibility. Only reviewed articles are indexed.';
  return {
    title,
    description,
    robots:{index:true,follow:true},
    alternates:{canonical:`/${locale}/artigos`,languages:languageAlternates('/artigos')},
    openGraph:{
      title,
      description,
      url:absoluteUrl(`/${locale}/artigos`),
      type:'website',
      locale:locale==='pt'?'pt_BR':'en_US',
      images:[defaultOgImage()]
    }
  };
}

export default async function Articles({
  params,
  searchParams
}:{
  params:Promise<{locale:string}>;
  searchParams:Promise<{page?:string;q?:string;area?:string;kind?:string}>;
}){
  const locale=getLanguage((await params).locale);
  const sp=await searchParams;
  const published=entries.filter(t=>publishedSlugs.has(t.slug));
  const pt=locale==='pt';

  return (
    <>
      <Navigation locale={locale}/>
      <main className="library">
        <div className="wrap">
          <div className="library-header">
            <span className="eyebrow">{pt?'REVISTA GEOURA / ÍNDICE':'THE GEOURA JOURNAL / INDEX'}</span>
            <h1>{pt?<>Ideias, indexadas<span className="mint">.</span></>:<>Ideas, indexed<span className="mint">.</span></>}</h1>
            <p>
              {pt
                ?'Atlas editorial de inteligência de busca e descoberta generativa. Rascunhos permanecem noindex até revisão.'
                :'Editorial atlas of search intelligence and generative discovery. Drafts stay noindex until review.'}
            </p>
            <div className="lib-stats">
              <span>1,200 {pt?'TEMAS':'TOPICS'}</span>
              <span>03 {pt?'DISCIPLINAS':'DISCIPLINES'}</span>
              <span>{published.length.toString().padStart(2,'0')} {pt?'PUBLICADOS':'PUBLISHED'}</span>
            </div>
            <div className="draft-atlas-note">
              {pt
                ?'O inventário abaixo inclui rascunhos de pesquisa. Eles não são artigos publicados e não devem ser tratados como base de conhecimento final. Priorizamos hubs editoriais (ver docs/CONTENT_ROADMAP.md).'
                :'The inventory below includes research drafts. They are not published articles and must not be treated as a finished knowledge base. We prioritize editorial hubs (see docs/CONTENT_ROADMAP.md).'}
            </div>
          </div>

          {published.length>0&&(
            <nav className="published-index" aria-label={pt?'Artigos publicados':'Published articles'}>
              <span className="eyebrow">{pt?'PUBLICADOS':'PUBLISHED'}</span>
              <ul>
                {published.map(t=>(
                  <li key={t.slug}><Link href={articleHref(t,locale)}>{t.query}</Link></li>
                ))}
              </ul>
            </nav>
          )}

          <Suspense fallback={<div className="explorer">{pt?'Carregando…':'Loading…'}</div>}>
            <ArticleExplorer
              locale={locale}
              topics={entries}
              initialQ={sp.q||''}
              initialArea={sp.area||'All'}
              initialKind={sp.kind||'All'}
              initialPage={Math.max(1,Number(sp.page||'1')||1)}
            />
          </Suspense>
        </div>
      </main>
      <Footer locale={locale}/>
    </>
  );
}
