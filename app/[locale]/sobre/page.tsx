import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {getLanguage} from '@/lib/data';
import {languageAlternates,absoluteUrl} from '@/lib/seo';
import {ArrowUpRight} from 'lucide-react';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'?'Sobre a GEOura':'About GEOura';
  const description=locale==='pt'
    ?'A GEOura ajuda empresas a serem descobertas em busca e IA — unindo SEO, GEO e AEO.'
    :'GEOura helps businesses get discovered across search and AI — unifying SEO, GEO and AEO.';
  return {
    title,
    description,
    alternates:{canonical:`/${locale}/sobre`,languages:languageAlternates('/sobre')},
    openGraph:{title,description,url:absoluteUrl(`/${locale}/sobre`),type:'website'}
  };
}

export default async function About({params}:{params:Promise<{locale:string}>}){
  const locale=getLanguage((await params).locale);
  const pt=locale==='pt';
  return (
    <>
      <Navigation locale={locale}/>
      <main className="legal-page wrap">
        <span className="eyebrow">{pt?'SOBRE':'ABOUT'}</span>
        <h1>{pt?'Inteligência para crescimento orgânico.':'Intelligence for organic growth.'}</h1>
        <p>{pt
          ?'A GEOura é uma plataforma SaaS (em evolução) de inteligência e otimização de crescimento orgânico. Unificamos SEO (busca tradicional), GEO (mecanismos generativos) e AEO (motores de resposta) para ajudar times a descobrir oportunidades e priorizar ações — sem depender só de anúncios pagos.'
          :'GEOura is an evolving SaaS platform for organic growth intelligence. We unify SEO (traditional search), GEO (generative engines) and AEO (answer engines) so teams can spot opportunity and prioritize action — without depending only on paid ads.'}</p>
        <p>{pt
          ?'Este site é o canal de aquisição e o journal editorial. Análise automática de websites ainda não está operacional; o formulário de domínio registra interesse em early access.'
          :'This site is the acquisition channel and editorial journal. Automated website analysis is not operational yet; the domain form registers early-access interest.'}</p>
        <p>
          <Link className="btn btn-solid" href={`/${locale}#domain-capture`}>
            {pt?'Entrar na lista':'Join the list'}<ArrowUpRight size={16}/>
          </Link>
        </p>
      </main>
      <Footer locale={locale}/>
    </>
  );
}
