<template>
  <div class="payment-conter">
    <div class="paymentBox">
      <ul>
        <li v-for="(item,index) in goodsList" :key="item.id">
          <div class="payment-li-number">
            <span>订单号:sm1231323423423</span>
            <span>待评价</span>
          </div>
          <div class="payment-li-des">
            <div class="payment-li-desimg">
              <van-image
                width="70"
                height="70"
                radius="10"
                :src="item.url"
              />
            </div>
            <div class="payment-des-txt">
              <div>{{item.des}}</div>
              <div>¥{{item.money}} x {{item.number}}</div>
            </div>
          </div>
          <div class="totalTxt">
            <p>共{{item.number}}件商品</p>
            <p>合计：<span>¥{{item.money}}</span>（运费¥10.00）</p>
          </div>
          <div class="payment-btu">
            <span @click="showToast">评价</span>
          </div>
        </li>
      </ul>
    </div>
     <!--评价弹出层-->
    <van-popup v-model="show" position="top" style='padding:10px;box-sizing: border-box;'>
      <!-- <p class="ecal-score-title">发表评论</p> -->
      <div class="ecal-score">
        描述相符：
        <van-rate v-model="rateValue"/>
      </div>
      <div class="rateMessage">
        <p style="font-size: 14px;">留言：</p>
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
        round block type="info" native-type="submit">
        提交
      </van-button>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "evaluated",
    data() {
      return {
        show: false,
        rateValue: 3,
        rateMessage:'',
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
    methods: {
      showToast() {
        this.show = true
        // this.$toast({
        //   message: "取消成功",
        // })
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
      padding: 15px 10px 10px 10px;
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
    border-bottom: 2px solid #EFEFEF;
    padding-bottom: 20px;
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
