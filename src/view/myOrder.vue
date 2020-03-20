<template>
    <div class="payment-conter">
        <div class="paymentBox">
            <ul>
                <li v-for="item in orderLists" :key="item.id">
                    <p class="payment-li-number">
                        <span>订单号:{{item.id}}</span>
                        <span v-if="item.status == 0">未支付</span>
                        <span v-if="item.status == -1">取消支付</span>
                        <span v-if="item.status == 1">等待派送</span>
                        <span v-if="item.status == 2">派送中</span>
                        <span v-if="item.status == 3">已完成</span>
                    </p>
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
                            <div v-if="item.status == 0">
                                <van-button type="danger" size="small" @click="closeOrder(item)">取消订单</van-button>
                                <van-button type="primary" size="small" @click="showToast(item)">支付</van-button>
                            </div>
                            <div v-if="item.status == 3">
                                <van-button type="primary" size="small" @click="finishOrder(item)">完成订单</van-button>
                            </div>
                        </div>
                    </div>

                    <!--<div class="payment-btu" v-if="item.type == '3'">
                      <span @click="showToast">评价</span>
                    </div>
                    <div class="payment-btu" v-if="item.type == '4'">
                      <span @click="showToast">退货</span>
                    </div>-->
                </li>
            </ul>
        </div>
        <!--评价弹出层-->
        <van-popup v-model="show" position="top">
            <p class="ecal-score-title">发表评论</p>
            <div class="ecal-score">
                描述相符：
                <van-rate v-model="rateValue"/>
            </div>
            <div class="rateMessage">
                <p style="font-size: 14px;margin-left: 10px">留言：</p>
                <van-field
                    style="border:1px solid #cccccc;width: 97%;margin: auto;margin-top: 10px;padding: 10px;font-size: 14px"
                    v-model="rateMessage"
                    rows="6"
                    autosize
                    label-width="40"
                    type="textarea"
                    maxlength="150"
                    placeholder="请输入留言"
                    show-word-limit
                />
            </div>
            <van-button
                style="margin-top: 20px;margin-bottom: 20px;width: 20%;height: 30px;line-height: 20px;float: right;margin-right: 20px"
                round
                block
                type="info"
                native-type="submit"
            >提交
            </van-button>
        </van-popup>
    </div>
</template>

<script>
    import {orderList, closeOrder, finishOrder} from "@/request/api";

    export default {
        name: "receiving",
        data() {
            return {
                title: "待付款",
                show: false,
                rateValue: 3,
                rateMessage: "",
                orderLists: []
            };
        },
        created() {
            this.orderList();
        },
        methods: {
            // 订单列表
            orderList() {
                orderList({})
                    .then(res => {
                        if (res.code == 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                let nesarry = eval(res.data[i].commbak);
                                res.data[i].commbak = nesarry;
                                this.orderLists = res.data;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 取消订单
            closeOrder(data) {
                closeOrder({orderid: data.id})
                    .then(res => {
                        console.log(res);
                        if (res.code == 0) {
                            this.$toast({message: res.msg});
                        } else {
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 订单完成
            finishOrder() {
                finishOrder({orderid: data.id})
                    .then(res => {
                        console.log(res);
                        if (res.code == 0) {
                            this.$toast({message: res.msg});
                        } else {
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>

<style scoped type="text/css">
    .payment-conter {
        height: auto;
        min-height: 700px;
        padding-bottom: 58px;
        box-sizing: border-box;
        background: #f7f8fa;
        overflow: hidden;
    }

    .paymentBox li {
        background: #ffffff;
        padding: 5px 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    .payment-li-number {
        display: flex;
        justify-content: space-between;
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

    .bottom{
        height: 50px;
        overflow: hidden;
        box-sizing: border-box;
        border-top: 1px solid #f1f1f1;
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
