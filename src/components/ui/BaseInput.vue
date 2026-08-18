<script setup>
const model = defineModel({ 
  type: [String, Number], 
  default: '' 
})

defineProps({
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <div class="mb-3">
    <label v-if="label" class="form-label" :class="{ 'required': required }">{{ label }}</label>
    <input
      :type="type"
      v-model="model"
      class="form-control"
      :class="{ 'border-red': error }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <small v-if="error" class="text-red fst-italic mt-1 d-block">{{ error }}</small>
  </div>
</template>