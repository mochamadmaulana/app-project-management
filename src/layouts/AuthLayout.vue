<template>
  <div class="auth-layout">
    <!-- Mengatur halaman Login/Register agar berada tepat di tengah layar -->
    <main class="auth-container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  padding: 1rem;
}

.auth-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>