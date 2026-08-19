import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const validationErrors = ref({})
  const generalErrorMessage = ref('')
  const generalSuccessMessage = ref('')

  // State Pagination
  const pagination = ref({
    currentPage: 1,
    show: 10,
    perPage: 10,
    total: 0,
    lastPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })

  const apiUrl = import.meta.env.DEV_API_URL || ''

  // Helper Parser Error Terpusat (Object Key-Value & Array support)
  const parseApiError = (error) => {
    if (error.response?.data) {
      const resData = error.response.data
      generalErrorMessage.value = resData.message || 'Something went wrong.'

      // Jika response errors berbentuk Object { field: "message" } atau { field: ["message"] }
      if (resData.errors && typeof resData.errors === 'object' && !Array.isArray(resData.errors)) {
        const formatted = {}
        Object.entries(resData.errors).forEach(([field, msg]) => {
          formatted[field] = Array.isArray(msg) ? msg[0] : msg
        })
        validationErrors.value = formatted
      } 
      // Fallback jika response errors berbentuk Array
      else if (Array.isArray(resData.errors)) {
        const formatted = {}
        resData.errors.forEach(err => {
          if (err.field) formatted[err.field] = err.message
        })
        validationErrors.value = formatted
      }
    } else {
      generalErrorMessage.value = 'Network error or server unreachable.'
    }
  }

  const clearMessages = () => {
    validationErrors.value = {}
    generalErrorMessage.value = ''
    generalSuccessMessage.value = ''
  }

  // 1. Fetch Roles
  const fetchCompanies = async (page = null, show = null) => {
    isLoading.value = true
    try {
      const params = {}
      if (page) params.page = page
      if (show) params.show = show

      const response = await axios.get(`${apiUrl}/company`, { params })
      companies.value = Array.isArray(response.data?.data) ? response.data.data : []

      const pag = response.data.pagination || {}

      pagination.value = {
        currentPage: pag.current_page || page || 1,
        show: pag.show_item || 10,
        perPage: show || 10,
        total: pag.total_item || 0,
        lastPage: pag.total_page || 1,
        hasNextPage: pag.has_next_page ?? false,
        hasPrevPage: pag.has_prev_page ?? false,
      }
    } catch (error) {
      console.error('Fetch companies error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    companies,
    isLoading,
    pagination,
    isSubmitting,
    validationErrors,
    generalErrorMessage,
    generalSuccessMessage,
    clearMessages,
    fetchCompanies,
  }
})