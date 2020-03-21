<template>
    <div>
        <van-skeleton v-if="loading" title :row="5"/>
        <van-address-list
            v-if="list.length > 0"
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
        <van-popup
            v-model="show"
            round
            closeable
            position="bottom"
            :style="{ height: '50%' ,paddingTop:'20px'}"
        >
            <van-form>
                <van-field v-model="address.name" name="姓名" label="姓名" placeholder="姓名"/>
                <van-field v-model="address.phone" type="tel" name="电话" label="电话" placeholder="电话"/>
                <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="address.school"
                    v-model="address.sid"
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
                <div style="margin: 16px;">
                    <van-button block type="danger" native-type="submit" @click="addressSubmit">添加</van-button>
                </div>
            </van-form>
        </van-popup>
    </div>

</template>
<script>
    import {addNewAddress, getBuildingsBySchool, getSchools, getUserAddress} from "../request/api";

    export default {
        data() {
            return {
                chosenAddressId: '1',
                list: [],
                loading: true,
                show: false,
                isShow: false, // 选中地址
                addShow: false, // 新增地址
                XXcolumns: [], // 学校地址
                XXcolumns1: [],
                XXshowPicker: false,
                LHshowPicker: false,
                LHcolumns: [], // 楼号
                LHcolumns1: [],
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
            }
        },
        created() {
            this.getAddressList();
        },
        methods: {
            getAddressList() {
                getUserAddress().then(res => {
                    this.loading = false;
                    if (res.code === 0 && res.data.length > 0) {
                        for (let i in res.data) {
                            res.data[i].tel = res.data[i].phone;
                            res.data[i].address = res.data[i].detailAddress;
                        }
                        this.list = res.data;
                    }
                }).catch(err => {
                    this.loading = false;
                    console.log(err)
                })
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
                this.show = true;
            },
            onEdit(item, index) {
                console.log(item);
                this.address = item;
                this.getSchools();
                this.getBuildingsBySchool(item.sid);
                this.show = true;
            },
            addressSubmit() {
                if (!this.address.name) {
                    return this.$toast({message: "请填写名字"});
                }
                if (!this.address.phone) {
                    return this.$toast({message: "请填写电话"});
                }
                if (!this.address.sid) {
                    return this.$toast({message: "请选择学校"});
                }
                if (!this.address.bid) {
                    return this.$toast({message: "请选择楼号"});
                }
                if (!this.address.detailAddress) {
                    return this.$toast({message: "请填写想写地址"});
                }
                let addLoading = this.$toast.loading('添加中...');
                addNewAddress({
                    name: this.address.name,
                    phone: this.address.phone,
                    sid: this.address.sid,
                    bid: this.address.bid,
                    detailAddress: this.address.detailAddress
                })
                    .then(res => {
                        addLoading.clear();
                        if (res.code === 0) {
                            this.$toast.success({message: res.msg});
                            this.getAddressList();
                            this.address = {
                                name: "",
                                phone: "",
                                school: "",
                                LH: "",
                                sid: "",
                                bid: "",
                                detailAddress: ""
                            };
                            this.show = false;
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                        console.log(err);
                    });
            },
        }
    }
</script>
<style lang="less" scoped>
    .van-address-list__bottom {
        // position: inherit;
        // margin-top: 20px;
    }

    .sbumit {
        // position: fixed;
        // bottom: 0;
        // left: 0;
        z-index: 999;
        box-sizing: border-box;
        width: 80%;
        padding: 5px 16px;
        color: #fff;
        background-color: #ee0a24;
        border: 1px solid #ee0a24;
        text-align: center;
        margin: auto;
        border-radius: 50px;
    }
</style>
