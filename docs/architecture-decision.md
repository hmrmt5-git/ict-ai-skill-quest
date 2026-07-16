# アーキテクチャ決定

## 採用案

案A: Firebase方式を採用します。

## 理由

`wasegaku.ac.jp`限定認証、サーバー側採点、挑戦回数・修了証番号の重複防止、合格者数のリアルタイム集計、管理者権限分離を安全に実装するには、Firestoreトランザクション、Cloud Functions、Security Rulesを利用できるFirebase方式が最も確実です。
