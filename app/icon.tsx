import {ImageResponse} from 'next/og';

export const size={width:512,height:512};
export const contentType='image/png';

export default function Icon(){
  return new ImageResponse(
    (
      <div
        style={{
          width:'100%',
          height:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          background:'#111b18',
          borderRadius:96
        }}
      >
        <div style={{display:'flex',gap:22,alignItems:'flex-end',height:280}}>
          <div style={{width:48,height:260,background:'#d6e6cd',borderRadius:24}}/>
          <div style={{width:48,height:200,background:'#d6e6cd',borderRadius:24}}/>
          <div style={{width:48,height:260,background:'#d6e6cd',borderRadius:24}}/>
        </div>
      </div>
    ),
    {...size}
  );
}
