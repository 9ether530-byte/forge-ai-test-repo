import { prisma } from '@/lib/prisma';
export async function GET(_: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const order = await prisma.order.findUnique({ where: { publicId }, select: { publicId: true, status: true, businessName: true, amountCents: true, output: true } });
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
  return Response.json(order);
}
