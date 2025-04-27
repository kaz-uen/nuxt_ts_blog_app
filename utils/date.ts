/**
 * 日付文字列を日本語フォーマットに変換する関数
 *
 * @param dateString - フォーマット対象の日付文字列（例: "2024-03-20T12:34:56Z"）
 * @returns フォーマットされた日本語の日付文字列（例: "2024年3月20日"）
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'No date provided';

  // 文字列から Date オブジェクトを生成
  const date = new Date(dateString);

  // 無効な日付チェック
  if (Number.isNaN(date.getTime())) return 'Invalid date';

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()は0から始まるため+1
  const day = date.getDate();

  // フォーマットされた日付文字列を返す
  return `${year}年${month}月${day}日`;
};
