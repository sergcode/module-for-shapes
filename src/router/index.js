import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Draw from '@/views/Draw.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/draw',
    name: 'draw',
    component: Draw
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
