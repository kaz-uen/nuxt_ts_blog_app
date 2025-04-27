import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseClient(supabaseUrl: string, supabaseKey: string): SupabaseClient {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabaseの環境変数が設定されていません。.env.localファイルを確認してください。');
  }
  return createClient(supabaseUrl, supabaseKey);
}
