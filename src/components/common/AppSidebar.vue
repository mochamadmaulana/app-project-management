<script setup>
import { RouterLink } from 'vue-router'

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Analytics', path: '/dashboard/analytics', icon: '📈' },
  { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h3>Panel Admin</h3>
    </div>
    <ul class="sidebar-menu">
      <li v-for="item in menuItems" :key="item.path">
        <RouterLink :to="item.path" class="menu-item">
          <span class="icon">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #1e293b;
  color: #ffffff;
  min-height: 100vh;
  padding: 1rem;
}

.sidebar-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
  margin-bottom: 1rem;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #f8fafc;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 0.25rem;
  transition: background 0.2s;
}

.menu-item:hover,
.menu-item.router-link-active {
  background-color: #334155;
  color: #ffffff;
}

.icon {
  font-size: 1.1rem;
}
</style>