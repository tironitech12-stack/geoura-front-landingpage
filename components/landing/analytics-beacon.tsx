'use client';
import {useEffect} from 'react';
import {track} from '@/lib/analytics';

export default function AnalyticsBeacon({page}:{page:string}){
  useEffect(()=>{track('landing_view',{page});},[page]);
  return null;
}
