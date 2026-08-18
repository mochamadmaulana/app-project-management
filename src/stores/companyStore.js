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
  const fetchCompany = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(`${apiUrl}/company`)
      companies.value = Array.isArray(response.data?.data) ? response.data.data : []
    } catch (error) {
      console.error('Fetch companies error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    companies,
    isLoading,
    isSubmitting,
    validationErrors,
    generalErrorMessage,
    generalSuccessMessage,
    clearMessages,
    fetchCompany,
  }
})