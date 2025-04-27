// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxtのバージョン互換性の日付を指定
  // Nuxtの新機能や破壊的変更を段階的に導入するための日付設定で、この日付以降のNuxtの機能や変更が適用される
  compatibilityDate: '2024-11-01',

  // Nuxt開発ツールの設定
  // 開発時のデバッグやパフォーマンス分析に役立つツールを有効化
  devtools: { enabled: true },

  // ランタイム設定
  // 環境変数やアプリケーションの実行時設定を管理
  // process.envから環境変数（.envファイルで定義された値）を読み込み
  runtimeConfig: {
    // プライベート環境変数（サーバーサイドのみ。クライアントサイドからはアクセス不可）
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,

    // パブリック環境変数（クライアントサイドでも利用可能。ブラウザ側のコードからもアクセス可）
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  }
})
