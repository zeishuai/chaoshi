<template>
  <div class="index" style="background: #FAFAFA;overflow: hidden">
    <div style="float: left;position: fixed;left: 0;z-index: 9999999;">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in arrs" :title="item"/>
      </van-sidebar>
    </div>
    <div class="" style="float: left;margin-left: 100px;padding-top: 10px;background: #fff">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in goodsList" :key="item.id" style="margin-bottom: 20px;overflow: hidden">
            <div style="overflow: hidden">
              <div class="goodsImg">
                <van-image
                  width="70"
                  height="70"
                  border="6"
                  :src="item.url"
                />
              </div>
              <div class="goodsTxtBox">
                <div class="goodsTxt">{{item.text}}</div>
                <div class="goodsTxt" style="color: #0000007a;font-size: 12px">
                  <span>香辣味</span>
                </div>
                <div class="goodsTxt" style="display: flex;justify-content: space-between">
                  <span style="line-height: 30px;width: 61px;display: inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgb(255, 0, 0);;font-size: 16px;font-weight: 600">¥{{item.value}}</span>
                  <van-stepper v-model="item.inputValue"/>
                </div>
              </div>
            </div>
<!--            <div style="margin-bottom: 10px;float: right">-->
<!--              <van-stepper v-model="item.inputValue"/>-->
<!--            </div>-->
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        activeKey: 0,
        inputValue: 1,
        loading: false,
        finished: false,
        refreshing: false,
        arrs: ['休闲食品', '辣条类', '肉食类', '面包类', '火腿肠', '饮料', '速食类',],
        judge: '1',
        goodsList: [{
          id: '111',
          value: 100,
          number: 10,
          inputValue: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '212',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '321',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '4213',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '11315',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '51',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '11',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '15',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }, {
          id: '5132',
          value: 1,
          text: '康师傅方便面大桶康师傅方便面大桶',
          inputValue: 1,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
        }]
      }
    },
    methods: {
      onChange (index) {
        console.log(index)
      },
      onLoad () {
        // setTimeout(() => {
        //   if (this.refreshing) {
        //     this.refreshing = false
        //   }
        //   let object ={}
        //   for (let i = 0; i < 15; i++) {
        //     object.text = '商品那就看那本书'
        //     object.url = 'https://img.yzcdn.cn/vant/cat.jpeg'
        //   }
        //   this.goodsList.push(object)
        //   this.loading = false
        //   if (this.goodsList.length >= 10) {
        //     this.finished = true
        //   }
        // }, 1000)
      },
      onRefresh () {
        // 清空列表数据
        this.finished = false

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
      }
    },
    created () {
      this.judge = this.arrs.length
    },
    mounted () {
    },
    watch: {},
  }
</script>
<style scoped lang="css" rel="stylesheet/css">
  li {
    list-style: none;
  }
  .goodsImg{
    float: left;
    margin-right: 10px;
  }
  .goodsTxtBox{
    width: 180px;
    float: left;
    padding-top: 6px;
    box-sizing: border-box;
  }
  .goodsTxt {
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
  }
</style>
