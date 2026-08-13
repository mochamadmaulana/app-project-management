<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useRoleStore } from '@/stores/roleStore'
import { IconPencil, IconTrash, IconLoader, IconSearch, IconPlus } from '@tabler/icons-vue'

const roleStore = useRoleStore()

const { roles, isLoading, isSubmitting, validationErrors } = storeToRefs(roleStore)

const showModal = ref(false)
const isEditMode = ref(false)

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
            <button class="btn btn-primary btn-5 d-none d-sm-inline-block" data-bs-toggle="modal"
              data-bs-target="#modal-report">
              <IconPlus class="icon icon-1" />
              Create Role
            </button>
            <button class="btn btn-primary btn-6 d-sm-none btn-icon" data-bs-toggle="modal"
              data-bs-target="#modal-report" aria-label="Create new report">
              <IconPlus class="icon icon-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Header -->

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
                    <span>Memuat data...</span>
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
                    <button class="btn btn-outline-green btn-icon me-1" title="Edit">
                      <IconPencil class="icon icon-1" />
                    </button>
                    <button class="btn btn-outline-red btn-icon" title="Delete">
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