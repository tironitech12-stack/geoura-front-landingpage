import {Suspense} from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {entries,copy,getLanguage,publishedSlugs,articleHref} from '@/lib/data';
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
    ?'Notas de pesquisa sobre visibilidade em busca e IA, otimização generativa, motores de resposta, citações no ChatGPT e crescimento orgânico.'
    :'Research notes on AI search visibility, generative engine optimization, answer engines, ChatGPT citations and organic growth.';
  return {
    title,
    description,
    robots:{index:true,follow:true},
    alternates:{
      canonical:`/${locale}/artigos`,
      languages:languageAlternates('/artigos')
    },
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
  const d=copy[locale];
  const published=entries.filter(t=>publishedSlugs.has(t.slug));

  return (
    <>
      <Navigation locale={locale}/>
      <main className="library">
        <div className="wrap">
          <div className="library-header">
            <span className="eyebrow">{d.eyebrow} / INDEX Nº 001</span>
            <h1>Ideas, indexed<span className="mint">.</span></h1>
            <p>
              {locale==='pt'
                ?'Um atlas editorial de inteligência de busca, descoberta generativa e as perguntas que moldam a economia orgânica.'
                :'A working editorial atlas of search intelligence, generative discovery, and the questions shaping a new organic economy.'}
            </p>
            <div className="lib-stats">
              <span>1,200 TOPICS</span>
              <span>03 DISCIPLINES</span>
              <span>02 LANGUAGES</span>
            </div>
          </div>

          {published.length>0&&(
            <nav className="published-index" aria-label={locale==='pt'?'Artigos publicados':'Published articles'}>
              <span className="eyebrow">{locale==='pt'?'PUBLICADOS':'PUBLISHED'}</span>
              <ul>
                {published.map(t=>(
                  <li key={t.slug}>
                    <Link href={articleHref(t,locale)}>{t.query}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <Suspense fallback={<div className="explorer">{locale==='pt'?'Carregando biblioteca…':'Loading library…'}</div>}>
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
