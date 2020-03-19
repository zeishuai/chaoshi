<template>
  <div class="carBox">
    <div class="shoppingMain">
      <div class="shoppingItem" v-for="(item,index) in shoppingList" :key="item.id">
        <div class="selectCircle" :class="{checked:item.isSelect}" @click="selectGoods(item)"></div>
        <div class="shoppingImg">
          <img :src="item.pic" alt />
        </div>
        <div class="itemRight">
          <div class="title">{{item.name}}</div>
          <div>{{item.specification}}</div>
          <div class="numAndMoney">
            <div>￥{{item.price}}</div>
            <div class="numberControl">
              <van-stepper
                disable-input
                v-model="item.count"
                default-value="item.count"
                @minus="numDel(item,index)"
                @plus="numAdd(item,index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomMain">
      <div
        class="selectCircle"
        style="margin: 10px 5px auto 14px;"
        :class="{checked:allSelect}"
        @click="allGoodsSelect"
      ></div>
      <span style="padding: 10px;">全选</span>
      <button class="bottombtn2" @click="delGoods">删除</button>
      <button class="bottombtn1" @click="buyGoods">￥{{sum}}&nbsp;结算</button>
    </div>

    <van-popup v-model="isShow" position="top" class="overlay80vh" :overlay="true">
      <ul class="addressul">
        <li :class="addressliact == index ? 'addressliact': 'addressli'" v-for="(item,index) in addressList" :key="item.id" @click="addressclick(index)" >
          <div class="addressli1">
            <div>
              <span>{{item.name}}</span>
              <span>{{item.phone}}</span>
            </div>
            <div>{{item.sid}}{{item.bid}}{{item.detailAddress}}</div>
          </div>
          <div class="addressli2">
            <van-icon name="edit" />
          </div>
        </li>
      </ul>
      <div class="addresssub" @click="onAdd">新增地址</div>
      <!-- <van-address-list v-model="chosenAddressId" :list="addressList1" @add="onAdd" @edit="onEdit" /> -->
    </van-popup>
    <!--新增地址-->
    <van-popup
      v-model="addShow"
      position="top"
      style="height:100vh"
      class="overlay80vh"
      :overlay="true"
    >
      <van-form>
        <van-field v-model="address.name" name="姓名" label="姓名" placeholder="姓名" />
        <van-field v-model="address.phone" name="电话" label="电话" placeholder="电话" />
        <van-field
          readonly
          clickable
          name="picker"
          :value="address.school"
          label="学校"
          placeholder="点击选择学校"
          @click="XXshowPicker = true"
        />
        <van-popup v-model="XXshowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="XXcolumns"
            @confirm="onConfirmXX"
            @cancel="XXshowPicker = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="address.LH"
          label="楼号"
          placeholder="点击选择楼号"
          @click="LHshowPicker = true"
        />
        <van-popup v-model="LHshowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="LHcolumns"
            @confirm="onConfirmLH"
            @cancel="LHshowPicker = false"
          />
        </van-popup>
        <van-field v-model="address.detailAddress" name="详细地址" label="详细地址" placeholder="详细地址" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="addressSubmit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import {
  shopcarList,
  delGoods,
  getUserAddress,
  getSchools,
  getBuildingsBySchool,
  addNewAddress
} from "@/request/api";
export default {
  name: "shoppingCart",
  data() {
    return {
      addressliact:0,
      isShow: false, // 选中地址
      addShow: false, // 新增地址
      XXcolumns: [], // 学校地址
      XXcolumns1: [],
      XXshowPicker: false,
      LHshowPicker: false,
      LHcolumns: [], // 楼号
      LHcolumns1: [],
      LHshowPicker: false,
      chosenAddressId: "1",
      addressList: [],
      address: {
        name: "",
        phone: "",
        school: "",
        LH: "",
        sid: "",
        bid: "",
        detailAddress: ""
      },
      active: 0,
      shoppingList: [],
      allSelect: false,
      sum: 0,
      pic: { url: "../../static/img/sele.png" }
    };
  },
  created() {
    this.shoppingCarList();
    this.getUserAddress();
  },
  methods: {
    // 选择地址
    addressclick (index) {
      this.addressliact = index
    },
    // 获取学校
    getSchools() {
      getSchools({})
        .then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.XXcolumns.push(res.data[i].name);
            }
            this.XXcolumns1 = res.data;
          } else {
            this.$toast({ message: res.msg });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取楼号
    getBuildingsBySchool(sid) {
      getBuildingsBySchool({ sid: sid })
        .then(res => {
          if (res.code == 0) {
            if (res.data.length == 0) {
              this.LHcolumns = [];
            } else {
              for (let i = 0; i < res.data.length; i++) {
                this.LHcolumns.push(res.data[i].name);
              }
            }
            // console.log(this.LHcolumns)
            this.LHcolumns1 = res.data;
          } else {
            this.$toast({ message: res.msg });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onAdd() {
      this.addShow = true;
      this.isShow = false
      this.getSchools();
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    // 学校选中
    onConfirmXX(value) {
      let sid = "";
      this.address.school = value;
      this.XXshowPicker = false;
      this.XXcolumns1.map(item => {
        if (item.name == value) {
          this.address.sid = item.id;
          sid = item.id;
        }
      });
      this.getBuildingsBySchool(sid);
    },
    // 楼号选择
    onConfirmLH(value) {
      this.address.LH = value;
      this.LHshowPicker = false;
      this.LHcolumns1.map(item => {
        if (item.name == value) {
          this.address.bid = item.id;
        }
      });
    },
    // 提交地址
    addressSubmit() {
      if (this.address.name == "") {
        this.$toast({ message: "请填写名字" });
        return false;
      }
      if (this.address.phone == "") {
        this.$toast({ message: "请填写电话" });
        return false;
      }
      if (this.address.sid == "") {
        this.$toast({ message: "请选择学校" });
        return false;
      }
      if (this.address.bid == "") {
        this.$toast({ message: "请选择楼号" });
        return false;
      }
      if (this.address.detailAddress == "") {
        this.$toast({ message: "请填写想写地址" });
        return false;
      }

      addNewAddress({
        name: this.address.name,
        phone: this.address.phone,
        sid: this.address.sid,
        bid: this.address.bid,
        detailAddress: this.address.detailAddress
      })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$toast({ message: res.msg });
            this.getUserAddress();
            this.addShow = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取地址列表
    getUserAddress() {
      getUserAddress({})
        .then(res => {
          if (res.code == 0) {
            this.addressList = res.data;
          }
          console.log(this.addressList);
        })
        .catch(err => {});
    },
    // 购物车列表
    shoppingCarList() {
      shopcarList({})
        .then(res => {
          this.shoppingList = res.data;
          this.shoppingList.map(item => {
            item.isSelect = false;
          });
        })
        .catch(err => {
          //  console.log(err)
        });
      // let apiurl = `/api/user/shopcar/list?sessionid=${localStorage.getItem("token")}`
      // this.$axios({
      //   method: "get",
      //   url: apiurl
      // })
      //   .then(res => {
      //     console.log(res)
      //     this.shoppingList = res.data.data;
      //     this.shoppingList.map(item => {
      //       item.isSelect = false
      //     })
      //     console.log(this.shoppingList)
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    selectGoods(item) {
      item.isSelect = !item.isSelect;
      this.allSelect = false;
      if (item.isSelect == true) {
        this.sum = this.sum + item.price * item.count;
      } else {
        this.sum = this.sum - item.price * item.count;
      }
    },
    allGoodsSelect() {
      this.allSelect = !this.allSelect;
      if (this.allSelect == true) {
        this.sum = 0;
        for (var i = 0; i < this.shoppingList.length; i++) {
          this.shoppingList[i].isSelect = true;
          this.sum =
            this.sum + this.shoppingList[i].price * this.shoppingList[i].count;
        }
      } else {
        for (var i = 0; i < this.shoppingList.length; i++) {
          this.sum =
            this.sum - this.shoppingList[i].price * this.shoppingList[i].count;
          this.shoppingList[i].isSelect = false;
        }
      }
    },
    numAdd(item, index) {
      item.num++;
      if (item.isSelect == true) {
        this.sum = this.sum + item.price;
      }
    },
    numDel(item, index) {
      item.num--;
      if (item.isSelect == true) {
        this.sum = this.sum - item.price;
      }
      if (item.num == 0) {
        this.shoppingList.splice(index, 1);
      }
    },
    buyGoods() {
      //alert("购买成功,共花费" + this.sum + "元");
      this.isShow = true;
    },
    delGoods() {
      this.sum = 0;
      for (var i = 0; i < this.shoppingList.length; i++) {
        if (this.shoppingList[i].isSelect) {
          this.shoppingList.splice(i, 1);
          i--;
        }
      }
      if (this.allSelect) {
        this.shoppingList.splice(0, this.shoppingList.length);
        this.allSelect = false;
      }
      delGoods({})
        .then(res => {
          if (res.code == 0) {
            this.$toast({ message: res.msg });
          }
          setTimeout(() => {
            this.shoppingCarList();
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
      // let apiurl = `/api/user/shopcar/clear?sessionid=${localStorage.getItem("token")}`
      // this.$axios({
      //   method: "get",
      //   url: apiurl
      // }).then(res => {
      //   if(res.data.code == 0) {
      //     this.$toast({message: res.data.msg});
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
};
</script>

<style scoped lang="less">
.carBox {
  min-height: 750px;
  background: #f7f8fa;
}

button {
  outline: none;
  border-color: transparent;
  box-shadow: none;
}
.shoppingMain {
  padding-top: 10px;
  width: 100%;
  height: auto;
  margin-bottom: 70px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.shoppingItem {
  width: 96%;
  margin-left: 2%;
  background: #fff;
  border-radius: 5px;
  display: flex;
  margin-bottom: 10px;
  padding: 10px 0;
  box-sizing: border-box;
}
.selectCircle {
  width: 20px;
  height: 20px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  margin: 38px 0px auto 10px;
}
.shoppingImg {
  width: 70px;
  height: 70px;
  padding: 10px;
}
.shoppingImg img {
  height: 100%;
  width: 100%;
}
.itemRight {
  font-size: 14px;
  width: 300px;
  padding-top: 20px;
  /*margin-top: 26px;*/
  text-align: left;
  box-sizing: border-box;
}
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.numAndMoney {
  margin-top: 10px;
  display: flex;
  position: relative;
}
input {
  width: 40px;
  height: 20px;
  margin: 10px;
  text-align: center;
}
.numberControl {
  position: absolute;
  right: 30px;
  top: -14px;
}
.bottomMain {
  position: fixed;
  width: 100%;
  height: 60px;
  /*border: 1px #a7a5a5 solid;*/
  bottom: 49px;
  left: 0;
  background: #fff;
  display: flex;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
}
.btn {
  padding: 0px 10px;
  box-sizing: border-box;
  background: #cccccc5a;
  line-height: 25px;
}
.bottombtn1 {
  width: auto;
  height: 35px;
  border: none;
  color: #fff;
  background-color: rgb(255, 0, 0);
  border-radius: 25px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-left: 10px;
  /*margin-top: 6px;*/
  /*margin: 10px 0 0 20px;*/
}
.bottombtn2 {
  width: 60px;
  height: 35px;
  border: none;
  color: #444444;
  background-color: #f2f3f5;
  border-radius: 25px;
  padding: 0 10px;
  box-sizing: border-box;
  /*margin-top: 6px;*/
  margin-left: 100px;
  /*margin: 10px 0 0 300px;*/
}
.checked {
  border: 2px solid #e26411;
  border-radius: 50%;
  /*background: url('~@/../static/img/sele.png') center center no-repeat;*/
  background: url("../assets/img/sele.png") no-repeat center;
}
.numberControl-input {
  /*border:1px solid #cccccc;*/
  border: none;
  outline: none;
}
.overlay80vh {
  // height:50vh;
}
.addressul {
  overflow: auto;
  background: #f3f3f3;
}
.addressli {
  width: 95%;
  margin: auto;
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #cccccc;
}
.addressliact{
  width: 95%;
  margin: auto;
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #cccccc;
  border-color: rgb(255, 0, 0);
}
.addressli1 {
  width: 80%;
  float: left;
}
.addressli2 {
  float: right;
  margin-top: 18px;
}
.addresssub{
  width: 60%;
  height: 40px;
  margin: auto;
  text-align: center;
  line-height: 40px;
  margin-top: 10px;
  color: #ffffff;
  background: rgb(255, 0, 0);
  border-radius: 50px;
}
.van-popup{
  padding-bottom: 10px;
}
// .van-address-list {
//   position: relative;
//   overflow: hidden;
// }
// .van-address-list__bottom {
//   position: absolute;
// }
</style>
