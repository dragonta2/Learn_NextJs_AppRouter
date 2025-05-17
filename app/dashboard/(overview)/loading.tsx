// app/dashboard/loading.tsx
// loading.tsx｜React Suspense をベースに構築された特別な Next.js ファイルです。ページコンテンツの読み込み中に代替として表示されるフォールバック UI を作成できます。
// ストリーミングさせるためには、ファイルの先頭に`export default function Loading()`を記述する。
// ストリーミングは、ルートを小さな「チャンク」に分割し、準備が整うとサーバーからクライアントに段階的にストリーミングできるデータ転送技術です。

// export default function Loading() {
//   return <div>Loading...</div>;
// }

// ローディング時の中が空のコンポーネントを呼び出す
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}

// このファイルは、ダッシュボードページの読み込み中に表示されるローディング画面を定義しています。
// ローディング画面は、ユーザーがページを読み込む際に、データが読み込まれるまでの間に表示される画面です。
// このファイルは、ローディング画面を表示するためのコンポーネントです。
// ()で囲まれたディレクトリ名はルートグループと呼ばれ、URLパスには含まれない。loading.tsxをルートグループごとに分割したりできる
