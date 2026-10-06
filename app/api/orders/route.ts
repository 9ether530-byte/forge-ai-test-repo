import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { orderSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';
export async function POST(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const key = forwarded || req.headers.get('x-real-ip') || 'unknown';
  if (!rateLimit(`orders:${key}`)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  const parsed = orderSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid order details', issues: parsed.error.flatten() }, { status: 400 });
  const order = await prisma.order.create({ data: { publicId: randomUUID().replaceAll('-', '').slice(0, 12), ...parsed.data } });
  return NextResponse.json({ publicId: order.publicId, status: order.status, amountCents: order.amountCents });
}
