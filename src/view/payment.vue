<template>
    <div class="payment-container">
        <div class="paymentBox">
            <ul>
                <li v-for="(item,index) in goodsList" :key="item.id">
                    <div class="payment-li-number">
                        <span class="order-no">订单号:{{item.id}}</span>
                        <van-tag plain type="danger">待付款</van-tag>
                    </div>
                    <div class="payment-li-des">
                        <div class="payment-li-desimg">
                            <van-image
                                width="70"
                                height="70"
                                radius="10"
                                :src="item.commbak.pic"
                            />
                        </div>
                        <div class="payment-des-txt">
                            <div>{{item.commbak.name}}</div>
                            <div>¥{{item.commbak.price}} x {{item.commbak.count}}</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <p class="totalTxt">合计：<span class="all-price">¥{{item.totalPrice}}</span></p>
                        <div class="payment-btu">
                            <van-button type="danger" size="small" @click="closeOrder(item)">取消订单</van-button>
                            <van-button type="primary" size="small" @click="orderPay(item)">支付</van-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {orderList, closeOrder, orderrepay} from "@/request/api";
    import {weiXinConfig, weiXinPayConfig, weiXinRePayConfig} from "../request/api";
    import {startPay} from "../function/wechat";

    export default {
        name: "payment",
        data() {
            return {
                title: '待付款',
                show: false,
                goodsList: []
            }
        },
        created() {
            this.orderList()
        },
        methods: {
            orderList() {
                this.goodsList = [];
                let getLoading = this.$toast.loading('数据加载中...');
                orderList({status: 0}).then({}).then(res => {
                    getLoading.clear();
                    if (res.code === 0 && res.data.length > 0) {
                        for (let i in res.data) {
                            res.data[i].commbak = eval(res.data[i].commbak)[0];
                        }
                        this.goodsList = res.data;
                    }
                }).catch(err => {
                    getLoading.clear();
                    console.log(err)
                })
            },
            // 取消订单
            closeOrder(data) {
                let getLoading = this.$toast.loading('订单取消中...');
                closeOrder({orderid: data.id})
                    .then(res => {
                        getLoading.clear();
                        if (res.code === 0) {
                            this.orderList()
                        } else {
                            this.$toast.fail(res.msg);
                        }
                    })
                    .catch(err => {
                        getLoading.clear();
                        console.log(err);
                    });
            },
            orderPay(data) {
                let payLoading = this.$toast.loading('正在支付...');
                let configData = {};
                weiXinConfig({url: window.location.href})
                    .then(res => {
                        configData = res.data;
                    })
                    .then(step => {
                        //获取支付参数
                        weiXinRePayConfig({orderid: data.id}).then(pay => {
                            payLoading.clear();
                            pay.data.package = pay.data.packageValue;
                            let res = startPay(configData, pay.data);
                            let that = this;
                            setTimeout(function () {
                                that.orderList();
                            }, 3000);
                        }).catch(err => {
                            this.$toast.fail('网络出错')
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        payLoading.clear();
                    });
            }
        }
    };
</script>

<style scoped type="text/css">
    .payment-container {
        height: auto;
        min-height: 700px;
        padding-bottom: 58px;
        box-sizing: border-box;
        background: #EFEFEF;
        overflow: hidden;
    }

    .paymentBox li {
        background: #ffffff;
        padding: 15px 10px 10px 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .payment-li-number {
        display: flex;
        justify-content: space-between;
    }

    .order-no {
        width: 138px;
        font-size: 14px;
        color: #cccccc;
        display: block;
        height: 24px;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
    }

    .payment-li-des {
        margin-top: 20px;
        display: flex;
        /*border-bottom: 2px solid #EFEFEF;*/
        padding-bottom: 10px;
        box-sizing: border-box;
    }

    .payment-li-desimg {
        float: left;
    }

    .payment-des-txt {
        width: 500px;
        float: left;
        margin-left: 10px;
    }

    .payment-des-txt div:nth-child(1) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 16px;
    }

    .payment-des-txt div:nth-child(2) {
        font-size: 13px;
        margin-top: 15px;
    }

    .bottom {
        height: 50px;
        overflow: hidden;
        box-sizing: border-box;
        border-top: 1px solid #EFEFEF;
        display: flex;
        justify-content: space-between;
    }

    .payment-btu {
        height: auto;
        overflow: hidden;
        margin-top: 14px;
    }

    .totalTxt {
        float: left;
        line-height: 30px;
        margin-top: 14px;
        color: #444;
    }

    .all-price {
        color: #f00;
    }
</style>
