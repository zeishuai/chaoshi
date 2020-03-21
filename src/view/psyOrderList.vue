<template>
  <div class="payment-conter">
    <div class="paymentBox">
      <ul>
        <li v-for="(item,index) in goodsList" :key="item.id">
          <div class="payment-li-des" v-for="val in item.commbak"
               :key="val.id">
            <div class="payment-des-txt">
              <div>{{val.des}}</div>
              <div>数量：{{item.number}}</div>
              <div class="address">配送地址：{{item.sname}}{{item.bname}}{{item.detailAddress}}</div>
            </div>
          </div>
          <div class="payment-btu">
              <van-button type="primary" size="small" @click="confirmPay(item)">支付</van-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getOrderInBuilding} from "@/request/api"
  export default {
    name: "psyOrderList",
    data() {
      return {
        // 要展示我要送的商品数量，送到的地点就行了',
        show: false,
        goodsList: []
      }
    },
    created() {
      this.orderList()
    },
    methods: {
      // 列表
        orderList() {
            this.goodsList = [];
            let getLoading = this.$toast.loading('数据加载中...');
            getOrderInBuilding({status: 2}).then({}).then(res => {
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
    }
  };
</script>

<style scoped type="text/css">
  .payment-conter {
    height: auto;
    min-height: 700px;
    padding-bottom: 58px;
    box-sizing: border-box;
    background: #EFEFEF;
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
    padding-bottom: 15px;
    box-sizing: border-box;
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
    color: #A92D29;
  }

  .payment-li-des {
    margin-top: 20px;
    display: flex;
    /* border-bottom: 2px solid #EFEFEF; */
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  .payment-li-desimg {
    float: left;
  }

  .payment-des-txt {
    width: 100%;
    float: left;
    /* margin-left: 10px; */
  }

  .payment-des-txt div:nth-child(1) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 16px;
  }

  .payment-des-txt div:nth-child(2) {
    font-size: 15px;
    margin-top: 15px;
    /* color: rgb(255, 0, 0); */
    color: #444;
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
    font-size: 14px
  }


  .address{
    width: 100%;
    /*overflow: hidden;/*超出部分隐藏*/
    /*text-overflow:ellipsis;/* 超出部分显示省略号 */
    /*white-space: nowrap;/*规定段落中的文本不进行换行 */
    margin-top: 10px;
  }
</style>
