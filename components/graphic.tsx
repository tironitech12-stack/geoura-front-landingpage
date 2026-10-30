'use client';
import {motion,useReducedMotion} from 'framer-motion';
import type {Locale} from '@/lib/data';

/** Illustrative Search Console–style curve (normalized 0–100). */
const clicksPath='M0,92 C18,90 28,88 40,78 C55,64 62,52 74,34 C86,16 94,10 100,6';
const imprPath='M0,96 C20,93 32,86 46,70 C60,52 70,38 82,22 C92,10 97,6 100,4';

const copy={
  en:{
    kicker:'Search Console + AI',
    live:'Illustrative sample',
    title:'Organic growth that compounds',
    note:'Demo metrics inspired by Search Console — not a live client account.',
    cards:[
      {key:'clicks',label:'Total clicks',value:'8.4k',tone:'clicks'},
      {key:'impr',label:'Total impressions',value:'412k',tone:'impr'},
      {key:'ctr',label:'Avg. CTR',value:'2.0%',tone:'ctr'},
      {key:'pos',label:'Avg. position',value:'9.2',tone:'pos'},
    ],
    chartLabel:'Clicks & impressions over 12 months',
    aiTitle:'AI answer presence',
    aiRows:[
      {engine:'ChatGPT',score:71},
      {engine:'Gemini',score:64},
      {engine:'Answer engines',score:58},
    ],
    revenue:'Projected path → more visits → more pipeline → more revenue'
  },
  pt:{
    kicker:'Search Console + IA',
    live:'Amostra ilustrativa',
    title:'Crescimento orgânico que acelera',
    note:'Métricas de demonstração no estilo Search Console — não são de uma conta real.',
    cards:[
      {key:'clicks',label:'Total de cliques',value:'8,4 mil',tone:'clicks'},
      {key:'impr',label:'Total de impressões',value:'412 mil',tone:'impr'},
      {key:'ctr',label:'CTR média',value:'2,0%',tone:'ctr'},
      {key:'pos',label:'Posição média',value:'9,2',tone:'pos'},
    ],
    chartLabel:'Cliques e impressões em 12 meses',
    aiTitle:'Presença em respostas de IA',
    aiRows:[
      {engine:'ChatGPT',score:71},
      {engine:'Gemini',score:64},
      {engine:'Motores de resposta',score:58},
    ],
    revenue:'Caminho projetado → mais visitas → mais pipeline → mais faturamento'
  }
};

export default function Graphic({locale='en'}:{locale?:Locale}){
  const reduce=useReducedMotion();
  const t=copy[locale]||copy.en;

  return (
    <div className="graphic" aria-label={t.title}>
      <div className="graphic-field" aria-hidden>
        <span className="orbit orbit-a"/>
        <span className="orbit orbit-b"/>
        <span className="orbit orbit-c"/>
        <motion.span
          className="field-glow"
          animate={reduce?undefined:{scale:[1,1.06,1],opacity:[.5,.82,.5]}}
          transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}
        />
      </div>

      <motion.div
        className="signal-stage gsc-stage"
        initial={reduce?false:{opacity:0,y:24,scale:.98}}
        animate={{opacity:1,y:0,scale:1}}
        transition={{duration:.85,ease:[.22,1,.36,1]}}
      >
        <div className="stage-top">
          <span className="stage-kicker">{t.kicker}</span>
          <span className="stage-live"><i/> {t.live}</span>
        </div>
        <h3 className="stage-title">{t.title}</h3>
        <p className="stage-note">{t.note}</p>

        <div className="gsc-cards">
          {t.cards.map((card,i)=>(
            <motion.div
              key={card.key}
              className={`gsc-card gsc-${card.tone}`}
              initial={reduce?false:{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              transition={{delay:.2+i*.06,duration:.45}}
            >
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </motion.div>
          ))}
        </div>

        <div className="gsc-chart" aria-hidden>
          <div className="gsc-chart-label">{t.chartLabel}</div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="gsc-svg">
            <defs>
              <linearGradient id="imprFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(191,123,84,.35)"/>
                <stop offset="100%" stopColor="rgba(191,123,84,0)"/>
              </linearGradient>
              <linearGradient id="clickFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(47,130,255,.35)"/>
                <stop offset="100%" stopColor="rgba(47,130,255,0)"/>
              </linearGradient>
            </defs>
            <path d={`${imprPath} L100,100 L0,100 Z`} fill="url(#imprFill)"/>
            <path d={`${clicksPath} L100,100 L0,100 Z`} fill="url(#clickFill)"/>
            <motion.path
              d={imprPath}
              fill="none"
              stroke="#bf7b54"
              strokeWidth="2.2"
              vectorEffect="non-scaling-stroke"
              initial={reduce?false:{pathLength:0}}
              animate={{pathLength:1}}
              transition={{duration:1.4,ease:'easeOut'}}
            />
            <motion.path
              d={clicksPath}
              fill="none"
              stroke="#2f82ff"
              strokeWidth="2.4"
              vectorEffect="non-scaling-stroke"
              initial={reduce?false:{pathLength:0}}
              animate={{pathLength:1}}
              transition={{duration:1.4,delay:.15,ease:'easeOut'}}
            />
          </svg>
          <div className="gsc-legend">
            <span><i className="leg-clicks"/> {locale==='pt'?'Cliques':'Clicks'}</span>
            <span><i className="leg-impr"/> {locale==='pt'?'Impressões':'Impressions'}</span>
          </div>
        </div>

        <div className="gsc-ai">
          <div className="gsc-ai-title">{t.aiTitle}</div>
          <ul className="stage-rows gsc-ai-rows">
            {t.aiRows.map((row,i)=>(
              <li key={row.engine}>
                <div className="row-label">{row.engine}</div>
                <div className="row-meter" aria-hidden>
                  <motion.span
                    className="fill fill-seo"
                    initial={reduce?false:{width:0}}
                    animate={{width:`${row.score}%`}}
                    transition={{delay:.7+i*.1,duration:.8,ease:[.22,1,.36,1]}}
                  />
                </div>
                <strong>{row.score}%</strong>
              </li>
            ))}
          </ul>
        </div>

        <p className="gsc-revenue">{t.revenue}</p>
      </motion.div>
    </div>
  );
}
