# お問合せフォーム機能 実装仕様書

## 1. ユーザーニーズ

- **ユーザー（訪問者）**: サイト運営者に対して、質問、フィードバック、仕事の依頼などを手軽かつ確実に送信したい。送信した内容が正しく届いたかどうかのフィードバック（完了画面・自動返信など）が欲しい。
- **管理者（運営者）**: ユーザーからの問い合わせを即座にメールで受け取り、内容を確認して対応したい。また、過去の問い合わせ履歴をデータベースで管理・閲覧したい。

## 2. 仕様要件

### 2.1 機能要件
- **お問合せフォーム表示**: 名前、メールアドレス、件名、メッセージの入力欄を表示。
- **入力バリデーション**: クライアントサイド（リアルタイム）およびサーバーサイドでのチェック。
- **送信処理**:
  - APIへの非同期送信。
  - 送信中のローディング表示。
  - 送信ボタンの連打防止（disabled制御）。
- **データ保存**: MongoDBへ問い合わせ内容を保存。
- **メール通知**: 管理者宛に問い合わせ内容を通知（Nodemailer使用）。
- **完了表示**: 送信成功時に完了メッセージを表示。エラー時はエラーメッセージを表示。

### 2.2 UI仕様 (MUI使用)
- **レイアウト**: `/contact` ページに配置。レスポンシブ対応。
- **入力項目**:
  - **お名前 (Name)**: `TextField`, 必須。
  - **メールアドレス (Email)**: `TextField`, 必須, email形式。
  - **件名 (Subject)**: `TextField`, 必須。
  - **メッセージ (Message)**: `TextField` (multiline, rows=4), 必須。
- **アクション**:
  - **送信ボタン**: `Button` (variant="contained")。入力エラーがある場合や送信中は `disabled`。
- **フィードバック**:
  - `Alert` コンポーネント等を使用して成功/失敗を表示。
  - フィールドごとのバリデーションエラーは `TextField` の `error` / `helperText` プロパティを使用。

### 2.3 バリデーション詳細
- **共通 (フロントエンド & バックエンド)**:
  - **Name**: 必須。
  - **Email**: 必須。RFC5322準拠の正規表現チェック。
  - **Subject**: 必須。
  - **Message**: 必須。
- **セキュリティ対策**:
  - XSS対策: バックエンド保存前に `sanitize-html` で入力値をサニタイズ。

## 3. 処理手順設計

### 3.1 データフロー
1.  **Frontend (`pages/contact.tsx`)**:
    - ユーザーがフォームに入力。
    - `onChange` でリアルタイムバリデーション実行。
    - 送信ボタン押下で `POST /api/contact` へJSONデータを送信。
2.  **Backend API (`pages/api/contact.ts`)**:
    - リクエストボディの受け取り。
    - サーバーサイドバリデーション実行。エラーがあれば `400 Bad Request` を返却。
    - 入力データのサニタイズ (`sanitize-html`)。
    - DB接続 (`mongoose`)。
    - データ保存: `Contact` モデルを使用してMongoDBにドキュメント作成。
    - メール送信: `nodemailer` を使用して管理者へメール送信。
    - レスポンス: 成功時は `200 OK`、サーバーエラー時は `500 Internal Server Error` を返却。
3.  **Frontend (Response Handling)**:
    - `200` 受信: フォームをクリアし、完了画面（メッセージ）を表示。
    - エラー受信: エラーメッセージを表示し、再試行を促す。

### 3.2 データモデル (Mongoose Schema)
- **Collection**: `contacts`
- **Fields**:
  - `name`: String, required
  - `email`: String, required
  - `subject`: String, required
  - `message`: String, required
  - `createdAt`: Date, default: Date.now
  - `status`: String, default: 'unread' (enum: ['unread', 'read', 'replied'])

### 3.3 技術スタック詳細
- **Frontend**: Next.js (Pages Router), React Hook Form (推奨だが要件になければState管理でも可), MUI
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas, Mongoose
- **Mail**: Nodemailer (Gmail SMTP or others)
- **Env Variables**:
  - `MONGODB_URI`: DB接続文字列
  - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`: メールサーバー設定
  - `ADMIN_EMAIL`: 通知先メールアドレス
