# コーディング規約

このリポジトリでコードを書く・変更する際に従う規約をまとめる。
（コードレビューの運用方針・出力フォーマットは `.github/workflows/claude-code-review.yml` のプロンプトを参照）

## 命名規則

**ファイル名・変数名・関数名**は「リーダブルコード」の原則に従う。

1. **目的が伝わる名前にする**
   - `d`, `tmp2`, `data` などの意味が曖昧な名前は避ける
   - 何を表すかが名前だけで分かるようにする（例: `userCreatedAt`, `isEmailVerified`）

2. **誤解を招かない名前にする**
   - `getXxx` は副作用のない取得のみ。変更を伴うなら `fetchXxx` / `updateXxx` など動詞を使い分ける
   - bool は `is`, `has`, `can`, `should` などの接頭辞で意図を明示する

3. **スコープに合った粒度にする**
   - 広いスコープで使う変数ほど説明的にする
   - 短命・即破棄の変数（ループカウンタ `i` / `j`、分割代入の捨て変数 `_` など）は短くてよい

4. **一貫性を保つ**
   - 同じ概念には同じ単語を使う（`user` と `account` を混在させない等）
   - ファイル名はディレクトリ内で命名規則を統一する

## Next.js App Router

- `"use client"` は必要最小限に抑える（状態管理・イベントハンドラが必要な場合のみ）
- データフェッチは Server Component で行い、クライアントに不要なデータを渡さない

## Supabase

- ブラウザ側は `src/lib/supabase/client.ts` の `createClient()`、サーバー側は `src/lib/supabase/server.ts` の `createClient()` を使い分ける（同名だが import パスで区別する）
- 環境変数はブラケット記法を使わない（`process.env['KEY']` ではなく `process.env.KEY`）
  — Next.js が `NEXT_PUBLIC_*` を静的インライン展開するため

## TypeScript

- 型インポートは `import type { ... }` で明示する
- `any` / 型アサーション（`as`）は避け、Supabase の生成型を活用する
- コンポーネント props には `Readonly<{...}>` を使う（再代入防止）

## Tailwind CSS v4

- `@apply` は使わない（インラインユーティリティのみ）
- カスタム変数は `globals.css` の `@theme inline {}` ブロックで定義する

## フォーマット

インデント・クォート・import 順序は Biome が自動管理する。手動で整える必要はない。
