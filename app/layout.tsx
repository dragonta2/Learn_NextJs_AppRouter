// app/layout.tsx

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

// このファイルは、Next.jsプロジェクトのルートレイアウトを定義しています。
// `RootLayout`コンポーネントは、アプリケーション全体の共通レイアウトを提供し、
// すべてのページコンポーネントの親として機能します。
// `inter`フォントを使用して、`body`要素にスタイルを適用し、
// `antialiased`クラスはTailwind CSSのプロパティで、フォントの滑らかさを向上させています。
// `children`プロパティは、各ページコンポーネントの内容を受け取り、
// それを`body`内にレンダリングします。
