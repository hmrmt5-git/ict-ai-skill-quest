# デプロイ概要

## 採用構成

- フロントエンドは依存を抑えた静的TypeScriptとしてビルドし、GitHub Pagesで公開します。
- 本番バックエンドはFirebase Authentication、Firestore、Cloud Functions、Cloud Storageを想定します。
- 秘密情報はGitHubリポジトリに保存せず、FirebaseまたはGitHub Actionsの安全な設定に登録します。

## GitHub Pages URL

現在の候補URLは次のとおりです。

`https://hmrmt5-git.github.io/ict-ai-skill-quest/`

リポジトリ名やオーナーが変わる場合は、GitHub Pagesの公開URLを確認し、`.env.example` に記載した `VITE_PUBLIC_BASE_URL` と `VITE_CERTIFICATE_VERIFY_BASE_URL` を実環境の値に合わせます。

## サブパス対応

この試作版は相対パスで `index.html`、CSS、ビルド済みJavaScriptを参照するため、`/ict-ai-skill-quest/` のようなGitHub Pagesサブパスでも動作する前提です。将来Viteへ移行する場合は `base: '/ict-ai-skill-quest/'` または環境変数からのbase設定を必ず確認します。

## GitHub Actions

- `pull_request` では `npm ci`、lint、typecheck、test、build、dist存在確認まで実行します。
- `main` へのpush時だけGitHub Pagesを構成し、Pages artifactをアップロードし、deployジョブを実行します。Pagesへの書き込み権限はdeployジョブに限定します。
- `concurrency` により同時デプロイ競合を防止します。
- workflowには秘密情報を直接記載しません。

## 人が行う設定

1. GitHub repository settingsでPagesのSourceをGitHub Actionsにする。
2. Firebaseプロジェクトを作成し、Authentication、Firestore、Functions、Storageを有効化する。
3. GitHub Pagesの公開URLをFirebase Authenticationの承認済みドメインへ追加する。
4. Google Sitesに公開URLを埋め込む。
5. 本番公開前にFirestore Rules、Functions環境変数、管理者初期登録を確認する。
