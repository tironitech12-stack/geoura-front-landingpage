'use client';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowUpRight,TrendingUp,Bot,DollarSign} from 'lucide-react';
import type {Locale} from '@/lib/data';

const copy={
  en:{
    eyebrow:'RESULTS → REVENUE',
    title:'More people finding you. More pipeline. More revenue.',
    text:'Search Console shows the climb. AI answers decide who gets recommended. GeoAura connects both so organic discovery turns into business outcomes — not vanity rankings.',
    months:[
      {label:'Month 1',sub:'Baseline',clicks:'7',impr:'944',ctr:'0.7%',pos:'14.5'},
      {label:'Month 2',sub:'Projected',clicks:'28',impr:'3.8k',ctr:'0.9%',pos:'11.2'},
      {label:'Month 3',sub:'Projected',clicks:'75',impr:'9.5k',ctr:'1.3%',pos:'8.1'},
    ],
    lifts:[
      {label:'+907% impressions',detail:'From 944 → 9,500'},
      {label:'+971% clicks',detail:'From 7 → 75'},
    ],
    pillars:[
      {icon:'search',title:'Organic search traffic',text:'Clicks and impressions compounding in Search Console.'},
      {icon:'ai',title:'Cited in AI answers',text:'Presence across ChatGPT, Gemini and answer engines.'},
      {icon:'money',title:'Revenue outcomes',text:'Visits that feed leads, sales and recurring revenue.'},
    ],
    cta:'I want more organic revenue',
    ctaSub:'Request early access — we\'ll map your search + AI gaps',
    disclaimer:'Illustrative projection based on a growth pattern like Search Console — not a guaranteed result.'
  },
  pt:{
    eyebrow:'RESULTADOS → FATURAMENTO',
    title:'Mais gente te encontrando. Mais pipeline. Mais faturamento.',
    text:'O Search Console mostra a subida. As respostas de IA decidem quem é recomendado. A GeoAura une os dois para a descoberta orgânica virar resultado de negócio — não só ranking.',
    months:[
      {label:'Mês 1',sub:'Atual',clicks:'7',impr:'944',ctr:'0,7%',pos:'14,5'},
      {label:'Mês 2',sub:'Projetado',clicks:'28',impr:'3,8 mil',ctr:'0,9%',pos:'11,2'},
      {label:'Mês 3',sub:'Projetado',clicks:'75',impr:'9,5 mil',ctr:'1,3%',pos:'8,1'},
    ],
    lifts:[
      {label:'+907% impressões',detail:'De 944 → 9.500'},
      {label:'+971% cliques',detail:'De 7 → 75'},
    ],
    pillars:[
      {icon:'search',title:'Tráfego orgânico',text:'Cliques e impressões crescendo no Search Console.'},
      {icon:'ai',title:'Citado nas IAs',text:'Presença em ChatGPT, Gemini e motores de resposta.'},
      {icon:'money',title:'Receita no fim',text:'Visitas que viram leads, vendas e faturamento.'},
    ],
    cta:'Quero mais faturamento orgânico',
    ctaSub:'Solicite acesso antecipado — mapeamos suas lacunas de busca + IA',
    disclaimer:'Projeção ilustrativa no padrão de crescimento do Search Console — não é garantia de resultado.'
  }
};

export default function ResultsCta({locale}:{locale:Locale}){
  const t=copy[locale]||copy.en;
  const reduce=useReducedMotion();
  const icons={search:TrendingUp,ai:Bot,money:DollarSign};

  return (
    <section className="results-band" id="resultados">
      <div className="wrap results-inner">
        <div className="results-copy">
          <span className="eyebrow"><span className="eyebrow-square"/>{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
          <div className="results-pillars">
            {t.pillars.map(p=>{
              const Icon=icons[p.icon as keyof typeof icons];
              return (
                <div key={p.title} className="results-pillar">
                  <Icon size={20}/>
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="projection-board"
          initial={reduce?false:{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.25}}
          transition={{duration:.7}}
        >
          <div className="projection-head">
            <strong>{locale==='pt'?'Projeção 3 meses':'3-month projection'}</strong>
            <span>{locale==='pt'?'Base Search Console':'Search Console–based'}</span>
          </div>
          <div className="projection-months">
            {t.months.map((m,i)=>(
              <div key={m.label} className={`proj-month ${i===2?'proj-hot':''}`}>
                <header>
                  <span>{m.label}</span>
                  <small>{m.sub}</small>
                </header>
                <dl>
                  <div><dt>{locale==='pt'?'Cliques':'Clicks'}</dt><dd>{m.clicks}</dd></div>
                  <div><dt>{locale==='pt'?'Impressões':'Impressions'}</dt><dd>{m.impr}</dd></div>
                  <div><dt>CTR</dt><dd>{m.ctr}</dd></div>
                  <div><dt>{locale==='pt'?'Posição':'Position'}</dt><dd>{m.pos}</dd></div>
                </dl>
              </div>
            ))}
          </div>
          <div className="projection-lifts">
            {t.lifts.map(l=>(
              <div key={l.label}>
                <strong>{l.label}</strong>
                <span>{l.detail}</span>
              </div>
            ))}
          </div>
          <p className="projection-note">{t.disclaimer}</p>
        </motion.div>
      </div>

      <div className="wrap results-cta-bar">
        <div>
          <h3>{locale==='pt'?'Pare de depender só de anúncio. Escale o orgânico.':'Stop leaning only on ads. Scale organic.'}</h3>
          <p>{t.ctaSub}</p>
        </div>
        <a
          href="mailto:hello@geoaura.com?subject=GeoAura%20-%20mais%20faturamento%20organico"
          className="btn btn-solid btn-cta-pop"
        >
          {t.cta}
          <ArrowUpRight size={20}/>
        </a>
      </div>
    </section>
  );
}
