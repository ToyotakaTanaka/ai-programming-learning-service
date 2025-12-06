import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeMentor AI | AIコードレビューサービス',
  description: 'プログラミング学習者向けAIコードレビューのランディングページ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

