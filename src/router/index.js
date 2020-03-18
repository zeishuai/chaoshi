import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index1'
import login from '@/view/login'

const reg = () => import('@/view/reg')
const shoppingCart = () => import('@/view/shoppingCart')
const express = () => import('@/view/express')
const my = () => import('@/view/user')
const payment = () => import('@/view/payment')
const receiving = () => import('@/view/receiving')
const evaluated = () => import('@/view/evaluated')
const myOrder = () => import ('@/view/myOrder')
const getGoodsPrice = () => import ('@/view/getGoodsPrice')
const kdPayment = () => import ('@/view/kdPayment')
const kdDdFh = () => import ('@/view/kdDdFh')
const kdRecording = () => import ('@/view/kdRecording')
const psyOrderList = () => import('@/view/psyOrderList')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/express',
      name: 'express',
      component: express
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment
    },
    {
      path: '/receiving',
      name: 'receiving',
      component: receiving
    },
    {
      path: '/evaluated',
      name: 'evaluated',
      component: evaluated
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/getGoodsPrice',
      name: 'getGoodsPrice',
      component: getGoodsPrice
    },
    {
      path: '/kdPayment',
      name: 'kdPayment',
      component: kdPayment
    },
    {
      path: '/kdDdFh',
      name: 'kdDdFh',
      component: kdDdFh
    },
    {
      path: '/kdRecording',
      name: 'kdRecording',
      component: kdRecording
    },
    {
      path:'/psyOrderList',
      name:'psyOrderList',
      component:psyOrderList
    }
  ]
})
export default router

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component: login
//     },
//     {
//       path: '/reg',
//       name: 'reg',
//       component: reg
//     },
//     {
//       path: '/index',
//       name: 'index',
//       component: index
//     },
//     {
//       path: '/shoppingCart',
//       name: 'shoppingCart',
//       component: shoppingCart
//     },
//     {
//       path: '/express',
//       name: 'express',
//       component: express
//     },
//     {
//       path: '/user',
//       name: 'user',
//       component: user
//     },
//     {
//       path: '/payment',
//       name: 'payment',
//       component: payment
//     },
//     {
//       path: '/receiving',
//       name: 'receiving',
//       component: receiving
//     },
//     {
//       path: '/evaluated',
//       name: 'evaluated',
//       component: evaluated
//     },
//     {
//       path: '/myOrder',
//       name: 'myOrder',
//       component: myOrder
//     },
//     {
//       path: '/getGoodsPrice',
//       name: 'getGoodsPrice',
//       component: getGoodsPrice
//     },
//     {
//       path: '/kdPayment',
//       name: 'kdPayment',
//       component: kdPayment
//     },
//     {
//       path: '/kdDdFh',
//       name: 'kdDdFh',
//       component: kdDdFh
//     },
//     {
//       path: '/kdRecording',
//       name: 'kdRecording',
//       component: kdRecording
//     },
//     {
//       path:'/psyOrderList',
//       name:'psyOrderList',
//       component:psyOrderList
//     }
//   ]
// })
