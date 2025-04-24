<script setup lang="ts">
import type { Article } from '@/types';

const post = ref<Article | undefined>();
const error = ref<string | null>(null);
const loading = ref<Boolean>(true);

const route = useRoute();

async function getPost() {
  try {
    const res = await fetch(`http://localhost:3001/posts/${route.params.id}`);
    post.value = await res.json();
    console.log('post:', post)
  } catch(e) {
    error.value = e instanceof Error ? e.message : '投稿の取得中にエラーが発生しました';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getPost();
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
    <article v-else>
      <Image
        src=""
        alt=""
        width={1280}
        height={300}
      />
      <div>
        <NuxtLink :to="{name: 'index'}">Technology</NuxtLink>
        <h2>
          {{ post?.title }}
        </h2>
        <p>By taro, Published on {{ new Date(post.createdAt).toLocaleDateString() }}</p>
        <div>
          {{ post?.content }}
        </div>
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
