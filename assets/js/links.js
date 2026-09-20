/* Edit this file to add, remove, or reorder categories and links.
 * url: '' means not configured: it is displayed as text, never opened.
 * keywords are optional search aliases. Do not put passwords or private URLs here.
 */
window.START_LINKS = [
  {
    id: 'research', name: 'Research',
    links: [
      { name: 'Google Scholar', url: 'https://scholar.google.com/', description: '学術文献を検索', keywords: ['論文', 'スカラー', 'scholar'] },
      { name: 'CiNii Research', url: 'https://cir.nii.ac.jp/', description: '国内の論文・研究データ', keywords: ['論文', 'サイニー', '日本語'] },
      { name: 'ERIC', url: 'https://eric.ed.gov/', description: '教育分野の文献検索', keywords: ['教育', 'education'] },
      { name: 'J-GLOBAL', url: 'https://jglobal.jst.go.jp/', description: '科学技術情報を検索', keywords: ['研究者', '文献', '科学'] },
      { name: 'Zotero Web', url: 'https://www.zotero.org/', description: '文献管理・ライブラリへの入口', keywords: ['文献管理', '引用', 'ゾテロ'] },
    ],
  },
  {
    id: 'university', name: 'University',
    links: [
      { name: '東京科学大学', url: 'https://www.isct.ac.jp/', description: '大学公式サイト', keywords: ['大学', 'science tokyo'] },
      // TODO: 自分の所属で利用する、正式な入口URLを入力してください。
      { name: '大学ポータル', url: '', keywords: ['大学', 'portal'] },
      { name: 'LMS', url: '', keywords: ['大学', '授業', '学習'] },
      { name: 'Webmail', url: '', keywords: ['大学', 'メール'] },
      { name: '図書館', url: '', keywords: ['大学', 'library'] },
    ],
  },
  {
    id: 'tools', name: 'Tools',
    links: [
      { name: 'ChatGPT', url: 'https://chatgpt.com/', description: '思考・執筆のサポート', keywords: ['AI', 'チャット'] },
      { name: 'GitHub', url: 'https://github.com/', description: 'コード・リポジトリ', keywords: ['コード', '開発', 'git'] },
      { name: 'Overleaf', url: 'https://www.overleaf.com/', description: 'LaTeXで論文を執筆', keywords: ['論文', 'latex', '執筆'] },
    ],
  },
  { id: 'projects', name: 'Projects', links: [] }, // TODO: 自作ツール・リポジトリを追加。
  { id: 'other', name: 'Other', links: [] },
];
