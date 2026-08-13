// src/composables/useDarkMode.js
import { ref } from 'vue'

const isDarkMode = ref(false)

export function darkMode() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      enableDarkMode()
    } else {
      enableLightMode()
    }
  }

  const enableDarkMode = () => {
    isDarkMode.value = true
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    document.body.setAttribute('data-bs-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }

  const enableLightMode = () => {
    isDarkMode.value = false
    document.documentElement.setAttribute('data-bs-theme', 'light')
    document.body.setAttribute('data-bs-theme', 'light')
    localStorage.setItem('theme', 'light')
  }

  const toggleDarkMode = () => {
    if (isDarkMode.value) {
      enableLightMode()
    } else {
      enableDarkMode()
    }
  }

  return {
    isDarkMode,
    initTheme,
    toggleDarkMode
  }
}