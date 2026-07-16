# デプロイ手順

## 採用構成

ICT・AI SKILL QUESTのフロントエンドは、依存を抑えた静的TypeScriptとしてビルドし、GitHub Pagesで公開します。本番バックエンドはFirebase Authentication、Firestore、Cloud Functions、Cloud Storageを利用する方針です。

## 公開URL候補

現在の候補URLは次のとおりです。

`https://hmrmt5-git.github.io/ict-ai-skill-quest/`

リポジトリ名が変わった場合は、GitHub Pagesの実URLに合わせて `.env.example` の `VITE_PUBLIC_BASE_URL` と `VITE_CERTIFICATE_VERIFY_BASE_URL` を変更してください。

## GitHub Actions

`.github/workflows/pages.yml` は次の方針です。

- `package-lock.json` があるため `npm ci` を使用する。
- `pull_request` ではlint、typecheck、build、test、dist確認だけを実行する。
- `main` へのpush時だけPages artifactをアップロードし、deployする。
- `concurrency` で同時デプロイ競合を防止する。
- workflowに秘密情報を直接記載しない。

## 関連資料

詳細な全体像は `docs/deployment-overview.md` を参照してください。
