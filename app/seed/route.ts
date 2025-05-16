// app/seed/route.ts
import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const revenues = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export async function GET() {
  // 本番では絶対に動かさない安全ブロック！
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { status: 'error', message: '🚫 Forbidden: Not allowed in production.' },
      { status: 403 }
    );
  }

  try {
    // 既存データを削除
    await sql`DELETE FROM revenue`;

    // 新しいデータを一括で挿入
    await sql`
      INSERT INTO revenue (month, revenue)
      VALUES ${sql(revenues.map(r => [r.month, r.revenue]))}
    `;

    return NextResponse.json({
      status: 'ok',
      message: '✅ revenueテーブルにシード完了！',
    });
  } catch (err: any) {
    console.error('❌ シードエラー:', err);
    return NextResponse.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  } finally {
    await sql.end(); // DBコネクション閉じる
  }
}
