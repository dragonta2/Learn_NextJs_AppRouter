// app/dashboard/layout.tsx

import SideNav from '@/app/ui/dashboard/sidenav';

// 部分的事前レンダリングを有効化
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

// このファイルは、Next.jsのダッシュボードレイアウトを定義しています。
// `Layout`コンポーネントは、サイドナビゲーションとメインコンテンツエリアを持つレイアウトを提供します。
// サイドナビゲーションは`SideNav`コンポーネントを使用しており、メインコンテンツは`children`プロパティを通じて受け取ります。
// レスポンシブデザインを考慮し、画面サイズに応じてレイアウトが変化します。
