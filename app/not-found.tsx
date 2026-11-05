import Link from 'next/link';
import './globals.css';

export default function NotFound(){
  return (
    <html lang="en">
      <body>
        <main style={{minHeight:'100vh',display:'grid',placeContent:'center',textAlign:'center',gap:16,padding:24}}>
          <h1>404 / Lost in discovery.</h1>
          <p>This page is not in the index.</p>
          <Link href="/en">Return home</Link>
        </main>
      </body>
    </html>
  );
}
