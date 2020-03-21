<template>
    <div class="index" style="background: #FAFAFA;overflow: hidden">
        <van-row>
            <van-col span="5" style="border-right: 1px solid #f1f1f1;min-height: 700px;">
                <van-sidebar v-model="activeKey" @change="onChange">
                    <van-sidebar-item v-for="item in arrs" :title="item.name" :key="item.id"/>
                </van-sidebar>
            </van-col>
            <van-col span="19" style="background: #fafafa;height: 100%">
                <van-skeleton v-if="goodsList.length < 1" title :row="10"/>
                <van-row v-if="goodsList.length > 0" v-for="item in goodsList" :key="item.id"
                         style="margin-bottom: 10px;background: #fff;padding-top: 13px">
                    <van-col span="7" style="padding-left:10px;padding-right:10px">
                        <van-image width="100%" height="78" style="overflow: hidden" :src="item.pic"/>
                    </van-col>
                    <van-col span="17">
                        <div class="goodsTxtBox">
                            <div class="goodsTxt">{{item.name}}</div>
                            <div class="goodsTxt" style="color: #0000007a;font-size: 12px">
                                <span>{{item.specification}}</span>
                            </div>
                            <div class="goodsTxt" style="display: flex;">
                                <span
                                    style="line-height: 30px;width: 40%;display: inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgb(255, 0, 0);;font-size: 16px;font-weight: 600">¥{{item.price}}</span>
                                <!-- async-change @change="(value)=> onChangeSteps(item.id,value)"-->
                                <van-stepper
                                    v-model="item.stock"
                                    min="0"
                                    @change="stepper(item)"
                                    @plus="plus(item)"
                                    @minus="minus(item)"
                                />
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </div>
</template>
<script>
    import {buildingUpdateComm, classify, commodityList, shopcarAddOne, shopcarSubOne} from "@/request/api";

    export default {
        name: "inventory",
        data() {
            return {
                value: '',
                isloding: true,
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
            this.classifyList();
            this.commodityList(this.cid);
        },
        methods: {
            onChange(val) {
                this.cid = val
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
                            this.arrs = res.data;
                        }
                    })
                    .catch(err => {
                    });
            },
            // 商品列表
            commodityList(cid) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                const loading = this.$toast.loading('数据获取中');
                commodityList({cid: cid, bid: userInfo.buildNo})
                    .then(res => {
                        if (res.code == 0) {
                            for (let i = 0; i < this.goodsList.length; i++) {
                                this.goodsList[i].vald = 0
                            }
                            this.goodsList = res.data;
                            loading.clear();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        loading.clear();
                    });
            },
            // 更新库存 加
            plus(data) {
                let addLoading = this.$toast.loading()
                const _this = this;
                console.log(data)
                buildingUpdateComm({id: data.sid, stock: data.stock+1})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            _this.$toast.fail(res.msg)
                        }else {
                            _this.commodityList(this.cid)
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                        console.log(err);
                    });
            },
            // 更新库存
            minus(data) {
                let addLoading = this.$toast.loading()
                const _this = this;
                buildingUpdateComm({id: data.sid, stock: data.stock - 1})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            _this.$toast.fail(res.msg)
                        }else {
                            _this.commodityList(this.cid)
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                        console.log(err);
                    });
            },
            // chang输入更新库存
            stepper(data) {
                console.log(data)
                let addLoading = this.$toast.loading()
                const _this = this;
                buildingUpdateComm({id: data.sid, stock: data.stock})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            _this.$toast.fail(res.msg)
                        }else {
                            _this.commodityList(this.cid)
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                        console.log(err);
                    });
            },
        },

        mounted() {
        },
        watch: {}
    };
</script>
<style scoped lang="css" rel="stylesheet/css">
    li {
        list-style: none;
    }

    .goodsImg {
        /*float: left;*/
        margin-right: 10px;
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
