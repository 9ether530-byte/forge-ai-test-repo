import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { intakeSchema } from '@/lib/validation';
export async function POST(req: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const order = await prisma.order.findUnique({ where: { publicId } });
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  if (order.status !== 'PAID') return NextResponse.json({ error: 'Payment must be confirmed before intake' }, { status: 409 });
  const parsed = intakeSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid intake', issues: parsed.error.flatten() }, { status: 400 });
  const updated = await prisma.order.update({ where: { id: order.id }, data: { intake: parsed.data, status: 'INTAKE_RECEIVED', auditLogs: { create: { action: 'INTAKE_RECEIVED' } } } });
  return NextResponse.json({ publicId: updated.publicId, status: updated.status });
}
