export type AnalyticsEvent=
  |'landing_view'
  |'hero_cta_click'
  |'domain_input_started'
  |'domain_submit'
  |'domain_validation_error'
  |'analysis_started'
  |'analysis_completed'
  |'analysis_failed'
  |'signup_started'
  |'signup_completed'
  |'pricing_viewed'
  |'article_cta_click'
  |'language_changed'
  |'nav_click'
  |'faq_open'
  |'waitlist_success';

type Payload=Record<string,string|number|boolean|undefined>;

declare global{
  interface Window{
    dataLayer?:unknown[];
    gtag?:(...args:unknown[])=>void;
    posthog?:{capture:(event:string,props?:Payload)=>void};
  }
}

/** Fire product analytics without PII. Safe no-op when no provider is configured. */
export function track(event:AnalyticsEvent,payload:Payload={}){
  if(typeof window==='undefined')return;
  const props={...payload,ts:Date.now()};
  try{
    window.dataLayer?.push({event,...props});
    window.gtag?.('event',event,props);
    window.posthog?.capture(event,props);
    if(process.env.NODE_ENV==='development'){
      // eslint-disable-next-line no-console
      console.debug('[analytics]',event,props);
    }
  }catch{
    /* ignore provider errors */
  }
}
