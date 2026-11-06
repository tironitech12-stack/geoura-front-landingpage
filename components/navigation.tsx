'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import Brand from './brand';
import LangSwitch from './lang-switch';
import {type Locale} from '@/lib/data';
import {tLanding} from '@/lib/landing-copy';
import {track} from '@/lib/analytics';
import {ArrowUpRight,Menu,X} from 'lucide-react';

export default function Navigation({locale}:{locale:Locale}){
  const t=tLanding(locale).nav;
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    document.body.style.overflow=open?'hidden':'';
    return ()=>{document.body.style.overflow='';};
  },[open]);

  const links=[
    {href:`/${locale}/plataforma`,label:t.platform,id:'platform'},
    {href:`/${locale}#how`,label:t.how,id:'how'},
    {href:`/${locale}#features`,label:t.features,id:'features'},
    {href:`/${locale}/artigos`,label:t.resources,id:'resources'},
    {href:`/${locale}/sobre`,label:t.about,id:'about'}
  ];

  function go(id:string){
    track('nav_click',{id});
    setOpen(false);
  }

  return (
    <header className="nav-shell">
      <div className="wrap navbar">
        <Brand locale={locale}/>
        <nav className="nav-links" aria-label="Primary">
          {links.map(l=>(
            <Link key={l.id} href={l.href} onClick={()=>go(l.id)}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-right">
          <LangSwitch locale={locale}/>
          <a href={`/${locale}#domain-capture`} className="top-cta" onClick={()=>track('hero_cta_click',{source:'nav'})}>
            {t.cta}<ArrowUpRight size={16}/>
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open?t.close:t.menu}
            onClick={()=>setOpen(v=>!v)}
          >
            {open?<X size={22}/>:<Menu size={22}/>}
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={`mobile-nav${open?' open':''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {links.map(l=>(
            <Link key={l.id} href={l.href} onClick={()=>go(l.id)}>{l.label}</Link>
          ))}
          <a href={`/${locale}#domain-capture`} className="btn btn-solid" onClick={()=>{track('hero_cta_click',{source:'mobile-nav'});setOpen(false);}}>
            {t.cta}<ArrowUpRight size={16}/>
          </a>
        </nav>
      </div>
    </header>
  );
}
