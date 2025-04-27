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
    /**
     * 【注意点】
     * ・Anon Keyはパブリック環境変数として公開しても問題ないが、Service Key（管理者権限キー）は絶対に使わないこと。
     * ・Service Keyをpublicに入れると重大なセキュリティリスクになる。
     *  =>Service Keyは「管理者権限」を持つ非常に強力なキーのため、これがpublic（クライアントサイド）に露出すると、
     *    誰でもデータベースの全操作（読み書き・削除・RLS無視など）が可能になってしまう。
     * ・プライベート環境変数であれば、以下のようなケースでService Keyを使うことが考えられる（基本的にはどちらもAnon Keyで十分）。
     *    1. バックエンドでRLS（Row Level Security）を無視して全データを取得・操作したい場合
     *    2. 管理者用のバッチ処理や、特別なAPIエンドポイントで全権限が必要な場合
     *    3. Supabaseの管理者権限でしかできない操作（例：ユーザー管理、システム的なデータ修正など）
     */

    // プライベート環境変数（サーバーサイドのみ。クライアントサイドからはアクセス不可）
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_ANON_KEY!,
    // ノン・ヌルアサーション（!）を付けることで「必ず値が入っている」とTypeScriptに伝える。
    // .envに値が入っていない場合は、ランタイムエラーになるので注意。

    // パブリック環境変数（クライアントサイドでも利用可能。ブラウザ側のコードからもアクセス可）
    public: {
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_ANON_KEY!,
    }
  }
})
