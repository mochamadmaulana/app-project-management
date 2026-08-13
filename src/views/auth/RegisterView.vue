<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { IconSend } from '@tabler/icons-vue'

const router = useRouter()

const fullname = ref('')
const email = ref('')
const password = ref('')
const company_name = ref('')
const company_email = ref('')
const company_telephone = ref('')
const company_address = ref('')
const isLoading = ref(false)

const handleRegister = () => {
  isLoading.value = true

  // Simulasi proses async/login
  setTimeout(() => {
    isLoading.value = false
    router.push('/')
  }, 1000)
}
</script>

<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="h2 text-center mb-4">Registration account</h2>
      <form @submit.prevent="handleRegister" autocomplete="off">
        <div class="hr-text">Profile</div>
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input type="text" v-model="fullname" id="fullname" class="form-control" placeholder="Jhon Doe" autocomplete="off" />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" v-model="email" id="email" class="form-control" placeholder="your@email.com" autocomplete="off" />
        </div>
        <div class="mb-2">
          <label class="form-label">Password</label>
          <input type="password" v-model="password" id="password" class="form-control" placeholder="Your password" autocomplete="off" />
        </div>

        <div class="hr-text">Company</div>

        <div class="mb-3">
          <label class="form-label">Company name</label>
          <input type="text" v-model="company_name" id="company_name" class="form-control" placeholder="Your company" autocomplete="off" />
        </div>
        <div class="mb-3">
          <label class="form-label">Company email</label>
          <input type="email" v-model="company_email" id="company_email" class="form-control" placeholder="company@email.com" autocomplete="off" />
        </div>
        <div class="mb-3">
          <label class="form-label">Telephone</label>
          <input type="email" v-model="company_telephone" id="company_telephone" class="form-control" placeholder="08***********" autocomplete="off" />
        </div>
        <div class="mb-3">
          <label class="form-label">Address</label>
          <textarea v-model="company_address" id="company_address" class="form-control" cols="3" rows="3" placeholder="Merdeka street..."></textarea>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            <div v-if="isLoading">
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...
            </div>
            <div v-else>
              <IconSend class="icon icon-1" />
              Registration
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="text-center text-secondary mt-3">Already have account? <RouterLink to="/" tabindex="-1">Sign in</RouterLink></div>
</template>