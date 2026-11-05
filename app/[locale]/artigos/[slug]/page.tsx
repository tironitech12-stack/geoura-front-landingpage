import Link from 'next/link';
import {notFound} from 'next/navigation';
import {marked} from 'marked';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {entries,articleHref,baseUrl,getLanguage} from '@/lib/data';
import {article} from '@/lib/article';
import {
  languageAlternates,
  absoluteUrl,
  defaultOgImage,
  organizationJsonLd,
  organizationId,
  logoId,
  htmlLang
} from '@/lib/seo';
import {ArrowLeft,ArrowUpRight,Clock3} from 'lucide-react';
import type {Metadata} from 'next';

export const dynamicParams=true;

export async function generateMetadata({params}:{params:Promise<{locale:string,slug:string}>}):Promise<Metadata>{
  const {slug,locale:l}=await params;
  const locale=getLanguage(l);
  const a=article(locale,slug);
  if(!a)return {};
  const description=locale==='pt'
    ?`Guia estruturado sobre ${a.topic.query} e abordagens práticas em SEO, GEO e AEO.`
    :`A structured guide to ${a.topic.query} and practical approaches across SEO, GEO and AEO.`;
  const path=`/${locale}/artigos/${slug}`;
  return {
    title:a.topic.query,
    description,
    alternates:{
      canonical:path,
      languages:languageAlternates(`/artigos/${slug}`)
    },
    robots:{index:a.published,follow:true},
    openGraph:{
      title:a.topic.query,
      description,
      type:'article',
      url:absoluteUrl(path),
      locale:locale==='pt'?'pt_BR':'en_US',
      publishedTime:a.datePublished,
      modifiedTime:a.dateModified,
      images:[defaultOgImage()]
    }
  };
}

export default async function Post({params}:{params:Promise<{locale:string,slug:string}>}){
  const {locale:l,slug}=await params;
  const locale=getLanguage(l);
  const a=article(locale,slug);
  if(!a)notFound();

  const html=await marked.parse(a.body,{gfm:true,breaks:false});
  const related=entries.filter(t=>t.area===a.topic.area&&t.slug!==slug).slice(0,3);
  const pageUrl=`${baseUrl}/${locale}/artigos/${slug}`;

  const jsonLd={
    '@context':'https://schema.org',
    '@graph':[
      organizationJsonLd(),
      {
        '@type':'BreadcrumbList',
        itemListElement:[
          {'@type':'ListItem',position:1,name:'GEOura',item:baseUrl},
          {'@type':'ListItem',position:2,name:locale==='pt'?'Artigos':'Articles',item:`${baseUrl}/${locale}/artigos`},
          {'@type':'ListItem',position:3,name:a.topic.query,item:pageUrl}
        ]
      },
      {
        '@type':'Article',
        headline:a.topic.query,
        description:locale==='pt'
          ?`Guia estruturado sobre ${a.topic.query}.`
          :`A structured guide to ${a.topic.query}.`,
        inLanguage:htmlLang(locale),
        isAccessibleForFree:true,
        datePublished:a.datePublished,
        dateModified:a.dateModified,
        author:{'@type':'Organization',name:'GEOura Editorial','@id':organizationId()},
        publisher:{'@type':'Organization','@id':organizationId(),name:'GEOura',logo:{'@id':logoId()}},
        image:[defaultOgImage().url],
        mainEntityOfPage:{'@type':'WebPage','@id':pageUrl}
      }
    ]
  };

  return (
    <>
      <Navigation locale={locale}/>
      <main className="post-page">
        <article className="wrap post-wrap">
          <Link href={`/${locale}/artigos`} className="back-link">
            <ArrowLeft size={16}/> {locale==='pt'?'Voltar aos artigos':'Back to journal'}
          </Link>
          <div className="post-head">
            <div className="eyebrow">{a.topic.area} / {a.topic.cluster} / THE GEOURA JOURNAL</div>
            <h1>{a.topic.query}</h1>
            <p>
              {locale==='pt'
                ?'Pensamento claro sobre descoberta orgânica, inteligência de busca e as decisões que movem o negócio.'
                :'Clear thinking about organic discoverability, search intelligence and the decisions that move your business forward.'}
            </p>
            <div className="post-meta">
              <span>GEOAURA EDITORIAL</span>
              <span><Clock3 size={14}/> RESEARCH GUIDE</span>
              <span>{a.topic.kind.toUpperCase()}</span>
              <time dateTime={a.dateModified}>
                {new Date(a.dateModified).toLocaleDateString(locale==='pt'?'pt-BR':'en-US',{year:'numeric',month:'short',day:'numeric'})}
              </time>
            </div>
          </div>
          {!a.published&&(
            <div className="draft-warning">
              <strong>Editorial research draft.</strong> This page is excluded from search indexing until it receives a factual, structural, translation and originality review. It is not a finished publication.
            </div>
          )}
          <div className="post-content" dangerouslySetInnerHTML={{__html:html}}/>
          <div className="post-end">
            <span>DISCOVERABILITY IS A PRACTICE, NOT A PROMISE.</span>
            <Link href={`/${locale}/artigos`}>Explore more insights <ArrowUpRight size={18}/></Link>
          </div>
        </article>
        <section className="wrap related-section">
          <span className="eyebrow">CONTINUE EXPLORING</span>
          <h2>Go one layer deeper.</h2>
          {related.map(t=>(
            <Link key={t.slug} href={articleHref(t,locale)} className="related-link">
              {t.query}<ArrowUpRight size={18}/>
            </Link>
          ))}
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
      <Footer locale={locale}/>
    </>
  );
}
