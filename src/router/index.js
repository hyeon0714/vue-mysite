import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/main/MainView.vue'
import loginForm from '../views/user/LoginFormView.vue'
import modifyForm from '../views/user/ModifyForm.vue'
import joinForm from '../views/user/JoinForm.vue'

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
  },
  {
    path: '/user/modifyform',
    name: 'modifyform',
    component: modifyForm
  },
  {
    path: '/user/joinform',
    name: 'joinform',
    component: joinForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
