<template>
  <div class="page page-center">
    <div class="container container-tight py-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-center {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>