<template>
  <div class="index" style="background: #FAFAFA;overflow: hidden">
    <div style="float: left;position: fixed;left: 0;z-index: 9999999;">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in arrs" :title="item.name" :key="item.id" />
      </van-sidebar>
    </div>
    <div class style="float: left;margin-left: 100px;padding-top: 10px;background: #fff">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div
            v-for="item in goodsList"
            :key="item.id"
            style="margin-bottom: 20px;overflow: hidden"
          >
            <div style="overflow: hidden">
              <div class="goodsImg">
                <van-image width="70" height="70" border="6" :src="item.pic" />
              </div>
              <div class="goodsTxtBox">
                <div class="goodsTxt">{{item.name}}</div>
                <div class="goodsTxt" style="color: #0000007a;font-size: 12px">
                  <span>{{item.specification}}</span>
                </div>
                <div class="goodsTxt" style="display: flex;justify-content: space-between">
                  <span
                    style="line-height: 30px;width: 61px;display: inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgb(255, 0, 0);;font-size: 16px;font-weight: 600"
                  >¥{{item.price}}</span>
                  <van-stepper v-model="item.inputValue" />
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
  name: "index",
  data() {
    return {
      activeKey: 0,
      inputValue: 1,
      loading: false,
      finished: false,
      refreshing: false,
      arrs: [
        {
          id: "1",
          name: "速食类"
        },
        {
          id: "2",
          name: "速食类"
        },
        {
          id: "3",
          name: "速食类"
        },
        {
          id: "4",
          name: "速食类"
        }
      ],
      judge: "1",
      goodsList: [],
      cid:'1', // 商品分类ID
    };
  },
  created() {
    this.classifyList();
    this.commodityList(this.cid)
  },
  methods: {
    onChange(val) {
      console.log(val)
      this.arrs.map((item,index) => {
        if (index == val) {
          this.commodityList(item.id)
        }
      })
      // this.cid = index
    },
    // 商品分类
    classifyList() {
      console.log(localStorage.getItem("token"));
      let apiurl =
        "/api/user/shop/classify/list?sessionid=" + localStorage.getItem("token");
      this.$axios({
        method: "get",
        url: apiurl
      })
        .then(res => {
          console.log(res)
          this.arrs = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 商品列表
    commodityList(cid) {
      let token = localStorage.getItem("token")
      let apiurl = `/api/user/shop/commodity/list?sessionid=${localStorage.getItem("token")}&cid=${cid}`
      this.$axios({
        method: "get",
        url: apiurl
      })
        .then(res => {
          this.goodsList = res.data.data;
          console.log(this.goodsList)
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
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
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },

  mounted() {},
  watch: {}
};
</script>
<style scoped lang="css" rel="stylesheet/css">
li {
  list-style: none;
}
.goodsImg {
  float: left;
  margin-right: 10px;
}
.goodsTxtBox {
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
