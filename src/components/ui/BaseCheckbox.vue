<script setup>
const model = defineModel({ 
  type: Boolean, 
  default: false 
})

defineProps({
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <div class="mb-3">
    <label class="form-check">
      <input
        type="checkbox"
        v-model="model"
        class="form-check-input"
        :class="{ 'border-red': error }"
        :disabled="disabled"
      />
      <span class="form-check-label">{{ label }}</span>
    </label>
    <small v-if="error" class="text-red fst-italic mt-1 d-block">{{ error }}</small>
  </div>
</template>