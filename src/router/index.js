import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/view/login')
const index = () => import('@/view/index1')
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
const address_list = () => import('@/view/address_list')
const reLogin = () => import('@/view/relogin')
const Courier = () => import('@/view/courier')

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
            path: '/relogin',
            name: 'reLogin',
            component: reLogin
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/shoppingCart',
            name: 'shoppingCart',
            component: shoppingCart,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/express',
            name: 'express',
            component: express,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/my',
            name: 'my',
            component: my,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/payment',
            name: 'payment',
            component: payment,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/receiving',
            name: 'receiving',
            component: receiving,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/evaluated',
            name: 'evaluated',
            component: evaluated,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: myOrder,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/getGoodsPrice',
            name: 'getGoodsPrice',
            component: getGoodsPrice,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/kdPayment',
            name: 'kdPayment',
            component: kdPayment,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/kdDdFh',
            name: 'kdDdFh',
            component: kdDdFh,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/kdRecording',
            name: 'kdRecording',
            component: kdRecording,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/psyOrderList',
            name: 'psyOrderList',
            component: psyOrderList,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/address_list',
            name: 'address_list',
            component: address_list,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/courier',
            name: 'Courier',
            component: Courier,
            meta: {
                requireLogin: true
            }
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
