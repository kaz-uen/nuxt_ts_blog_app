<script setup lang="ts">
import type { Article } from '@/types';
import { formatDate } from '@/utils/date';

const posts = ref<Article[]>([]);
const error = ref<string | null>(null);
const loading = ref<boolean>(true);

// ローカルAPIのURL（Supabaseで失敗した場合のフォールバック用）
const localURL = 'http://localhost:3001';

// 渡ってくるcategory propsを受け取る
const { category } = defineProps<{ category?: string }>();

// フィルタされた投稿データ
// この時点ではpostsは空配列なので、filterPostsも空配列を返す
const filterPosts = computed(() => {
  // カテゴリが指定されていない場合は全ての投稿を返す
  if (!category) return posts.value;

  return posts.value.filter((post) => post.category === category);
  /**
   * <遅延評価（Lazy Evaluation）>
   * - 計算プロパティは「遅延評価」という特徴を持っています
   * - これは、実際に値が必要になるまで計算が実行されないということを意味します
   * - 最初の定義時には計算は行われず、実際に値が参照されたときに初めて計算が実行されます
   */
});

// 投稿データの取得
// getPostsが実行されてpostsの値が更新されると、filterPostsも自動的に更新される
async function getPosts() {
  // まずはSupabaseから取得
  try {
    // postsテーブルからデータを取得
    const { data, error: fetchError, pending } = await useFetch<Article[]>('/api/posts');

    // loadingステートをuseFetchのpendingと同期
    loading.value = pending.value;

    // エラーチェック
    if (fetchError.value) {
      throw new Error(fetchError.value.message);
    }

    if (!data.value) {
      throw new Error('データを取得できませんでした');
    }

    posts.value = data.value; // ここでpostsが更新される
    // この更新により、filterPostsも自動的に再計算される
  } catch(e) {
    // Supabaseで失敗した場合、ローカルAPIから再取得
    try {
      const res = await fetch(`${localURL}/posts`);
      if (!res.ok) {
        throw new Error(`ローカルAPIエラー： ${res.status}`);
      }
      posts.value = await res.json();
    } catch(e2) {
      error.value = e2 instanceof Error ? e2.message : '投稿の取得中にエラーが発生しました';
      posts.value = [];
    }
  } finally {
    loading.value = false;
  }
}
getPosts();
/**
 * <実行の流れ>
 * - filterPostsが定義された時点では、postsは空配列です
 * - その後getPostsが実行され、posts.valueに新しい値が代入されます
 * - この値の変更をVueのリアクティビティシステムが検知し、filterPostsの再計算をトリガーします
 * - その結果、最新のpostsの値に基づいてフィルタリングが行われます
 */

// 投稿の内容を適切な長さに切り詰める関数
const truncateContent = (content: string, maxLength: number = 100) => {
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength)}...`;
};
</script>

<template>
  <div class="article-list">
    <!-- ローディング中の表示 -->
    <div v-if="loading" class="loading">
      <span class="loading-spinner"></span>
      <p>読み込み中...</p>
    </div>

    <!-- エラー発生時の表示 -->
    <div v-else-if="error" class="error-message">
      <p>エラーが発生しました: {{ error }}</p>
      <button @click="getPosts" class="retry-button">再試行</button>
    </div>

    <!-- 投稿がない場合の表示 -->
    <!-- <div v-else-if="posts.length === 0" class="no-posts"> -->
    <div v-else-if="filterPosts.length === 0" class="no-posts">
      <p>{{ category ? `${category}カテゴリーの投稿はありません` : '投稿がありません' }}</p>
    </div>

    <!-- 投稿一覧の表示 -->
    <!-- <article v-else v-for="post in posts" :key="post.id" class="article-card"> -->
    <article v-else v-for="post in filterPosts" :key="post.id" class="article-card">
      <!-- <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}" class="article-image"> -->
      <NuxtLink :to="`/articles/${post.id}`" class="article-image">
        <!-- ↓publicフォルダはビルド時に特別な扱いを受けるため、/publicを含めないパスで参照 -->
        <img
          :src="post.thumbnail || '/images/default-thumbnail.jpeg'"
          alt=""
          width="750"
          height="300"
          class="thumbnail"
        />
      </NuxtLink>
      <div class="article-content">
        <h2 class="article-title">
          <!-- <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}">{{ post.title }}</NuxtLink> -->
          <NuxtLink :to="`/articles/${post.id}`">{{ post.title }}</NuxtLink>
        </h2>
        <p class="article-meta">
          {{ post.category || 'No Category' }} | By {{ post.author || 'Unknown' }} | {{ formatDate(post.createdAt) }}
        </p>
        <div class="article-excerpt">
            {{ truncateContent(post.content) }}
        </div>
        <!-- <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}"> -->
        <NuxtLink :to="`/articles/${post.id}`" class="read-more">
          続きを読む
          <span class="arrow">→</span>
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 0 auto;
}

.article-card {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-title {
  margin: 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.article-meta {
  color: #666;
  font-size: 0.9rem;
}

.article-excerpt {
  margin: 1rem 0;
  line-height: 1.6;
  color: #444;
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.arrow {
  margin-left: 0.5rem;
  transition: transform 0.2s;
}

.read-more:hover .arrow {
  transform: translateX(4px);
}

.loading {
  text-align: center;
  padding: 2rem;
}

.error-message {
  text-align: center;
  color: #dc3545;
  padding: 2rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.thumbnail {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.loading-spinner {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 4px solid #eee;
  border-top: 4px solid #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
