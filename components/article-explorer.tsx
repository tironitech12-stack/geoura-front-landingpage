'use client';
import {useMemo} from 'react';
import Link from 'next/link';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';
import {Search,ArrowUpRight,ChevronLeft,ChevronRight} from 'lucide-react';
import {articleHref,type Topic,type Locale,copy} from '@/lib/data';

const LIMIT=24;

function buildHref(pathname:string,params:URLSearchParams){
  const qs=params.toString();
  return qs?`${pathname}?${qs}`:pathname;
}

export default function ArticleExplorer({
  topics,
  locale,
  initialQ='',
  initialArea='All',
  initialKind='All',
  initialPage=1
}:{
  topics:Topic[];
  locale:Locale;
  initialQ?:string;
  initialArea?:string;
  initialKind?:string;
  initialPage?:number;
}){
  const router=useRouter();
  const pathname=usePathname()||`/${locale}/artigos`;
  const searchParams=useSearchParams();

  const q=searchParams.get('q')??initialQ;
  const area=searchParams.get('area')??initialArea;
  const kind=searchParams.get('kind')??initialKind;
  const page=Math.max(1,Number(searchParams.get('page')??String(initialPage))||1);

  const filtered=useMemo(
    ()=>topics.filter(t=>
      (area==='All'||t.area===area)&&
      (kind==='All'||t.kind===kind)&&
      (!q||[t.query,t.cluster,t.area].join(' ').toLowerCase().includes(q.toLowerCase()))
    ),
    [topics,q,area,kind]
  );

  const max=Math.max(1,Math.ceil(filtered.length/LIMIT));
  const safePage=Math.min(page,max);
  const pageItems=filtered.slice((safePage-1)*LIMIT,safePage*LIMIT);

  function update(next:Record<string,string|null>){
    const params=new URLSearchParams(searchParams.toString());
    for(const [key,value] of Object.entries(next)){
      if(value===null||value===''||value==='All'||(key==='page'&&value==='1'))params.delete(key);
      else params.set(key,value);
    }
    router.replace(buildHref(pathname,params),{scroll:false});
  }

  function pageHref(target:number){
    const params=new URLSearchParams(searchParams.toString());
    if(target<=1)params.delete('page');
    else params.set('page',String(target));
    return buildHref(pathname,params);
  }

  return (
    <div className="explorer">
      <div className="explorer-bar">
        <label className="search-field">
          <Search size={20}/>
          <input
            value={q}
            onChange={e=>update({q:e.target.value,page:'1'})}
            placeholder={copy[locale].search}
          />
        </label>
        <div className="filter-group">
          {(['All','SEO','GEO','AEO'] as const).map(a=>(
            <button
              key={a}
              type="button"
              className={a===area?'active':''}
              onClick={()=>update({area:a,page:'1'})}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="second-filter">
        <span>{filtered.length.toLocaleString()} {locale==='pt'?'temas encontrados':'topics found'}</span>
        <div>
          {(['All','Palavra-chave','Pergunta'] as const).map(k=>(
            <button
              key={k}
              type="button"
              onClick={()=>update({kind:k,page:'1'})}
              className={kind===k?'active':''}
            >
              {k==='All'?'All':k==='Pergunta'?'Questions':'Keywords'}
            </button>
          ))}
        </div>
      </div>
      <div className="article-list">
        {pageItems.map(t=>(
          <Link href={articleHref(t,locale)} key={t.slug} className="article-row">
            <span className={`tag tag-${t.area.toLowerCase()}`}>{t.area}</span>
            <span className="row-main">
              <strong>{t.query}</strong>
              <small>{t.cluster} · {t.kind==='Pergunta'?(locale==='pt'?'Pergunta':'Question'):(locale==='pt'?'Palavra-chave':'Keyword')} · {locale==='pt'?'Rascunho':'Draft'}</small>
            </span>
            <ArrowUpRight size={21}/>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {safePage<=1?(
          <button type="button" disabled><ChevronLeft size={18}/> {locale==='pt'?'Anterior':'Previous'}</button>
        ):(
          <Link className="pagination-link" href={pageHref(safePage-1)}><ChevronLeft size={18}/> {locale==='pt'?'Anterior':'Previous'}</Link>
        )}
        <span>{safePage} / {max}</span>
        {safePage>=max?(
          <button type="button" disabled>{locale==='pt'?'Próxima':'Next'} <ChevronRight size={18}/></button>
        ):(
          <Link className="pagination-link" href={pageHref(safePage+1)}>{locale==='pt'?'Próxima':'Next'} <ChevronRight size={18}/></Link>
        )}
      </div>
    </div>
  );
}
