<template>
  <div class="payment-conter">
    <div class="paymentBox">
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
          <div
            :class="item.orderType == '2' ? 'none': 'payment-li-des'"
            v-for="val in item.commbak"
            :key="val.id"
          >
            <div class="payment-li-desimg">
              <van-image width="70" height="70" radius="10" :src="val.pic" />
            </div>
            <div class="payment-des-txt">
              <div>{{val.name}}</div>
              <div>¥{{val.price}} x {{val.count}}</div>
            </div>
          </div>
            <div class="bottom" v-if="item.status == 0">
                <p class="totalTxt">合计：<span class="all-price">¥{{item.totalPrice}}</span></p>
                <div class="payment-btu">
                    <van-button type="danger" style="margin-right: 10px" size="small" @click="closeOrder(item)">取消订单</van-button>
                    <van-button type="primary" size="small" @click="confirmPay(item)">支付</van-button>
                </div>
            </div>
            <div class="bottom" v-if="item.status == 3">
                <p class="totalTxt">合计：<span class="all-price">¥{{item.totalPrice}}</span></p>
                <div class="payment-btu">
                    <van-button type="danger" style="margin-right: 10px" size="small" @click="closeOrder(item)">取消订单</van-button>
                    <van-button type="primary" size="small" @click="finishOrder(item)">完成订单</van-button>
                </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getOrderInBuilding,closeOrder,finishOrder } from "@/request/api";
export default {
  name: "kdRecording",
  data() {
    return {
      title: "快递-订单记录",
      show: false,
      goodsList: []
    };
  },
  created() {
    this.getOrderInBuilding();
  },
  methods: {
    // 列表
    getOrderInBuilding() {
      getOrderInBuilding({}).then(res => {
        if (res.code === 0) {
          for (let index = 0; index < res.data.length; index++) {
            let nesarry = eval(res.data[index].commbak);
            res.data[index].commbak = nesarry;
            this.goodsList = res.data;
          }
          console.log(this.goodsList);
          // this.goodsList = res.data;
        }
      });
    },
        // 取消订单
    closeOrder(data) {
      closeOrder({ orderid: data.id })
        .then(res => {
          console.log(res);
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
          console.log(res);
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
  /*border-bottom: 2px solid #efefef;*/
  padding-bottom: 20px;
  box-sizing: border-box;
}

.payment-li-desimg {
  float: left;
}
.none {
  margin-top: 20px;
  display: flex;
  padding-bottom: 20px;
  box-sizing: border-box;
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

.totalTxt {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.all-price{
    color: #f00;
}

.payment-btu {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
}

.bottom{
    height: 50px;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #EFEFEF;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
</style>
