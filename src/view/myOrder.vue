<template>
    <div class="payment-conter">
        <van-skeleton v-if="dataLoading" title :row="10"/>
        <van-row type="flex" justify="center" v-if="!dataLoading && orderLists.length < 1">
            <van-col span="8" style="margin-top: 20%;text-align: center">
                <span>暂无数据...</span>
            </van-col>
        </van-row>
        <div class="paymentBox" v-if="!dataLoading && orderLists.length > 0">
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
                            <div v-if="item.status == 0">
                                <van-button type="danger" size="small" @click="closeOrder(item)">取消订单</van-button>
                                <van-button type="primary" size="small" @click="rePayFunc(item)">支付</van-button>
                            </div>
                        </div>
                    </div>
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
    import {weiXinConfig, weiXinRePayConfig} from "../request/api";
    import {startPay} from "../function/wechat";

    export default {
        name: "receiving",
        data() {
            return {
                title: "待付款",
                show: false,
                rateValue: 3,
                rateMessage: "",
                orderLists: [],
                dataLoading: true
            };
        },
        created() {
            this.getOrderList();
        },
        methods: {
            // 订单列表
            getOrderList() {
                this.orderLists = [];
                orderList({})
                    .then(res => {
                        this.dataLoading = false;
                        if (res.code === 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].commbak = eval(res.data[i].commbak);
                                this.orderLists = res.data;
                            }
                        }
                    })
                    .catch(err => {
                        this.dataLoading = false;
                    });
            },
            // 取消订单
            closeOrder(data) {
                closeOrder({orderid: data.id})
                    .then(res => {
                        this.$toast({
                            message: res.msg,
                            type: res.code === 0 ? 'success' : 'fail'
                        });
                        this.getOrderList();
                    })
                    .catch(err => {
                    });
            },
            // 订单完成
            finishOrder(data) {
                finishOrder({orderid: data.id})
                    .then(res => {
                        this.$toast({
                            message: res.msg,
                            type: res.code === 0 ? 'success' : 'fail'
                        });
                        this.getOrderList();
                    })
                    .catch(err => {
                    });
            },
            rePayFunc(data) {
                let payLoading = this.$toast.loading('正在支付...');
                let configData = {};
                let that = this;
                weiXinConfig({url: window.location.href})
                    .then(res => {
                        configData = res.data;
                    })
                    .then(step => {
                        //获取支付参数
                        weiXinRePayConfig({orderid: data.id}).then(pay => {
                            pay.data.package = pay.data.packageValue;
                            let res = startPay(configData, pay.data);
                            setTimeout(function () {
                                that.getOrderList();
                                payLoading.clear();
                            }, 8000);
                        }).catch(err => {
                            this.$toast.fail('网络出错')
                        })
                    })
                    .catch(err => {
                        payLoading.clear();
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
        width: 68%;
        font-size: 14px;
        color: #cccccc;
        display: block;
        height: 24px;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
    }

    .payment-li-number span:nth-child(1) {
        font-size: 12px;
        color: #cccccc;
    }

    /*.payment-li-number span:nth-child(2) {*/
    /*    font-size: 12px;*/
    /*    color: #f00;*/
    /*}*/

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
