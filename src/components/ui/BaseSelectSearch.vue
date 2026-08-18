<!-- src/components/ui/BaseSelectSearchNative.vue -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { IconSearch, IconCheck, IconX } from '@tabler/icons-vue'

// defineModel bisa bernilai String/Number (single) atau Array (multiple)
const model = defineModel({ type: [String, Number, Array], default: '' })

const props = defineProps({
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  valueKey: { type: String, default: 'value' },
  labelKey: { type: String, default: 'label' },
  placeholder: { type: String, default: '-- Select Option --' },
  multiple: { type: Boolean, default: false },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true }
})

const isOpen = ref(false)
const searchQuery = ref('')
const wrapperRef = ref(null)

// 1. Filter opsi berdasarkan pencarian
const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  return props.options.filter(opt => {
    const text = typeof opt === 'object' ? opt[props.labelKey] : opt
    return String(text).toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

// 2. Helper Cek Apakah Opsi Sedang Terpilih
const isSelected = (opt) => {
  const val = typeof opt === 'object' ? opt[props.valueKey] : opt
  if (props.multiple) {
    return Array.isArray(model.value) && model.value.some(item => String(item) === String(val))
  }
  return String(model.value) === String(val)
}

// 3. Ambil List Item Terpilih (Khusus Multiple)
const selectedItems = computed(() => {
  if (!props.multiple || !Array.isArray(model.value)) return []
  return props.options.filter(opt => isSelected(opt))
})

// 4. Label Terpilih (Khusus Single)
const selectedSingleLabel = computed(() => {
  if (props.multiple || model.value === '' || model.value === null || model.value === undefined) return ''
  const found = props.options.find(opt => isSelected(opt))
  if (!found) return ''
  return typeof found === 'object' ? found[props.labelKey] : found
})

// 5. Cek Apakah Ada Nilai Terisi
const hasValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(model.value) && model.value.length > 0
  }
  return model.value !== '' && model.value !== null && model.value !== undefined
})

// 6. Handler Memilih Opsi
const selectOption = (opt) => {
  if (opt === null) {
    model.value = props.multiple ? [] : ''
    searchQuery.value = ''
    return
  }

  const val = typeof opt === 'object' ? opt[props.valueKey] : opt

  if (props.multiple) {
    const currentArr = Array.isArray(model.value) ? [...model.value] : []
    const index = currentArr.findIndex(item => String(item) === String(val))

    if (index > -1) {
      currentArr.splice(index, 1) // Hapus jika sudah terpilih
    } else {
      currentArr.push(val) // Tambahkan jika belum terpilih
    }
    model.value = currentArr
    // Dropdown TETAP TERBUKA untuk mempermudah pilih banyak
  } else {
    model.value = val
    isOpen.value = false // Dropdown DITUTUP jika single select
    searchQuery.value = ''
  }
}

// 7. Hapus 1 Tag/Badge (Khusus Multiple)
const removeTag = (opt, event) => {
  event.stopPropagation()
  selectOption(opt)
}

// 8. Reset Semua Pilihan
const clearAll = (event) => {
  event.stopPropagation()
  model.value = props.multiple ? [] : ''
  searchQuery.value = ''
}

const handleClickOutside = (e) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="mb-3 position-relative" ref="wrapperRef">
    <label v-if="label" class="form-label" :class="{ 'required': required }">{{ label }}</label>
    
    <!-- Trigger Button Input -->
    <div
      class="form-select cursor-pointer d-flex align-items-center flex-wrap gap-1 pe-4"
      :class="{ 'border-red': error }"
      style="min-height: 38px; height: auto;"
      @click="isOpen = !isOpen"
    >
      <!-- A. MULTIPLE SELECT: TAMPILKAN BADGES / TAGS -->
      <template v-if="multiple && selectedItems.length > 0">
        <span
          v-for="item in selectedItems"
          :key="typeof item === 'object' ? item[valueKey] : item"
          class="badge bg-primary-lt d-inline-flex align-items-center py-1 px-2"
        >
          {{ typeof item === 'object' ? item[labelKey] : item }}
          <IconX
            class="icon icon-1 ms-1 hover-danger cursor-pointer"
            style="width: 12px; height: 12px;"
            @click="removeTag(item, $event)"
          />
        </span>
      </template>

      <!-- B. SINGLE SELECT: TAMPILKAN TEKS SINGLE LABEL -->
      <template v-else-if="!multiple && selectedSingleLabel">
        <span class="text-truncate">{{ selectedSingleLabel }}</span>
      </template>

      <!-- C. PLACEHOLDER JIKA KOSONG -->
      <template v-else>
        <span class="text-secondary py-1">{{ placeholder }}</span>
      </template>

      <!-- TOMBOL RESET KESELURUHAN (CLEAR ALL) -->
      <IconX
        v-if="clearable && hasValue"
        class="icon icon-1 me-3 text-secondary hover-danger ms-auto me-1 flex-shrink-0"
        title="Clear all"
        @click="clearAll"
      />
    </div>

    <!-- Dropdown Menu Options -->
    <div 
      v-if="isOpen" 
      class="dropdown-menu show w-100 p-2 shadow-lg mt-1 position-absolute" 
      style="z-index: 1060; max-height: 250px; overflow-y: auto;"
    >
      <!-- Search Input -->
      <div class="input-icon mb-2">
        <span class="input-icon-addon"><IconSearch class="icon icon-1" /></span>
        <input
          type="text"
          v-model="searchQuery"
          class="form-control form-control-sm"
          placeholder="Search..."
          @click.stop
        />
      </div>

      <!-- Option Reset Default (Unselect All) -->
      <div
        v-if="clearable && !searchQuery"
        class="dropdown-item text-secondary cursor-pointer rounded py-1 px-2 mb-1 fst-italic"
        @click.stop="selectOption(null)"
      >
        {{ placeholder }}
      </div>

      <!-- Options List -->
      <div v-if="filteredOptions.length === 0" class="text-secondary text-center py-2 fs-6">
        No results found
      </div>
      
      <div
        v-for="opt in filteredOptions"
        :key="typeof opt === 'object' ? opt[valueKey] : opt"
        class="dropdown-item d-flex align-items-center justify-content-between cursor-pointer rounded py-1 px-2 mb-1"
        :class="{ 'active': isSelected(opt) }"
        @click.stop="selectOption(opt)"
      >
        <span>{{ typeof opt === 'object' ? opt[labelKey] : opt }}</span>
        <IconCheck v-if="isSelected(opt)" class="icon icon-1 ms-2" />
      </div>
    </div>

    <small v-if="error" class="text-red fst-italic mt-1 d-block">{{ error }}</small>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.hover-danger:hover {
  color: var(--tblr-danger, #d63939) !important;
}
</style>