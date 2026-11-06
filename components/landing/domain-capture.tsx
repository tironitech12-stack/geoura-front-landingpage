'use client';
import {FormEvent,useRef,useState} from 'react';
import {ArrowUpRight,Loader2} from 'lucide-react';
import type {Locale} from '@/lib/data';
import {tLanding} from '@/lib/landing-copy';
import {validateDomainInput} from '@/lib/domain';
import {track} from '@/lib/analytics';

type Status='idle'|'loading'|'success'|'error';

export default function DomainCapture({
  locale,
  compact=false,
  id='domain-capture'
}:{locale:Locale;compact?:boolean;id?:string}){
  const t=tLanding(locale).hero;
  const [value,setValue]=useState('');
  const [status,setStatus]=useState<Status>('idle');
  const [message,setMessage]=useState('');
  const started=useRef(false);
  const lastSubmit=useRef(0);

  async function onSubmit(e:FormEvent){
    e.preventDefault();
    const now=Date.now();
    if(now-lastSubmit.current<2500)return;
    lastSubmit.current=now;

    const check=validateDomainInput(value);
    if(!check.ok){
      track('domain_validation_error',{reason:check.error});
      setStatus('error');
      setMessage(
        check.error==='empty'?t.domainEmpty:
        check.error==='blocked'?t.domainBlocked:
        t.domainInvalid
      );
      return;
    }

    track('domain_submit',{hostname:check.hostname});
    track('hero_cta_click',{source:compact?'final':'hero'});
    setStatus('loading');
    setMessage('');

    try{
      const res=await fetch('/api/interest',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({domain:check.normalized,locale})
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok||!data.ok){
        track('analysis_failed',{status:res.status});
        setStatus('error');
        setMessage(t.domainError);
        return;
      }
      track('waitlist_success',{hostname:check.hostname});
      track('signup_completed',{mode:'waitlist'});
      setStatus('success');
      setMessage(t.domainSuccessBody);
      setValue(check.hostname);
    }catch{
      track('analysis_failed',{reason:'network'});
      setStatus('error');
      setMessage(t.domainError);
    }
  }

  return (
    <div className={`domain-capture${compact?' compact':''}`} id={id}>
      <form className="domain-form" onSubmit={onSubmit} noValidate>
        <label className="sr-only" htmlFor={`${id}-input`}>{t.domainLabel}</label>
        <div className="domain-row">
          <input
            id={`${id}-input`}
            name="domain"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder={t.domainPlaceholder}
            value={value}
            disabled={status==='loading'||status==='success'}
            onChange={e=>{
              setValue(e.target.value);
              if(status==='error'){setStatus('idle');setMessage('');}
              if(!started.current){started.current=true;track('domain_input_started');}
            }}
            aria-invalid={status==='error'}
            aria-describedby={`${id}-hint ${id}-msg`}
          />
          <button type="submit" className="btn btn-solid" disabled={status==='loading'||status==='success'}>
            {status==='loading'?(<><Loader2 className="spin" size={18}/>{t.domainSubmitting}</>):(<>{t.primary}<ArrowUpRight size={18}/></>)}
          </button>
        </div>
      </form>
      <p id={`${id}-hint`} className="domain-hint">{t.domainHint}</p>
      <div id={`${id}-msg`} className={`domain-msg ${status}`} role={status==='error'?'alert':'status'} aria-live="polite">
        {status==='success'&&<strong>{t.domainSuccessTitle}</strong>}
        {message&&<span>{message}</span>}
      </div>
    </div>
  );
}
