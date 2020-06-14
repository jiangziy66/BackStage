// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      // 如果匹配到/welcome后 就会将welcome组件展示到父组件的路占位符中
      {path: '/welcome',component: Welcome},
      { path: '/users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置导航守卫 目的就是 进入所以的页面路由都可以拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 如果不是去登录页面 那么就需要看本地有没有token
  const tokenStr = localStorage.getItem('token')
  // 如果本地没有token 跳转到登录页面
  if (!tokenStr) return next('/login')
  // 如果有token就放行
  next()
})
export default router
