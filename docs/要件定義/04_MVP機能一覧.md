# MVP機能一覧（MoSCoW）

| 機能名 | 優先度 | 技術スタックと目的 |
| --- | --- | --- |
| 認証（GitHub/Google OAuth） | Must | NextAuth.js + OAuthプロバイダで安全なログイン、認可済みユーザーのみレビュー可能にする |
| コード入力・送信・AIレビュー実行 | Must | Next.js 15 App Routerのフォーム + サーバーアクションでClaude Haiku 4.5 API呼び出し、MUI TextField/Uploadで入力UIを提供 |
| レビュー結果表示UI | Must | MUI Accordion/Alertで指摘カテゴリを整理、Next.jsページでストリーミング表示し待機ストレスを低減 |
| レビュー履歴保存・閲覧 | Must | MongoDB + Mongooseスキーマ（users, reviews）で結果・メタ情報を永続化し、Next.jsページで一覧/詳細を取得 |
| セッション管理 | Must | NextAuth.jsセッショントークンでリクエストを保護し、サーバーアクションでユーザー識別を行う |
| メール通知（結果共有） | Should | Nodemailerをサーバーアクションから実行し、レビュー完了時に結果リンクを送信 |
| 再レビュー・履歴比較 | Should | MongoDB履歴を再利用し、差分計算をサーバーアクションで実行、UIはMUIの差分表示用コンポーネント（自作）で提示 |
| 履歴フィルタ/タグ付け | Could | Mongooseスキーマにtagsフィールドを追加し、Next.jsサーバーコンポーネントで検索フィルタを実装 |
| 学習メモ/ブックマーク | Could | reviewsコレクションにnotesを追加、MUIエディタ（TextField）で入力、サーバーアクションで保存 |
| モバイル専用アプリ | Won't | 当面はWebレスポンシブ対応に限定し、MUIのブレークポイントで最適化 |
| チーム共同編集/同時レビュー | Won't | 個人学習向けにスコープを絞り、コラボ機能は後続検討 |

