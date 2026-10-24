export const dynamic = "force-static";
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'John Nguyen - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: '#f7f3e8', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: '#252823', letterSpacing: '-0.05em' }}>John Nguyen</div>
        <div style={{ fontSize: 32, color: '#62675e', marginTop: 24 }}>Software Builder & AI Researcher</div>
      </div>
    ),
    { ...size }
  );
}
