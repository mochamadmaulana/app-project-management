<script setup>
const model = defineModel({ 
  type: String, 
  default: '' 
})

defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [String, Number], default: 3 },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <div class="mb-3">
    <label v-if="label" class="form-label" :class="{ 'required': required }">{{ label }}</label>
    <textarea
      v-model="model"
      :rows="rows"
      class="form-control"
      :class="{ 'border-red': error }"
      :placeholder="placeholder"
      :disabled="disabled"
    ></textarea>
    <small v-if="error" class="text-red fst-italic mt-1 d-block">{{ error }}</small>
  </div>
</template>