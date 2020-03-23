<template>
    <div class="payment-conter">
        <div class="paymentBox">
            <ul>
                <li v-for="item in goodsList" :key="item.id">
                    <van-row type="flex" justify="space-between">
                        <van-col span="19">订单号：{{item.id}}</van-col>
                        <van-col span="5">
                            <van-tag plain type="primary">等待发达</van-tag>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-image
                            width="80"
                            height="80"
                            :src="item.pics"
                        />
                    </van-row>
                    <van-row type="flex" justify="space-between">代收点名称:{{item.postStation}}</van-row>
                    <van-row
                        type="flex"
                        justify="space-between"
                    >代收点地址:{{item.paddress ? item.paddress : '暂无地址'}}</van-row>
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
<!--                    <van-row type="flex" justify="end" v-if="item.status == '0' &&(userInfo.manager2 || userInfo.poster2)" >-->
<!--                        <van-button style="margin-right:15px" type="default" size="small">取消订单</van-button>-->
<!--                        <van-button type="danger" size="small">支付</van-button>-->
<!--                    </van-row>-->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { postGetOrder, closeOrder, finishOrder } from "@/request/api";
    import tools from '@/utils/tool'
    export default {
        name: "kdRecording",
        data() {
            return {
                title: "楼长快递-待付款",
                show: false,
                goodsList: [],
                userInfo:localStorage.getItem('userInfo')
            };
        },
        created() {
            this.postGetOrder();
        },
        methods: {
            // 列表
            postGetOrder() {
                postGetOrder({status:3}).then(res => {
                    if (res.code === 0) {
                        for (let index = 0; index < res.data.length; index++) {
                            res.data[index].createDate = tools.formatLongDate(res.data[index].createDate)
                            res.data[index].payDate = tools.formatLongDate(res.data[index].payDate)
                            res.data[index].finishDate = tools.formatLongDate(res.data[index].finishDate)
                        }
                        this.goodsList = res.data;
                    }
                });
            },
            // 取消订单
            closeOrder(data) {
                closeOrder({ orderid: data.id })
                    .then(res => {
                        if (res.code == 0) {
                            this.$toast({ message: res.msg });
                        } else {
                            this.$toast({ message: res.msg });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 订单完成
            finishOrder() {
                finishOrder({ orderid: data.id })
                    .then(res => {
                        if (res.code == 0) {
                            this.$toast({ message: res.msg });
                        } else {
                            this.$toast({ message: res.msg });
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
    .van-row{
        margin-bottom: 10px;
    }


</style>
