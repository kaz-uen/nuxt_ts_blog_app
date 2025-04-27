/**
 * シンプルなエラーロガー
 * - エラー内容、発生時刻、環境、スタックトレースなどを記録
 * - 本番環境では外部サービス連携やファイル出力にも拡張可能
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogOptions {
  level?: LogLevel;
  context?: string; // どの処理・ファイルで発生したか
  extra?: Record<string, any>; // 追加情報
}

/**
 * ログを出力する関数
 * @param message - ログメッセージ
 * @param error - Errorオブジェクトや任意の値
 * @param options - ログレベルやコンテキストなど
 */
export function logger(
  message: string,
  error?: unknown,
  options: LogOptions = {}
) {
  const { level = 'error', context, extra } = options;
  const timestamp = new Date().toISOString();
  let logMessage = `[${timestamp}] [${level.toUpperCase()}]`;

  if (context) logMessage += ` [${context}]`;
  logMessage += ` ${message}`;

  // エラー詳細を付加
  if (error instanceof Error) {
    logMessage += `\n  name: ${error.name}`;
    logMessage += `\n  message: ${error.message}`;
    logMessage += `\n  stack: ${error.stack}`;
  } else if (error) {
    logMessage += `\n  error: ${JSON.stringify(error)}`;
  }

  // 追加情報
  if (extra) {
    logMessage += `\n  extra: ${JSON.stringify(extra)}`;
  }

  // 本番環境で外部サービス連携やファイル出力に拡張可能
  if (process.env.NODE_ENV === 'production') {
    // 例: Sentryや外部APIに送信する処理をここに追加
    // sendToSentry(logMessage);
  }

  // サーバーサイド/クライアントサイドで出力先を分ける
  if (process.server) {
    // サーバー側はconsole.errorやファイル出力
    // eslint-disable-next-line no-console
    console.error(logMessage);
  } else {
    // クライアント側はconsole.error
    // eslint-disable-next-line no-console
    console.error(logMessage);
  }
}
