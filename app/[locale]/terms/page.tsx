import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {getLanguage} from '@/lib/data';
import {languageAlternates,absoluteUrl} from '@/lib/seo';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const locale=getLanguage((await params).locale);
  const title=locale==='pt'?'Termos de Serviço':'Terms of Service';
  return {
    title,
    description:locale==='pt'
      ?'Termos de uso do site de marketing e lista de early access da GEOura.'
      :'Terms of use for the GEOura marketing site and early-access list.',
    alternates:{canonical:`/${locale}/terms`,languages:languageAlternates('/terms')},
    openGraph:{title,url:absoluteUrl(`/${locale}/terms`),type:'website'}
  };
}

export default async function Terms({params}:{params:Promise<{locale:string}>}){
  const locale=getLanguage((await params).locale);
  const pt=locale==='pt';
  return (
    <>
      <Navigation locale={locale}/>
      <main className="legal-page wrap">
        <h1>{pt?'Termos de Serviço':'Terms of Service'}</h1>
        <p>{pt?'Última atualização: 5 de novembro de 2026.':'Last updated: November 5, 2026.'}</p>
        <h2>{pt?'Natureza do serviço':'Nature of the service'}</h2>
        <p>{pt
          ?'Este site apresenta a GEOura e conteúdo editorial. Recursos de análise ao vivo podem estar indisponíveis. Métricas e interfaces marcadas como ilustrativas ou prévia não são resultados de clientes.'
          :'This website presents GEOura and editorial content. Live analysis features may be unavailable. Metrics and interfaces labeled illustrative or preview are not customer results.'}</p>
        <h2>{pt?'Sem garantias de ranking ou citações':'No ranking or citation guarantees'}</h2>
        <p>{pt
          ?'A GEOura não garante posições em buscadores nem citações em sistemas de IA.'
          :'GEOura does not guarantee search rankings or citations in AI systems.'}</p>
        <h2>{pt?'Early access':'Early access'}</h2>
        <p>{pt
          ?'Enviar um domínio registra interesse. Não cria uma conta paga nem dispara auditoria automática neste momento.'
          :'Submitting a domain registers interest. It does not create a paid account or trigger an automated audit at this time.'}</p>
        <h2>{pt?'Contato':'Contact'}</h2>
        <p><a href="mailto:hello@geoura.com">hello@geoura.com</a></p>
      </main>
      <Footer locale={locale}/>
    </>
  );
}
