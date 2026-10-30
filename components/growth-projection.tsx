'use client';
import {Reveal} from './reveal';
import type {Locale} from '@/lib/data';
import {ArrowRight,TrendingUp} from 'lucide-react';

const data={
  en:{
    eyebrow:'02 / RESULTS THAT COMPOUND',
    title:<>From visibility to <em>revenue.</em></>,
    text:'Organic growth is not vanity metrics. More people finding you in Google and AI answers means more demand — and more sales opportunity.',
    months:[
      {name:'Month 1 · now',clicks:'7',impr:'944',ctr:'0.7%',pos:'14.5',tone:'m1'},
      {name:'Month 2 · path',clicks:'28',impr:'3.8k',ctr:'0.9%',pos:'11.2',tone:'m2'},
      {name:'Month 3 · target',clicks:'75',impr:'9.5k',ctr:'1.3%',pos:'8.1',tone:'m3'},
    ],
    labels:{clicks:'Clicks',impr:'Impressions',ctr:'Avg. CTR',pos:'Avg. position'},
    lifts:[
      {label:'Impressions',value:'+907%',hint:'944 → 9.5k'},
      {label:'Clicks',value:'+971%',hint:'7 → 75'},
    ],
    disclaimer:'Illustrative 3-month projection inspired by Search Console trajectories — not a guarantee.'
  },
  pt:{
    eyebrow:'02 / RESULTADOS QUE COMPÕEM',
    title:<>Da visibilidade para a <em>receita.</em></>,
    text:'Crescimento orgânico não é métrica de vaidade. Mais gente te encontrando no Google e nas respostas de IA significa mais demanda — e mais chance de faturar.',
    months:[
      {name:'Mês 1 · atual',clicks:'7',impr:'944',ctr:'0,7%',pos:'14,5',tone:'m1'},
      {name:'Mês 2 · trilha',clicks:'28',impr:'3,8 mil',ctr:'0,9%',pos:'11,2',tone:'m2'},
      {name:'Mês 3 · meta',clicks:'75',impr:'9,5 mil',ctr:'1,3%',pos:'8,1',tone:'m3'},
    ],
    labels:{clicks:'Cliques',impr:'Impressões',ctr:'CTR média',pos:'Posição média'},
    lifts:[
      {label:'Impressões',value:'+907%',hint:'944 → 9,5 mil'},
      {label:'Cliques',value:'+971%',hint:'7 → 75'},
    ],
    disclaimer:'Projeção ilustrativa de 3 meses no estilo Search Console — não é garantia de resultado.'
  }
};

export default function GrowthProjection({locale}:{locale:Locale}){
  const t=data[locale];
  return (
    <section className="growth-section">
      <div className="wrap">
        <Reveal>
          <div className="section-head growth-head">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2>{t.title}</h2>
            <p>{t.text}</p>
          </div>
        </Reveal>

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
        <p className="growth-disclaimer">{t.disclaimer}</p>
      </div>
    </section>
  );
}
