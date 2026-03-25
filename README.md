# Next.js 15 (Pages Router) TODO アプリ サンプル

このプロジェクトは、Next.js 15 の Pages Router を使用し、TanStack Query と MUI を統合した CSR（クライアントサイドレンダリング）ベースの TODO アプリケーションのサンプルです。

## 主な特徴

- **Next.js 15 (Pages Router)**: 最新バージョンの Next.js を使用。
- **CSR & 静的サイト構成**: 全てのデータ処理をクライアントサイドで行い、静的サイトとして動作します。
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

- `src/pages`: ページコンポーネント
- `src/components`: 共通 UI コンポーネント
- `src/hooks`: TanStack Query を使用したカスタムフック
- `src/api`: `localStorage` を使用した擬似 API レイヤー
- `TODO_APP_DESIGN.md`: 詳細な設計仕様書

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
