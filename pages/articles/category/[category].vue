<script setup lang="ts">
import { capitalizeFirstLetter } from '@/utils/string';
import { toStringOrEmpty } from '@/types';

const route = useRoute();
const category = toStringOrEmpty(route.params.category);
</script>
<template>
  <div>
    <h1>{{ capitalizeFirstLetter(category) }}</h1>
    <ArticleList :category="category" />

    <div class="linkContainer">
      <NuxtLink :to="{name: 'index'}">記事一覧に戻る</NuxtLink>
    </div>
  </div>
</template>
