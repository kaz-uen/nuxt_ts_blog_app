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
  const now = new Date();
  const timestamp = now.toISOString();
  const readableTimestamp = now.toLocaleString();
  let logMessage = `[${readableTimestamp}] [${timestamp}] [${level.toUpperCase()}]`;

  if (context) logMessage += ` [${context}]`;
  logMessage += ` ${message}`;

  // エラー詳細を付加
  if (error instanceof Error) {
    logMessage += `\n  name: ${error.name}`;
    logMessage += `\n  message: ${error.message}`;
    logMessage += `\n  stack: ${error.stack}`;
  } else if (error) {
    try {
      logMessage += `\n  error: ${JSON.stringify(error)}`;
    } catch (e) {
      logMessage += `\n  error: [シリアライズできないオブジェクト]`;
    }
  }

  // 追加情報
  if (extra) {
    try {
      logMessage += `\n  extra: ${JSON.stringify(extra)}`;
    } catch (e) {
      logMessage += `\n  extra: [シリアライズできないオブジェクト]`;
    }
  }

  // 本番環境で外部サービス連携やファイル出力に拡張可能
  if (process.env.NODE_ENV === 'production') {
    // 例: Sentryや外部APIに送信する処理をここに追加
    // sendToSentry(logMessage);
  }

  // レベルに応じたログメソッドを使用
  // eslint-disable-next-line no-console
  switch (level) {
    case 'info':
      console.info(logMessage);
      break;
    case 'warn':
      console.warn(logMessage);
      break;
    case 'error':
      console.error(logMessage);
      break;
  }
}
