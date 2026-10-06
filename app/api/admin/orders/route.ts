import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() { const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, select: { publicId: true, status: true, businessName: true, contactName: true, email: true, amountCents: true, createdAt: true } }); return NextResponse.json(orders); }
