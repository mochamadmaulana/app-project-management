<script setup>
const show = defineModel('show', { 
  type: Boolean, 
  default: false 
})

defineProps({
  title: { type: String, default: '' },
  size: { type: String, default: '' },
  statusColor: { type: String, default: '' }
})

const closeModal = () => {
  show.value = false
}
</script>

<template>
  <Teleport to="body">
    <template v-if="show">
      <div class="modal-backdrop fade show" @click="closeModal"></div>
      <div class="modal modal-blur fade show d-block" tabindex="-1" role="dialog" aria-modal="true">
        <div class="modal-dialog modal-dialog-centered" :class="size ? `modal-${size}` : ''" role="document">
          <div class="modal-content">
            <div v-if="statusColor" class="modal-status" :class="statusColor"></div>
            
            <div class="modal-header" v-if="title || $slots.header">
              <slot name="header">
                <h5 class="modal-title">{{ title }}</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </slot>
            </div>

            <slot />
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>