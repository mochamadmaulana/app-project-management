<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/stores/companyStore';

import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

import { 
  IconPencil,
  IconTrash,
  IconLoader,
  IconSearch,
  IconPlus,
  IconX,
  IconSend,
  IconSettings
} from '@tabler/icons-vue'

const companyStore = useCompanyStore()
const {
  companies,
  isLoading,
  isSubmitting,
  validationErrors,
  generalErrorMessage,
  generalSuccessMessage
} = storeToRefs(companyStore)

const showFormModal = ref(false)
const isEditMode = ref(false)
const searchQuery = ref('')

const form = reactive({
  id: null,
  name: null
})

// Filter Pencarian Lokal (Client-Side)
const filteredCompanies = computed(() => {
  if (!searchQuery.value) return companies.value
  return companies.value.filter(role =>
    role.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const openCreateModal = () => {
  isEditMode.value = false
  showFormModal.value = true
  resetForm()
}

const openEditModal = (role) => {
  isEditMode.value = true
  roleStore.clearMessages()
  form.id = role.id
  form.name = role.name || ''
  showFormModal.value = true
}

const openDeleteModal = (id) => {
  form.id = id
  showDeleteModal.value = true
}

const resetForm = () => {
  form.id = null
  form.name = ''
  // roleStore.clearMessages()
}

onMounted(() => {
  companyStore.fetchCompany()
})
</script>

<template>
  <!-- Header Page -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div class="page-pretitle">Setting</div>
          <h2 class="page-title">Company</h2>
        </div>
        <div class="col-auto ms-auto d-print-none">
          <button class="btn btn-primary d-none d-sm-inline-block" @click="openCreateModal">
            <IconPlus class="icon me-1" />
            Create Company
          </button>
          <button class="btn btn-primary d-sm-none btn-icon" @click="openCreateModal">
            <IconPlus class="icon" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Alert Global Sukses -->
  <div v-if="generalSuccessMessage" class="container-xl mt-3">
    <BaseAlert type="success" :message="generalSuccessMessage" />
  </div>

  <div class="page-body">
    <div class="container-xl">
      <div class="card">
        <div class="card-body">

          <!-- Search Bar -->
          <div class="col-lg-6 mb-3">
            <div class="input-icon">
              <span class="input-icon-addon">
                <IconSearch class="icon" />
              </span>
              <input
                type="search"
                v-model="searchQuery"
                class="form-control"
                placeholder="Search..."
                autocomplete="off"
              />
            </div>
          </div>

          <!-- Table List -->
          <div class="table-responsive">
            <table class="table table-vcenter card-table table-striped">
              <thead>
                <tr>
                  <th style="width: 60px;">No</th>
                  <th>Name</th>
                  <th style="width: 120px;" class="text-center">
                    <IconSettings class="icon icon-1" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading">
                  <td colspan="3" class="text-center py-4">
                    <IconLoader :size="24" class="animate-spin text-secondary me-2" />
                    <span>Loading data...</span>
                  </td>
                </tr>

                <tr v-else-if="filteredCompanies.length === 0">
                  <td colspan="3" class="text-center py-4 text-secondary">
                    Data not found.
                  </td>
                </tr>

                <tr v-else v-for="(role, index) in filteredCompanies" :key="role.id">
                  <td>{{ index + 1 }}</td>
                  <td >{{ role.name }}</td>
                  <td class="text-end">
                    <button
                      type="button"
                      class="btn btn-outline-green btn-icon me-1"
                      title="Edit"
                      @click="openEditModal(role)"
                    >
                      <IconPencil class="icon" />
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-red btn-icon"
                      title="Delete"
                      @click="openDeleteModal(role.id)"
                    >
                      <IconTrash class="icon" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Modal Form (Create / Edit) Menggunakan v-model:show -->
  <BaseModal
    v-model:show="showFormModal"
    :title="isEditMode ? 'Edit Company' : 'Add New Company'"
    :status-color="isEditMode ? 'bg-green' : 'bg-primary'"
  >
    <form @submit.prevent="handleSubmit">
      <div class="modal-body">
        <BaseAlert type="danger" :message="generalErrorMessage" class="mb-3" />

        <!-- BaseInput -->
        <BaseInput
          v-model="form.name"
          label="Name"
          placeholder="Example: PT ABC"
          :error="validationErrors.name"
          required
        />
      </div>

      <div class="modal-footer">
        <button type="button" class="btn link-secondary" @click="showFormModal = false">
          <IconX class="icon me-1" />
          Cancel
        </button>

        <button
          type="submit"
          :class="isEditMode ? 'btn-green' : 'btn-primary'"
          class="btn ms-auto"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
          <template v-else>
            <IconSend class="icon me-1" />
            {{ isEditMode ? 'Update' : 'Save' }}
          </template>
        </button>
      </div>
    </form>
  </BaseModal>

</template>


<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>