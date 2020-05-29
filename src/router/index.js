import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routes
} from './routes'

Vue.use(VueRouter)


const router = new VueRouter({
  routes
})

// 路由全局守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否登录，进行验证字段isLogin
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let islogin = localStorage.getItem('isLogin')
    // consolelog(islogin)
    if (islogin != 1) { // 跳转登录
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      islogin = localStorage.getItem('isLogin')
      if (islogin == 0) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
