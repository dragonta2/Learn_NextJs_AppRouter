// app/dashboard/page.tsx

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

// データ取得非同期関数(fetchHoge）たちは、それぞれのコンポーネントへ移動

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          {/* 収益チャート */}
          {/* revenueプロップスには、PostgreSQLから取得したrevenuesテーブルのデータが渡される */}
          {/* 旧コード｜<RevenueChart revenues={revenues} /> */}
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}

// このファイルは、Next.jsのダッシュボードページを定義しています。
// ダッシュボードには、収益チャートや最新の請求書、カード形式で表示される収集済み、保留中、総請求書数、総顧客数の情報が含まれています。
// データは、`fetchRevenue`、`fetchLatestInvoices`、`fetchCardData`といった非同期関数を使用して取得されます。
// これらのデータをもとに、UIコンポーネントである`RevenueChart`や`LatestInvoices`、`Card`がレンダリングされます。

// `fetchRevenue`関数は、データベースから収益データを取得する非同期関数です。
// この関数は、`Revenue`型のデータを返します。データベースから収益データを取得し、
// そのデータをそのまま返すシンプルな構造になっています。
// エラーが発生した場合は、コンソールにエラーメッセージを出力し、
// 'Failed to fetch revenue data.'というエラーメッセージをスローします。

// `fetchLatestInvoices`関数は、最新の請求書データを取得する非同期関数です。
// データベースから請求書と関連する顧客情報を結合して取得し、
// 最新の5件の請求書を返します。取得したデータは、`LatestInvoiceRaw`型から
// `LatestInvoice`型に変換され、金額は`formatCurrency`関数を使ってフォーマットされます。
// エラーが発生した場合は、コンソールにエラーメッセージを出力し、
// 'Failed to fetch the latest invoices.'というエラーメッセージをスローします。

// `fetchCardData`関数は、ダッシュボードのカードに表示するデータを取得する非同期関数です。
// この関数は、請求書の総数、顧客の総数、支払い済みの請求書の合計金額、
// 保留中の請求書の合計金額を取得します。これらのデータは、
// 複数のSQLクエリを並行して実行することで取得され、
// `Promise.all`を使って結果をまとめて処理します。
// 取得した金額データは`formatCurrency`関数でフォーマットされ、
// エラーが発生した場合は、コンソールにエラーメッセージを出力し、
// 'Failed to fetch card data.'というエラーメッセージをスローします。

// RevenueChartコンポーネントは、収益データを視覚的に表示するためのものです。
// このコンポーネントは、過去12か月間の収益を棒グラフとして描画します。
// 各月の収益は、棒の高さで表され、収益額に比例します。
// Y軸には収益の目盛りが表示され、X軸には各月の名前が表示されます。
// データがない場合は、「データがありません」というメッセージが表示されます。
// `revenue`はこのコンポーネントに渡されるpropsで、収益データを含む配列です。


// `Suspense`コンポーネントは、Reactの非同期レンダリング機能を活用して、
// コンポーネントがデータを取得している間にフォールバックUIを表示するために使用されます。
// `fallback`プロパティには、データがまだロードされていないときに表示するUIを指定します。
// ここでは、`<RevenueChartSkeleton />`がフォールバックUIとして指定されており、
// これは収益チャートがロードされるまでの間、ユーザーにスケルトンローディングアニメーションを表示します。

