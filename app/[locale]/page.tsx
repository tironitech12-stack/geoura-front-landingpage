import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Graphic from '@/components/graphic';
import GrowthProjection from '@/components/growth-projection';
import {Reveal} from '@/components/reveal';
import DomainCapture from '@/components/landing/domain-capture';
import FaqSection from '@/components/landing/faq';
import AnalyticsBeacon from '@/components/landing/analytics-beacon';
import {getLanguage,baseUrl} from '@/lib/data';
import {tLanding} from '@/lib/landing-copy';
import {languageAlternates,absoluteUrl,defaultOgImage,organizationJsonLd,htmlLang} from '@/lib/seo';
import {ArrowRight,ArrowUpRight,Search,Atom,MessageSquareMore} from 'lucide-react';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'
    ?'GEOura — Visibilidade em busca e respostas de IA'
    :'GEOura — AI search visibility across SEO, GEO & AEO';
  const description=locale==='pt'
    ?'Entenda como sua marca aparece no Google e em buscas com IA. Descubra oportunidades, priorize melhorias e cresça demanda orgânica — sem depender só de anúncios.'
    :'Understand how visible your business is across Google and AI-powered search. Discover opportunities, prioritize improvements, and grow organic demand.';
  return {
    title:{absolute:title},
    description,
    alternates:{canonical:`/${locale}`,languages:languageAlternates('')},
    openGraph:{
      title,
      description,
      url:absoluteUrl(`/${locale}`),
      type:'website',
      locale:locale==='pt'?'pt_BR':'en_US',
      images:[defaultOgImage()]
    }
  };
}

export default async function Home({params}:{params:Promise<{locale:string}>}){
  const locale=getLanguage((await params).locale);
  const L=tLanding(locale);

  const jsonLd={
    '@context':'https://schema.org',
    '@graph':[
      organizationJsonLd(),
      {
        '@type':'WebSite',
        name:'GEOura',
        url:baseUrl,
        inLanguage:htmlLang(locale),
        publisher:{'@id':`${baseUrl}/#organization`},
        potentialAction:{
          '@type':'SearchAction',
          target:{'@type':'EntryPoint',urlTemplate:`${baseUrl}/${locale}/artigos?q={search_term_string}`},
          'query-input':'required name=search_term_string'
        }
      },
      {
        '@type':'SoftwareApplication',
        name:'GEOura',
        applicationCategory:'BusinessApplication',
        operatingSystem:'Web',
        description:L.hero.sub,
        offers:{
          '@type':'Offer',
          price:'0',
          priceCurrency:'USD',
          availability:'https://schema.org/PreOrder',
          description:'Early access waitlist — analysis features in development'
        }
      }
    ]
  };

  return (
    <>
      <AnalyticsBeacon page="home"/>
      <Navigation locale={locale}/>
      <main>
        <section className="hero-stage">
          <div className="hero-atmosphere" aria-hidden>
            <span className="atm atm-a"/><span className="atm atm-b"/><span className="atm atm-c"/>
          </div>
          <div className="wrap hero hero-v2">
            <div className="hero-copy">
              <p className="hero-brand">{L.hero.brand}</p>
              <div className="eyebrow"><span className="eyebrow-square"/>{L.hero.badge}</div>
              <h1>{L.hero.h1}</h1>
              <p className="hero-intro">{L.hero.sub}</p>
              <DomainCapture locale={locale}/>
              <div className="hero-actions">
                <Link className="btn btn-ghost" href={`/${locale}/plataforma`}>
                  {L.hero.secondary}<ArrowRight size={18}/>
                </Link>
              </div>
              <p className="hero-trust">{L.hero.trust}</p>
            </div>
            <div className="hero-visual">
              <span className="preview-chip">{L.preview.badge}</span>
              <Graphic locale={locale}/>
            </div>
          </div>
        </section>

        <section className="section wrap problem-section" id="problem">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{L.problem.eyebrow}</span>
              <h2>{L.problem.title}</h2>
              <p>{L.problem.text}</p>
            </div>
          </Reveal>
          <div className="problem-grid">
            {L.problem.cards.map((c,i)=>(
              <Reveal key={c.title} className="problem-card" delay={i*.08}>
                <span className="problem-num">0{i+1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section wrap method" id="how">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{L.how.eyebrow}</span>
              <h2>{L.how.title}</h2>
              <p>{L.how.text}</p>
            </div>
          </Reveal>
          <div className="how-grid">
            {L.how.steps.map((s,i)=>(
              <Reveal key={s.n} className="how-card" delay={i*.06}>
                <span className="how-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section wrap features-section" id="features">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{L.features.eyebrow}</span>
              <h2>{L.features.title}</h2>
              <p>{L.features.text}</p>
            </div>
          </Reveal>
          <div className="features pillars">
            {L.features.pillars.map((p,i)=>{
              const Icon=[Search,Atom,MessageSquareMore][i];
              return (
                <Reveal key={p.area} className="feature-card pillar-card" delay={i*.08}>
                  <div className="feature-icon"><Icon size={26}/></div>
                  <span className="feature-num">{p.area}</span>
                  <h3>{p.title}</h3>
                  <ul className="pillar-list">
                    {p.items.map(item=><li key={item}>{item}</li>)}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section wrap preview-section" id="preview">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{L.preview.eyebrow}</span>
              <h2>{L.preview.title}</h2>
              <p>{L.preview.text}</p>
            </div>
          </Reveal>
        </section>

        <GrowthProjection locale={locale} evidenceCopy={L.evidence}/>

        <section className="section wrap differentiate-section" id="why">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{L.differentiate.eyebrow}</span>
              <h2>{L.differentiate.title}</h2>
              <p>{L.differentiate.text}</p>
            </div>
          </Reveal>
          <div className="diff-grid">
            {L.differentiate.points.map((p,i)=>(
              <Reveal key={p.title} className="diff-card" delay={i*.08}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <FaqSection locale={locale}/>

        <section className="cta-section wrap cta-punch" id="final-cta">
          <div className="cta-content">
            <span className="eyebrow">{locale==='pt'?'PRÓXIMO PASSO':'NEXT STEP'}</span>
            <h2>{L.finalCta.title}</h2>
            <p>{L.finalCta.text}</p>
            <DomainCapture locale={locale} compact id="final-domain-capture"/>
            <div className="hero-actions" style={{justifyContent:'center',marginTop:18}}>
              <Link className="btn btn-ghost" href={`/${locale}/artigos`} style={{color:'#f7f5f0',borderColor:'rgba(247,245,240,.35)'}}>
                {L.finalCta.secondary}<ArrowUpRight size={18}/>
              </Link>
            </div>
          </div>
          <div className="cta-orb"/>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
      <Footer locale={locale}/>
    </>
  );
}
