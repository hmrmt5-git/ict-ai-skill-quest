export const levels = [
  { level:1, title:'レベル1', difficulty:'中学生程度', minutes:15, titleName:'ICT・AIルーキー', status:'open', banner:'LEVEL 1 CLEAR！\nICT・AIルーキー認定' },
  { level:2, title:'レベル2', difficulty:'高校生程度', minutes:15, titleName:'デジタルチャレンジャー', status:'preparing' },
  { level:3, title:'レベル3', difficulty:'大学生程度', minutes:15, titleName:'ICT・AIナビゲーター', status:'preparing' },
  { level:4, title:'レベル4', difficulty:'専門大学生・大学院生程度', minutes:20, titleName:'AIストラテジスト', status:'preparing' },
  { level:5, title:'レベル5', difficulty:'ICT・AIを教える者程度', minutes:20, titleName:'ICT・AIマスター', status:'preparing', badgeReady:false },
] as const;
