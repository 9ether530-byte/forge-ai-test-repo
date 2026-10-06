import { NextResponse } from 'next/server';
export default function middleware(req: Request) {
  const url = new URL(req.url);
  if (url.pathname.startsWith('/api/admin')) {
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || req.headers.get('authorization') !== `Bearer ${expected}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.next();
}
export const config = { matcher: ['/api/admin/:path*'] };
