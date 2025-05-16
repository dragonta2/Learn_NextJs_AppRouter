// app/ui/dashboard/revenue-chart.tsx

import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenues } from '@/app/lib/definitions';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart({

  // 親から渡されるrevenuesプロップスには、PostgreSQLから取得したrevenueテーブルのデータが渡される
  revenues,
}: {
  revenues: Revenues[];
}) {
  const chartHeight = 350;
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis(revenues);

  if (!revenues || revenues.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenues.map((item) => (
            <div key={item.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * item.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {item.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}

// このファイルは、Next.jsを使ってダッシュボードの収益チャートを表示するためのものです。
// 収益データが与えられると、それを使って過去12か月間の収益を視覚的に表示します。
// 具体的には、各月の収益を棒グラフとして表示し、収益の高さはその月の収益額に比例します。
// また、Y軸には収益の目盛りが表示され、X軸には各月の名前が表示されます。
// データがない場合は、「データがありません」というメッセージが表示されます。

// `revenues`は、過去12か月間の収益データを表す配列です。
// 各要素は、特定の月の収益情報を含むオブジェクトで、
// その月の名前（`month`）と収益額（`revenue`）が含まれています。
// このデータは、収益チャートを描画するために使用され、
// 各月の収益を棒グラフとして視覚的に表示します。
// `revenues`データは、`fetchRevenue`関数を使用してデータベースから取得されます。
// この関数は、`nextjs-dashboard/app/lib/data.ts`ファイルに定義されており、
// データベースから収益データを非同期で取得し、`Revenue`型の配列として返します。
// `nextjs-dashboard/app/dashboard/page.tsx`ファイル内で、`fetchRevenue`関数が呼び出され、
// その結果が`RevenueChart`コンポーネントに渡されます。

// `export default async function RevenueChart`は、非同期関数として`RevenueChart`コンポーネントをエクスポートすることを意味します。
// これは、関数が`async`キーワードで宣言されているため、非同期処理を含むことができることを示しています。
// 具体的には、`await`キーワードを使用して、プロミスの完了を待つことができます。
// ただし、`RevenueChart`コンポーネント自体が非同期で実行されるわけではなく、
// 内部で非同期処理を行うことが可能であることを示しています。

// `revenues`は、`RevenueChart`コンポーネントに渡されるpropsです。
// このpropsは、`Revenue`型の配列を受け取ります。
// `Revenue`型は、`nextjs-dashboard/app/lib/definitions.ts`ファイルで定義されています｜一括で様々な型エイリアス（type）の定義が書かれているファイル
// この型は、収益データの形式を定義しています。
