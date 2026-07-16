# question-import-format

## 概要

ICT・AI SKILL QUEST レベル1試作版の設計・運用資料です。

## 要点

- Firebase方式を採用します。Firestoreトランザクション、Cloud Functions、Security Rulesにより、採点情報秘匿、サーバー側採点、重複防止、リアルタイム集計、数千人規模への拡張を実現しやすいためです。
- Google Apps Script方式は非エンジニア保守とスプレッドシート運用が容易ですが、同時アクセス、権限分離、トランザクション、250問・数千人規模ではFirebase方式が安全です。
- GitHub Pagesはフロントエンドのみを配信し、秘密情報や正解・得点を配信しません。
- サンプル問題は「試作用仮問題・本番利用不可」です。

## 実装・運用メモ

- users, usernames, userPreferences, levels, questions, questionVersions, attempts, attemptAnswers, completions, certificates, certificateCounters, publicStatistics, cooperativeGoals, administrators, auditLogs, systemSettings を分離します。
- 初期管理者はFirebase Consoleまたは管理用スクリプトで administrators に登録します。
- 修了証は合格時点のユーザー名、所属、伏字メールをスナップショット保存します。
- QR検証画面は未認証閲覧者に有効/無効、発行番号、レベル、発行日、伏字メールのみを返します。
