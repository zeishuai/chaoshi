<template>
    <div class="payment-conter">
        <van-row type="flex" justify="center" v-if="!isLoading && goodsList.length < 1">
            <van-col span="8" style="margin-top: 20%;text-align: center">
                <span>暂无数据...</span>
            </van-col>
        </van-row>
        <van-skeleton v-if="isLoading" title :row="10"/>
        <div class="paymentBox" v-if="!isLoading && goodsList.length > 0">
            <ul>
                <li v-for="item in goodsList" :key="item.id">
                    <van-row type="flex" justify="space-between">
                        <van-col span="19">订单号：{{item.id}}</van-col>
                        <van-col span="5">
                            <van-tag plain type="danger">未支付</van-tag>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-image
                            width="80"
                            height="80"
                            :src="item.pics"
                            @click="previewFunc(item.pics)"
                        />
                    </van-row>
                    <van-row type="flex" justify="space-between">代收点名称:{{item.postStation}}</van-row>
                    <van-row
                        type="flex"
                        justify="space-between"
                    >代收点地址:{{item.paddress ? item.paddress : '未填地址'}}
                    </van-row>
                    <van-row>代收类型:{{item.xiaoneiwai}}</van-row>
                    <van-row>
                        <van-col span="12">快点尺寸:{{item.size}}</van-col>
                        <van-col span="12">快点单量:{{item.danliang}}</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12">取件码:{{item.code}}</van-col>
                        <van-col span="12">小费:{{item.xiaofei}}</van-col>
                    </van-row>
                    <van-row>备注:{{item.content}}</van-row>
                    <van-row style="color:f00">总计:{{item.totalPrice}}元</van-row>
                    <van-row>
                        <van-col span="12">收件人姓名:{{item.uname}}</van-col>
                        <van-col span="12">收件人电话:{{item.phone}}</van-col>
                    </van-row>
                    <van-row>收货地址:{{item.sname}} {{item.bname}} {{item.detailAddress}}</van-row>
                    <van-row>
                        <van-col span="12">配送员姓名:{{item.posterName}}</van-col>
                        <van-col span="12">配送员电话:{{item.posterPhone}}</van-col>
                    </van-row>
                    <van-row>订单创建时间:{{item.createDate}}</van-row>
                    <van-row v-if="item.payDate">订单支付时间:{{item.payDate}}</van-row>
                    <van-row v-if="item.finishDate">订单完成时间:{{item.finishDate}}</van-row>
                    <van-row type="flex" justify="end">
                        <van-button style="margin-right:15px" type="default" size="small" @click="cancelOrder(item)">
                            取消订单
                        </van-button>
                        <van-button type="danger" size="small" @click="orderRePay(item)">支付</van-button>
                    </van-row>
                </li>
            </ul>
        </div>
        <van-image-preview v-model="imageShow" :images="images" :closeable="true" />
    </div>
</template>

<script>
    import {postGetOrder, cancelOrder,} from "@/request/api";
    import tools from '@/utils/tool'
    import {expressRePayConfig, weiXinConfig, weiXinRePayConfig} from "../request/api";
    import {startPay} from "../function/wechat";

    export default {
        name: "kdRecording",
        data() {
            return {
                title: "楼长快递-待付款",
                show: false,
                goodsList: [],
                userInfo: localStorage.getItem('userInfo'),
                isLoading: true,
                imageShow: false,
                images:[]
            };
        },
        created() {
            this.postGetOrder();
        },
        methods: {
            previewFunc(url){
                this.images = [url];
                this.imageShow = true;
            },
            // 列表
            postGetOrder() {
                let loadingData = this.$toast.loading('数据加载中...');
                postGetOrder({status: 0}).then(res => {
                    loadingData.clear();
                    this.isLoading = false;
                    if (res.code === 0) {
                        this.goodsList = res.data;
                    }
                }).catch(err => {
                    this.isLoading = false;
                    loadingData.clear()
                })
            },
            // 取消订单
            cancelOrder(data) {
                let loading = this.$toast.loading('加载中')
                cancelOrder({id: data.id})
                    .then(res => {
                        if (res.code == 0) {
                            loading.clear()
                            this.$toast({message: res.msg});
                            this.postGetOrder()
                        } else {
                            loading.clear()
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                    });
            },
            // 重新支付
            orderRePay(data) {
                let payLoading = this.$toast.loading('正在支付...');
                let configData = {};
                weiXinConfig({url: window.location.href})
                    .then(res => {
                        configData = res.data;
                    })
                    .then(step => {
                        //获取支付参数
                        expressRePayConfig({orderid: data.id}).then(pay => {
                            payLoading.clear();
                            pay.data.package = pay.data.packageValue;
                            let res = startPay(configData, pay.data);
                            let that = this;
                            setTimeout(function () {
                                that.postGetOrder();
                            }, 5000);
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
        background: #efefef;
        overflow: hidden;
    }

    .paymentBox li {
        width: 95%;
        background: #ffffff;
        padding: 15px 10px 10px 10px;
        box-sizing: border-box;
        margin: auto;
        margin-bottom: 10px;
        border-radius: 15px;
        font-size: 14px;
    }

    .van-row {
        margin-bottom: 10px;
    }


</style>
