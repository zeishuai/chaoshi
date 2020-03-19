/**
 * api接口统一管理
 */
import {
  get,
  post
} from './http'
// 购物车列表
export const shopcarList = p => get(`/api/user/shopcar/list?sessionid=${localStorage.getItem("token")}`, p);
// 删除购物车
export const delGoods = p => get(`/api/user/shopcar/clear?sessionid=${localStorage.getItem("token")}`, p)
// 订单列表
export const orderList = p => get(`/api/user/order/getOrderList?sessionid=${localStorage.getItem("token")}`, p)
// 取消订单
export const closeOrder = p => get(`/api/user/order/closeOrder?sessionid=${localStorage.getItem("token")}`, p)
// 订单完成
export const finishOrder = p => get(`/api/user/order/finishOrder?sessionid=${localStorage.getItem("token")}`, p)
// 地址列表
export const getUserAddress = p => get(`/api/user/info/getUserAddress?sessionid=${localStorage.getItem("token")}`, p)
// 获取学校
export const getSchools = p => get(`/api/user/info/getSchools?sessionid=${localStorage.getItem("token")}`, p)
// 获取楼号
export const getBuildingsBySchool = p => get(`/api/user/info/getBuildingsBySchool?sessionid=${localStorage.getItem("token")}`, p)
// 新增地址
export const addNewAddress = p => post(`/api/user/info/addNewAddress?sessionid=${localStorage.getItem("token")}`, p)
// 登录
export const loginByCode = p => get(`/api/system/wxfdb0d4b10b8496bf/loginByCode`, p)
// 商品分类
export const classify = p => get(`/api/user/shop/classify/list?sessionid=${localStorage.getItem("token")}`, p)
// 商品列表
export const commodityList = p => get(`/api/user/shop/commodity/list?sessionid=${localStorage.getItem("token")}`,p)
// 添加一个到购物车
export const shopcarAddOne = p => get(`/api/user/shopcar/addOne?sessionid=${localStorage.getItem("token")}`,p)
// 减少购物车
export const shopcarSubOne = p => get(`/api/user/shopcar/subOne?sessionid=${localStorage.getItem("token")}`,p)