'use client';
import {Reveal} from './reveal';
import type {Locale} from '@/lib/data';
import {ArrowRight,TrendingUp} from 'lucide-react';

const data={
  en:{
    title:<>From visibility to <em>demand.</em></>,
    months:[
      {name:'Month 1 · baseline',clicks:'7',impr:'944',ctr:'0.7%',pos:'14.5',tone:'m1'},
      {name:'Month 2 · path',clicks:'28',impr:'3.8k',ctr:'0.9%',pos:'11.2',tone:'m2'},
      {name:'Month 3 · example',clicks:'75',impr:'9.5k',ctr:'1.3%',pos:'8.1',tone:'m3'},
    ],
    labels:{clicks:'Clicks',impr:'Impressions',ctr:'Avg. CTR',pos:'Avg. position'},
    lifts:[
      {label:'Impressions',value:'+907%',hint:'944 → 9,500 · ((9500−944)/944)'},
      {label:'Clicks',value:'+971%',hint:'7 → 75 · ((75−7)/7)'},
    ]
  },
  pt:{
    title:<>Da visibilidade à <em>demanda.</em></>,
    months:[
      {name:'Mês 1 · base',clicks:'7',impr:'944',ctr:'0,7%',pos:'14,5',tone:'m1'},
      {name:'Mês 2 · caminho',clicks:'28',impr:'3,8 mil',ctr:'0,9%',pos:'11,2',tone:'m2'},
      {name:'Mês 3 · exemplo',clicks:'75',impr:'9,5 mil',ctr:'1,3%',pos:'8,1',tone:'m3'},
    ],
    labels:{clicks:'Cliques',impr:'Impressões',ctr:'CTR média',pos:'Posição média'},
    lifts:[
      {label:'Impressões',value:'+907%',hint:'944 → 9.500 · ((9500−944)/944)'},
      {label:'Cliques',value:'+971%',hint:'7 → 75 · ((75−7)/7)'},
    ]
  }
};

type Evidence={eyebrow:string;title:string;text:string;disclaimer:string};

export default function GrowthProjection({locale,evidenceCopy}:{locale:Locale;evidenceCopy?:Evidence}){
  const t=data[locale];
  const head=evidenceCopy||{
    eyebrow:locale==='pt'?'Cenário exemplo':'Example scenario',
    title:'',
    text:locale==='pt'
      ?'Cenário ilustrativo matematicamente consistente — não é case real.'
      :'Mathematically consistent illustrative scenario — not a customer case.',
    disclaimer:locale==='pt'
      ?'Exemplo ilustrativo apenas. Não são resultados verificados.'
      :'Illustrative example only. Not verified results.'
  };

  return (
    <section className="growth-section" id="evidence" aria-label={head.eyebrow}>
      <div className="wrap">
        <Reveal>
          <div className="section-head growth-head">
            <span className="eyebrow">{head.eyebrow}</span>
            <h2>{evidenceCopy?head.title:t.title}</h2>
            <p>{head.text}</p>
          </div>
        </Reveal>

        <p className="preview-chip inline-chip">{locale==='pt'?'Demonstrativo · não é conta real':'Demonstrative · not a live account'}</p>

        <div className="growth-months">
          {t.months.map((m,i)=>(
            <Reveal key={m.name} className={`month-card ${m.tone}`} delay={i*.08}>
              <header>
                <TrendingUp size={18}/>
                <span>{m.name}</span>
              </header>
              <dl>
                <div><dt>{t.labels.clicks}</dt><dd className="v-clicks">{m.clicks}</dd></div>
                <div><dt>{t.labels.impr}</dt><dd className="v-impr">{m.impr}</dd></div>
                <div><dt>{t.labels.ctr}</dt><dd className="v-ctr">{m.ctr}</dd></div>
                <div><dt>{t.labels.pos}</dt><dd className="v-pos">{m.pos}</dd></div>
              </dl>
              {i<t.months.length-1&&<span className="month-arrow" aria-hidden><ArrowRight size={22}/></span>}
            </Reveal>
          ))}
        </div>

        <div className="growth-lifts">
          {t.lifts.map((l,i)=>(
            <Reveal key={l.label} className={`lift-card lift-${i}`} delay={.15+i*.08}>
              <span>{l.label}</span>
              <strong>{l.value}</strong>
              <small>{l.hint}</small>
            </Reveal>
          ))}
        </div>
        <p className="growth-disclaimer">{head.disclaimer}</p>
      </div>
    </section>
  );
}
