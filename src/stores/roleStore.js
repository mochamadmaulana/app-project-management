import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useRoleStore = defineStore('role', () => {
  const roles = ref([])
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
  const fetchRoles = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(`${apiUrl}/role`)
      roles.value = Array.isArray(response.data?.data) ? response.data.data : []
    } catch (error) {
      console.error('Fetch roles error:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 2. Create Role
  const createRole = async (payload) => {
    isSubmitting.value = true
    clearMessages()
    try {
      const response = await axios.post(`${apiUrl}/role`, payload)
      generalSuccessMessage.value = response.data?.message || 'Role created successfully!'
      await fetchRoles()
    } catch (error) {
      parseApiError(error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  // 3. Update Role
  const updateRole = async (id, payload) => {
    isSubmitting.value = true
    clearMessages()
    try {
      const response = await axios.put(`${apiUrl}/role/${id}`, payload)
      generalSuccessMessage.value = response.data?.message || 'Role updated successfully!'
      await fetchRoles()
    } catch (error) {
      parseApiError(error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  // 4. Delete Role
  const deleteRole = async (id) => {
    clearMessages()
    try {
      const response = await axios.delete(`${apiUrl}/role/${id}`)
      generalSuccessMessage.value = response.data?.message || 'Role deleted successfully!'
      await fetchRoles()
    } catch (error) {
      parseApiError(error)
      throw error
    }
  }

  return {
    roles,
    isLoading,
    isSubmitting,
    validationErrors,
    generalErrorMessage,
    generalSuccessMessage,
    clearMessages,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole
  }
})