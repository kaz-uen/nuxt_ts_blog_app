<script setup lang="ts">
const route = useRoute();
</script>
<template>
  <div>
    <h1>{{ route.params.category }}</h1>
    <ArticleList :category="route.params.category" />

    <div class="linkContainer">
      <NuxtLink :to="{name: 'index'}">記事一覧に戻る</NuxtLink>
    </div>
  </div>
</template>
