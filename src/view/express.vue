<template>
    <div class="expr">
        <div>
            <van-form>
                <div @click="postAddresShow">
                    <van-field
                        readonly
                        v-model="addressName"
                        name="送货地址"
                        label="送货地址"
                        placeholder="送货地址"
                    />
                </div>
                <van-field name="radio" label="配送类型">
                    <template #input>
                        <van-radio-group v-model="postTypeid" @change="clickType" direction="horizontal">
                            <van-radio v-for="item in postType" :name="item.id" v-model="item.id" checked-color="#f00" >
                                {{item.name}}
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <div @click="quHuoShowClidk" v-if="postTypeShow">
                    <van-field
                        v-model="postStationname"
                        name="取货地址"
                        label="取货地址"
                        placeholder="取货地址"
                    />
                </div>
                <van-field
                    v-model="from.code"
                    name="取件信息"
                    label="取件信息"
                    placeholder="取件信息"
                />
                <van-field name="uploader" label="可选附图">
                    <template #input>
                        <van-uploader upload-text="上传" accept="image/*" v-model="from.pics"
                                      :after-read="afterRead"
                                      :before-delete="delimg"/>
                    </template>
                </van-field>
                <van-field
                    v-model="from.content"
                    name="备注信息"
                    label="备注信息"
                    placeholder="备注信息"
                />
                <van-field name="radio" label="规格">
                    <template #input>
                        <van-radio-group v-model="from.size" direction="horizontal">
                            <van-radio style="margin-top: 10px" checked-color="#f00" name="1">质量<5kg且长宽高<40com ¥3
                            </van-radio>
                            <van-radio style="margin-top: 10px" checked-color="#f00" name="2">质量<5kg且长宽高<40com ¥5
                            </van-radio>
                            <van-radio style="margin-top: 10px" checked-color="#f00" name="3">质量>5kg且长宽高>40com ¥10
                            </van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field
                    v-model="from.xiaofei"
                    name="小费"
                    label="小费"
                    placeholder="小费"
                />
                <van-field
                    v-model="from.danliang"
                    name="单量"
                    label="单量"
                    placeholder="单量"
                />
            </van-form>
            <div style="width: 90%;margin: auto;margin-top: 20px">
                <van-button type="primary" color="#f00" round size="large" @click="submit">提交</van-button>
            </div>
        </div>
        <!--发货地址-->
        <div>
            <van-popup get-container="body" v-model="postAddres" position="bottom"
                       :style="{ height: '60%' }" round closeable :overlay="true">
                <div style="padding-bottom: 10px;box-sizing: border-box">
                    <van-address-list
                        v-model="from.addressid"
                        :list="postAddresList"
                        @add="onAdd"
                        @edit="updateAddressShow"
                        @click-item="clickItem"
                    />
                </div>
            </van-popup>
        </div>
        <!--新增地址-->
        <div>
            <van-popup
                v-model="addShow"
                position="bottom"
                round
                closeable
            >
                <van-form>
                    <van-field v-model="address.name" name="姓名" label="姓名" placeholder="姓名"/>
                    <van-field v-model="address.phone" name="电话" label="电话" :rules="[{ pattern, message: '手机号格式错误' }]"
                               placeholder="电话"/>
                    <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="address.school"
                        label="学校"
                        placeholder="点击选择学校"
                        @click="XXshowPicker = true"
                    />
                    <van-popup get-container="body" v-model="XXshowPicker" position="bottom">
                        <van-picker show-toolbar :columns="XXcolumns" @cancel="XXshowPicker = false"
                                    @confirm="onConfirmXX"/>
                         
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
                        <van-button color="#f00" round block type="info" native-type="submit" @click="addressSubmit">
                            添加
                        </van-button>
                    </div>
                    <div style="margin: 16px;" v-if="addressSta == 2">
                        <van-button color="#f00" round block type="info" native-type="submit" @click="updateAddress">
                            修改
                        </van-button>
                    </div>
                </van-form>
            </van-popup>
        </div>
        <!-- 取货地址-->
        <div>
            <van-popup get-container="body" v-model="quHuoShow" position="bottom"
                       :style="{ height: '40%' }" round :overlay="true">
                <van-picker
                    show-toolbar
                    :columns="quHuoShowList"
                    @cancel="quHuoShow = false"
                    @confirm="onConfirm"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
    import {
        getUserAddress,
        getSchools,
        getBuildingsBySchool,
        addNewAddress,
        updateAddress,
        getPostStation,
        postPay
    } from "@/request/api";

    export default {
        name: 'express',
        data() {
            return {
                from: {
                    addressid: '', // 送货地址
                    postStationid: '', // 收货地址
                    code: '', // 取件信息
                    pics: [], // 图片
                    content: '',// 订单备注
                    xiaofei: 0,// 小费
                    danliang: 0, // 单量
                    size: '',// 规格
                },
                pattern: /^1[3456789]\d{9}$/, // 正则验证
                address: {
                    name: "",
                    phone: "",
                    school: "",
                    LH: "",
                    sid: "",
                    bid: "",
                    detailAddress: ""
                },
                postType: [{id:1,name:'校内'},{id:2,name:'校外'}],//配送类型
                postTypeid:null,
                addressName: '', // 发货地址名字
                quHuoShowId: '',// 取货地址名字
                postAddres: false,
                fileIds: [], // 图片上传暂存数组
                postAddresList: [],
                addressSta: 1,
                isShow: false, // 选中地址
                addShow: false, // 新增地址
                XXcolumns: [], // 学校地址
                XXcolumns1: [],
                XXshowPicker: false,
                LHshowPicker: false,
                LHcolumns: [], // 楼号
                LHcolumns1: [],
                quHuoShow: false,// 取货状态
                quHuoShowList: [],// 取货地址数据
                quHuoShowList1:[],
                postTypeShow: false,//取货地址显示状态
                postStationname:'',//取货地址名字
            }
        },
        mounted() {
        },
        methods: {
            clickType(data) {
                if(data){
                    this.postTypeid = data
                    this.postStationname = ''
                    this.postTypeShow = true
                }
            },
            // 取货地址显示
            quHuoShowClidk() {
                this.quHuoShow = true
                this.getPostStation()
            },
            // 获取取货地址
            getPostStation() {
                this.quHuoShowList = []
                this.quHuoShowList1 = []
                const loding = this.$toast.loading('加载中')
                getPostStation({}).then(res => {
                    if (res.code === 0) {
                        loding.clear()
                        for (let i = 0; i < res.data.length; i++) {
                            this.quHuoShowList1 = res.data
                            if(this.postTypeid == 1){
                                if(res.data[i].xiaoneiwai == 0){
                                    this.quHuoShowList.push(res.data[i].name)
                                }
                            }else {
                                if(res.data[i].xiaoneiwai == 1){
                                    this.quHuoShowList.push(res.data[i].name)
                                }
                            }
                        }
                    }
                }).catch(err => {
                    loding.clear()
                    console.log(err)
                })
            },
            // 取货地址选择
            onConfirm(value) {
                this.postStationname = value
                for (let i = 0; i < this.quHuoShowList1.length; i++) {
                    if(this.quHuoShowList1[i].name == value){
                        this.from.postStationid = this.quHuoShowList1[i].id
                    }
                }
                this.quHuoShow = false
            },
            // 发货地址显示
            postAddresShow() {
                this.postAddres = true
                this.getUserAddress()
            },
            // 新增地址
            onAdd() {
                this.addShow = true;
                this.addressSta = 1
                this.getSchools();
                this.address = {}
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
            // 提交新增地址
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
            // 获取学校
            getSchools() {
                this.XXcolumns = []
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
                this.LHcolumns = [];
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
            // 发货地址选择
            clickItem(item) {
                this.addressName = `${item.name} ${item.phone} ${item.detailAddress}`
                this.postAddres = false
            },
            // 获取地址列表
            getUserAddress() {
                let addLoading = this.$toast.loading();
                getUserAddress({})
                    .then(res => {
                        if (res.code == 0) {
                            addLoading.clear();
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].tel = res.data[i].phone
                                res.data[i].address = `${res.data[i].sname} ${res.data[i].bname} ${res.data[i].detailAddress}`
                            }
                            this.postAddresList = res.data
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            // 图片上传
            afterRead(file) {
                const _this = this
                const loading = this.$toast.loading('提交中')
                // 此时可以自行将文件上传至服务器
                let formData = new FormData();
                formData.append("file", file.file,);
                const config = {
                    headers: {"Content-Type": "multipart/form-data;boundary=" + new Date().getTime()}
                };
                this.$axios.post("/upload/common/upload", formData, config)
                    .then(function (response) {
                        if (response.data.code == 0) {
                            loading.clear()
                            _this.fileIds.push(response.data.url)
                        }
                    })
                    .catch(function (error) {
                        loading.clear()
                        console.log(error);
                    });
            },
            // 删除图片
            delimg(e, dateil) {
                this.from.pics.splice(dateil.index, 1)
            },
            // 提交快递订单
            submit() {
                // addressid: '', // 送货地址
                // postStationid: '', // 收货地址
                // code: '', // 取件信息
                // pics: [], // 图片
                // content: '',// 订单备注
                // xiaofei: 0,// 小费
                // danliang: 0, // 单量
                // size: '',// 规格
                if (this.from.addressid === '') {
                    this.$toast({message: '请填写送货地址'})
                    return false
                }
                if (this.from.postStationid === '') {
                    this.$toast({message: '请填写收货地址'})
                    return false
                }
                if (this.from.code === '') {
                    this.$toast({message: '请填取件信息'})
                    return false
                }
                // if (this.from.pics.length === 0) {
                //     this.$toast({message: '请上传图片'})
                //     return false
                // }
                if (this.from.pics.size === '') {
                    this.$toast({message: '请选择规格'})
                    return false
                }
                postPay({
                    addressid:this.from.addressid,
                    postStationid:this.from.postStationid,
                    code:this.from.code,
                    pics:this.from.pics.toString(),
                    content:this.from.content,
                    size:this.from.size,
                    xiaofei:parseInt(this.from.xiaofei),
                    danliang:parseInt(this.from.danliang)
                }).then(res => {
                    console.log(res)
                }).catch(err => {

                })
            }
        }
    }
</script>

<style scoped>
    .expr >>> .van-fiel {
        text-align: left;
    }

    .expr >>> .van-cell {
        padding: 10px 10px;
    }
</style>
