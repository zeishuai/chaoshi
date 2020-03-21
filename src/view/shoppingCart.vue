<template>
    <div class="carBox" style="overflow: hidden">
        <div :style="shoppingList.length > 0 ? 'display:none':'display:block'">
            <div
                style="margin: 77px auto 20px auto;
                background: #EDEDED;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                text-align: center;
                padding-top: 20px;
                box-sizing: border-box">
                <van-icon name="shopping-cart-o" color="#f00" size="5rem"/>
            </div>
            <div style="color: #444;text-align: center">购物车空空如也</div>
        </div>
        <div class="goodsTxt">
            <ul>
                <li style="margin-bottom: 10px;background: #ffffff;padding: 10px;" v-for="(item,index) in shoppingList"
                    :key="item.id">
                    <van-row>
                        <van-swipe-cell :right-width="65" :left-width="0" :on-close='onClose'>
                            <van-cell-group>
                                <van-col span="2">
                                    <div style="margin: 33px auto auto 5px">
                                        <van-checkbox checked-color="#f00" v-model="shoppingList[index].isChecked"
                                                      @change="listenCheck"></van-checkbox>
                                    </div>
                                </van-col>
                                <van-col span="22">
                                    <van-row>

                                        <van-col span="7">
                                            <div style="margin-left: 10px;margin-right: 10px;">
                                                <van-image
                                                    width="100%"
                                                    height="80px"
                                                    :src="item.pic"
                                                />
                                            </div>
                                        </van-col>

                                        <van-col span="17">
                                            <div class="title">{{item.name}}</div>
                                            <div>{{item.specification}}</div>
                                            <div style="margin-top: 10px;">
                                                <van-row>
                                                    <van-col span="12">
                                                        <div style="color: #f00;font-size: 15px;margin-top: 8px">
                                                            ￥{{item.price}}
                                                        </div>
                                                    </van-col>
                                                    <van-col span="12">
                                                        <van-stepper
                                                            disable-input
                                                            v-model="item.count"
                                                            default-value="item.count"
                                                            @plus="plus(item)"
                                                            @minus="minus(item)"
                                                        />
                                                    </van-col>
                                                </van-row>
                                            </div>
                                        </van-col>
                                    </van-row>
                                </van-col>
                            </van-cell-group>
                            <template #right>
                                <van-button square type="danger" text="删除"/>
                            </template>
                        </van-swipe-cell>
                    </van-row>
                </li>
            </ul>
        </div>


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

        <van-popup v-model="isShow" position="bottom"
                   :style="{ height: '50%' }" round closeable  :overlay="true">
            <ul class="addressul">

                <van-address-list
                    v-model="chosenAddressId"
                    :list="addressList"
                    default-tag-text="默认"
                    @add="onAdd"
                    @edit="updateAddressShow"
                    @select="addressclick"
                />
            </ul>
            <div class="addresssub" @click="onAdd">新增地址</div>
        </van-popup>
        <!--新增地址-->
        <van-popup
            v-model="addShow"
            position="bottom"
            class="overlay80vh"
            round closeable
            :overlay="true"
        >
            <van-form style="margin-top: 30px">
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
                    <van-button round block type="info" native-type="submit" @click="addressSubmit">提交</van-button>
                </div>
                <div style="margin: 16px;" v-if="addressSta == 2">
                    <van-button round block type="info" native-type="submit" @click="updateAddress">修改</van-button>
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
        shopcarpay,
        shopcarAddOne,
        shopcarSubOne
    } from "@/request/api";
    import {weiXinConfig, weiXinPayConfig} from "../request/api";
    import Loding from "../components/loding";

    export default {
        name: "shoppingCart",
        components: {Loding},
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
            };
        },
        created() {
            this.shoppingCarList();
            this.getUserAddress();
        },
        watch: {},
        methods: {
            // 添加一个到购物车
            plus(data) {
                let addLoading = this.$toast.loading();
                shopcarAddOne({cid: data.cid})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            this.$toast.fail(res.msg)
                        } else {
                            this.shoppingCarList()
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                        console.log(err);
                    });
            },
            // // 减少一个到购物车
            minus(data) {
                let addLoading = this.$toast.loading()
                shopcarSubOne({cid: data.cid})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            this.$toast.fail(res.msg)
                        } else {
                            this.shoppingCarList()
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                        console.log(err);
                    });
            },
            // 左滑删除
            onClose(clickPosition, instance) {
                let e = window.event;
                e.preventDefault();
                e.stopPropagation()
                instance.close();//这个函数就是让滑动的模块返回的操作  e.preventDefault()阻止默认行为;e.stopPropagation()阻止冒泡
                this.$dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    instance.close();
                });
            },
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
                this.addressSta = 2;
                this.address.id = data.id;
                this.address.name = data.name;
                this.address.phone = data.phone;
                this.address.sid = data.sid;
                this.address.bid = data.bid;
                this.address.detailAddress = data.detailAddress;
                this.address.school = data.sname;
                this.address.LH = data.bname;
                this.getSchools();
                this.getBuildingsBySchool();
                this.addShow = true;
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
                let updateAddressLoading = this.$toast.loading('加载中...');
                updateAddress({
                    id: this.address.id,
                    name: this.address.name,
                    phone: this.address.phone,
                    sid: this.address.sid,
                    bid: this.address.bid,
                    detailAddress: this.address.detailAddress
                }).then(res => {
                    updateAddressLoading.clear();
                    if (res.code == 0) {
                        this.$toast.success({message: res.msg});
                        this.addressSta = 1;
                        this.getUserAddress();
                        this.addShow = false;
                    }
                }).catch(err => {
                    updateAddressLoading.clear();
                })
            },
            // 支付
            shopcarpay() {
                const payLoading = this.$toast.loading();
                let configData = {};
                let payConfig = {};
                if(this.shops === ''){
                    this.$toast({message:'没有选择商品哦~'})
                    return false
                }
                weiXinConfig({url: window.location.href})
                    .then(res => {
                        payLoading.clear();
                        configData = res.data;
                    })
                    .then(step => {
                        //获取支付参数
                        //
                        // weiXinPayConfig({shops: this.shops, addressid: this.addressid}).then(pay => {
                        //     console.log('pay', pay)
                        // })
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
            addressclick(data) {
                this.addressid = data.id
                this.isShow = false
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
                            this.$toast.success({message: res.msg});
                            this.addressSta = 2;
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
                let addLoading = this.$toast.loading();
                getUserAddress({})
                    .then(res => {
                        if (res.code == 0) {
                            addLoading.clear();
                            for (let i = 0; i <res.data.length ; i++) {
                                res.data[i].tel = res.data[i].phone
                                res.data[i].address =`${res.data[i].sname} ${res.data[i].bname} ${res.data[i].detailAddress}`
                            }
                            this.addressList = res.data;
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
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
            // 结算
            buyGoods() {
                this.isShow = true;
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
                        this.$toast({
                            message: res.msg,
                            type: res.code === 0 ? 'success' : 'fail',
                            onClose() {
                                this.shoppingCarList();
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>

<style scoped lang="less">
    .goodsTxt {
        font-size: 14px;
    }

    .van-hairline--top-bottom::after {
        border-width: 0 0;
    }

    .title {
        /*margin-bottom: 6px;*/
        /*min-height: 36px;*/
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .carBox .van-swipe-cell__left,
    .van-swipe-cell__right {
        display: inline-block;
        width: 65px;
        height: 44px;
        font-size: 15px;
        line-height: 44px;
        color: #fff;
        text-align: center;
        background-color: #f44;
    }

    /*.carBox {*/
    /*    background: #f7f8fa;*/
    /*}*/

    /*button {*/
    /*    outline: none;*/
    /*    border-color: transparent;*/
    /*    box-shadow: none;*/
    /*}*/

    /*.shoppingMain {*/
    /*    padding-top: 10px;*/
    /*    width: 100%;*/
    /*    height: auto;*/
    /*    margin-bottom: 70px;*/
    /*    padding-bottom: 100px;*/
    /*    box-sizing: border-box;*/
    /*}*/

    /*.shoppingItem {*/
    /*    width: 96%;*/
    /*    margin-left: 2%;*/
    /*    background: #fff;*/
    /*    border-radius: 5px;*/
    /*    display: flex;*/
    /*    margin-bottom: 10px;*/
    /*    padding: 10px 0;*/
    /*    box-sizing: border-box;*/
    /*}*/

    /*.selectCircle {*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    border: 1px solid #cccccc;*/
    /*    border-radius: 50%;*/
    /*    margin: 38px 0px auto 10px;*/
    /*    overflow: hidden;*/
    /*}*/

    /*.shoppingImg {*/
    /*    width: 70px;*/
    /*    height: 70px;*/
    /*    padding: 10px;*/
    /*    float: left;*/
    /*}*/

    /*.shoppingImg img {*/
    /*    height: 100%;*/
    /*    width: 100%;*/
    /*}*/

    /*.itemRight {*/
    /*    font-size: 14px;*/
    /*    width: 300px;*/
    /*    padding-top: 10px;*/
    /*    !*margin-top: 26px;*!*/
    /*    text-align: left;*/
    /*    box-sizing: border-box;*/
    /*}*/

    /*.title {*/
    /*    display: -webkit-box;*/
    /*    -webkit-line-clamp: 2;*/
    /*    -webkit-box-orient: vertical;*/
    /*    overflow: hidden;*/
    /*}*/

    /*.numAndMoney {*/
    /*    margin-top: 10px;*/
    /*    display: flex;*/
    /*    position: relative;*/
    /*}*/

    /*input {*/
    /*    width: 40px;*/
    /*    height: 20px;*/
    /*    margin: 10px;*/
    /*    text-align: center;*/
    /*}*/

    /*.numberControl {*/
    /*    position: absolute;*/
    /*    right: 30px;*/
    /*    top: -14px;*/
    /*}*/

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
</style>
