'use client';
import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import type {Locale} from '@/lib/data';
import {tLanding} from '@/lib/landing-copy';
import {track} from '@/lib/analytics';
import {baseUrl} from '@/lib/data';
import {htmlLang} from '@/lib/seo';

export default function FaqSection({locale}:{locale:Locale}){
  const t=tLanding(locale).faq;
  const [open,setOpen]=useState<number|null>(0);

  const jsonLd={
    '@context':'https://schema.org',
    '@type':'FAQPage',
    inLanguage:htmlLang(locale),
    mainEntity:t.items.map(item=>({
      '@type':'Question',
      name:item.q,
      acceptedAnswer:{'@type':'Answer',text:item.a}
    })),
    url:`${baseUrl}/${locale}#faq`
  };

  return (
    <section className="section wrap faq-section" id="faq">
      <Reveal>
        <div className="section-head">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
        </div>
      </Reveal>
      <div className="faq-list">
        {t.items.map((item,i)=>{
          const isOpen=open===i;
          return (
            <div className={`faq-item${isOpen?' open':''}`} key={item.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={()=>{
                  const next=isOpen?null:i;
                  setOpen(next);
                  if(next!==null)track('faq_open',{index:i});
                }}
              >
                <span>{item.q}</span>
                <ChevronDown size={18} aria-hidden/>
              </button>
              <div className="faq-a" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
    </section>
  );
}
