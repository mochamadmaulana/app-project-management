<script setup>
import { onMounted, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { darkMode } from '@/utils/userDarkMode'

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()
const { initTheme } = darkMode()

onMounted(() => {
  initTheme()
})

const layouts = {
  AppLayout,
  AuthLayout,
}

const currentLayout = computed(() => layouts[route.meta.layout] || AppLayout)
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
