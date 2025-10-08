import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', name: 'Form', component: FormView },
  { path: '/admin', name: 'Admin', component: AdminView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
