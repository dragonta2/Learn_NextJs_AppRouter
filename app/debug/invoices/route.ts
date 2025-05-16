// app/debug/invoices/route.ts

import sql from '../../lib/db'; // または '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await sql`SELECT * FROM invoices`;
  return NextResponse.json(result);
}
