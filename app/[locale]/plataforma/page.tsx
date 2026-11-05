import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {getLanguage,baseUrl} from '@/lib/data';
import {languageAlternates,absoluteUrl,defaultOgImage,htmlLang} from '@/lib/seo';
import {ArrowUpRight,Search,BrainCircuit,MessageSquareText,ArrowRight} from 'lucide-react';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'
    ?'Plataforma GEOura — inteligência de descoberta orgânica'
    :'GEOura Platform — organic discovery intelligence';
  const description=locale==='pt'
    ?'Uma visão estratégica de busca tradicional, citações em IA e descoberta orientada a respostas — SEO, GEO e AEO juntos.'
    :'A strategic view of traditional search, AI citations and answer-driven discovery — SEO, GEO and AEO together.';
  return {
    title,
    description,
    alternates:{
      canonical:`/${locale}/plataforma`,
      languages:languageAlternates('/plataforma')
    },
    openGraph:{
      title,
      description,
      url:absoluteUrl(`/${locale}/plataforma`),
      type:'website',
      locale:locale==='pt'?'pt_BR':'en_US',
      images:[defaultOgImage()]
    }
  };
}

export default async function Platform({params}:{params:Promise<{locale:string}>}){
  const locale=getLanguage((await params).locale);
  const copy=locale==='pt'
    ?{
      eyebrow:'O PRODUTO / ACESSO ANTECIPADO',
      h1a:'Garanta seu lugar',
      h1b:'na economia das respostas.',
      intro:'A visibilidade não termina na página de resultados. Una busca tradicional, citações em IA e descoberta orientada a respostas em uma visão estratégica.',
      cta:'Solicitar acesso antecipado',
      features:[
        {name:'01 / SEO',title:'Entenda sua base de busca',text:'Explore intenção de palavras-chave, páginas, oportunidades técnicas e caminhos para conteúdo útil e original.'},
        {name:'02 / GEO',title:'Saiba onde sua marca entra na conversa',text:'Explore observações de visibilidade em IA com metodologia transparente.'},
        {name:'03 / AEO',title:'Faça cada resposta contar',text:'Planeje respostas concisas e confiáveis que ajudam o público a escolher e agir.'}
      ],
      approachEyebrow:'NOSSA ABORDAGEM',
      approachTitle:'Medir. Interpretar. Melhorar.',
      approachText:'A GEOura é um conceito de produto em desenvolvimento. As visões neste site são ilustrativas, não integrações ao vivo nem resultados verificados. As capacidades centrais exigem implementação antes do uso em produção.'
    }
    :{
      eyebrow:'THE PRODUCT / EARLY ACCESS',
      h1a:'Own your place',
      h1b:'in the answer economy.',
      intro:"Visibility doesn't stop at the search results page. Bring traditional search, AI citations and answer-driven discovery into one strategic view.",
      cta:'Request early access',
      features:[
        {name:'01 / SEO',title:'Understand your search foundation',text:'Explore keyword intent, pages, technical opportunities, and pathways toward useful, original content.'},
        {name:'02 / GEO',title:'Know where your brand enters the conversation',text:'Explore AI visibility observations across prompts and answers while maintaining transparent methodology.'},
        {name:'03 / AEO',title:'Make every answer count',text:'Plan concise, trustworthy answers that help audiences choose and act with confidence.'}
      ],
      approachEyebrow:'OUR APPROACH',
      approachTitle:'Measure. Interpret. Improve.',
      approachText:'GEOura is a product concept in development. The views shown in this site are illustrative, not live integrations or verified performance results. Core capabilities require implementation and integration before production use.'
    };
  const icons=[Search,BrainCircuit,MessageSquareText];

  const jsonLd={
    '@context':'https://schema.org',
    '@type':'WebPage',
    name:copy.h1a+' '+copy.h1b,
    description:copy.intro,
    inLanguage:htmlLang(locale),
    url:`${baseUrl}/${locale}/plataforma`,
    isPartOf:{'@type':'WebSite',name:'GEOura',url:baseUrl}
  };

  return (
    <>
      <Navigation locale={locale}/>
      <main>
        <section className="platform-hero wrap">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.h1a}<br/><em>{copy.h1b}</em></h1>
          <p>{copy.intro}</p>
          <a href="mailto:hello@geoura.com?subject=GEOura%20early%20access" className="btn btn-solid">
            {copy.cta} <ArrowUpRight size={17}/>
          </a>
        </section>
        <section className="wrap platform-list">
          {copy.features.map((v,i)=>{
            const Icon=icons[i];
            return (
              <div key={v.name} className="platform-feature">
                <div><Icon size={28}/></div>
                <span>{v.name}</span>
                <h2>{v.title}</h2>
                <p>{v.text}</p>
                <ArrowRight size={20}/>
              </div>
            );
          })}
        </section>
        <section className="wrap process-section">
          <span className="eyebrow">{copy.approachEyebrow}</span>
          <h2>{copy.approachTitle}</h2>
          <p>{copy.approachText}</p>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
      <Footer locale={locale}/>
    </>
  );
}
