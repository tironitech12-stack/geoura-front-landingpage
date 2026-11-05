import '../globals.css';
import type {ReactNode} from 'react';
import {getLanguage} from '@/lib/data';
import {htmlLang} from '@/lib/seo';

export default async function LocaleLayout({
  children,
  params
}:{
  children:ReactNode;
  params:Promise<{locale:string}>;
}){
  const locale=getLanguage((await params).locale);
  return (
    <html lang={htmlLang(locale)}>
      <body>{children}</body>
    </html>
  );
}
