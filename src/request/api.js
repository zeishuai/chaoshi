/**
* api接口统一管理
*/
import { get, post } from './http'
export const shopcarList = p => get(`/api/user/shopcar/list?sessionid=${localStorage.getItem("token")}`, p);
export const delGoods = p => get(`/api/user/shopcar/clear?sessionid=${localStorage.getItem("token")}`)
export const orderList = p => get(`/api/user/order/getOrderList?sessionid=${localStorage.getItem("token")}`)

