# 技術構成比較

| 観点 | Firebase方式 | Google Apps Script方式 |
|---|---|---|
| Google Sites埋め込み | GitHub Pagesをiframe埋め込み、別タブ導線で対応 | 同様に可能 |
| GitHub Pages連携 | 静的配信と相性が良い | 静的配信+GAS APIで可能 |
| ドメイン限定認証 | Firebase Auth + Functionsでサーバー検証 | Workspace連携で可能だがAPI公開設計に注意 |
| 正解秘匿/サーバー採点 | Cloud Functionsで強い | GASで可能だが保守に注意 |
| 同時アクセス/整合性 | Firestoreトランザクションが有利 | Spreadsheetロックは規模に弱い |
| リアルタイム集計 | Firestore購読が有利 | ポーリング中心 |
| PDF/番号重複防止 | Storage + transactionで有利 | Drive + LockServiceで可能 |
| 管理者権限/セキュリティ | Security RulesとCustom Claimsで強い | 実装者の設計依存が大きい |
| 維持費 | 無料枠後は従量課金 | Workspace内では低コスト |
| 非エンジニア保守 | Console習熟が必要 | Sheetsで容易 |
| 拡張性/引継ぎ | 数千人・250問に適する | 小規模には容易だが限界が早い |

結論: 安全性、整合性、拡張性を優先しFirebase方式を採用します。
