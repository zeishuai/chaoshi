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
                box-sizing: border-box"
            >
                <van-icon name="shopping-cart-o" color="#f00000" size="5rem"/>
            </div>
            <div style="color: #444;text-align: center">购物车空空如也</div>
            <div style="margin: auto;text-align: center;margin-top: 10px">
                <van-button
                    size="small"
                    plain
                    type="default"
                    color="#f00"
                    @click="$router.push({path:'/index'})"
                >去购物
                </van-button>
            </div>
        </div>
        <div class="goodsTxt">
            <ul>
                <li
                    style="margin-bottom: 10px;background: #ffffff;padding: 10px;"
                    v-for="(item,index) in shoppingList"
                    :key="item.id"
                >
                    <van-row>
                        <van-swipe-cell>
                            <van-cell-group>
                                <van-col span="2">
                                    <div style="margin: 33px auto auto 5px">
                                        <van-checkbox
                                            checked-color="#f00"
                                            v-model="shoppingList[index].isChecked"
                                            @change="listenCheck"
                                        ></van-checkbox>
                                    </div>
                                </van-col>
                                <van-col span="22">
                                    <van-row>
                                        <van-col span="7">
                                            <div style="margin-left: 10px;margin-right: 10px;">
                                                <van-image width="100%" height="80px" :src="item.pic"/>
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
                        </van-swipe-cell>
                    </van-row>
                </li>
            </ul>
        </div>

        <div class="bottomMain" style="width: 100%">
            <van-row>
                <van-col span="6">
                    <van-checkbox
                        v-model="checkedAll"
                        checked-color="#f00"
                        @click.native="allChong"
                        style="margin-top:24px;margin-left:20px"
                    >全选
                    </van-checkbox>
                </van-col>
                <van-col span="18" style="display: flex;justify-content: flex-end;margin-top: 13px;">
                    <button class="bottombtn2" @click="delGoods" style="margin-left:10px">清空购物车</button>
                    <button class="bottombtn1" @click="buyGoods" style="margin-right: 20px;">￥{{sum}}&nbsp;结算</button>
                </van-col>
            </van-row>
        </div>

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
            <van-popup v-model="addShow" position="bottom" round closeable :style="{ height: '60%' }">
                <van-form>
                    <van-cell-group title="请填写地址信息">
                        <van-field v-model="address.name" name="姓名" label="姓名" placeholder="姓名"/>
                        <van-field v-model="address.phone" name="电话" label="电话" placeholder="电话"/>
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
                    <van-field v-model="address.detailAddress" name="详细地址" label="详细地址" placeholder="详细地址"/>
                    <div style="margin: 16px;" v-if="addressSta == 1">
                        <van-button
                            color="#f00"
                            round
                            block
                            type="info"
                            native-type="submit"
                            @click="addressSubmit"
                        >添加
                        </van-button>
                    </div>
                    <div style="margin: 16px;" v-if="addressSta == 2">
                        <van-button
                            color="#f00"
                            round
                            block
                            type="info"
                            native-type="submit"
                            @click="updateAddress"
                        >修改
                        </van-button>
                    </div>
                </van-form>
            </van-popup>
        </div>
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
    import {startPay} from "../function/wechat";

    export default {
        name: "shoppingCart",
        components: {Loding},
        data() {
            return {
                pattern: /^1[3456789]\d{9}$/, // 正则验证
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
                shops: "", // 购物车id
                addressid: "", // 支付时的地址id
                shoppingList: [],
                allSelect: false,
                sum: 0
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
                let addLoading = this.$toast.loading("加载中");
                shopcarAddOne({cid: data.cid})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            this.$toast.fail(res.msg);
                        } else {
                            this.shoppingCarList();
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            // // 减少一个到购物车
            minus(data) {
                let addLoading = this.$toast.loading("加载中");
                shopcarSubOne({cid: data.cid})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            this.$toast.fail(res.msg);
                        } else {
                            this.shoppingCarList();
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            money() {
                let tempMoney = 0;
                for (let i in this.shoppingList) {
                    if (this.shoppingList[i].isChecked && this.shoppingList[i].isChecked) {
                        tempMoney =
                            tempMoney + this.shoppingList[i].price * this.shoppingList[i].count;
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
                if (this.pattern.test(this.address.phone) == false) {
                    this.$toast({message: "电话格式错误"});
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
                let updateAddressLoading = this.$toast.loading("加载中...");
                updateAddress({
                    id: this.address.id,
                    name: this.address.name,
                    phone: this.address.phone,
                    sid: this.address.sid,
                    bid: this.address.bid,
                    detailAddress: this.address.detailAddress
                })
                    .then(res => {
                        updateAddressLoading.clear();
                        if (res.code == 0) {
                            this.$toast.success({message: res.msg});
                            this.addressSta = 1;
                            this.getUserAddress();
                            this.addShow = false;
                        }
                    })
                    .catch(err => {
                        updateAddressLoading.clear();
                    });
            },
            // 支付
            shopcarpay() {
                let configData = {};
                if (!this.shops) {
                    return this.$toast({message: "没有选择商品哦~"});
                }
                let that = this;
                let payLoading = this.$toast.loading("正在支付...");
                weiXinConfig({url: window.location.href})
                    .then(res => {
                        configData = res.data;
                    })
                    .then(step => {
                        //获取支付参数
                        weiXinPayConfig({shops: this.shops, addressid: this.addressid})
                            .then(pay => {
                                payLoading.clear();
                                pay.data.package = pay.data.packageValue;
                                let res = startPay(configData, pay.data);
                                // 支付调试
                                setTimeout(function () {
                                    that.checkedAll = false;
                                    that.sum = 0;
                                    that.shoppingCarList();
                                }, 8000);
                            })
                            .catch(err => {
                                this.$toast.fail("网络出错");
                            });
                    })
                    .catch(err => {
                        payLoading.clear();
                    });
            },
            // 选择地址
            addressclick(data) {
                this.addressid = data.id;
                this.isShow = false;
                this.shopcarpay();
            },
            // 获取学校
            getSchools() {
                let addLoading = this.$toast.loading("加载中");
                this.XXcolumns = [];
                getSchools({})
                    .then(res => {
                        if (res.code == 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.XXcolumns.push(res.data[i].name);
                                addLoading.clear();
                            }
                            this.XXcolumns1 = res.data;
                        } else {
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            // 获取楼号
            getBuildingsBySchool(sid) {
                let addLoading = this.$toast.loading("加载中");
                this.LHcolumns = [];
                getBuildingsBySchool({sid: sid})
                    .then(res => {
                        if (res.code == 0) {
                            addLoading.clear();
                            if (res.data.length == 0) {
                                this.LHcolumns = [];
                            } else {
                                for (let i = 0; i < res.data.length; i++) {
                                    this.LHcolumns.push(res.data[i].name);
                                }
                            }
                            this.LHcolumns1 = res.data;
                        } else {
                            this.$toast({message: res.msg});
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            onAdd() {
                this.addShow = true;
                this.addressSta = 1;
                this.getSchools();
                this.address = {};
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
                if (this.pattern.test(this.address.phone) == false) {
                    this.$toast({message: "电话格式错误"});
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
                let addLoading = this.$toast.loading("加载中");
                addNewAddress({
                    name: this.address.name,
                    phone: this.address.phone,
                    sid: this.address.sid,
                    bid: this.address.bid,
                    detailAddress: this.address.detailAddress
                })
                    .then(res => {
                        if (res.code == 0) {
                            this.$toast.success({message: res.msg});
                            addLoading.clear();
                            this.addressSta = 2;
                            this.getUserAddress();
                            this.addShow = false;
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            // 获取地址列表
            getUserAddress() {
                let addLoading = this.$toast.loading("加载中");
                getUserAddress({})
                    .then(res => {
                        if (res.code == 0) {
                            addLoading.clear();
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].tel = res.data[i].phone;
                                res.data[
                                    i
                                    ].address = `${res.data[i].sname} ${res.data[i].bname} ${res.data[i].detailAddress}`;
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
                let addLoading = this.$toast.loading("加载中");
                shopcarList({})
                    .then(res => {
                        addLoading.clear();
                        this.shoppingList = res.data;
                    })
                    .catch(err => {
                        addLoading.clear();
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
                        this.sum = 0;
                        this.shoppingList[i].isSelect = false;
                    }
                }
            },
            // 结算
            buyGoods() {
                if (this.shoppingList.length == 0) {
                    this.isShow = false;
                    this.$dialog
                        .confirm({
                            title: "温馨提示",
                            message: "你还没有选购商品，是否现在取选购"
                        })
                        .then(() => {
                            // on confirm
                            this.$router.push({path: "/index"});
                        })
                        .catch(() => {
                            // on cancel
                        });
                } else {
                    for (let i = 0; i < this.shoppingList.length; i++) {
                        if (this.shoppingList[i].isChecked) {
                            this.isShow = true;
                        }
                    }
                }
                let picid = [];
                for (let i = 0; i < this.shoppingList.length; i++) {
                    if (this.shoppingList[i].isChecked) {
                        picid.push(this.shoppingList[i].id);
                    }
                }
                this.shops = picid.join(",");
                for (let i = 0; i < this.addressList.length; i++) {
                    this.addressid = this.addressList[this.addressliact].id;
                }
            },
            // 清空购物车
            delGoods() {
                const _this = this;
                delGoods({})
                    .then(res => {
                        this.$toast({
                            message: res.msg,
                            type: res.code === 0 ? "success" : "fail",
                            onClose: function () {
                                _this.shoppingCarList();
                            }
                        });
                    })
                    .catch(err => {
                    });
            }
        }
    };
</script>

<style scoped lang="less">
    body.van-overflow-hidden {
        overflow: visible !important;
    }

    .goodsTxt {
        font-size: 14px;
    }

    .van-hairline--top-bottom::after {
        border-width: 0 0;
    }

    .title {
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

    .bottomMain {
        position: fixed;
        height: 60px;
        overflow: hidden;
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

    .checked {
        border: 1px solid #f00;
        background-image: url("../assets/img/sele.png");
        background-size: 100% 100%;
    }

    .numberControl-input {
        border: none;
        outline: none;
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
