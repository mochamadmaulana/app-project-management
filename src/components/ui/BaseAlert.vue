<script setup>
import { computed } from 'vue'
import { IconCheck, IconAlertCircle, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-vue'

const props = defineProps({
  type: { type: String, default: 'success' },
  message: { type: String, default: '' }
})

const alertConfig = computed(() => {
  switch (props.type) {
    case 'danger':
      return { class: 'alert-danger text-danger', icon: IconAlertCircle }
    case 'warning':
      return { class: 'alert-warning text-warning', icon: IconAlertTriangle }
    case 'info':
      return { class: 'alert-info text-info', icon: IconInfoCircle }
    case 'success':
    default:
      return { class: 'alert-green text-green', icon: IconCheck }
  }
})
</script>

<template>
  <div v-if="message" class="alert d-flex align-items-center alert-dismissible" :class="alertConfig.class" role="alert">
    <component :is="alertConfig.icon" class="icon icon-1 me-2 flex-shrink-0" />
    <div>{{ message }}</div>
    <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
  </div>
</template>