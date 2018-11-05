import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import Rights from '@/views/rights'
import Role from '@/views/role'

Vue.use(Router)

export default new Router({
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
        name: 'role',
        path: '/role',
        component:Role
      },
    ]
  },{
    name: 'login',
    path: '/login',
    component: Login
  }]
})
