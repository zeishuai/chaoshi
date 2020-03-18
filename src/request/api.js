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
export const delGoods = p => get(`/api/user/shopcar/clear?sessionid=${localStorage.getItem("token")}`,p)
// 订单列表
export const orderList = p => get(`/api/user/order/getOrderList?sessionid=${localStorage.getItem("token")}`,p)
// 取消订单
export const closeOrder = p => get(`/api/user/order/closeOrder?sessionid=${localStorage.getItem("token")}`,p)
// 订单完成
export const finishOrder = p => get(`/api/user/order/finishOrder?sessionid=${localStorage.getItem("token")}`,p)
// 地址列表
export const getUserAddress = p =>get(`/api/user/info/getUserAddress?sessionid=${localStorage.getItem("token")}`,p)
// 获取学校
export const getSchools = p => get(`/api/user/info/getSchools?sessionid=${localStorage.getItem("token")}`,p)
// 获取楼号
export const getBuildingsBySchool = p => get(`/api/user/info/getBuildingsBySchool?sessionid=${localStorage.getItem("token")}`,p)
// 新增地址
export const addNewAddress = p => post(`/api/user/info/addNewAddress?sessionid=${localStorage.getItem("token")}`,p)