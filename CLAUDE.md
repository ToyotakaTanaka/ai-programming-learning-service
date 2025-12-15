# CLAUDE.md - プロジェクトガイドライン

## プロジェクト概要
CodeMentor AI - プログラミング学習者向けAIコードレビューサービスのランディングページおよびWebアプリケーション

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router + Pages Router 併用)
- **言語**: TypeScript (厳格モード)
- **UI**: Material-UI (MUI) v6
- **データベース**: MongoDB + Mongoose
- **メール送信**: Nodemailer
- **スタイリング**: Emotion (@emotion/react, @emotion/styled)

## ディレクトリ構成
```
src/
├── app/              # App Router（メインページ、レイアウト）
│   ├── layout.tsx    # ルートレイアウト（Providersでラップ）
│   ├── page.tsx      # トップページ（LP）
│   └── providers.tsx # MUI テーマプロバイダー設定
├── pages/            # Pages Router（APIルート、追加ページ）
│   ├── _app.tsx      # Pages Router用テーマプロバイダー
│   ├── api/          # APIルート
│   └── contact.tsx   # お問合せページ
├── lib/              # ユーティリティ関数
│   └── dbConnect.ts  # MongoDB接続ヘルパー
├── models/           # Mongooseモデル
│   └── Contact.ts    # お問合せデータモデル
└── theme.ts          # MUI共通テーマ定義
```

## コマンド
- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番ビルド
- `npm run start`: 本番サーバー起動
- `npm run lint`: ESLint実行

## コーディング規約

### TypeScript
- 全ての関数に型定義を付ける
- `any` 型の使用は最小限に抑える
- インターフェースは `I` プレフィックスを付けない（例: `Contact`、`IContact` は使わない）
- 型定義はファイル上部にまとめる

### React / Next.js
- 関数コンポーネントを使用（クラスコンポーネントは使わない）
- フック（useState、useEffect等）を活用
- App Routerのコンポーネントは必要に応じて `'use client'` ディレクティブを付ける
- ページコンポーネントは default export を使用

### MUI
- MUIコンポーネントを優先的に使用
- カスタムスタイルは `sx` プロパティまたは `styled` を使用
- テーマカラーは `theme.palette` から参照
- レスポンシブ対応は `useMediaQuery` または `sx` のブレークポイントを使用

### APIルート
- HTTPメソッドは明示的にチェック
- エラーハンドリングは try-catch で囲む
- レスポンスは `{ success: 真偽値, message: 文字列, data?: 任意 }` 形式
- 入力値は `sanitize-html` でサニタイズ

### データベース
- MongoDB接続は `dbConnect()` ヘルパーを使用
- Mongooseモデルは `src/models/` に配置
- スキーマには適切なバリデーションを設定

## 環境変数（.env.local）
```
MONGODB_URI=mongodb://localhost:27017/survibeai
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=メールアドレス@gmail.com
EMAIL_PASS=アプリパスワード
ADMIN_EMAIL=管理者@example.com
```

## ファイル境界
- **編集可能**: `src/`、`docs/`、`tasks/`、`public/`
- **編集禁止**: `node_modules/`、`.next/`、`.git/`

## コード例

### 良い例: MUIコンポーネントの使用
```tsx
import { Button, TextField, Stack } from '@mui/material';

function お問合せフォーム() {
  const [メール, setメール] = useState('');
  
  return (
    <Stack spacing={2}>
      <TextField
        label="メールアドレス"
        type="email"
        value={メール}
        onChange={(e) => setメール(e.target.value)}
        fullWidth
        required
      />
      <Button variant="contained" type="submit">
        送信
      </Button>
    </Stack>
  );
}
```

### 良い例: APIルート
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';

type レスポンスデータ = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<レスポンスデータ>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'メソッドが許可されていません' });
  }

  await dbConnect();

  try {
    // 処理を記述
    res.status(200).json({ success: true, message: '成功しました', data: 結果 });
  } catch (error) {
    res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
  }
}
```

## 言語設定
- **UIテキスト**: 日本語
- **コード内コメント**: 日本語
- **変数名・関数名**: 英語（キャメルケース）
- **コミットメッセージ**: 日本語
- **AIアシスタントの応答**: 必ず日本語で回答すること

## タスク管理
- タスクは `tasks/[タスクID]_[タスクタイトル]/` フォルダで管理
- 各タスクフォルダには `spec.md`（仕様書）を配置
- 仕様書には「ユーザーニーズ」「仕様要件」「処理手順設計」を記載

## 重要な注意事項
- コードレビューや説明は必ず日本語で行うこと
- エラーメッセージは日本語で表示すること
- ユーザーへの確認事項も日本語で行うこと
