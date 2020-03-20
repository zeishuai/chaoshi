<template>
  <div class="payment-conter">
    <div class="paymentBox">
      <ul>
        <li v-for="(item,index) in goodsList" :key="item.id">
          <p class="payment-li-number">
            <span>订单号:{{item.id}}</span>
            <span v-if="item.status == 0">未支付</span>
            <span v-if="item.status == -1">取消支付</span>
            <span v-if="item.status == 1">等待派送</span>
            <span v-if="item.status == 2">派送中</span>
            <span v-if="item.status == 3">已完成</span>
          </p>
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
          <div class="payment-btu" v-if="item.status == 0">
            <span @click="closeOrder(item)">取消</span>
            <span >付款</span>
          </div>
          <div class="payment-btu" v-if="item.status == 3">
            <span @click="finishOrder(item)">完成订单</span>
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
  padding: 5px 10px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 10px;
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
  color: #a92d29;
}

.payment-li-des {
  margin-top: 20px;
  display: flex;
  border-bottom: 2px solid #efefef;
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

.totalTxt p:nth-child(1) {
  font-size: 13px;
  color: #cccccc;
}

.totalTxt p:nth-child(2) {
  font-size: 15px;
  color: #000000;
}

.totalTxt p:nth-child(2) span {
  color: #a92d29;
}

.payment-btu {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
}

.payment-btu span {
  padding: 5px 15px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #000000;
  border-radius: 50px;
  margin-left: 10px;
  color: #000000;
}

.payment-btu span:nth-child(2) {
  border-color: #a92d29;
  color: #a92d29;
}
</style>
