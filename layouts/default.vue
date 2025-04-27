<template>
  <div class="inner">
    <Header />
    <main>
      <slot />
    </main>
  </div>
  <Footer />
</template>
<style scoped>
.inner {
  max-width: 1200px;
  margin-inline: auto;
}
</style>
