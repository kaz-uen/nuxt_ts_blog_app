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

    // Supabaseクライアントを初期化（URLとAPIキーはランタイム設定から取得）
    const supabase = getSupabaseClient(
      config.public.supabaseUrl, // SupabaseのURL
      config.public.supabaseKey // SupabaseのAPIキー
    );

    // Supabaseのpostsテーブルから全ての投稿データを取得
    const { data, error: supabaseError } = await supabase.from('posts').select('*');

    // Supabaseからのデータ取得でエラーが発生した場合
    if (supabaseError) {
      // エラー内容を含めて500エラーを返す
      throw createError({
        statusCode: 500,
        statusMessage: 'Supabaseからのデータ取得に失敗しました',
        data: supabaseError
      });
    }
    /**
     * createError
     * - createErrorは h3（Nuxt 3のサーバーサイドAPI基盤）で提供されている関数で、HTTPエラーオブジェクト（H3Error）を生成する
     * - 生成したエラーオブジェクトには、statusCode（HTTPステータスコード）、statusMessage（エラーメッセージ）、data（追加情報）などを含めることができる
     *
     * throwとの組み合わせ
     * - throwはJavaScriptの例外処理構文
     * - throw createError({...}) と書くことで、例外（エラーオブジェクト）を発生させる
     * - 例外が発生すると、tryブロックの残りの処理は中断され、catchブロックにジャンプする
     * - Nuxt/h3のAPIエンドポイントの場合、catchブロックで再度 throw createError した場合も含めて、最終的にそのエラー内容がHTTPレスポンスとしてクライアントに返される
     */

    // データが存在しない場合
    if (!data) {
      // 404エラーを返す
      throw createError({
        statusCode: 404,
        statusMessage: '投稿が見つかりませんでした'
      });
    }

    // 正常に取得できた場合は投稿データを返却
    return data as Article[];

  } catch(e) {
    // 予期せぬエラーの場合
    console.error('投稿取得エラー:', e);

    // 500エラーを返す
    throw createError({
      statusCode: 500,
      statusMessage: '投稿の取得中にエラーが発生しました'
    });
  }
});
