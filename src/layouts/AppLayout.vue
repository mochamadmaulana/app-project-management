<script setup>
import AppNavbar from '@/components/common/AppNavbar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<template>
  <div class="page">
    <AppNavbar />
     <div class="page-wrapper">
       <!-- Slot ini akan diisi oleh <router-view /> dari App.vue -->
       <slot />
       <AppFooter />
     </div>
  </div>
</template>