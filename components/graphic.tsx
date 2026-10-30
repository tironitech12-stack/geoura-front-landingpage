'use client';
import {motion,useReducedMotion} from 'framer-motion';
import type {Locale} from '@/lib/data';

const copy={
  en:{
    kicker:'Search Console · illustrative',
    live:'Growth path',
    title:'Organic traffic that compounds',
    note:'More impressions → more clicks → more people finding you in search and AI.',
    metrics:[
      {key:'clicks',label:'Total clicks',value:'8.4k',delta:'+312%',on:true,tone:'blue'},
      {key:'impr',label:'Impressions',value:'412k',delta:'+907%',on:true,tone:'violet'},
      {key:'ctr',label:'Avg. CTR',value:'2.0%',delta:'+0.7pp',on:false,tone:'neutral'},
      {key:'pos',label:'Avg. position',value:'9.2',delta:'↑ better',on:false,tone:'neutral'},
    ],
    chartLabel:'Daily performance',
    footer:'Illustrative curve based on Search Console-style growth — not a live account.',
    outcome:'Outcome',
    revenue:'More visitors. More AI mentions. More revenue.'
  },
  pt:{
    kicker:'Search Console · ilustrativo',
    live:'Crescimento',
    title:'Tráfego orgânico que cresce',
    note:'Mais impressões → mais cliques → mais gente te encontrando na busca e nas IAs.',
    metrics:[
      {key:'clicks',label:'Total de cliques',value:'8,4 mil',delta:'+312%',on:true,tone:'blue'},
      {key:'impr',label:'Impressões',value:'412 mil',delta:'+907%',on:true,tone:'violet'},
      {key:'ctr',label:'CTR média',value:'2,0%',delta:'+0,7pp',on:false,tone:'neutral'},
      {key:'pos',label:'Posição média',value:'9,2',delta:'↑ melhor',on:false,tone:'neutral'},
    ],
    chartLabel:'Desempenho diário',
    footer:'Curva ilustrativa no estilo Search Console — não é conta ao vivo.',
    outcome:'Resultado',
    revenue:'Mais visitas. Mais menções em IA. Mais faturamento.'
  }
};

/* Smooth upward path for SVG polyline (normalized 0–100) */
const clicks=[8,10,12,14,18,22,28,34,42,55,68,82,95];
const impre=[12,15,18,22,28,35,44,52,62,74,86,94,100];

function toPoints(values:number[],w:320,h:110,pad=8){
  const step=(w-pad*2)/(values.length-1);
  return values.map((v,i)=>{
    const x=pad+i*step;
    const y=h-pad-((v/100)*(h-pad*2));
    return `${x},${y}`;
  }).join(' ');
}

export default function Graphic({locale='en'}:{locale?:Locale}){
  const reduce=useReducedMotion();
  const t=copy[locale]||copy.en;
  const w=320,h=110;
  const clickPts=toPoints(clicks,w,h);
  const imprPts=toPoints(impre,w,h);

  return (
    <div className="graphic" aria-label={t.title}>
      <div className="graphic-field" aria-hidden>
        <span className="orbit orbit-a"/>
        <span className="orbit orbit-b"/>
        <span className="orbit orbit-c"/>
        <motion.span
          className="field-glow"
          animate={reduce?undefined:{scale:[1,1.08,1],opacity:[.55,.85,.55]}}
          transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}
        />
      </div>

      <motion.div
        className="signal-stage console-stage"
        initial={reduce?false:{opacity:0,y:28,scale:.97}}
        animate={{opacity:1,y:0,scale:1}}
        transition={{duration:.9,ease:[.22,1,.36,1]}}
      >
        <div className="stage-top">
          <span className="stage-kicker">{t.kicker}</span>
          <span className="stage-live"><i/> {t.live}</span>
        </div>
        <h3 className="stage-title">{t.title}</h3>
        <p className="stage-note">{t.note}</p>

        <div className="console-metrics">
          {t.metrics.map((m,i)=>(
            <motion.div
              key={m.key}
              className={`console-metric tone-${m.tone}${m.on?' is-on':''}`}
              initial={reduce?false:{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              transition={{delay:.25+i*.08,duration:.45}}
            >
              <span className="metric-check" aria-hidden>{m.on?'✓':''}</span>
              <span className="metric-label">{m.label}</span>
              <strong className="metric-value">{m.value}</strong>
              <em className="metric-delta">{m.delta}</em>
            </motion.div>
          ))}
        </div>

        <div className="console-chart">
          <div className="chart-head">
            <span>{t.chartLabel}</span>
            <span className="chart-legend">
              <i className="leg-clicks"/> Cliques
              <i className="leg-impr"/> Impressões
            </span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="growth-svg" role="img" aria-hidden>
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2f82ff" stopOpacity=".35"/>
                <stop offset="100%" stopColor="#2f82ff" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="fillImpr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bf7b54" stopOpacity=".32"/>
                <stop offset="100%" stopColor="#bf7b54" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0.25,0.5,0.75].map(p=>(
              <line key={p} x1="8" x2={w-8} y1={8+(h-16)*p} y2={8+(h-16)*p} className="chart-grid"/>
            ))}
            <motion.polyline
              fill="none"
              stroke="#bf7b54"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={imprPts}
              initial={reduce?false:{pathLength:0,opacity:0}}
              animate={{pathLength:1,opacity:1}}
              transition={{duration:1.4,delay:.4,ease:'easeOut'}}
            />
            <motion.polyline
              fill="none"
              stroke="#2f82ff"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={clickPts}
              initial={reduce?false:{pathLength:0,opacity:0}}
              animate={{pathLength:1,opacity:1}}
              transition={{duration:1.4,delay:.55,ease:'easeOut'}}
            />
          </svg>
          <p className="chart-foot">{t.footer}</p>
        </div>

        <div className="console-outcome">
          <span>{t.outcome}</span>
          <strong>{t.revenue}</strong>
        </div>
      </motion.div>
    </div>
  );
}
