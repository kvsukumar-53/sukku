import { createRouter, createWebHistory } from 'vue-router'
import SignUp from './signup.vue'
import HomePage from '../Home.vue'
import LoginPage from './Loginpage.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
