<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <small>&copy; {{ currentYear }} Nuxt3 Blog. All rights reserved.</small>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 2rem 0;
  margin-top: 2rem;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.footer small {
  color: #666;
  font-size: 0.875rem;
}
</style>
