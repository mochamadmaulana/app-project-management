<script setup>
import { ref, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'

import { 
  IconCheck, 
  IconSettings, 
  IconPlus, 
  IconLoader, 
  IconSearch, 
  IconSend, 
  IconX 
} from '@tabler/icons-vue'

import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const isLoading = ref(false)
const showModal = ref(false)
const isEditMode = ref(false)

const form = reactive({
  id: null,
  name: null
})

const openCreateModal = () => {
  isEditMode.value = false
  showModal.value = true
  resetForm()
}

const closeModal = () => {
  showModal.value = false
  isEditMode.value = false
  isDeleteMode.value = false
  resetForm()
}

const resetForm = () => {
  form.id = null
  form.name = ''
  // roleStore.clearMessages()
}
</script>

<template>
  <!-- Header -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <!-- Page pre-title -->
          <div class="page-pretitle">Setting</div>
          <h2 class="page-title">Company</h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ms-auto d-print-none">
          <div class="btn-list">
            <button type="button" class="btn btn-primary btn-5 d-none d-sm-inline-block" @click="openCreateModal">
              <IconPlus class="icon icon-1" />
              Create Company
            </button>
            <button type="button" class="btn btn-primary btn-6 d-sm-none btn-icon" @click="openCreateModal">
              <IconPlus class="icon icon-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Header -->

  <div v-if="generalSuccessMessage" class="container-xl mt-3">
    <div class="alert alert-success" role="alert">
      <div class="alert-icon">
        <IconCheck class="icon alert-icon icon-2" />
      </div>
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
                  <th style="width: 10%; text-align: center;">
                    <IconSettings class="icon icon-1" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- STATE LOADING -->
                <!-- <tr v-if="isLoading"> -->
                <tr>
                  <td colspan="4" class="text-center py-4">
                    <IconLoader :size="24" class="animate-spin text-secondary me-2" />
                    <span>Loading data...</span>
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

  <BaseModal 
    :show="showModal" 
    :title="isEditMode ? 'Edit Company' : 'Add New Company'" 
    :status-color="isEditMode ? 'bg-green' : 'bg-primary'" 
    @close="closeModal"
  >
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" placeholder="Example: PT Tesla">
      </div>

      <div class="mb-3">
        <BaseInput
          v-model="form.name"
          label="Role Name"
          placeholder="Example: PT Tesla"
          required
        />
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn link-secondary" @click="closeModal">
        <IconX class="icon me-1" />
        Cancel
      </button>

      <button type="submit" :class="isEditMode ? 'btn-green' : 'btn-primary'" class="btn ms-auto" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
        <template v-else>
          <IconSend class="icon me-1" />
          {{ isEditMode ? 'Update' : 'Save' }}
        </template>
      </button>
    </div>
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