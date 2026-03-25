# TODO アプリ 設計仕様書

このドキュメントは、Next.js 16 (App Router)、TanStack Query、MUI を活用した CSR（クライアントサイドレンダリング）ベースの TODO アプリケーションのアーキテクチャと実装詳細をまとめたものです。

## 1. 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **状態管理・データ取得**: TanStack Query (v5)
- **UI コンポーネント**: MUI (v7)
- **データ永続化**: ブラウザの `localStorage`
- **エラー管理**: `react-error-boundary` + TanStack Query

## 2. 実装のポイント

### App Router への移行

Pages Router から App Router への移行により、以下の改善が実現されました：

- **ファイルベースのルーティング**: `src/app` ディレクトリに統一
- **レイアウトの柔軟性**: ネストされたレイアウトで段階的なコンポーネント構成
- **Server/Client Components**: 適切な境界で Server・Client コンポーネントを使い分け
- **Metadata API**: 静的・動的なメタデータ設定が容易

### データフェッチ (`useSuspenseQuery`)

React の Suspense 機能を活用し、データ取得中のローディング状態を宣言的に記述しています。
`useSuspenseQuery` を使用することで、データが利用可能な状態であることを前提にコンポーネントを記述でき、コードの可読性を高めています。

### モック API 層

`src/api/todoApi.ts` では、`localStorage` を利用した擬似的な API レイヤーを実装しています。
ネットワーク遅延（`setTimeout`）やランダムなエラーを意図的に発生させることで、実際の Web アプリケーションに近い挙動をシミュレートしています。

### グローバルエラーハンドリング

`react-error-boundary` を使用し、データ取得エラーが発生した際にアプリケーション全体がクラッシュするのを防いでいます。
エラー発生時には `ErrorFallback` コンポーネントが表示され、ユーザーが「再試行」をクリックすることで、TanStack Query のキャッシュをリセットし再取得を試みることができます。

### クライアント/サーバーコンポーネント

- **Server Component**: `src/app/layout.tsx`（ルートレイアウト）
- **Client Component**:
  - `src/app/ClientLayout.tsx`：Provider の配置
  - `src/app/page.tsx`, `src/app/todo/[id]/page.tsx`：ページコンポーネント
  - `src/components/AppProvider.tsx`：AppBar とレイアウト

## 3. ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx              # ルートレイアウト（metadata、html要素）
│   ├── ClientLayout.tsx        # クライアント側プロバイダー
│   ├── page.tsx                # トップページ（TODO リスト一覧）
│   └── todo/
│       └── [id]/
│           └── page.tsx        # TODO 詳細ページ
├── components/
│   ├── AppProvider.tsx         # レイアウト、AppBar、ErrorBoundary、Suspense
│   ├── ErrorFallback.tsx       # エラー時の UI
│   ├── Loading.tsx             # グローバルローディング表示（Backdrop + CircularProgress）
│   ├── QueryProvider.tsx       # TanStack Query プロバイダー
│   └── SuspenseIndicator.tsx   # Suspense フォールバック UI
├── hooks/
│   └── useTodos.ts             # TanStack Query をラップしたカスタムフック群
├── api/
│   └── todoApi.ts              # localStorage を操作する非同期関数群
├── contexts/
│   └── GlobalLoadingContext.tsx # グローバルローディング状態管理
└── styles/
    └── globals.css             # グローバルスタイル
```

## 4. UI/UX の工夫

- **レスポンシブデザイン**: MUI のコンポーネントを使用し、モバイルとデスクトップ両方で最適に表示
- **インタラクティブなフィードバック**: TODO の追加・削除・状態変更時に MUI の Backdrop と CircularProgress を使用したグローバルなローディングを表示し、処理中の誤操作を防止。データ更新（Mutation）からデータの再取得（Fetch）が完了するまで表示を維持
- **ページ遷移**: `useRouter` から `next/navigation` を使用。スムーズなナビゲーション体験を提供

## 5. App Router での主な変更点

### Pages Router から App Router への変更

| 項目                 | Pages Router     | App Router                        |
| -------------------- | ---------------- | --------------------------------- |
| ルーティング方式     | `src/pages/`     | `src/app/`                        |
| ルーター import      | `next/router`    | `next/navigation`                 |
| ページコンポーネント | export default   | export default                    |
| `_app.tsx`           | プロバイダー設定 | `layout.tsx` + `ClientLayout.tsx` |
| `_document.tsx`      | HTML 構造        | `layout.tsx`                      |
| メタデータ           | next/head        | Metadata API (`layout.tsx`)       |

### useRouter の変更

```typescript
// Pages Router
import { useRouter } from "next/router";
const router = useRouter();
router.push("/todo/123");

// App Router
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/todo/123");
```

## 6. プリレンダリングと動的レンダリング

現在のアプリは CSR ベースで localStorage を使用しているため、Server Components でのプリレンダリングは適用しない設定になっています。必要に応じて、API ルートを追加してサーバー側の処理を実装できます。
