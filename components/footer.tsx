import Brand from './brand';
import Link from 'next/link';
import LangSwitch from './lang-switch';
import {type Locale} from '@/lib/data';
import {tLanding} from '@/lib/landing-copy';
import {ArrowUpRight} from 'lucide-react';

export default function Footer({locale}:{locale:Locale}){
  const t=tLanding(locale).footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Brand locale={locale} light/>
            <p>{t.blurb}</p>
          </div>
          <a href="mailto:hello@geoura.com" className="footer-big">
            {t.talk} <ArrowUpRight size={33}/>
          </a>
        </div>
        <div className="footer-grid">
          <div>
            <strong>{t.platform}</strong>
            <Link href={`/${locale}/plataforma`}>{t.platform}</Link>
            <Link href={`/${locale}#how`}>{locale==='pt'?'Como funciona':'How it works'}</Link>
            <Link href={`/${locale}#features`}>{locale==='pt'?'Recursos':'Features'}</Link>
          </div>
          <div>
            <strong>{t.resources}</strong>
            <Link href={`/${locale}/artigos`}>{locale==='pt'?'Journal':'Journal'}</Link>
            <Link href={`/${locale}/sobre`}>{t.about}</Link>
            <a href="mailto:hello@geoura.com">{t.contact}</a>
          </div>
          <div>
            <strong>{locale==='pt'?'Legal':'Legal'}</strong>
            <Link href={`/${locale}/privacy`}>{t.privacy}</Link>
            <Link href={`/${locale}/terms`}>{t.terms}</Link>
            <LangSwitch locale={locale}/>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GEOura. {t.rights}</span>
          <div>
            <Link href={`/${locale}/artigos`}>{locale==='pt'?'Conteúdo':'Resources'}</Link>
            <Link href={`/${locale}/plataforma`}>{t.platform}</Link>
            <a href="mailto:hello@geoura.com">{t.contact}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
