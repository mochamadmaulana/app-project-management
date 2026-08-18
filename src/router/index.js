import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { layout: 'AuthLayout' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { layout: 'AuthLayout' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: { layout: 'AppLayout' }
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/project/ProjectView.vue'),
    meta: { layout: 'AppLayout' }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/UserView.vue'),
    meta: { layout: 'AppLayout' }
  },
  {
    path: '/setting/company',
    name: 'setting-company',
    component: () => import('@/views/setting/CompanyView.vue'),
    meta: { layout: 'AppLayout' }
  },
  {
    path: '/setting/role',
    name: 'setting-role',
    component: () => import('@/views/setting/RoleView.vue'),
    meta: { layout: 'AppLayout' }
  },
  {
    path: '/setting/permission',
    name: 'setting-permission',
    component: () => import('@/views/setting/PermissionView.vue'),
    meta: { layout: 'AppLayout' }
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
