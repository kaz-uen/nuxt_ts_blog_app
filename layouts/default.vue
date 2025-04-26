<template>
  <div class="inner">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>
<style scoped>
.inner {
  max-width: 1200px;
  margin-inline: auto;
}
</style>
