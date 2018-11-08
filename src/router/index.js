import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import Rights from '@/views/rights'
import Role from '@/views/role'
import { MessageBox } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    component: Home,
    children:[
      {
        name: 'users',
        path:'/users',
        component:User
      },
      {
        name: 'rights',
        path: '/rights',
        component: Rights
      },
      {
        name: 'roles',
        path: '/roles',
        component:Role
      },
    ]
  },{
    name: 'login',
    path: '/login',
    component: Login
  }]
})
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.path==='/login'){
    next()
  }else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push('/login')
      Message.success('请先登录')
      // this.$message.warning('请先登录')
      // next()
    } else {
      // Message.warning('进入到Home页')
      // this.$message.warning('进入到Home页')
      // router.push('/')
      next()
    }



  }
  // const token = sessionStorage.getItem('token')
  //   if (!token) {
  //       this.$router.push('/login')
  //       this.$message.warning('请先登录')
  //   } else {
  //       this.$message.warning('进入到Home页')
  //       this.$router.push('/')
  //   }
  next()
})
export default router
