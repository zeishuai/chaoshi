<template>
  <div class="index" style="background: #FAFAFA;overflow: hidden;">
    <van-row>
      <van-col span="5.5" style="border-right: 1px solid #f1f1f1;min-height: 500px;">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item
            v-for="(item,index) in arrs"
            :info="item.weibiao > 0 ? item.weibiao : null"
            :title="item.name"
            :key="item.id"
          />
        </van-sidebar>
      </van-col>
      <van-col
        span="18"
        style="background: #fafafa;height: 100%;margin-bottom: 10px;overflow-y: auto"
      >
        <van-skeleton v-if="goodsList.length < 1" title :row="10" />
        <van-row
          v-if="goodsList.length > 0"
          v-for="item in goodsList"
          :key="item.id"
          style="margin-bottom: 10px;background: #fff;padding-top: 13px"
        >
          <van-col span="7" style="padding-left:10px;padding-right:10px">
            <van-image width="100%" height="78" style="overflow: hidden" :src="item.pic" />
          </van-col>
          <van-col span="17">
            <div class="goodsTxtBox">
              <div class="goodsTxt">{{item.name}}</div>
              <div class="goodsTxt" style="color: #0000007a;font-size: 12px">
                <span>{{item.specification}}</span>
              </div>
              <div class="goodsTxt" style="display: flex;">
                <span
                  style="line-height: 30px;width: 40%;display: inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgb(255, 0, 0);;font-size: 16px;font-weight: 600"
                >¥{{item.price}}</span>
                <van-stepper
                  v-model="item.countVal"
                  min="0"
                  :default-value="item.countVal ? item.countVal : 0"
                  @plus="plus(item)"
                  @minus="minus(item)"
                />
              </div>
            </div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <div style="width: 100%;height: 100px;overflow:hidden;"></div>
    <!--        购物车显示-->
    <van-popup
      v-model="carShow"
      position="bottom"
      round
      closeable
      style="min-height:50%;"
      :overlay="true"
    >
      <ul style="padding: 45px 10px 10px 10px;">
        <li
          v-for="item in shoppingList"
          :key="item.id"
          style="display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                margin: auto;
                margin-bottom: 10px;"
        >
          <div class="carTxt">{{item.name}}</div>
          <div style="color: #f00;font-weight: 600;font-size: 20px">¥{{item.price}}</div>
          <van-stepper
            v-model="item.count"
            min="0"
            :default-value="item.count ? item.count : 0"
            @plus="plusCar(item)"
            @minus="minusCar(item)"
          />
        </li>
      </ul>
    </van-popup>
    <div
      style="margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    position: fixed;
                    bottom: 50px;
                    right: 10px;
                    width: 100%;
                    padding: 5px;
                    box-sizing: border-box;
                    background: #ffffff"
    >
      <div class="heji" @click="carShowclick">￥{{sum}}&nbsp;</div>
      <div>
        <button class="bottombtn2" @click="delGoods" style="margin-left:10px">清空购物车</button>
        <button class="bottombtn1" @click="buyGoods">结算</button>
      </div>
    </div>
    <!--地址-->
    <div>
      <van-popup
        v-model="isShow"
        position="bottom"
        :style="{ height: '50%' }"
        round
        closeable
        :overlay="true"
      >
        <div style="padding-bottom: 10px;box-sizing: border-box">
          <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="updateAddressShow"
            @select="addressclick"
          />
        </div>
      </van-popup>
    </div>
    <!--新增地址-->
    <div>
      <van-popup v-model="addShow" position="bottom" :style="{ height: '60%' }" round closeable>
        <van-cell-group title="请填写地址信息">
          <van-field v-model="address.name" name="姓名" label="姓名" placeholder="姓名" size="large" />
          <van-field v-model="address.phone" name="电话" label="电话" placeholder="电话" />
          <van-field
            name="picker"
            clickable
            readonly
            :value="address.school"
            label="学校"
            placeholder="点击选择学校"
            @click="XXshowPicker = true"
          />
        </van-cell-group>

        <van-popup get-container="body" v-model="XXshowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="XXcolumns"
            @cancel="XXshowPicker = false"
            @confirm="onConfirmXX"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="address.LH"
          label="楼号"
          :default-index="1"
          placeholder="点击选择楼号"
          @click="LHshowPicker = true"
        />
        <van-popup get-container="body" v-model="LHshowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="LHcolumns"
            @confirm="onConfirmLH"
            @cancel="LHshowPicker = false"
          />
        </van-popup>
        <van-field v-model="address.detailAddress" name="详细地址" label="详细地址" placeholder="详细地址" />
        <div style="margin: 16px;" v-if="addressSta == 1">
          <van-button
            color="#f00"
            round
            block
            type="info"
            native-type="submit"
            @click="addressSubmit"
          >添加</van-button>
        </div>
        <div style="margin: 16px;" v-if="addressSta == 2">
          <van-button
            color="#f00"
            round
            block
            type="info"
            native-type="submit"
            @click="updateAddress"
          >修改</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
