// // app/query/route.ts

// app/query/route.ts
import sql from '../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error('DB Query Error:', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}

// import sql from '../lib/db';
// import postgres from 'postgres';

// // const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function listInvoices() {
// 	const data = await sql`
//     SELECT invoices.amount, customers.name
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE invoices.amount = 666;
//   `;

// 	return data;
// }

// export async function GET() {
//   return Response.json(result);
//   try {
//     return Response.json(await listInvoices());
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
