<script setup>
import { ref, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoleStore } from '@/stores/roleStore'
import { IconPencil, IconTrash, IconLoader, IconSearch, IconPlus, IconX, IconSend, IconAlertCircle, IconCheck } from '@tabler/icons-vue'

const roleStore = useRoleStore()

const { roles, isLoading, isSubmitting, validationErrors, generalErrorMessage, generalSuccessMessage } = storeToRefs(roleStore)

const showModal = ref(false)
const isDeleteMode = ref(false)
const isEditMode = ref(false)

const form = reactive({
  id: null,
  name: null,
})

const resetForm = () => {
  form.id = null
  form.name = null
  roleStore.validationErrors = {}
  roleStore.generalErrorMessage = null
}

const closeModal = () => {
  showModal.value = false
  isEditMode.value = false
  isDeleteMode.value = false
  resetForm()
}

const openCreateModal = () => {
  isEditMode.value = false
  showModal.value = true
  resetForm()
}

const openEditModal = (role) => {
  isEditMode.value = true
  showModal.value = true
  roleStore.validationErrors = {}
  form.id = role.id
  form.name = role.name
}

const openDeleteModal = (id) => {
  isDeleteMode.value = true
  form.id = id
}

// Create & Edit
const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await roleStore.updateRole(form.id, {
        name: form.name,
      })
    } else {
      await roleStore.createRole({
        name: form.name,
      })
    }
    closeModal()
  } catch (error) {

  }
}

const handleDelete = async () => {
  try {
    await roleStore.deleteRole(form.id)
    closeModal()
  } catch (error) {
    alert('Error 404!')
  }
}

onMounted(() => {
  roleStore.fetchRoles()
})
</script>

<template>
  <!-- Header -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <!-- Page pre-title -->
          <div class="page-pretitle">Setting</div>
          <h2 class="page-title">Role</h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ms-auto d-print-none">
          <div class="btn-list">
            <button class="btn btn-primary btn-5 d-none d-sm-inline-block" @click="openCreateModal">
              <IconPlus class="icon icon-1" />
              Create Role
            </button>
            <button class="btn btn-primary btn-6 d-sm-none btn-icon" @click="openCreateModal">
              <IconPlus class="icon icon-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Header -->

  <div v-if="generalSuccessMessage" class="container-xl mt-3">
    <div class="alert alert-green text-green" role="alert">
      <IconCheck class="icon icon-1" />
      {{ generalSuccessMessage }}
    </div>
  </div>

  <div class="page-body">
    <div class="container-xl">
      <!-- Card -->
      <div class="card">
        <div class="card-body">
          <div class="col-lg-6 mb-3">
            <form action="">
              <div class="input-group">
                <input type="search" class="form-control" placeholder="Search.." autocomplete="off">
                <!-- Button Cari -->
                <button type="submit" class="btn btn-blue d-none d-sm-inline-block">
                  <IconSearch class="icon icon-1 me-1" />
                  Search
                </button>

                <!-- Button Cari Screen Mobile Phone-->
                <button type="submit" class="btn btn-blue d-sm-none btn-icon">
                  <IconSearch class="icon icon-1" />
                </button>
              </div>
            </form>
          </div>

          <div class="table-responsive">
            <table class="table table-vcenter card-table table-striped">
              <thead>
                <tr>
                  <th style="width: 80px;">No</th>
                  <th>Name</th>
                  <th style="width: 150px;" class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <!-- STATE LOADING -->
                <tr v-if="isLoading">
                  <td colspan="4" class="text-center py-4">
                    <IconLoader :size="24" class="animate-spin text-secondary me-2" />
                    <span>Loading data...</span>
                  </td>
                </tr>

                <!-- STATE DATA KOSONG -->
                <tr v-else-if="roles.length === 0">
                  <td colspan="4" class="text-center py-4 text-secondary">
                    Data not found.
                  </td>
                </tr>

                <!-- DAFTAR DATA ROLE -->
                <tr v-else v-for="(role, index) in roles" :key="role.id">
                  <td>{{ index + 1 }}</td>
                  <td class="font-weight-medium">{{ role.name }}</td>
                  <td class="text-end">
                    <button type="button" class="btn btn-outline-green btn-icon me-1" title="Edit"
                      @click="openEditModal(role)">
                      <IconPencil class="icon icon-1" />
                    </button>
                    <button type="button" class="btn btn-outline-red btn-icon" title="Delete"
                      @click="openDeleteModal(role.id)">
                      <IconTrash class="icon icon-1" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
  </div>

  <!-- Modal Create & Edit -->
  <template v-if="showModal">
    <div class="modal modal-blur fade show d-block" role="dialog" aria-modal="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditMode ? 'Edit Role' : 'Add New Role' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal-status" :class="isEditMode ? 'bg-green' : 'bg-primary'"></div>
            <div class="modal-body">

              <div v-if="generalErrorMessage" class="alert alert-danger text-danger" role="alert">
                <IconAlertCircle class="icon icon-1" />
                {{ generalErrorMessage }}
              </div>

              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" v-model="form.name" class="form-control"
                  :class="{ 'border-red': validationErrors.name }" placeholder="Contoh: superadmin, admin, user">
                <small v-if="validationErrors.name" class="text-red fst-italic">
                  {{ validationErrors.name }}
                </small>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn link-secondary btn-3" @click="closeModal">
                <IconX class="icon icon-1" />
                Cancel
              </button>
              <button type="submit" :class="isEditMode ? 'btn-green' : 'btn-primary'" class="btn btn-5 ms-auto"
                :disabled="isSubmitting">
                <div v-if="isSubmitting">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </div>
                <div v-else>
                  <IconSend class="icon icon-1" />
                  {{ isEditMode ? 'Update' : 'Save' }}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

  <!-- Modal Delete -->
  <template v-if="isDeleteMode">
    <div class="modal modal-blur fade show d-block" role="dialog" aria-modal="true">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
        <button type="button" class="btn-close" @click="closeModal"></button>
        <div class="modal-status bg-red"></div>
          <div class="modal-body text-center py-4">
            <h3>Are you sure?</h3>
            <div class="text-secondary">Do you really want to remove data? <span class="text-red fst-italic">What you've done cannot be undone.</span></div>
          </div>
          <div class="modal-footer">
            <div class="w-100">
              <div class="row">
                <div class="col">
                  <button type="button" class="btn btn-3 w-100" @click="closeModal"> Cancel </button>
                </div>
                <div class="col">
                  <!-- <form @submit.prevent="handleDelete"> -->
                    <button type="button" class="btn btn-red btn-4 w-100" @click="handleDelete"> Yes, Delete </button>
                  <!-- </form> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

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