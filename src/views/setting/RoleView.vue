<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoleStore } from '@/stores/roleStore'

// Components UI Reusable
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'

// Icons
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

const roleStore = useRoleStore()
const {
  roles,
  isLoading,
  isSubmitting,
  validationErrors,
  generalErrorMessage,
  generalSuccessMessage
} = storeToRefs(roleStore)

// State Modal & Mode
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const searchQuery = ref('')

// Form State
const form = reactive({
  id: null,
  name: '',
})

// Filter Pencarian Lokal (Client-Side)
const filteredRoles = computed(() => {
  if (!searchQuery.value) return roles.value
  return roles.value.filter(role =>
    role.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const resetForm = () => {
  form.id = null
  form.name = ''
}

const openCreateModal = () => {
  isEditMode.value = false
  resetForm()
  roleStore.clearMessages()
  showFormModal.value = true
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

const handleSubmit = async () => {
  try {
    const payload = {
      name: form.name.toLowerCase(),
    }

    if (isEditMode.value) {
      await roleStore.updateRole(form.id, payload)
    } else {
      await roleStore.createRole(payload)
    }
    showFormModal.value = false
    resetForm()
    setTimeout(() => {
      roleStore.clearMessages()
    }, 3000)
  } catch (error) {
    // Handling error ditangani roleStore
  }
}

const handleDelete = async () => {
  try {
    await roleStore.deleteRole(form.id)
    showDeleteModal.value = false
    setTimeout(() => {
      roleStore.clearMessages()
    }, 3000)
  } catch (error) {
    alert('Deleted failed.')
  }
}

onMounted(() => {
  roleStore.fetchRoles()
})
</script>

<template>
  <!-- Header Page -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div class="page-pretitle">Setting</div>
          <h2 class="page-title">Role</h2>
        </div>
        <div class="col-auto ms-auto d-print-none">
          <button class="btn btn-primary d-none d-sm-inline-block" @click="openCreateModal">
            <IconPlus class="icon me-1" />
            Create Role
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

                <tr v-else-if="filteredRoles.length === 0">
                  <td colspan="3" class="text-center py-4 text-secondary">
                    Data not found.
                  </td>
                </tr>

                <tr v-else v-for="(role, index) in filteredRoles" :key="role.id">
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
    :title="isEditMode ? 'Edit Role' : 'Add New Role'"
    :status-color="isEditMode ? 'bg-green' : 'bg-primary'"
  >
    <form @submit.prevent="handleSubmit">
      <div class="modal-body">
        <BaseAlert type="danger" :message="generalErrorMessage" class="mb-3" />

        <!-- BaseInput -->
        <BaseInput
          v-model="form.name"
          label="Name"
          placeholder="Example: superadmin, admin, user"
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

  <!-- Modal Confirm Delete Menggunakan v-model:show -->
  <BaseModal
    v-model:show="showDeleteModal"
    size="sm"
    status-color="bg-red"
  >
    <div class="modal-body text-center py-4">
      <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
      <h3>Are you sure?</h3>
      <div class="text-secondary">
        Do you really want to remove this data?
        <br />
        <span class="text-red fst-italic">This action cannot be undone.</span>
      </div>
    </div>

    <div class="modal-footer">
      <div class="w-100">
        <div class="row">
          <div class="col">
            <button type="button" class="btn w-100" @click="showDeleteModal = false">Cancel</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-red w-100" @click="handleDelete">
              <IconTrash class="icon icon-1" />
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>