/**
 * api接口统一管理
 */
import {
  get,
  post
} from './http'

const Token = localStorage.getItem("token");
// 购物车列表
export const shopcarList = p => get(`/api/user/shopcar/list?sessionid=${Token}`, p);
// 删除购物车
export const delGoods = p => get(`/api/user/shopcar/clear?sessionid=${Token}`, p)
// 用户订单列表
export const orderList = p => get(`/api/user/order/getOrderList?sessionid=${Token}`, p)
// 取消订单
export const closeOrder = p => get(`/api/user/order/closeOrder?sessionid=${Token}`, p)
// 订单完成
export const finishOrder = p => get(`/api/user/order/finishOrder?sessionid=${Token}`, p)
// 地址列表
export const getUserAddress = p => get(`/api/user/info/getUserAddress?sessionid=${Token}`, p)
// 获取学校
export const getSchools = p => get(`/api/user/info/getSchools?sessionid=${Token}`, p)
// 获取楼号
export const getBuildingsBySchool = p => get(`/api/user/info/getBuildingsBySchool?sessionid=${Token}`, p)
// 新增地址
export const addNewAddress = p => post(`/api/user/info/addNewAddress?sessionid=${Token}`, p)
//修改地址
export const updateAddress = p =>post(`/api/user/info/updateAddress?sessionid=${Token}`,p)
// 登录
export const loginByCode = p => get(`/api/system/wxfdb0d4b10b8496bf/loginByCode`, p)
// 商品分类
export const classify = p => get(`/api/user/shop/classify/list?sessionid=${Token}`, p)
// 商品列表
export const commodityList = p => get(`/api/user/shop/commodity/list?sessionid=${Token}`,p)
// 添加一个到购物车
export const shopcarAddOne = p => get(`/api/user/shopcar/addOne?sessionid=${Token}`,p)
// 减少购物车
export const shopcarSubOne = p => get(`/api/user/shopcar/subOne?sessionid=${Token}`,p)
// 支付
export const shopcarpay = p => post(`/api/user/shopcar/pay?sessionid=${Token}`,p)
// 获取用户信息
export const getUserInfo = p => get(`/api/user/info/getInfo?sessionid=${Token}`,p)
// 楼长订单列表
export const getOrderInBuilding = p => get(`/api/user/building/getOrderInBuilding?sessionid=${Token}`,p)

export const weiXinConfig = p => get(`/api/system/wxfdb0d4b10b8496bf/getConfig?sessionid=${Token}`,p)
export const weiXinPayConfig = p => post(`/api/user/shopcar/pay?sessionid=${Token}`,p)
