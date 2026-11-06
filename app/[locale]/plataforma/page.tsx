import Link from 'next/link';
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
    ?'Visão estratégica de SEO, GEO e AEO. Análise automática ainda em desenvolvimento — early access disponível.'
    :'A strategic view of SEO, GEO and AEO. Automated analysis is in development — early access available.';
  return {
    title,
    description,
    alternates:{canonical:`/${locale}/plataforma`,languages:languageAlternates('/plataforma')},
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
      h1a:'Uma visão mais clara',
      h1b:'da descoberta orgânica.',
      intro:'A visibilidade não termina na SERP. A GEOura une busca tradicional, citações em experiências de IA e respostas — com honestidade sobre o que já existe e o que ainda está em construção.',
      cta:'Analisar meu site',
      note:'A análise ao vivo ainda não está operacional. O CTA registra seu domínio na lista de early access.',
      features:[
        {name:'01 / SEO',title:'Base de busca',text:'Roteiro técnico, indexabilidade, metadados e oportunidades no estilo Search Console.'},
        {name:'02 / GEO',title:'Presença generativa',text:'Estrutura informacional e monitoramento generativo quando houver integrações reais.'},
        {name:'03 / AEO',title:'Respostas úteis',text:'Perguntas, conteúdo answer-first e dados estruturados sem prometer citações.'}
      ],
      approachEyebrow:'ABORDAGEM',
      approachTitle:'Medir. Interpretar. Melhorar.',
      approachText:'Métricas e UI marcadas como prévia ou ilustrativas não são resultados de clientes. Capacidades centrais exigem implementação antes do uso em produção.'
    }
    :{
      eyebrow:'THE PRODUCT / EARLY ACCESS',
      h1a:'A clearer view',
      h1b:'of organic discovery.',
      intro:'Visibility does not stop at the SERP. GEOura brings traditional search, generative experiences and answers together — with honesty about what ships today versus what is still building.',
      cta:'Analyze my website',
      note:'Live analysis is not operational yet. The CTA registers your domain on the early-access list.',
      features:[
        {name:'01 / SEO',title:'Search foundation',text:'Technical roadmap, indexability, metadata and Search Console-oriented opportunities.'},
        {name:'02 / GEO',title:'Generative presence',text:'Informational structure and generative monitoring when real integrations exist.'},
        {name:'03 / AEO',title:'Useful answers',text:'Questions, answer-first content and structured data — without promising citations.'}
      ],
      approachEyebrow:'APPROACH',
      approachTitle:'Measure. Interpret. Improve.',
      approachText:'Metrics and UI labeled preview or illustrative are not customer results. Core capabilities require implementation before production use.'
    };
  const icons=[Search,BrainCircuit,MessageSquareText];

  const jsonLd={
    '@context':'https://schema.org',
    '@type':'WebPage',
    name:`${copy.h1a} ${copy.h1b}`,
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
          <p className="domain-hint" style={{color:'var(--muted)',maxWidth:'52ch'}}>{copy.note}</p>
          <Link href={`/${locale}#domain-capture`} className="btn btn-solid">
            {copy.cta} <ArrowUpRight size={17}/>
          </Link>
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
