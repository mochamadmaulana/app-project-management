<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconLogin2 } from '@tabler/icons-vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true

  // Simulasi proses async/login
  setTimeout(() => {
    isLoading.value = false
    router.push('/dashboard')
  }, 1000)
}
</script>

<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="h2 text-center mb-4">Login to your account</h2>
      <form @submit.prevent="handleLogin" autocomplete="off" novalidate>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" placeholder="your@email.com" autocomplete="off" />
        </div>
        <div class="mb-2">
          <label class="form-label">
            Password
            <span class="form-label-description">
              <a href="./forgot-password.html">I forgot password</a>
            </span>
          </label>
          <input type="password" v-model="password" class="form-control" placeholder="Your password" autocomplete="off" />
        </div>
        <div class="form-footer">
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            <div v-if="isLoading">
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...
            </div>
            <div v-else>
              <IconLogin2 class="icon icon-1" />
              Login
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="text-center text-secondary mt-3">Don't have account yet? <a href="./sign-up.html" tabindex="-1">Sign up</a></div>
</template>