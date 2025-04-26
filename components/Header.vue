<script setup lang="ts">
</script>
<template>
  <header class="header">
    <h1 class="heading">
      <NuxtLink :to="{name: 'index'}">Nuxt3 Blog</NuxtLink>
    </h1>
    <nav class="nav">
      <NuxtLink :to="{name: 'articles-new'}" class="navLink">記事を書く</NuxtLink>
    </nav>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}
.heading {
  font-size: 24px;
}
.navLink {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: orange;
  transition: all 0.3s;
}
.navLink:hover {
  opacity: 0.7;
}
.nav-link:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}
</style>
