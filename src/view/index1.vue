<template>
    <div class="index" style="background: #FAFAFA;overflow: hidden">
        <van-row>
            <van-col span="5.5" style="border-right: 1px solid #f1f1f1;min-height: 700px;">
                <van-sidebar v-model="activeKey" @change="onChange">
                    <van-sidebar-item v-for="(item,index) in arrs" :info="null" :title="item.name" :key="item.id"/>
                </van-sidebar>
            </van-col>
            <van-col span="18" style="background: #fafafa;height: 100%">
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
                                <van-stepper
                                    v-model="item.vald"
                                    min="0" default-value="0"
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
    import {shopcarList, classify, commodityList, shopcarAddOne, shopcarSubOne} from "@/request/api";

    export default {
        name: "index",
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
                cid: "1", // 商品分类ID
                shoppingList:[],//购物车数据匹配分类徽标
            };
        },
        created() {
            this.classifyList();
            this.commodityList(this.cid);
            this.shoppingCarList()
        },
        methods: {

            // 购物车列表数据
            shoppingCarList() {
                let loading = this.$toast.loading('加载中')
                shopcarList({}).then(res => {
                    loading.clear()
                        this.shoppingList = res.data;
                        this.badge(this.shoppingList)
                    }).catch(err => {
                        loading.clear()
                    });
            },
            onChange(val) {
                this.arrs.map((item, index) => {
                    if (index == val) {
                        this.commodityList(item.id);
                    }
                });
            },
            // 商品分类
            classifyList() {
                classify({}).then(res => {
                        if (res.code == 0) {
                            this.arrs = res.data;
                        }
                    })
                    .catch(err => {
                    });
            },
            // 商品列表
            commodityList(cid) {
                const loading = this.$toast.loading('数据获取中');
                commodityList({cid: cid})
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
                        loading.clear();
                    });
            },
            // 添加一个到购物车
            plus(data) {
                let addLoading = this.$toast.loading()
                shopcarAddOne({cid: data.id})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            this.$toast.fail(res.msg)
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            },
            // 减少一个到购物车
            minus(data) {
                let addLoading = this.$toast.loading()
                shopcarSubOne({cid: data.id})
                    .then(res => {
                        addLoading.clear();
                        if (res.code !== 0) {
                            this.$toast.fail(res.msg)
                        }
                    })
                    .catch(err => {
                        addLoading.clear();
                    });
            }
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
