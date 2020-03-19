<template>
  <div class="payment-conter">
    <div class="paymentBox">
      <ul>
        <li v-for="(item,index) in goodsList" :key="item.id">

          <div class="payment-li-des">
            <div class="payment-des-txt">
              <div>{{item.des}}</div>
              <div>数量：{{item.number}}</div>
              <div class="address">配送地址：{{item.address}}</div>
            </div>
          </div>
          <div class="payment-btu">
            <span>确认发达</span>
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
        goodsList: [
          {
            id: 1,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'2',
            orderNum:'sm1231323423423',
            address:'重庆市渝中区大坪街道长江二路354号'
          },
          {
            id: 2,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'32',
            orderNum:'sm1231323423423',
            address:'重庆市渝中区大坪街道长江二路354号'
          },
          {
            id: 3,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'22',
            orderNum:'sm1231323423423',
            address:'重庆市渝中区大坪街道长江二路354号'
          },
          {
            id: 4,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'21',
            orderNum:'sm1231323423423',
            address:'重庆市渝中区大坪街道长江二路354号'
          },
          {
            id: 5,
            des: '付邮免费送！2019护考复习资料安抚爱疯饿哦金融股看法app的卡片',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            money:'100.00',
            number:'11',
            orderNum:'sm1231323423423',
            address:'重庆市渝中区大坪街道长江二路354号'
          }
        ]
      }
    },
    created() {
      this.getOrderInBuilding()
    },
    methods: {
      // 列表
      getOrderInBuilding(){
        getOrderInBuilding({}).then(res => {
          console.log(res)
        })
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

  .payment-btu span {
    padding: 5px 15px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 50px;
    margin-left: 10px;
    border-color: rgb(255, 0, 0);
    color: rgb(255, 0, 0);
  }

  .payment-btu span:nth-child(2) {
    border-color: #a92d29;
    color: #a92d29;
  }
  .address{
    width: 100%;
    /*overflow: hidden;/*超出部分隐藏*/
    /*text-overflow:ellipsis;/* 超出部分显示省略号 */
    /*white-space: nowrap;/*规定段落中的文本不进行换行 */
    margin-top: 10px;
  }
</style>
