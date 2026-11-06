import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const LOCALES=new Set(['en','pt']);

export function middleware(req:NextRequest){
  const {pathname}=req.nextUrl;
  if(
    pathname.startsWith('/_next')||
    pathname.startsWith('/api')||
    pathname.startsWith('/icon')||
    pathname.startsWith('/apple-icon')||
    pathname.startsWith('/opengraph-image')||
    pathname.startsWith('/twitter-image')||
    pathname==='/robots.txt'||
    pathname==='/sitemap.xml'||
    pathname==='/manifest.webmanifest'||
    pathname.includes('.')
  ){
    return NextResponse.next();
  }

  if(pathname==='/'){
    const url=req.nextUrl.clone();
    url.pathname='/en';
    return NextResponse.redirect(url);
  }

  const seg=pathname.split('/')[1];
  if(seg&&!LOCALES.has(seg)){
    const url=req.nextUrl.clone();
    url.pathname='/en';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config={
  matcher:['/((?!_next/static|_next/image|favicon.ico).*)']
};
