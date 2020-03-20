<template>
    <div class="carBox">
        <van-row class="shoppingItem" v-for="(item,index) in shoppingList" :key="item.id">
            <van-col span="2" @change="listenCheck">
                <div style="margin: 33px auto auto 5px">
                    <van-checkbox checked-color="#f00" v-model="shoppingList[index].isChecked"
                                  @change="listenCheck"></van-checkbox>
                </div>
            </van-col>

            <van-col span="20">
                <div class="shoppingImg">
                    <img :src="item.pic" alt/>
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
            </van-col>
        </van-row>
        <div class="bottomMain" style="width: 100%">
            <van-row>
                <van-col span="6">
                    <van-checkbox v-model="checkedAll" checked-color="#f00" @click.native="allChong"
                                  style="margin-top:24px;margin-left:20px">全选
                    </van-checkbox>
                </van-col>
                <van-col span="18" style="display: flex;justify-content: flex-end;margin-top: 13px;">
                    <button class="bottombtn2" @click="delGoods" style="margin-left:10px">清空购物车</button>
                    <button class="bottombtn1" @click="buyGoods" style="margin-right: 20px;">￥{{sum}}&nbsp;结算
                    </button>
                </van-col>
            </van-row>
        </div>

        <van-popup v-model="isShow" position="top" class="overlay80vh" :overlay="true">
            <ul class="addressul">
                <li :class="addressliact == index ? 'addressliact': 'addressli'" v-for="(item,index) in addressList"
                    :key="item.id">
                    <div class="addressli1" @click="addressclick(index)">
                        <div>
                            <span>{{item.name}}</span>
                            <span>{{item.phone}}</span>
                        </div>
                        <div>{{item.sname}}{{item.bname}}{{item.detailAddress}}</div>
                    </div>
                    <div class="addressli2" @click="updateAddressShow(item)">
                        <van-icon name="edit"/>
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
            class="overlay80vh"
            :overlay="true"
        >
            <van-form>
                <van-field v-model="address.name" name="姓名" label="姓名" placeholder="姓名"/>
                <van-field v-model="address.phone" name="电话" label="电话" placeholder="电话"/>
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
                    :default-index="1"
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
                <van-field v-model="address.detailAddress" name="详细地址" label="详细地址" placeholder="详细地址"/>
                <div style="margin: 16px;" v-if="addressSta == 1">
                    <van-button round block type="info" native-type="submit" @click="addressSubmit">提交1</van-button>
                </div>
                <div style="margin: 16px;" v-if="addressSta == 2">
                    <van-button round block type="info" native-type="submit" @click="updateAddress">提交2</van-button>
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
        addNewAddress,
        updateAddress,
        shopcarpay
    } from "@/request/api";
    import WxPay from "@/request/WxPay";
    import {weiXinConfig, weiXinPayConfig} from "../request/api";

    export default {
        name: "shoppingCart",
        data() {
            return {
                checkedAll: false,
                addressliact: 0,
                checkedList: [],
                addressSta: 1,
                isShow: false, // 选中地址
                addShow: false, // 新增地址
                XXcolumns: [], // 学校地址
                XXcolumns1: [],
                XXshowPicker: false,
                LHshowPicker: false,
                LHcolumns: [], // 楼号
                LHcolumns1: [],
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
                shops: '', // 购物车id
                addressid: '', // 支付时的地址id
                shoppingList: [],
                allSelect: false,
                sum: 0,
                pic: {url: "../../static/img/sele.png"}
            };
        },
        created() {
            this.shoppingCarList();
            this.getUserAddress();
        },
        watch: {},
        methods: {
            money() {
                let tempMoney = 0;
                for (let i in this.shoppingList) {
                    if (this.shoppingList[i].isChecked && this.shoppingList[i].isChecked) {
                        tempMoney = tempMoney + this.shoppingList[i].price * this.shoppingList[i].count;
                    }
                }
                this.sum = tempMoney;
            },
            listenCheck() {
                console.log('listen')
                this.money();
                //处理全选的问题
                let allLength = this.shoppingList.length;
                let ins = 0;
                for (let i in this.shoppingList) {
                    if (this.shoppingList[i].isChecked) {
                        ins++;
                    }
                }
                this.checkedAll = ins === allLength ? true : false;
            },
            // 全选
            allChong(e) {
                console.log(e);
                this.checkedAll = !this.checkedAll;
                if (this.checkedAll) {
                    for (let x in this.shoppingList) {
                        this.shoppingList[x].isChecked = true;
                    }
                } else {
                    for (let i = 0; i < this.shoppingList.length; i++) {
                        this.shoppingList[i].isChecked = false;
                    }
                }
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
                console.log(this.XXcolumns)
                this.addShow = true
                this.isShow = false
            },
            updateAddress() {
                if (this.address.name == "") {
                    this.$toast({message: "请填写名字"});
                    return false;
                }
                if (this.address.phone == "") {
                    this.$toast({message: "请填写电话"});
                    return false;
                }
                if (this.address.sid == "") {
                    this.$toast({message: "请选择学校"});
                    return false;
                }
                if (this.address.bid == "") {
                    this.$toast({message: "请选择楼号"});
                    return false;
                }
                if (this.address.detailAddress == "") {
                    this.$toast({message: "请填写想写地址"});
                    return false;
                }
                updateAddress({
                    id: this.address.id,
                    name: this.address.name,
                    phone: this.address.phone,
                    sid: this.address.sid,
                    bid: this.address.bid,
                    detailAddress: this.address.detailAddress
                }).then(res => {
                    if (res.code == 0) {
                        this.$toast({message: res.msg});
                        this.addressSta = 1
                        this.getUserAddress();
                        this.addShow = false;
                    }
                }).catch(err => {

                })
            },
            // 支付
            shopcarpay() {
                const payLoading = this.$toast.loading();
                let configData = {};
                let payConfig = {};
                weiXinConfig({url: window.location.href})
                    .then(res => {
                        payLoading.clear();
                        configData = res.data;
                    })
                    .then(step => {
                        //获取支付参数
                        weiXinPayConfig({shops: this.shops, addressid: this.addressid}).then(pay => {
                            console.log('pay', pay)
                        })
                    })
                    .then(startPay => {
                        // wx.config({
                        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        //     appId: configData.appId, // 必填，公众号的唯一标识
                        //     timestamp: configData.timestamp, // 必填，生成签名的时间戳
                        //     nonceStr: configData.nonceStr, // 必填，生成签名的随机串
                        //     signature: configData.signature,// 必填，签名
                        //     jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                        // });
                        // wx.ready(function () {
                        //     wx.chooseWXPay({
                        //         timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        //         nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                        //         package: res.data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        //         signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        //         paySign: res.data.paySign, // 支付签名
                        //         success: function (res) {
                        //             // 支付成功后的回调函数
                        //             console.log(res)
                        //         },
                        //         error: function (err) {
                        //             console.log(err)
                        //         }
                        //     });
                        // });
                    })
                    .catch(err => {
                        console.log(err);
                        payLoading.clear();
                    });
                // shopcarpay({
                //     shops: this.shops,
                //     addressid: this.addressid
                // }).then(res => {
                //     if (res.code == 0) {
                //         this.$toast({message: '支付功能暂无开通~'})
                //         wx.config({
                //             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                //             appId: res.data.appId, // 必填，公众号的唯一标识
                //             timestamp: '', // 必填，生成签名的时间戳
                //             nonceStr: '', // 必填，生成签名的随机串
                //             signature: '',// 必填，签名
                //             jsApiList: [] // 必填，需要使用的JS接口列表
                //         });
                //         wx.ready(function () {
                //             wx.chooseWXPay({
                //                 timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                //                 nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                //                 package: res.data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                //                 signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //                 paySign: res.data.paySign, // 支付签名
                //                 success: function (res) {
                //                     // 支付成功后的回调函数
                //                     console.log(res)
                //                 },
                //                 error: function (err) {
                //                     console.log(err)
                //                 }
                //             });
                //         });
                //     }
                // }).catch(err => {
                //
                // })
            },
            // 选择地址
            addressclick(index) {
                this.addressliact = index;
                this.addressid = this.addressList[index].id;
                this.isShow = false;
                this.shopcarpay();
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
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 获取楼号
            getBuildingsBySchool(sid) {
                getBuildingsBySchool({sid: sid})
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
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            onAdd() {
                this.addShow = true;
                this.isShow = false
                this.addressSta = 1
                this.getSchools();
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
                    this.$toast({message: "请填写名字"});
                    return false;
                }
                if (this.address.phone == "") {
                    this.$toast({message: "请填写电话"});
                    return false;
                }
                if (this.address.sid == "") {
                    this.$toast({message: "请选择学校"});
                    return false;
                }
                if (this.address.bid == "") {
                    this.$toast({message: "请选择楼号"});
                    return false;
                }
                if (this.address.detailAddress == "") {
                    this.$toast({message: "请填写想写地址"});
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
                            this.$toast({message: res.msg});
                            this.addressSta = 2
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
                    .catch(err => {
                    });
            },
            // 购物车列表
            shoppingCarList() {
                shopcarList({})
                    .then(res => {
                        this.shoppingList = res.data;
                    })
                    .catch(err => {
                        //  console.log(err)
                    });
            },
            // 选择商品
            selectGoods(item) {
                item.isSelect = !item.isSelect;
                this.allSelect = false;
                if (item.isSelect == true) {
                    this.sum = this.sum + item.price * item.count;
                } else {
                    this.sum = this.sum - item.price * item.count;
                }
            },
            // 全选
            allGoodsSelect(e) {
                this.allSelect = !this.allSelect;
                for (let a in this.shoppingList) {
                    this.shoppingList[a].isChecked = this.allSelect;
                }
                if (this.allSelect == true) {
                    this.sum = 0;
                    for (var i = 0; i < this.shoppingList.length; i++) {
                        this.shoppingList[i].isSelect = true;
                        this.sum =
                            this.sum + this.shoppingList[i].price * this.shoppingList[i].count;
                    }
                } else {
                    for (var i = 0; i < this.shoppingList.length; i++) {
                        this.sum = 0
                        // this.sum = this.sum - this.shoppingList[i].price * this.shoppingList[i].count;
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
            // 减去
            numDel(item, index) {
                item.num--;
                if (item.isSelect == true) {
                    this.sum = this.sum - item.price;
                }
                if (item.num == 0) {
                    this.shoppingList.splice(index, 1);
                }
            },
            // 结算
            buyGoods() {
                //alert("购买成功,共花费" + this.sum + "元");shops
                if (this.addressid === '') {
                    this.isShow = true;
                }
                let picid = []
                for (let i = 0; i < this.shoppingList.length; i++) {
                    if (this.shoppingList[i].isChecked) {
                        picid.push(this.shoppingList[i].id)
                    }
                }
                this.shops = picid.join(',');
                for (let i = 0; i < this.addressList.length; i++) {
                    this.addressid = this.addressList[this.addressliact].id
                }
                if (this.addressid === '' || this.shops === '') {
                    this.$toast({message: '请选择商品或者地址哦~'})
                } else {
                    this.shopcarpay()
                }
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
                            this.$toast({message: res.msg});
                        }
                        setTimeout(() => {
                            this.shoppingCarList();
                        }, 500);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>

<style scoped lang="less">
    .carBox {
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
        overflow: hidden;
    }

    .shoppingImg {
        width: 70px;
        height: 70px;
        padding: 10px;
        float: left;
    }

    .shoppingImg img {
        height: 100%;
        width: 100%;
    }

    .itemRight {
        font-size: 14px;
        width: 300px;
        padding-top: 10px;
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
        height: 60px;
        overflow: hidden;
        /*border: 1px #a7a5a5 solid;*/
        bottom: 49px;
        left: 0;
        background: #fff;
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
        max-width: 120px;
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
        /*width: 60px;*/
        height: 35px;
        border: none;
        color: #444444;
        background-color: #f2f3f5;
        border-radius: 25px;
        padding: 0 10px;
        font-size: .8rem;
        box-sizing: border-box;
        /*margin: 10px 0 0 300px;*/
    }

    .checked {
        border: 1px solid #f00;
        background-image: url("../assets/img/sele.png");
        background-size: 100% 100%;
        /*background-color:#e26411 ;*/
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

    .addressliact {
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

    .addresssub {
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

    .van-popup {
        padding-bottom: 10px;
    }

    .van-button--info {
        background-color: rgb(255, 0, 0);
        border: 1px solid rgb(255, 0, 0);
    }

    // .van-address-list {
    //   position: relative;
    //   overflow: hidden;
    // }
    // .van-address-list__bottom {
    //   position: absolute;
    // }
</style>
