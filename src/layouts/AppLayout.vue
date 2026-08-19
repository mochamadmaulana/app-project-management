<script setup>
import AppNavbar from '@/components/common/AppNavbar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<template>
  <div class="page">
    <AppNavbar />
     <div class="page-wrapper">
        <main class="main-page container-xl">
          <slot />
        </main>
       <AppFooter />
     </div>
  </div>
</template>

<style scoped>
.main-page {
  padding-bottom: 70px; 
}
</style>