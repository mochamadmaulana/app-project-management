// src/stores/roleStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useRoleStore = defineStore('role', () => {
  const roles = ref([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const validationErrors = ref({})

  const apiUrl = import.meta.env.DEV_API_URL;

  // 1. Fetch Roles
  const fetchRoles = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(`${apiUrl}/role`)
      roles.value = response.data.data || {}
    } catch (error) {
      console.error('Failed fetching role:', error)
      throw error
    } finally {
      setTimeout(() => {
        isLoading.value = false
      },500);
    }
  }

  return {
    roles,
    isLoading,
    isSubmitting,
    validationErrors,
    fetchRoles,
  }
})