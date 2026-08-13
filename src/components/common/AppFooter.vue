<script setup>
import { IconShieldCheck } from '@tabler/icons-vue'
const currentYear = new Date().getFullYear()
</script>

<template>
  <!-- Footer -->
  <footer class="footer d-print-none fixed-bottom py-3">
    <div class="container-xl">
      <div class="row text-center align-items-center flex-row-reverse">
        <div class="col-lg-auto ms-lg-auto">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              <IconShieldCheck class="icon icon-1 text-green" /> Vol - 0.1
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              Copyright &copy; 2024 - {{ currentYear }} | <a href="http://instagram.com/moch.maulll" target="_blank" rel="noopener noreferrer">Mochamad Maulana</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  <!-- End Footer -->
</template>