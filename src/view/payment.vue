<template>
  <div class="payment-conter">
    <div class="paymentBox">
      <ul>
        <li v-for="(item,index) in goodsList" :key="item.id">
          <div class="payment-li-number">
            <span>订单号:{{item.id}}</span>
            <span>待付款</span>
          </div>
          <div class="payment-li-des" v-for="val in item.commbak" :key="val.id">
            <div class="payment-li-desimg">
              <van-image
                width="70"
                height="70"
                radius="10"
                :src="val.pic"
              />
            </div>
            <div class="payment-des-txt">
              <div>{{val.name}}</div>
              <div>¥{{val.price}} x {{val.count}}</div>
            </div>
          </div>
          <div class="totalTxt">
<!--            <p>共{{item.number}}件商品</p>-->
            <div>
              合计：
              <span>¥{{item.totalPrice}}</span>
            </div>
          </div>
          <div class="payment-btu">
            <span @click="closeOrder(item)">取消订单</span>
            <span>付款</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { orderList,closeOrder } from "@/request/api";
  export default {
    name: "payment",
    data() {
      return {
        title: '待付款',
        show: false,
        goodsList: [
          {
            id: 1,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'2',
            orderNum:'sm1231323423423'
          },
          {
            id: 2,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'32',
            orderNum:'sm1231323423423'
          },
          {
            id: 3,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'22',
            orderNum:'sm1231323423423'
          },
          {
            id: 4,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'21',
            orderNum:'sm1231323423423'
          },
          {
            id: 5,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'11',
            orderNum:'sm1231323423423'
          }
        ]
      }
    },
    created() {
      this.orderList()
    },
    methods: {
      orderList(){
        orderList({status:0}).then({}).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              let nesarry = eval(res.data[i].commbak);
              res.data[i].commbak = nesarry;
              this.goodsList = res.data;
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 取消订单
      closeOrder(data) {
        closeOrder({ orderid: data.id })
          .then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$toast({ message: res.msg });
              setTimeout(() => {
                this.orderList()
              },500)
            } else {
              this.$toast({ message: res.msg });
            }
          })
          .catch(err => {
            console.log(err);
          });
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
    /*border-bottom: 2px solid #EFEFEF;*/
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

  .totalTxt {
    padding-top: 5px;
    box-sizing: border-box;
    border-top: 1px solid #EFEFEF;
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
    /*margin-top: 10px;*/
    display: flex;
    justify-content: flex-end;
    font-size: 14px
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
