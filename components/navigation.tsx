import Link from 'next/link';
import Brand from './brand';
import LangSwitch from './lang-switch';
import {copy,type Locale} from '@/lib/data';
import {ArrowUpRight} from 'lucide-react';

export default function Navigation({locale}:{locale:Locale}){
  const d=copy[locale];
  return (
    <header className="nav-shell">
      <div className="wrap navbar">
        <Brand locale={locale}/>
        <nav className="nav-links" aria-label="Primary">
          <Link href={`/${locale}/plataforma`}>{d.nav[0]}</Link>
          <Link href={`/${locale}/artigos`}>{d.nav[1]}</Link>
          <a href={`/${locale}#method`}>{d.nav[2]}</a>
        </nav>
        <div className="nav-right">
          <LangSwitch locale={locale}/>
          <a href="mailto:hello@geoura.com?subject=GEOura%20early%20access" className="top-cta">
            {d.pricing}<ArrowUpRight size={16}/>
          </a>
        </div>
      </div>
    </header>
  );
}