// import { classify, commodityList, shopcarAddOne, shopcarSubOne} from "@/request/api";
import {
  shopcarList,
  delGoods,
  getUserAddress,
  getSchools,
  getBuildingsBySchool,
  addNewAddress,
  updateAddress,
  shopcarpay,
  classify,
  commodityList,
  shopcarAddOne,
  shopcarSubOne
} from '@/request/api'
import { weiXinConfig, weiXinPayConfig } from '../request/api'
import { startPay } from '../function/wechat'

export default {
  name: 'index',
  data() {
    return {
      carShow: false,
      value: '',
      isloding: true,
      activeKey: 0,
      inputValue: 1,
      loading: false,
      finished: false,
      refreshing: false,
      arrs: [],
      judge: '1',
      goodsList: [],
      cid: '1', // 商品分类ID
      // 结算参数
      isShow: false, // 选中地址
      chosenAddressId: '1',
      addressList: [], // 地址数据
      addShow: false, // 新增地址
      XXshowPicker: false,
      XXcolumns: [], // 学校地址
      XXcolumns1: [], // 学校地址
      LHcolumns: [], // 楼号
      LHcolumns1: [],
      LHshowPicker: false,
      addressSta: 1, // 新增1 修改2
      shops: '', // 购物车id
      addressid: '', // 支付时的地址id
      sum: 0,
      pattern: /^1[3456789]\d{9}$/, // 正则验证
      address: {
        name: '',
        phone: '',
        school: '',
        LH: '',
        sid: '',
        bid: '',
        detailAddress: ''
      },
      shoppingList: [] // 购物车列表数据
    }
  },
  created() {
    this.classifyList()
    this.commodityList(this.cid)
    setTimeout(() => {
      this.shoppingCarList()
    }, 200)
  },
  methods: {
    carShowclick() {
      if (this.shoppingList.length == 0) {
        this.carShow = false
      } else {
        this.shoppingCarList()
        this.carShow = true
      }
    },
    // 分类选中
    onChange(val) {
      this.arrs.map((item, index) => {
        if (index == val) {
          this.commodityList(item.id)
        }
        this.shoppingCarList()
      })
    },
    // 商品分类
    classifyList() {
      classify({})
        .then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].weibiao = null
            }

            this.arrs = res.data
          }
        })
        .catch(err => {})
    },
    // 商品列表
    commodityList(cid) {
      const loading = this.$toast.loading('数据获取中')
      commodityList({ cid: cid })
        .then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].countVal = 0
            }
            this.goodsList = res.data
            loading.clear()
          }
        })
        .catch(err => {
          loading.clear()
        })
    },
    // 添加一个到购物车
    plus(data) {
      let addLoading = this.$toast.loading('加载中')
      shopcarAddOne({ cid: data.id })
        .then(res => {
          addLoading.clear()
          this.shoppingCarList()
          if (res.code !== 0) {
            this.$toast.fail(res.msg)
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 减少一个到购物车
    minus(data) {
      let addLoading = this.$toast.loading()
      shopcarSubOne({ cid: data.id })
        .then(res => {
          addLoading.clear()
          this.shoppingCarList()
          if (res.code !== 0) {
            this.$toast.fail(res.msg)
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 添加一个到购物车
    plusCar(data) {
      let addLoading = this.$toast.loading('加载中')
      shopcarAddOne({ cid: data.cid })
        .then(res => {
          addLoading.clear()
          this.shoppingCarList()
          if (res.code !== 0) {
            this.$toast.fail(res.msg)
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 减少一个到购物车
    minusCar(data) {
      let addLoading = this.$toast.loading()
      shopcarSubOne({ cid: data.cid })
        .then(res => {
          addLoading.clear()
          this.shoppingCarList()
          if (res.code !== 0) {
            this.$toast.fail(res.msg)
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 编辑地址
    updateAddressShow(data) {
      this.addressSta = 2
      this.address.id = data.id
      this.address.name = data.name
      this.address.phone = data.phone
      this.address.sid = data.sid
      this.address.bid = data.bid
      this.address.detailAddress = data.detailAddress
      this.address.school = data.sname
      this.address.LH = data.bname
      this.getSchools()
      this.getBuildingsBySchool()
      this.addShow = true
    },
    updateAddress() {
      if (this.address.name == '') {
        this.$toast({ message: '请填写名字' })
        return false
      }
      if (this.address.phone == '') {
        this.$toast({ message: '请填写电话' })
        return false
      }
      if (this.pattern.test(this.address.phone) == false) {
        this.$toast({ message: '电话格式错误' })
        return false
      }
      if (this.address.sid == '') {
        this.$toast({ message: '请选择学校' })
        return false
      }
      if (this.address.bid == '') {
        this.$toast({ message: '请选择楼号' })
        return false
      }
      if (this.address.detailAddress == '') {
        this.$toast({ message: '请填写想写地址' })
        return false
      }
      let updateAddressLoading = this.$toast.loading('加载中...')
      updateAddress({
        id: this.address.id,
        name: this.address.name,
        phone: this.address.phone,
        sid: this.address.sid,
        bid: this.address.bid,
        detailAddress: this.address.detailAddress
      })
        .then(res => {
          updateAddressLoading.clear()
          if (res.code == 0) {
            this.$toast.success({ message: res.msg })
            this.addressSta = 1
            this.getUserAddress()
            this.addShow = false
          }
        })
        .catch(err => {
          updateAddressLoading.clear()
        })
    },
    // 支付
    shopcarpay() {
      let configData = {}
      if (!this.shops) {
        return this.$toast({ message: '没有选择商品哦~' })
      }
      let that = this
      let payLoading = this.$toast.loading('正在支付...')
      weiXinConfig({ url: window.location.href })
        .then(res => {
          configData = res.data
        })
        .then(step => {
          // 获取支付参数
          weiXinPayConfig({ shops: this.shops, addressid: this.addressid })
            .then(pay => {
              payLoading.clear()
              pay.data.package = pay.data.packageValue
              let res = startPay(configData, pay.data)
              // 支付调试
              setTimeout(function() {
                that.checkedAll = false
                that.sum = 0
                that.shoppingCarList()
              }, 8000)
            })
            .catch(err => {
              this.$toast.fail('网络出错')
            })
        })
        .catch(err => {
          payLoading.clear()
        })
    },
    // 选择地址
    addressclick(data) {
      this.addressid = data.id
      this.isShow = false
      this.shopcarpay()
    },
    // 获取学校
    getSchools() {
      let addLoading = this.$toast.loading('加载中')
      this.XXcolumns = []
      getSchools({})
        .then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.XXcolumns.push(res.data[i].name)
              addLoading.clear()
            }
            this.XXcolumns1 = res.data
          } else {
            this.$toast({ message: res.msg })
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 获取楼号
    getBuildingsBySchool(sid) {
      let addLoading = this.$toast.loading('加载中')
      this.LHcolumns = []
      getBuildingsBySchool({ sid: sid })
        .then(res => {
          if (res.code == 0) {
            addLoading.clear()
            if (res.data.length == 0) {
              this.LHcolumns = []
            } else {
              for (let i = 0; i < res.data.length; i++) {
                this.LHcolumns.push(res.data[i].name)
              }
            }
            this.LHcolumns1 = res.data
          } else {
            this.$toast({ message: res.msg })
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    onAdd() {
      this.addShow = true
      this.addressSta = 1
      this.getSchools()
      this.address = {}
    },
    // 学校选中
    onConfirmXX(value) {
      let sid = ''
      this.address.school = value
      this.XXshowPicker = false
      this.XXcolumns1.map(item => {
        if (item.name == value) {
          this.address.sid = item.id
          sid = item.id
        }
      })
      this.getBuildingsBySchool(sid)
    },
    // 楼号选择
    onConfirmLH(value) {
      this.address.LH = value
      this.LHshowPicker = false
      this.LHcolumns1.map(item => {
        if (item.name == value) {
          this.address.bid = item.id
        }
      })
    },
    // 提交地址
    addressSubmit() {
      if (this.address.name == '') {
        this.$toast({ message: '请填写名字' })
        return false
      }
      if (this.address.phone == '') {
        this.$toast({ message: '请填写电话' })
        return false
      }
      if (this.pattern.test(this.address.phone) == false) {
        this.$toast({ message: '电话格式错误' })
        return false
      }
      if (this.address.sid == '') {
        this.$toast({ message: '请选择学校' })
        return false
      }
      if (this.address.bid == '') {
        this.$toast({ message: '请选择楼号' })
        return false
      }
      if (this.address.detailAddress == '') {
        this.$toast({ message: '请填写想写地址' })
        return false
      }
      let addLoading = this.$toast.loading('加载中')
      addNewAddress({
        name: this.address.name,
        phone: this.address.phone,
        sid: this.address.sid,
        bid: this.address.bid,
        detailAddress: this.address.detailAddress
      })
        .then(res => {
          if (res.code == 0) {
            this.$toast.success({ message: res.msg })
            addLoading.clear()
            this.addressSta = 2
            this.getUserAddress()
            this.addShow = false
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 获取地址列表
    getUserAddress() {
      let addLoading = this.$toast.loading('加载中')
      getUserAddress({})
        .then(res => {
          if (res.code == 0) {
            addLoading.clear()
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].tel = res.data[i].phone
              res.data[
                i
              ].address = `${res.data[i].sname} ${res.data[i].bname} ${res.data[i].detailAddress}`
            }
            this.addressList = res.data
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    // 购物车列表
    shoppingCarList() {
      let addLoading = this.$toast.loading('加载中')
      let _this = this
      this.shoppingList = []
      shopcarList({})
        .then(res => {
          addLoading.clear()
          _this.shoppingList = res.data
          _this.func(res.data) //处理徽标
          _this.func2(res.data)
          if (res.data.length < 1) {
            _this.sum = 0
          }
        })
        .catch(err => {
          addLoading.clear()
        })
    },
    func(data) {
      for (let y in this.arrs) {
        let temp = 0
        let tempMoney = 0
        for (let z in data) {
          //goug
          tempMoney = tempMoney + data[z].count * data[z].price
          this.sum = tempMoney
          if (data[z].classifyid === this.arrs[y].id) {
            temp += parseInt(data[z].count)
          }
        }
        this.arrs[y].weibiao = temp
      }
    },
    func2(data) {
      for (let y in this.goodsList) {
        for (let z in data) {
          //goug
          if (data[z].cid === this.goodsList[y].id) {
            this.goodsList[y].countVal = data[z].count
          }
        }
      }
    },
    // 结算数组中相同值
    getWordCnt(arr) {
      var obj = {}
      for (var i = 0, l = arr.length; i < l; i++) {
        var item = arr[i]
        obj[item] = obj[item] + 1 || 1
      }
      return obj
    },
    // 结算
    buyGoods() {
      if (this.shoppingList.length == 0) {
        this.isShow = false
        this.$toast({ message: '你没有选择商品～～' })
      } else {
        this.isShow = true
        let picid = []
        for (let i = 0; i < this.shoppingList.length; i++) {
          picid.push(this.shoppingList[i].id)
        }
        this.getUserAddress()
        this.shops = picid.join(',')
      }
    },
    // 清空购物车
    delGoods() {
      const _this = this
      delGoods({})
        .then(res => {
          this.$toast({
            message: res.msg,
            type: res.code === 0 ? 'success' : 'fail',
            onClose: function() {
              _this.classifyList()
              _this.commodityList(_this.cid)
              _this.sum = 0
            }
          })
        })
        .catch(err => {})
    }
  },

  mounted() {},
  watch: {}
}
</script>
<style scoped lang="css" rel="stylesheet/css">
.heji {
  width: auto;
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: #f00;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  box-sizing: border-box;
  margin-left: 10px;
}

.carTxt {
  width: 120px;
  height: 27px;
  line-height: 27px;
  color: #444;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  box-sizing: border-box;
}

.bottombtn1 {
  width: 100px;
  max-width: 120px;
  height: 35px;
  border: none;
  color: #fff;
  background-color: rgb(255, 0, 0);
  border-radius: 25px;
  padding: 0 10px;
  box-sizing: border-box;
  /*margin-left: 10px;*/
}

.bottombtn2 {
  height: 35px;
  border: none;
  color: #444444;
  background-color: #f2f3f5;
  border-radius: 25px;
  padding: 0 10px;
  font-size: 0.8rem;
  box-sizing: border-box;
}

li {
  list-style: none;
}

.goodsTxtBox {
  /*width: 180px;*/
  /*float: left;*/
  padding-top: 6px;
  box-sizing: border-box;
  margin-left: 8px;
}

.goodsTxt {
  width: 100%;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
}
</style>
