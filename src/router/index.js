import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/main/MainView.vue'
import loginForm from '../views/user/LoginFormView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: index
  },
  {
    path: '/user/loginform',
    name: 'loginform',
    component: loginForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
