<template>
    <div class="my">
        <div class="myBox">
            <div class="personalInfo">
                <div class="personal-msg">
                    <img :src="userInfo.avatar" alt="">
                    <div class="personal-msg-des">
                        <div>{{userInfo.userName}}</div>
                        <div>普通会员</div>
                    </div>
                    <!--          <div class="personal-text">个人中心</div>-->
                </div>
                <!--        <div class="personalInfo-MoneyClass">-->
                <!--          <ul>-->
                <!--            <li>-->
                <!--              <p>0.00</p>-->
                <!--              <p>余额</p>-->
                <!--            </li>-->
                <!--            <li>-->
                <!--              <p>0.00</p>-->
                <!--              <p>积分</p>-->
                <!--            </li>-->
                <!--            <li>-->
                <!--              <p>0.00</p>-->
                <!--              <p>可用余额</p>-->
                <!--            </li>-->
                <!--          </ul>-->
                <!--        </div>-->
            </div>
            <div class="mySnacks">
                <p class="mySnacks-title">我的零食</p>
                <div>
                    <van-grid :border="false" icon-size="30px">
                        <van-grid-item icon="gold-coin-o" to="payment" text="待付款"/>
                        <van-grid-item icon="bag-o" to="receiving" text="待收货"/>
                        <!--  <van-grid-item icon="comment-circle-o" to="evaluated" text="待评价" />-->
                        <!--  <van-grid-item icon="refund-o" to="getGoodsPrice" text="退货/退款" />-->
                        <van-grid-item icon="notes-o" to="myOrder" text="我的订单"/>
                        <van-grid-item icon="bill-o" text="储值活动"/>
                        <van-grid-item icon="bill-o" to="psyOrderList" text="订单配送"/>
                        <van-grid-item icon="location-o" to="address_list" text="地址管理"/>
                    </van-grid>
                </div>
            </div>
            <div class="mySnacks">
                <p class="mySnacks-title">我的快递</p>
                <div>
                    <van-grid :border="false" icon-size="30px">
                        <van-grid-item icon="paid" to="kdPayment" text="待付款"/>
                        <van-grid-item icon="exchange" to="kdDdFh" text="等待发达"/>
                        <van-grid-item icon="records" to="kdRecording" text="订单记录"/>
                    </van-grid>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserInfo} from '@/request/api'

    export default {
        name: "user",
        data() {
            return {
                userInfo: {}
            }
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                getUserInfo({}).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        this.userInfo = res.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    };
</script>

<style scoped type="text/css">
    .my {
        background: #f7f8fa;
        padding-bottom: 50px;
        box-sizing: border-box;
    }

    .myBox {
        width: 100%;
        height: auto;
        border-bottom: 30px;
        background: #EFEFEF;
        margin: auto;
        padding-bottom: 10px;
        /*padding: 0 20px;*/
        box-sizing: border-box;
        overflow: hidden;
    }

    .personalInfo {
        width: 100%;
        height: 140px;
        padding: 0 0 0px 10px;
        box-sizing: border-box;
        /*background: #F92272;*/
        /*background: linear-gradient(to right, #0000003a,#0000003a, #0000004a, #0000007a);*/
        background: #FF0036;
    }

    .personal-msg {
        /*height: 60%;*/
        /*border-bottom: 2px solid #ffffff;*/
        position: relative;
        padding-top: 30px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .personal-msg img {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 50%;
        background: #EFEFEF;
        display: inline-block;
        float: left;
    }

    .personal-msg-des {
        float: left;
        margin-left: 10px;
        margin-top: 15px;
    }

    .personal-msg-des div:nth-child(1) {
        color: #ffffff;
        font-size: 16px;
    }

    .personal-msg-des div:nth-child(2) {
        color: #000000;
        font-size: 14px;
        padding: 0 5px;
        background: #ffffff;
        box-sizing: border-box;
        border-radius: 10px;
        margin-top: 5px;
    }

    .personal-text {
        width: 90px;
        font-size: 14px;
        padding: 5px 15px;
        box-sizing: border-box;
        color: #000000;
        /*background: linear-gradient(to right, #F9347B, #FA2E77, #FA2E77);*/
        background: #ffffff;
        text-align: center;
        position: absolute;
        top: 40px;
        right: -15px;
        border-radius: 50px;
    }

    .personalInfo-MoneyClass {
        margin-top: 20px;
    }

    .personalInfo-MoneyClass ul {
        display: flex;
        justify-content: space-around;
    }

    .personalInfo-MoneyClass ul li p {
        font-size: 28px;
        color: #ffffff;
        text-align: center;
    }

    .personalInfo-MoneyClass ul li p:nth-child(1) {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mySnacks {
        /*height: 300px;*/
        margin-top: 10px;
        background: #ffffff;
        padding: 10px 5px;
        box-sizing: border-box;
    }

    .mySnacks-title {
        font-size: 16px;
        font-weight: bold;
    }

    .mySnacks-title::before {
        width: 4px;
        height: 15px;
        content: '';
        background: #F9347B;
        display: inline-block;
        margin-right: 10px;
    }

    .mySnacks-title-list {
        display: flex;
        flex-wrap: wrap;
    }

    .my >>> .van-grid-item__text {
        color: #000000;
    }
</style>
