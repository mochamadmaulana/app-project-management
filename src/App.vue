<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()

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
