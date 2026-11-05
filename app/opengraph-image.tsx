import {ImageResponse} from 'next/og';

export const alt='GEOura — AI search visibility across SEO, GEO and AEO';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function OpenGraphImage(){
  return new ImageResponse(
    (
      <div
        style={{
          width:'100%',
          height:'100%',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          padding:72,
          background:'linear-gradient(135deg, #111b18 0%, #1c2a24 55%, #24362c 100%)',
          color:'#f7f5f0',
          fontFamily:'Georgia, serif'
        }}
      >
        <div style={{display:'flex',alignItems:'center',gap:18}}>
          <div style={{display:'flex',gap:8,alignItems:'flex-end',height:42}}>
            <div style={{width:10,height:42,background:'#d6e6cd',borderRadius:6}}/>
            <div style={{width:10,height:32,background:'#d6e6cd',borderRadius:6}}/>
            <div style={{width:10,height:42,background:'#d6e6cd',borderRadius:6}}/>
          </div>
          <div style={{fontSize:34,letterSpacing:4,fontWeight:700}}>GEOURA</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:18,maxWidth:900}}>
          <div style={{fontSize:64,lineHeight:1.05,fontWeight:700}}>
            Become the answer in AI search.
          </div>
          <div style={{fontSize:28,lineHeight:1.35,color:'#c9d5c4',fontFamily:'system-ui, sans-serif'}}>
            Organic discovery intelligence across SEO, GEO and AEO.
          </div>
        </div>
        <div style={{display:'flex',gap:24,fontSize:20,color:'#d6e6cd',fontFamily:'system-ui, sans-serif',letterSpacing:1}}>
          <span>Search</span>
          <span>·</span>
          <span>ChatGPT</span>
          <span>·</span>
          <span>Gemini</span>
          <span>·</span>
          <span>Answer engines</span>
        </div>
      </div>
    ),
    {...size}
  );
}
