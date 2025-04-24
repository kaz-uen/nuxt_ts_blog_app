<script setup lang="ts">
import type { Article } from '@/types';

const posts = ref<Article[]>([]);
const error = ref<string | null>(null);
const loading = ref<Boolean>(true);

async function getPosts() {
  try {
    const res = await fetch('http://localhost:3001/posts');
    posts.value = await res.json();
  } catch(e) {
    error.value = e instanceof Error ? e.message : '投稿の取得中にエラーが発生しました';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getPosts();
})
</script>

<template>
  <div>
    <div v-if="loading">
      <p>読み込み中...</p>
    </div>
    <div v-else-if="error">
      <p>エラーが発生しました: {{ error }}</p>
    </div>
    <div v-else-if="posts.length === 0">
      <p>投稿がありません</p>
    </div>
    <article v-else v-for="post in posts" :key="post.id">
      <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}">
        <Image
          src=""
          alt=""
          width={1280}
          height={300}
        />
      </NuxtLink>
      <div>
        <NuxtLink :to="{name: 'index'}">Technology</NuxtLink>
        <h2>
          <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}">{{ post.title }}</NuxtLink>
        </h2>
        <p>By taro, Published on {{ new Date(post.createdAt).toLocaleDateString() }}</p>
        <div>
          <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}">
            {{ post.content.length > 5 ? post.content.slice(0, 10) + '...' : post.content }}
          </NuxtLink>
        </div>
        <NuxtLink :to="{name: 'articles-id', params: {id: post.id}}">続きを読む</NuxtLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
article {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
}

h2 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

div {
  margin: 1rem 0;
  line-height: 1.6;
}
</style>
