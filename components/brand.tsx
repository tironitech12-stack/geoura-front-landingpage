import Link from 'next/link';

function LogoMark({light=false}:{light?:boolean}){
  return (
    <svg
      className="brand-mark"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={light?'#f7f5f0':'#1c1c1e'}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="5" y="4" width="2.5" height="16" rx="1"/>
      <rect x="10.75" y="7" width="2.5" height="16" rx="1"/>
      <rect x="16.5" y="4" width="2.5" height="16" rx="1"/>
    </svg>
  );
}

export default function Brand({locale='en',light=false}:{locale?:string,light?:boolean}){
  return (
    <Link href={`/${locale}`} aria-label="GeoAura home" className={'brand '+(light?'bright':'')}>
      <LogoMark light={light}/>
      <span className="brand-word">GEO<span className="brand-accent">AURA</span></span>
    </Link>
  );
}
