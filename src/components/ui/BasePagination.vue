<!-- BasePagination.vue -->
<script setup>
import { computed } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'

const currentPage = defineModel('currentPage', { type: Number, default: 1 })

const props = defineProps({
  total: { type: Number, default: 0 },
  show: { type: Number, default: 10 },
  perPage: { type: Number, default: 10 },
  lastPage: { type: Number, default: 1 },
  hasNextPage: { type: Boolean, default: false },
  hasPrevPage: { type: Boolean, default: false },
})

const emit = defineEmits(['change'])

// Menghitung angka halaman yang ditampilkan (dengan titik-titik / ellipsis)
const pageNumbers = computed(() => {
  const totalPages = props.lastPage
  const current = currentPage.value
  const delta = 1
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(totalPages - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) range.unshift('...')
  if (current + delta < totalPages - 1) range.push('...')

  range.unshift(1)
  if (totalPages > 1) range.push(totalPages)

  return range
})

const changePage = (page) => {
  if (page === '...' || page === currentPage.value || page < 1 || page > props.lastPage) return
  currentPage.value = page
  emit('change')
}
</script>

<template>
  <!-- Display Mobile -->
  <div class="mt-3 d-sm-none">
    <div class="mx-auto text-center">
      <p class="small text-muted mb-2">
        Showing
        <span class="fw-semibold">{{ show }}</span>
        to
        <span class="fw-semibold">{{ perPage }}</span>
        of
        <span class="fw-semibold">{{ total }}</span>
        result
      </p>
      <nav>
        <ul class="pagination justify-content-center">
          <!-- Prev -->
          <li class="page-item" :class="{ disabled: !hasPrevPage }">
            <button type="button" class="page-link" @click="changePage(currentPage - 1)">
              <IconChevronLeft class="icon icon-1" />
            </button>
          </li>

          <!-- Page Numbers -->
          <li v-for="(page, index) in pageNumbers" :key="index" class="page-item"
            :class="{ active: page === currentPage, disabled: page === '...' }">
            <button type="button" class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>
          
          <!-- Next -->
          <li class="page-item" :class="{ disabled: !hasNextPage }">
            <button type="button" class="page-link" @click="changePage(currentPage + 1)">
              <IconChevronRight class="icon icon-1" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Display Desktop -->
  <div class="mt-3 mx-3 d-none flex-sm-fill d-sm-flex align-items-center justify-content-between">
    <p class="small text-muted m-0">
      Showing
      <span class="fw-semibold">{{ show }}</span>
      to
      <span class="fw-semibold">{{ perPage }}</span>
      of
      <span class="fw-semibold">{{ total }}</span>
      result
    </p>
    <nav>
      <ul class="pagination m-0">
        <!-- Prev -->
        <li class="page-item" :class="{ disabled: !hasPrevPage }">
          <button type="button" class="page-link" @click="changePage(currentPage - 1)">
            <IconChevronLeft class="icon" />
          </button>
        </li>

        <!-- Page Numbers -->
        <li v-for="(page, index) in pageNumbers" :key="index" class="page-item"
          :class="{ active: page === currentPage, disabled: page === '...' }">
          <button type="button" class="page-link" @click="changePage(page)">
            {{ page }}
          </button>
        </li>

        <!-- Next -->
        <li class="page-item" :class="{ disabled: !hasNextPage }">
          <button type="button" class="page-link" @click="changePage(currentPage + 1)">
            <IconChevronRight class="icon" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>