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
export const updateAddress = p => post(`/api/user/info/updateAddress?sessionid=${Token}`, p)
// 设置默认地主
export const setDefaultAddress = p => get(`/api/user/info/setDefaultAddress?sessionid=${Token}`, p)
// 登录
export const loginByCode = p => get(`/api/system/wx8c464155e57164db/loginByCode`, p)
// 商品分类
export const classify = p => get(`/api/user/shop/classify/list?sessionid=${Token}`, p)
// 商品列表
export const commodityList = p => get(`/api/user/shop/commodity/list?sessionid=${Token}`, p)
// 添加一个到购物车
export const shopcarAddOne = p => get(`/api/user/shopcar/addOne?sessionid=${Token}`, p)
// 减少购物车
export const shopcarSubOne = p => get(`/api/user/shopcar/subOne?sessionid=${Token}`, p)
// 支付
export const shopcarpay = p => post(`/api/user/shopcar/pay?sessionid=${Token}`, p)
// 订单重新支付
export const orderrepay = p => get(`/api/user/order/repay?sessionid=${Token}`, p)
// 获取用户信息
export const getUserInfo = p => get(`/api/user/info/getInfo?sessionid=${Token}`, p)
// 楼长订单列表
export const getOrderInBuilding = p => get(`/api/user/building/getOrderInBuilding?sessionid=${Token}`, p)
export const editOrderStatus = p => get(`/api/user/building/postOrder?sessionid=${Token}`, p)
// 楼长更新更新商品价格和库存
export const buildingUpdateComm = p => post(`/api/user/building/updateComm?sessionid=${Token}`, p)
export const weiXinConfig = p => get(`/api/system/wx8c464155e57164db/getConfig?sessionid=${Token}`, p)
export const weiXinPayConfig = p => post(`/api/user/shopcar/pay?sessionid=${Token}`, p)
export const weiXinRePayConfig = p => get(`/api/user/order/repay?sessionid=${Token}`, p)
export const expressRePayConfig = p => get(`/api/user/post/repay?sessionid=${Token}`, p)

// 获取配送站
export const getPostStation = p => get(`/api/user/post/getPostStation?sessionid=${Token}`, p);
//获取规格
export const getSpecListApi = p => get(`/api/user/post/getSize?sessionid=${Token}`, p);
// 快递代取下单/user/post/pay
export const postPay = p => post(`/api/user/post/pay?sessionid=${Token}`, p)
// 楼长我的快递订单
export const postGetOrder = p =>get(`/api/user/post/getOrder?sessionid=${Token}`, p)
// 快递取消订单
export const a = cancelOrder => get(`/api/user/post/cancelOrder?sessionid=${Token}`, p)


// 快递取消订单
export const cancelOrder = p => get(`/api/user/post/cancelOrder?sessionid=${Token}`, p)
// 快递改为问题件
export const wentiOrder = p => get(`/api/user/post/wentiOrder?sessionid=${Token}`, p)
// 快递改为配送状态
export const kuaidiPostOrder = p => get(`/api/user/post/postOrder?sessionid=${Token}`, p)
// 快递完成订单
export const kuaidiFinishOrder = p => get(`/api/user/post/finishOrder?sessionid=${Token}`, p)
// 快递配送订单列表
export const getPostOrder = p => get(`/api/user/post/getPostOrder?sessionid=${Token}`, p)


