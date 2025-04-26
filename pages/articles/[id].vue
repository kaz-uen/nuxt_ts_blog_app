<script setup lang="ts">
const route = useRoute();
console.log(route);
</script>
<template>
  <div>
    <h1>記事詳細</h1>
    <ArticleDetail />
    <div class="linkContainer">
      <NuxtLink :to="{name: 'index'}">記事一覧に戻る</NuxtLink>
    </div>
  </div>
</template>
<style scoped>
.linkContainer {
  text-align: center;
}
</style>
