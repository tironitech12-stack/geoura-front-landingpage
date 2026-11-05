import {ImageResponse} from 'next/og';

export const size={width:180,height:180};
export const contentType='image/png';

export default function AppleIcon(){
  return new ImageResponse(
    (
      <div
        style={{
          width:'100%',
          height:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          background:'#111b18'
        }}
      >
        <div style={{display:'flex',gap:10,alignItems:'flex-end',height:110}}>
          <div style={{width:18,height:100,background:'#d6e6cd',borderRadius:9}}/>
          <div style={{width:18,height:78,background:'#d6e6cd',borderRadius:9}}/>
          <div style={{width:18,height:100,background:'#d6e6cd',borderRadius:9}}/>
        </div>
      </div>
    ),
    {...size}
  );
}
