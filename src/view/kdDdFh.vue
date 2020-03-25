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
                            <van-tag plain type="primary">等待送达</van-tag>
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
                    >代收点地址:{{item.paddress ? item.paddress : '暂无地址'}}
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
                    <van-row>订单支付时间:{{item.payDate}}</van-row>
                    <van-row>订单完成时间:{{item.finishDate}}</van-row>
                </li>
            </ul>
        </div>
        <van-image-preview v-model="imageShow" :images="images" :closeable="true" />
    </div>
</template>

<script>
    import {postGetOrder, closeOrder, finishOrder} from "@/request/api";
    import tools from '@/utils/tool'

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
                images: []
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
                postGetOrder({status: 3}).then(res => {
                    loadingData.clear();
                    this.isLoading = false;
                    if (res.code === 0) {
                        this.goodsList = res.data;
                    }
                }).catch(err => {
                    loadingData.clear();
                    this.isLoading = false;
                })
            },
            // 取消订单
            closeOrder(data) {
                let loadingData = this.$toast.loading('数据加载中...');
                closeOrder({orderid: data.id})
                    .then(res => {
                        loadingData.clear();
                        this.$toast({
                            message:res.msg,
                            type: res.code === 0 ? 'success' : 'fail'
                        });
                        this.postGetOrder();
                    })
                    .catch(err => {
                        loadingData.clear();
                    });
            },
            // 订单完成
            finishOrder() {
                let loadingData = this.$toast.loading('数据加载中...');
                finishOrder({orderid: data.id})
                    .then(res => {
                        loadingData.clear();
                        this.$toast({
                            message:res.msg,
                            type: res.code === 0 ? 'success' : 'fail'
                        });
                        this.postGetOrder();
                    })
                    .catch(err => {
                        loadingData.clear();
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
