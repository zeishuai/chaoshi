<template>
    <div class="payment-container">
        <van-row type="flex" justify="center" v-if="goodsList.length < 1">
            <van-col span="8" style="margin-top: 20%">
                <van-loading size="2rem">暂无数据...</van-loading>
            </van-col>
        </van-row>
        <div class="paymentBox" v-if="goodsList.length > 0">
            <ul>
                <li v-for="(item,index) in goodsList" :key="item.id">
                    <div class="payment-li-number">
                        <span class="order-no">订单号:{{item.id}}</span>
                        <van-tag plain v-if="item.status === -1">取消支付</van-tag>
                        <van-tag plain type="danger" v-if="item.status === 0">待付款</van-tag>
                        <van-tag plain type="warning" v-if="item.status === 1">等待派送</van-tag>
                        <van-tag plain type="primary" v-if="item.status === 2">派送中</van-tag>
                        <van-tag plain type="success" v-if="item.status === 3">已完成</van-tag>
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
                            <van-button type="primary" size="small" @click="confirmPay(item)">支付</van-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {orderList, closeOrder} from "@/request/api";

    export default {
        name: "receiving",
        data() {
            return {
                title: '待收货',
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
                orderList({status: 2}).then({}).then(res => {
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
                        if (res.code === 0 ) {
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
            confirmPay(data){

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
        padding: 5px 10px;
        box-sizing: border-box;
        margin-top: 10px;
    }

    .payment-li-number {
        display: flex;
        justify-content: space-between;
    }

    .order-no{
        font-size: 14px;
        color: #cccccc;
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

    .bottom{
        height: 50px;
        overflow: hidden;
        box-sizing: border-box;
        border-top: 1px solid #EFEFEF;
        display: flex;
        justify-content: space-between;
    }
    .payment-btu{
        height: auto;
        overflow: hidden;
        margin-top: 14px;
    }
    .totalTxt{
        float: left;
        line-height: 30px;
        margin-top: 14px;
        color: #444;
    }
    .all-price{
        color: #f00;
    }
</style>
