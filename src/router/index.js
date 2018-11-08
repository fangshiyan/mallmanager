import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import Rights from '@/views/rights'
import Role from '@/views/role'
import { MessageBox } from 'element-ui'
import Cateparams from '@/views/cateparams'
import Goodscate from '@/views/goodscate'
import Goodslist from '@/views/goodslist'

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
      {
        name: 'goods',
        path: '/goods',
        component:Goodslist
      },
      {
        name: 'params',
        path: '/params',
        component:Cateparams
      },
      {
        name: 'categories',
        path: '/categories',
        component:Goodscate
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
    } else {
      next()
    }
  }
  next()
})
export default router
