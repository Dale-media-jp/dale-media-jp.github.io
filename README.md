# Dale Media

ビジネスに役立つAI情報メディア。AI入門からビジネス活用・導入事例まで。

**URL:** https://dale-media-jp.github.io

---

## 技術構成

- **フレームワーク:** Astro v6 + MDX
- **ホスティング:** GitHub Pages
- **CI/CD:** GitHub Actions（`main` push → 自動ビルド＆デプロイ）
- **Node.js:** >=22.12.0

## ディレクトリ構成

```
src/
├── components/
│   ├── ArticleCard.astro   # 記事カード
│   ├── Sidebar.astro       # サイドバー（カテゴリ+新着）
│   ├── Tweet.astro         # X(Twitter)埋め込みコンポーネント
│   └── Welcome.astro
├── content/
│   ├── ai-basics/          # AI入門カテゴリ記事（MDX）
│   ├── biz-ai/             # ビジネスAIカテゴリ記事（MDX）
│   └── cases/              # 導入事例カテゴリ記事（MDX）
├── layouts/
│   └── BaseLayout.astro    # 共通レイアウト（ヘッダー・フッター・OGP）
└── pages/
    ├── index.astro          # トップページ
    ├── sitemap.astro        # HTMLサイトマップ
    ├── sitemap.xml.ts       # XMLサイトマップ（クローラー向け）
    └── [category]/
        ├── index.astro      # カテゴリ一覧ページ
        └── [slug].astro     # 記事詳細ページ（目次自動生成）
public/
├── favicon.svg
├── favicon.ico
├── robots.txt
└── ogp-default.png         # デフォルトOGP画像（1200×630px）※要作成
```

## 記事の追加方法

`src/content/{カテゴリ}/` 以下に `.mdx` ファイルを作成します。

```mdx
---
title: "記事タイトル"
description: "記事の説明文（OGPにも使用）"
pubDate: 2026-04-08
category: ai-basics        # ai-basics | biz-ai | cases
persona: "対象読者（内部管理用）"
keywords: ["キーワード1", "キーワード2"]
draft: false               # true にすると非公開
coverImage: "/images/xxx.jpg"  # 任意
---

import Tweet from '../../components/Tweet.astro';

本文をここに書く...

<Tweet url="https://x.com/..." />
```

追加後は **devサーバーの再起動が必要**（`getStaticPaths()` キャッシュのため）。

## カテゴリ

| ID | ラベル | ターゲット |
|---|---|---|
| `ai-basics` | AI入門 | 主婦・一般層 |
| `biz-ai` | ビジネスAI | リテラシー高めのビジネスパーソン |
| `cases` | 導入事例 | AI受託開発の検討層 |

## コマンド

```sh
npm install        # 依存パッケージのインストール
npm run dev        # 開発サーバー起動（localhost:4321）
npm run build      # 本番ビルド（./dist/）
npm run preview    # ビルド結果のプレビュー
```

## デプロイ

`main` ブランチに push すると GitHub Actions が自動でビルド＆デプロイします。

```sh
git add .
git commit -m "コミットメッセージ"
git push origin main
```
