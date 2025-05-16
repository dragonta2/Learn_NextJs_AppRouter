// app/ui/fonts.ts

import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin']
});
// このファイルは、Googleフォントの「Inter」と「Lusitana」をNext.jsプロジェクトで使用するために設定しています。
// `Inter`と`Lusitana`は、Google Fontsからインポートされ、特定のサブセット（ここではラテン文字）を指定して使用されています。
// ラテン文字とは、アルファベットを基にした文字体系で、英語や多くのヨーロッパ言語で使用される文字を指します。
// `Inter`フォントはデフォルトの設定で使用され、`Lusitana`フォントは400と700のウェイトを指定して使用されています。
// これにより、プロジェクト内でこれらのフォントを簡単に利用できるようになります。
// 「Inter」は「相互」や「間」を意味し、「Lusitana」は「ポルトガルの」を意味します。