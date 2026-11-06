'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {swapLocalePath,type Locale} from '@/lib/data';
import {track} from '@/lib/analytics';

export default function LangSwitch({locale}:{locale:Locale}){
  const pathname=usePathname()||`/${locale}`;
  const next=locale==='en'?'pt':'en';
  const href=swapLocalePath(pathname,next);
  return (
    <Link
      href={href}
      aria-label="Switch language"
      className="lang"
      hrefLang={next==='pt'?'pt-BR':'en'}
      onClick={()=>track('language_changed',{from:locale,to:next})}
    >
      {locale==='en'?'PT':'EN'}
    </Link>
  );
}
