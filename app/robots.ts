import type {MetadataRoute} from 'next';import {baseUrl} from '@/lib/data';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/drafts/']},sitemap:`${baseUrl}/sitemap.xml`}}
