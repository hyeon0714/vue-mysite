import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/main/MainView.vue'
import loginForm from '../views/user/LoginFormView.vue'
import modifyForm from '../views/user/ModifyForm.vue'
import joinForm from '../views/user/JoinForm.vue'
import attachForm from '../views/attach/AttachForm.vue'
import attachResult from '../views/attach/AttachResult.vue'
import joinok from '../views/user/JoinOk.vue'
import gallerylist from '../views/gallery/GalleryList.vue'

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
  },
  {
    path: '/attach/attachform',
    name: 'attachform',
    component: attachForm
  },
  {
    path: '/attach/attachresult',
    name: 'attachresult',
    component: attachResult
  },
  {
    path: '/user/joinok',
    name: 'joinok',
    component: joinok
  },
  {
    path: '/gallery/gallerylist',
    name: 'gallerylist',
    component: gallerylist
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
