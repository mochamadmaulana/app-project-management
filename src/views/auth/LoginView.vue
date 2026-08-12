<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
  <div class="login-card">
    <h2>Masuk ke Akun</h2>
    <p class="subtitle">Silakan masukkan email dan kata sandi Anda</p>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="nama@email.com" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" required />
      </div>

      <button type="submit" class="btn-submit" :disabled="isLoading">
        {{ isLoading ? 'Memproses...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: auto;
}

h2 {
  margin: 0 0 0.25rem 0;
  color: #0f172a;
}

.subtitle {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
}

input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
}

input:focus {
  border-color: #0284c7;
}

.btn-submit {
  background-color: #0284c7;
  color: #ffffff;
  border: none;
  padding: 0.7rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>