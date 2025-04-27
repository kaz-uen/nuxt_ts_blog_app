import { createClient, SupabaseClient } from "@supabase/supabase-js";
// createErrorはエラーハンドリング用でNuxt3に組み込まれているため、
// import文を記述しなくても利用できるが、明示的にインポートしておくとより安全
import { createError } from '#imports';
// NOTE:
// isServerは一部バージョンでのみ利用可能なため、現状はprocess.serverを使用
// Nuxtの今後のアップデートでisServerが安定提供されたら置き換えを検討

export function getSupabaseClient(
  supabaseUrl: string,
  supabaseKey: string
): SupabaseClient {
  if (!supabaseUrl || !supabaseKey) {
    if (process.server) { // process.serverでSSR/CSRを判定
      // NOTE: 非推奨だが現状はこれでOK

      // サーバー側のエラー（SSR時）はNuxtのエラー専用ページに遷移
      throw createError({
        statusCode: 500,
        statusMessage: 'サーバー設定に不備があります。管理者にお問い合わせください。'
      })
    } else {
      // クライアント側のエラー（CSR時）はErrorを投げて開発者やユーザーに詳細なメッセージを表示
      throw new Error('Supabaseの環境変数が設定されていません。.env.localファイルを確認してください。');
    }
  }
  return createClient(supabaseUrl, supabaseKey);
}
