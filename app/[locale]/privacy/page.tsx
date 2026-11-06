import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {getLanguage} from '@/lib/data';
import {languageAlternates,absoluteUrl} from '@/lib/seo';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'?'Política de Privacidade':'Privacy Policy';
  return {
    title,
    description:locale==='pt'
      ?'Como a GEOura trata dados neste site de marketing e lista de early access.'
      :'How GEOura handles data on this marketing site and early-access list.',
    alternates:{canonical:`/${locale}/privacy`,languages:languageAlternates('/privacy')},
    openGraph:{title,url:absoluteUrl(`/${locale}/privacy`),type:'website'}
  };
}

export default async function Privacy({params}:{params:Promise<{locale:string}>}){
  const locale=getLanguage((await params).locale);
  const pt=locale==='pt';
  return (
    <>
      <Navigation locale={locale}/>
      <main className="legal-page wrap">
        <h1>{pt?'Política de Privacidade':'Privacy Policy'}</h1>
        <p>{pt?'Última atualização: 5 de novembro de 2026.':'Last updated: November 5, 2026.'}</p>
        <h2>{pt?'Escopo':'Scope'}</h2>
        <p>{pt
          ?'Esta página descreve o tratamento de dados no site de marketing da GEOura. O produto de análise ainda está em desenvolvimento.'
          :'This page describes data handling for the GEOura marketing website. Analysis product features are still in development.'}</p>
        <h2>{pt?'Dados que podemos coletar':'Data we may collect'}</h2>
        <ul>
          <li>{pt?'Domínio do site enviado no formulário de interesse (hostname).':'Website domain submitted via the interest form (hostname).'}</li>
          <li>{pt?'Endereço de e-mail se você nos escrever (ex.: hello@geoura.com).':'Email address if you contact us (e.g. hello@geoura.com).'}</li>
          <li>{pt?'Dados técnicos básicos de uso (logs de servidor, analytics agregados se ativados).':'Basic technical usage data (server logs, aggregated analytics if enabled).'}</li>
        </ul>
        <h2>{pt?'Finalidade':'Purpose'}</h2>
        <p>{pt
          ?'Usamos essas informações para responder contatos, gerenciar a lista de early access e melhorar o site. Não rastreamos o domínio enviado a partir deste formulário.'
          :'We use this information to respond to inquiries, manage the early-access list, and improve the site. We do not crawl the submitted domain from this form.'}</p>
        <h2>{pt?'Contato':'Contact'}</h2>
        <p>{pt?'Dúvidas:':'Questions:'} <a href="mailto:hello@geoura.com">hello@geoura.com</a></p>
      </main>
      <Footer locale={locale}/>
    </>
  );
}
