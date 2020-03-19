<template>
  <div class="index" style="background: #FAFAFA;overflow: hidden">
    <div style="float: left;position: fixed;left: 0;z-index: 9999999;">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in arrs" :title="item.name" :key="item.id" />
      </van-sidebar>
    </div>
    <div class style="float: left;margin-left: 100px;padding-top: 10px;background: #fff">
      <div v-for="item in goodsList" :key="item.id" style="margin-bottom: 20px;overflow: hidden">
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
              <van-stepper v-model="item.vald" default-value="0" @minus="minus(item)" @plus="plus(item)" disable-input />
            </div>
          </div>
        </div>
        <!--            <div style="margin-bottom: 10px;float: right">-->
        <!--              <van-stepper v-model="item.inputValue"/>-->
        <!--            </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { loginByCode,classify,commodityList,shopcarAddOne,shopcarSubOne } from "@/request/api";
export default {
  name: "index",
  data() {
    return {
      activeKey: 0,
      inputValue: 1,
      loading: false,
      finished: false,
      refreshing: false,
      arrs: [],
      judge: "1",
      goodsList: [],
      cid: "1" // 商品分类ID
    };
  },
  created() {
    if (window.location.search.indexOf("=") >= 0) {
      let code = window.location.search.split("=")[1].split("&")[0];
      this.onSubmit(code);
      setTimeout(() => {
        this.classifyList();
        this.commodityList(this.cid);
      }, 500);
    } else {
      setTimeout(() => {
        this.classifyList();
        this.commodityList(this.cid);
      }, 500);
    }
  },
  methods: {
    // 登陆获取token
    onSubmit(code) {
      loginByCode({ code: code })
        .then(res => {
          if (res.code == 0) {
            localStorage.setItem("token", res.data.token);
          }
        })
        .catch(err => {});
    },
    // 点击获取分类
    onChange(val) {
      console.log(val);
      this.arrs.map((item, index) => {
        if (index == val) {
          this.commodityList(item.id);
        }
      });
      // this.cid = index
    },
    // 商品分类
    classifyList() {
      classify({})
        .then(res => {
          if (res.code == 0) {
            console.log(res)
            this.arrs = res.data;
          }
        })
        .catch(err => {});
    },
    // 商品列表
    commodityList(cid) {
      commodityList({ cid: cid })
        .then(res => {
          if (res.code == 0) {
            for(let i =0;i<this.goodsList.length;i++){
              this.goodsList[i].vald = 0
            }
            this.goodsList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      // let token = localStorage.getItem("token");
      // let apiurl = `/api/user/shop/commodity/list?sessionid=${localStorage.getItem(
      //   "token"
      // )}&cid=${cid}`;
      // this.$axios({
      //   method: "get",
      //   url: apiurl
      // })
      //   .then(res => {
      //     this.goodsList = res.data.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // 添加一个到购物车
    plus(data) {
      shopcarAddOne({ cid: data.id })
        .then(res => {
          this.$toast({ message: res.msg });
        })
        .catch(err => {
          console.log(err);
        });
      // let apiurl = `/api/user/shopcar/addOne?sessionid=${localStorage.getItem(
      //   "token"
      // )}&cid=${data.id}`;
      // this.$axios({
      //   method: "get",
      //   url: apiurl
      // })
      //   .then(res => {
      //     this.$toast({
      //       message: res.data.msg
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // 减少一个到购物车
    minus(data) {
      shopcarSubOne({ cid: data.id })
        .then(res => {
          this.$toast({ message: res.data.msg });
        })
        .catch(err => {
          console.log(err);
        });
      // let apiurl = `&cid=${data.id}`;
      // this.$axios({
      //   method: "get",
      //   url: apiurl
      // })
      //   .then(res => {
      //     this.$toast({ message: res.data.msg });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
