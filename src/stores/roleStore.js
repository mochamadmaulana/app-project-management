// src/stores/roleStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useRoleStore = defineStore('role', () => {
  const roles = ref([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const validationErrors = ref({})
  const generalErrorMessage = ref('')

  const apiUrl = import.meta.env.DEV_API_URL;

  // 1. Fetch Roles
  const fetchRoles = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(`${apiUrl}/role`)
      roles.value = response.data.data || {}
    } catch (error) {
      throw error
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 500);
    }
  }

  // 2. Create Role
  const createRole = async (payload) => {
    isSubmitting.value = true
    validationErrors.value = {}
    generalErrorMessage.value = ''
    if (!payload.name) {
      payload.name = null
    }

    try {
      await axios.post(`${apiUrl}/role`, payload)
      await fetchRoles()
    } catch (error) {
      if (error.response && error.response.data) {
        const resData = error.response.data

        generalErrorMessage.value = resData.message || 'Something wrong.'

        if (Array.isArray(resData.errors)) {
          const formattedErrors = {}
          resData.errors.forEach((err) => {
            formattedErrors[err.field] = err.message
          })
          validationErrors.value = formattedErrors
        }
      }
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  // 3. Update Role
  const updateRole = async (id, payload) => {
    isSubmitting.value = true
    validationErrors.value = {}
    generalErrorMessage.value = ''
    if (!payload.name) {
      payload.name = null
    }

    try {
      await axios.put(`${apiUrl}/role/${id}`, payload)
      await fetchRoles()
    } catch (error) {
      if (error.response && error.response.data) {
        const resData = error.response.data

        generalErrorMessage.value = resData.message || 'Something wrong.'

        if (Array.isArray(resData.errors)) {
          const formattedErrors = {}
          resData.errors.forEach((err) => {
            formattedErrors[err.field] = err.message
          })
          validationErrors.value = formattedErrors
        }
      }
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  // 4. Delete Role
  const deleteRole = async (id) => {
    try {
      await axios.delete(`${apiUrl}/role/${id}`)
      await fetchRoles()
    } catch (error) {
      throw error
    }
  }

  return {
    roles,
    isLoading,
    isSubmitting,
    validationErrors,
    generalErrorMessage,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole
  }
})