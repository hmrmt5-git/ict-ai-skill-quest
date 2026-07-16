# ICT・AI SKILL QUEST

**― 知識だけでは攻略できない。判断力で挑め。―**

ICT・AI SKILL QUESTは、学校法人早稲田学園の教職員および生徒を対象とした、ゲーム型ICT・AI活用チェックテストの試作版です。

現在のリポジトリはレベル1試作版です。サンプル問題、仮の利用者情報、仮の合格者数、修了証表示などは本番利用不可の確認用実装であり、実運用前にFirebase等のバックエンド実装と本番データへの差し替えが必要です。

## 技術構成

実際の `package.json` とビルド設定に基づく現在の構成は次のとおりです。

- フロントエンド：依存を抑えた静的TypeScript
- 開発サーバー：`python3 -m http.server 5173 -d public`
- ビルド：`tsc` で `build/` を生成し、`public/` と `build/` を `dist/` に配置
- 公開：GitHub Pages
- 自動テスト・公開：GitHub Actions
- 推奨バックエンド：
  - Firebase Authentication
  - Cloud Firestore
  - Cloud Functions
  - Cloud Storage
- Google Sites：GitHub Pagesの公開URLを埋め込み

このリポジトリには現在 `vite.config.ts` はありません。公開ファイルは相対パスで参照しているため、候補URL `https://hmrmt5-git.github.io/ict-ai-skill-quest/` のようなリポジトリ名付きサブパスで表示できる前提です。将来Viteへ移行する場合は、`base` を `/ict-ai-skill-quest/` または実際のリポジトリ名に合わせて再確認してください。

## 現在実装済みの機能

現在のコードで実際に動作する主な機能は次のとおりです。

- 日本語のトップページ
- レベル1〜5のステージ表示
- レベル1のみ挑戦可能、レベル2〜5は「準備中」表示
- ライトモード・ダークモード切替
- サウンドON・OFF切替（初期値OFF）
- 動きを減らす設定
- Google Sites等のiframe表示時の注意表示
- 「別タブでアプリを開く」導線
- 仮の利用者情報表示
- 仮のレベル別合格者数表示
- レベル1合格者100人の協力型達成メーター表示
- レベル1の試作用仮問題からのクイズ表示
- 回答後の得点・解説表示
- 結果画面と合格時の簡易演出
- 修了証の印刷表示プレースホルダー
- 管理者画面の概要プレースホルダー
- GitHub Pages用のビルド・デプロイ設定
- ルール関数の単体テスト

## 未実装またはプレースホルダーの機能

次の機能は、現在は未実装または仮実装です。完成済み機能として扱わないでください。

- Google Workspace本番認証
- `wasegaku.ac.jp` のサーバー側ドメイン確認
- Firebase本番接続
- サーバー側の問題出題制御
- サーバー側採点
- 1日5回の挑戦制限のサーバー側適用
- 合格判定と履歴保存の本番実装
- PDF修了証の本番生成
- QRコード検証の本番実装
- 管理者画面の本番機能
- 本番用問題
- 正式ロゴ
- レベル2〜5の本番機能

## 必要環境

- Node.js 20
- npm
- Git
- GitHubアカウント
- 本番接続時はFirebaseプロジェクト

## ローカル起動

`package-lock.json` が存在するため、依存関係のインストールは `npm ci` に統一します。

```bash
npm ci
npm run dev
```

起動後、表示されたローカルURLをブラウザで開いて確認します。

## 検査とテスト

