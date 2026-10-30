import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Graphic from '@/components/graphic';
import GrowthProjection from '@/components/growth-projection';
import {Reveal} from '@/components/reveal';
import {copy,entries,articleHref,getLanguage,baseUrl} from '@/lib/data';
import {ArrowRight,ArrowUpRight,MoveUpRight,Search,Atom,MessageSquareMore} from 'lucide-react';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'
    ?'GEOura — Visibilidade em busca e respostas de IA'
    :'GEOura — AI search visibility across SEO, GEO & AEO';
  const description=locale==='pt'
    ?'Entenda como sua marca aparece em buscas, ChatGPT, Gemini e motores de resposta. Inteligência orgânica para SEO, GEO e AEO.'
    :'See how your brand appears in search, ChatGPT, Gemini and answer engines. Organic discovery intelligence for SEO, GEO and AEO.';
  return {
    title:{absolute:title},
    description,
    alternates:{
      canonical:`/${locale}`,
      languages:{en:'/en','pt-BR':'/pt'}
    },
    openGraph:{title,description,url:`${baseUrl}/${locale}`,type:'website'}
  };
}

export default async function Home({params}:{params:Promise<{locale:string}>}){
  const locale=getLanguage((await params).locale);
  const d=copy[locale];
  const featured=[
    entries.find(e=>e.query==='generative engine optimization'),
    entries.find(e=>e.query==='answer engine optimization'),
    entries.find(e=>e.query==='search engine optimization')
  ].filter(Boolean) as typeof entries;

  const jsonLd={
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'Organization',
        name:'GEOura',
        url:baseUrl,
        description:'Organic discovery intelligence across SEO, GEO and AEO.',
        email:'hello@geoura.com'
      },
      {
        '@type':'WebSite',
        name:'GEOura',
        url:baseUrl,
        inLanguage:locale==='pt'?['pt-BR','en']:['en','pt-BR'],
        potentialAction:{
          '@type':'SearchAction',
          target:`${baseUrl}/${locale}/artigos?q={search_term_string}`,
          'query-input':'required name=search_term_string'
        }
      },
      {
        '@type':'SoftwareApplication',
        name:'GEOura',
        applicationCategory:'BusinessApplication',
        operatingSystem:'Web',
        description:d.heroText,
        offers:{'@type':'Offer',price:'0',priceCurrency:'USD',availability:'https://schema.org/PreOrder'}
      }
    ]
  };

  return <>
    <Navigation locale={locale}/>
    <main>
      <section className="hero-stage">
        <div className="hero-atmosphere" aria-hidden>
          <span className="atm atm-a"/>
          <span className="atm atm-b"/>
          <span className="atm atm-c"/>
        </div>
        <div className="wrap hero">
          <div className="hero-copy">
            <p className="hero-brand">GEOURA</p>
            <div className="eyebrow"><span className="eyebrow-square"/>{d.heroTop}</div>
            <h1>{d.heroA}<br/><em>{d.heroB}</em></h1>
            <p className="hero-intro">{d.heroText}</p>
            <div className="hero-engines" aria-label="Discovery surfaces">
              <span>Search</span>
              <span>ChatGPT</span>
              <span>Gemini</span>
              <span>Answer engines</span>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-solid" href={`/${locale}/plataforma`}>{d.cta}<ArrowUpRight size={19}/></Link>
              <Link className="btn btn-ghost" href={`/${locale}/artigos`}>{d.secondary}<ArrowRight size={18}/></Link>
            </div>
          </div>
          <Graphic locale={locale}/>
        </div>
      </section>

      <section className="marquee-bar">
        <div className="wrap marquee-inner">
          {locale==='pt'
            ?<><span>MAIS CLIQUES</span><span>✳</span><span>MAIS IMPRESSÕES</span><span>✳</span><span>MAIS MENÇÕES EM IA</span><span>✳</span><span>MAIS FATURAMENTO</span></>
            :<><span>MORE CLICKS</span><span>✳</span><span>MORE IMPRESSIONS</span><span>✳</span><span>MORE AI MENTIONS</span><span>✳</span><span>MORE REVENUE</span></>}
        </div>
      </section>

      <section className="section wrap method" id="method">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">01 / {d.preview}</span>
            <h2>{d.features}</h2>
            <p>{locale==='pt'
              ?'Busca tradicional, respostas generativas e motores de resposta formam um só mapa de descoberta. Entenda os três.'
              :'Traditional search, generative answers, and answer engines are one connected discovery landscape. Understand all three.'}</p>
          </div>
        </Reveal>
        <div className="features">
          <Reveal className="feature-card">
            <div className="feature-icon"><Search size={26}/></div>
            <span className="feature-num">01 — SEO</span>
            <h3>{locale==='pt'?'Encontrado quando buscam.':'Found when they search.'}</h3>
            <p>{locale==='pt'?'Base técnica, conteúdo com intenção e saúde de busca que sustentam crescimento.':'Build a reliable foundation of technical health, meaningful content and search intent.'}</p>
            <div className="feature-bottom">Search intelligence <ArrowUpRight size={17}/></div>
          </Reveal>
          <Reveal className="feature-card" delay={.1}>
            <div className="feature-icon"><Atom size={26}/></div>
            <span className="feature-num">02 — GEO</span>
            <h3>{locale==='pt'?'Citado quando a IA responde.':'Mentioned when AI answers.'}</h3>
            <p>{locale==='pt'?'Como a marca aparece em ChatGPT, Gemini e superfícies generativas.':'Explore how your brand is represented across ChatGPT, Gemini and generative discovery.'}</p>
            <div className="feature-bottom">AI visibility <ArrowUpRight size={17}/></div>
          </Reveal>
          <Reveal className="feature-card" delay={.2}>
            <div className="feature-icon"><MessageSquareMore size={26}/></div>
            <span className="feature-num">03 — AEO</span>
            <h3>{locale==='pt'?'Claro quando perguntam.':'Clear when they ask.'}</h3>
            <p>{locale==='pt'?'Respostas úteis e precisas, feitas primeiro para pessoas.':'Turn complex questions into precise, useful answers built for humans first.'}</p>
            <div className="feature-bottom">Answer intelligence <ArrowUpRight size={17}/></div>
          </Reveal>
        </div>
      </section>

      <GrowthProjection locale={locale}/>

      <section className="section wrap journal-preview">
        <div className="split-title">
          <Reveal>
            <span className="eyebrow">03 / {d.featured}</span>
            <h2>{locale==='pt'?<>Ideias que valem<br/><em>ser encontradas.</em></>:<>Ideas worth<br/><em>being found.</em></>}</h2>
          </Reveal>
          <Link className="outline-arrow" href={`/${locale}/artigos`}>{d.see}<ArrowUpRight size={18}/></Link>
        </div>
        <div className="editorial-grid">
          {featured.map((e,i)=>(
            <Link href={articleHref(e,locale)} className="editorial-card" key={e.slug}>
              <div className={`editorial-art art-${i}`}>
                <span>{e.area}</span>
                <span className="art-shape">{['◉','✳','↗'][i]}</span>
                <MoveUpRight size={23}/>
              </div>
              <div className="editorial-meta">{e.area} / FIELD NOTE <span>08 MIN READ</span></div>
              <h3>{e.query.replace(/\b\w/g,l=>l.toUpperCase())}</h3>
              <p>{locale==='pt'
                ?'Fundamentos, armadilhas comuns e perguntas práticas que valem a pena fazer.'
                :'Understand the fundamentals, common pitfalls, and practical questions worth asking.'}</p>
              <span className="read-link">Read the guide <ArrowUpRight size={16}/></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-section wrap cta-punch">
        <div className="cta-content">
          <span className="eyebrow">{locale==='pt'?'PRÓXIMO PASSO':'NEXT STEP'}</span>
          <h2>{d.ctaFinal}</h2>
          <p>{locale==='pt'
            ?'Mais gente no Google. Mais presença nas IAs. Mais oportunidades de venda — comece agora.'
            :'More people from Google. More presence in AI answers. More sales opportunities — start now.'}</p>
          <a
            href={`mailto:hello@geoura.com?subject=${encodeURIComponent(locale==='pt'?'Quero mais resultado orgânico':'I want more organic results')}`}
            className="btn btn-light btn-pulse"
          >
            {d.ctaFinalBtn}<ArrowUpRight size={18}/>
          </a>
          <div className="cta-proof-row">
            <span>{locale==='pt'?'+ tráfego orgânico':'+ organic traffic'}</span>
            <span>{locale==='pt'?'+ menções em IA':'+ AI mentions'}</span>
            <span>{locale==='pt'?'+ faturamento':'+ revenue'}</span>
          </div>
        </div>
        <div className="cta-orb"/>
      </section>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
    <Footer locale={locale}/>
  </>;
}
