# TODO アプリ 設計仕様書

このドキュメントは、Next.js 15 (Pages Router)、TanStack Query、MUI を活用した CSR（クライアントサイドレンダリング）ベースの TODO アプリケーションのアーキテクチャと実装詳細をまとめたものです。

## 1. 技術スタック

- **フレームワーク**: Next.js 15 (Pages Router)
- **状態管理・データ取得**: TanStack Query (v5)
- **UI コンポーネント**: MUI (v7)
- **データ永続化**: ブラウザの `localStorage`
- **エラー管理**: `react-error-boundary` + TanStack Query

## 2. 実装のポイント

### データフェッチ (`useSuspenseQuery`)

React の Suspense 機能を活用し、データ取得中のローディング状態を宣言的に記述しています。
`useSuspenseQuery` を使用することで、データが利用可能な状態であることを前提にコンポーネントを記述でき、コードの可読性を高めています。

### モック API 層

`src/api/todoApi.ts` では、`localStorage` を利用した擬似的な API レイヤーを実装しています。
ネットワーク遅延（`setTimeout`）やランダムなエラーを意図的に発生させることで、実際の Web アプリケーションに近い挙動をシミュレートしています。

### グローバルエラーハンドリング

`react-error-boundary` を使用し、データ取得エラーが発生した際にアプリケーション全体がクラッシュするのを防いでいます。
エラー発生時には `ErrorFallback` コンポーネントが表示され、ユーザーが「再試行」をクリックすることで、TanStack Query のキャッシュをリセットし再取得を試みることができます。

## 3. ディレクトリ構成

- **`src/pages`**:
  - `_app.tsx`: 各種 Provider の設定と `Layout` コンポーネント（AppBar, Container, ErrorBoundary, Suspense）による全ページのラップ
  - `index.tsx`: TODO リスト一覧と追加フォーム
  - `todo/[id].tsx`: TODO の詳細表示
- **`src/hooks/useTodos.ts`**: TanStack Query をラップしたカスタムフック群。ロジックをコンポーネントから分離。
- **`src/components`**:
  - `Layout.tsx`: 共通レイアウト（AppBar, Container）と Suspense/ErrorBoundary の配置
  - `ErrorFallback.tsx`: エラー時の UI
  - `RouteLoading.tsx`: ページ遷移中のローディング UI と `router.events` の制御
- **`src/api/todoApi.ts`**: `localStorage` を操作する非同期関数群

## 4. UI/UX の工夫

- **レスポンシブデザイン**: MUI のコンポーネントを使用し、モバイルとデスクトップ両方で最適に表示。
- **インタラクティブなフィードバック**: TODO の追加・削除・状態変更時に MUI の Backdrop と CircularProgress を使用したグローバルなローディングを表示し、処理中の誤操作を防止。データ更新（Mutation）からデータの再取得（Fetch）が完了するまで表示を維持します。
- **ページ遷移**: `router.push` と `router.events` を使用。遷移中にグローバルなローディング UI を表示することで、スムーズなユーザー体験を提供。
