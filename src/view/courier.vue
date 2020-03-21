<template>
    <div class="payment-conter">
        <van-skeleton v-if="loadingStatus" title :row="10" />
        <van-row type="flex" justify="center" v-if="orderLists.length < 1">
            <van-col span="8" style="margin-top: 20%">
                <span>暂无数据...</span>
            </van-col>
        </van-row>
        <div class="paymentBox" v-if="!loadingStatus && orderLists.length > 0">
            <ul>
                <li v-for="item in orderLists" :key="item.id">
                    <div class="payment-li-number">
                        <span class="order-no">订单号:{{item.id}}</span>
                        <van-tag plain v-if="item.status === -1">取消支付</van-tag>
                        <van-tag plain type="danger" v-if="item.status === 0">待付款</van-tag>
                        <van-tag plain type="warning" v-if="item.status === 1">等待派送</van-tag>
                        <van-tag plain type="primary" v-if="item.status === 2">派送中</van-tag>
                        <van-tag plain type="success" v-if="item.status === 3">已完成</van-tag>
                    </div>
                    <div class="payment-li-des" v-for="val in item.commbak" :key="val.id">
                        <div class="payment-li-desimg">
                            <van-image width="70" height="70" radius="10" :src="val.pic"/>
                        </div>
                        <div class="payment-des-txt">
                            <div>{{val.name}}</div>
                            <div>¥{{val.price}} x {{val.count}}</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <p class="totalTxt">合计：<span class="all-price">¥{{item.totalPrice}}</span></p>
                        <div class="payment-btu">
                            <van-button type="danger" size="small" @click="delivery(item)">配送</van-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getOrderInBuilding, closeOrder, finishOrder} from "@/request/api";
    import {editOrderStatus} from "../request/api";

    export default {
        name: "courier",
        data() {
            return {
                title: "待付款",
                show: false,
                rateValue: 3,
                rateMessage: "",
                orderLists: [],
                loadingStatus: true
            };
        },
        created() {
            this.orderList();
        },
        methods: {
            // 订单列表
            orderList() {
                getOrderInBuilding({status: 1})
                    .then(res => {
                        this.loadingStatus = false;
                        if (res.code === 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                let nesarry = eval(res.data[i].commbak);
                                res.data[i].commbak = nesarry;
                                this.orderLists = res.data;
                            }
                        }
                    })
                    .catch(err => {
                        this.loadingStatus = false;
                        console.log(err);
                    });
            },
            // 配送订单
            delivery(data) {
                let loadingStatus = this.$toast.loading('数据加载中...');
                editOrderStatus({orderid: data.id})
                    .then(res => {
                        loadingStatus.clear();
                        this.$toast({
                            message: res.msg,
                            type: res.code === 0 ? 'success': 'fail'
                        });
                        this.orderList();
                    })
                    .catch(err => {
                        loadingStatus.clear();
                        console.log(err);
                    });
            }
        }
    };
</script>

<style scoped type="text/css">
    .payment-conter {
        height: auto;
        /*min-height: 700px;*/
        padding-bottom: 58px;
        box-sizing: border-box;
        background: #f7f8fa;
        overflow: hidden;
    }

    .paymentBox li {
        background: #ffffff;
        padding: 15px 10px 10px 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
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
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    }

    .payment-li-number span:nth-child(1) {
        font-size: 14px;
        color: #cccccc;
    }

    .payment-li-number span:nth-child(2) {
        font-size: 14px;
        color: #f00;
    }

    .payment-li-des {
        margin-top: 20px;
        display: flex;
        border-bottom: 1px solid #efefef;
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
        border-top: 1px solid #f1f1f1;
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
