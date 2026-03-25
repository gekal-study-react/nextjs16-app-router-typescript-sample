# Next.js 16 (App Router) TODO アプリ サンプル

このプロジェクトは、Next.js 16 の App Router を使用し、TanStack Query と MUI を統合した CSR（クライアントサイドレンダリング）ベースの TODO アプリケーションのサンプルです。

## 主な特徴

- **Next.js 16 (App Router)**: 最新バージョンの Next.js を App Router で実装。
- **CSR & ハイブリッド構成**: クライアントコンポーネントを活用した柔軟なレンダリング方式。
- **TanStack Query (v5)**: `useSuspenseQuery` を活用した効率的なデータ取得とキャッシュ管理。
- **MUI (v7)**: 洗練された UI コンポーネントとレスポンシブデザイン。
- **グローバルエラーハンドリング**: `react-error-boundary` と TanStack Query を連携させたエラー管理。
- **ローカル永続化**: ブラウザの `localStorage` を使用してデータを保存。

## クイックスタート

まず、依存関係をインストールし、開発サーバーを起動します。

```bash
pnpm install
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開き、アプリを確認してください。

## プロジェクト構成

- `src/app`: App Router ベースのページレイアウト
  - `layout.tsx`: ルートレイアウト
  - `page.tsx`: トップページ（TODO リスト一覧）
  - `todo/[id]/page.tsx`: TODO 詳細ページ
- `src/components`: 共通 UI コンポーネント
- `src/hooks`: TanStack Query を使用したカスタムフック
- `src/api`: `localStorage` を使用した擬似 API レイヤー
- `src/contexts`: グローバルな状態管理（GlobalLoadingContext）
- `TODO_APP_DESIGN.md`: 詳細な設計仕様書

## ビルド

静的ビルドの場合：

```bash
pnpm build
pnpm start
```

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
