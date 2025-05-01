import { getSupabaseClient } from "@/utils/supabase";
import type { Article } from '@/types';
import { defineEventHandler, createError } from "h3";

/**
 * 投稿一覧を取得するAPIエンドポイント
 * GET /api/posts
 */
export default defineEventHandler(async (event) => {

  try {
    // APIのベースURLを環境変数から取得
    const config = useRuntimeConfig();
    /**
     * useRuntimeConfig()
     *
     * useRuntimeConfig()は、Nuxt 3（およびNuxt Bridge）で提供されている組み込みのコンポジションAPIフックです。
     * このメソッドを使うことで、nuxt.config.tsのruntimeConfigで定義したランタイム設定値（環境変数など）を、サーバーサイド・クライアントサイド両方で取得できます。
     *
     * 主な特徴
     * - サーバーサイド・クライアントサイド両方で利用可能
     * - runtimeConfigのpublicに定義した値はクライアントサイドでも取得可能
     * - runtimeConfigの直下（public以外）はサーバーサイドのみで取得可能
     *
     * 使い方例
     * const config = useRuntimeConfig();
     * console.log(config.public.apiBaseURL); // クライアント・サーバー両方で取得可能
     * console.log(config.supabaseUrl);       // サーバーサイドのみ取得可能
     *
     * どんなときに使う？
     * - APIのベースURLや外部サービスのキーなど、環境ごとに切り替えたい値を取得したいとき
     * - サーバーサイドレンダリングや静的生成時にも安全に値を使いたいとき
     *
     * 公式：https://nuxt.com/docs/guide/going-further/runtime-config
     */

    // Supabaseクライアントを初期化
    const supabase = getSupabaseClient(
      // SupabaseのURLとAPIキーをランタイム設定から取得
      config.public.supabaseUrl,
      config.public.supabaseKey
    );

    // Supabaseから投稿データを取得
    const { data, error: supabaseError } = await supabase.from('posts').select('*');

    // Supabaseでエラーが発生した場合
    if (supabaseError) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Supabaseからのデータ取得に失敗しました',
        data: supabaseError
      });
    }

    // データが存在しない場合
    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: '投稿が見つかりませんでした'
      });
    }

    // 正常にデータを返却
    return data as Article[];

  } catch(e) {
    // 予期せぬエラーの場合
    console.error('投稿取得エラー:', e);

    throw createError({
      statusCode: 500,
      statusMessage: '投稿の取得中にエラーが発生しました'
    });
  }
});