`package.json` に存在するスクリプトは次のとおりです。

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` は `tsc` 実行後に Node.js の `node --test` を使うため、CI上で監視モードにならず正常終了します。`npm run build` が成功すると、GitHub Pagesで公開するための `dist/` ディレクトリが生成され、`dist/index.html` が作成されます。

## 環境変数と秘密情報

ローカル開発では `.env.example` を参考にし、必要に応じて `.env.local` などを作成してください。ただし、`.env.example` 以外の環境変数ファイルはGitHubへコミットしないでください。

次のファイルや情報はGitHubへコミットしないでください。

- `.env`
- `.env.local`
- サービスアカウントJSON
- Firebase Admin SDK秘密鍵
- OAuthクライアントシークレット
- パスワード
- 実在利用者の個人情報
- 本番用の非公開採点データ

Firebaseのフロントエンド用設定値と、秘密鍵などの機密情報は明確に区別してください。`VITE_` で始まる環境変数はブラウザへ組み込まれる可能性があるため、秘密情報を入れてはいけません。GitHub Pagesのビルド時に必要な公開用設定値は、GitHub ActionsのVariables等から渡す方針とし、サーバー側の秘密情報はCloud Functions等の安全な環境に保存します。

## Google Workspace認証方針

本番版ではFirebase AuthenticationによるGoogleログインを使用する方針です。利用条件は次のとおりです。

- メールアドレスが `@wasegaku.ac.jp` で終わる
- メールアドレスが確認済みである
- ドメイン制限をフロントエンドだけでなくサーバー側でも検証する

採点、合否、挑戦回数、修了証番号および管理者権限は、クライアント側だけで処理しません。Cloud Functions等のサーバー側処理で認証・認可・整合性を確認します。

## GitHub Pages

mainブランチへ変更が統合された後、GitHub Actionsが次を実行します。

1. `npm ci`
2. lint
3. 型チェック
4. テスト
5. ビルド
6. `dist` のGitHub Pagesへのデプロイ

公開URLの候補は次のとおりです。

`https://hmrmt5-git.github.io/ict-ai-skill-quest/`

リポジトリ所有者またはリポジトリ名を変更した場合は、現在の公開パス設定、GitHub Pages URL、`.env.example` の `VITE_PUBLIC_BASE_URL` と `VITE_CERTIFICATE_VERIFY_BASE_URL` を再確認してください。将来Viteを導入する場合は、Viteの `base` 設定も必ず確認してください。

## Google Sitesへの埋め込み

Google Sitesの編集画面で「埋め込む」を選択し、GitHub Pagesの公開URLを指定します。

iframe内ではブラウザ設定、Cookie、Google認証ポップアップの制限により、本番のGoogle認証が失敗する可能性があります。そのため、アプリには「別タブでアプリを開く」導線が必要です。Google Sites内の埋め込み表示と、GitHub Pagesの直接URL表示の両方を確認してください。

## ロゴ

正式ロゴがない場合は、架空のロゴを作成せず、明確なプレースホルダーを使用してください。

現在のコードはロゴ画像ファイルを参照していません。正式ロゴを追加する場合は、`public/logo.svg` を推奨します。PNGを使う場合は `public/logo.png` とし、透明背景かつ十分な解像度の画像を使用してください。ファイル名を決めたら、コードとドキュメントの表記を統一してください。

## 本番公開前チェック

- Firebaseプロジェクト作成
- Googleログイン有効化
- 承認済みドメイン設定
- `wasegaku.ac.jp` 制限のサーバー側実装と検証
- Firestore Security Rulesのテスト
- Cloud Functionsの認証・認可テスト
- サンプル問題から承認済み本番問題への差替え
- 管理者アカウント登録
- 正式ロゴと発行者情報設定
- GitHub Pages直接URLでの確認
- Google Sites埋め込み確認
- Chromebook、Windows、スマートフォンでの確認
- ライト・ダークモード確認
- サウンドON・OFF確認
- 個人情報の取扱い確認

## 設計資料

- [要件定義](docs/requirements.md)
- [技術構成比較](docs/architecture-comparison.md)
- [アーキテクチャ決定](docs/architecture-decision.md)
- [データモデル](docs/data-model.md)
- [セキュリティ設計](docs/security-design.md)
- [実装計画](docs/implementation-plan.md)
- [デプロイ概要](docs/deployment-overview.md)
