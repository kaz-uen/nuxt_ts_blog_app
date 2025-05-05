export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: string;
  thumbnail?: string;
  category?: string;
}

/**
 * categoryをstring型に変換
 *
 * useRoute() で取得できる params.category の型が string | string[] | undefined となるため
 * string 型に変換する
 *
 * @param value - 変換対象の値（string | string[] | undefined）
 * @returns
 */
export function toStringOrEmpty(value: string | string[] | undefined): string {
  if (Array.isArray(value)) { //配列かどうかを判定
    return value[0] ?? ''; //配列なら最初の要素を、undefinedの場合は空文字を使用
  }
  return value ?? ''; //配列でなければそのままの値を、undefinedの場合は空文字を使用
}
