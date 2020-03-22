<template>
    <div class="index">
        <van-tabs v-model="active">
            <van-tab scrollspy title="休闲食品">
                <div class="goodsBox">
                    <ul>
                        <li class="goodsBox-item" v-for="item in goodsList" :key="item.id">
                            <div>
                                <van-image
                                    width="80"
                                    height="80"
                                    radius="5"
                                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                            <div class="item-txt">{{item.text}}</div>
                            <div class="item-steppe">
                                <van-stepper @plus="plus" v-model="item.value"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="辣条类">辣条类 2</van-tab>
            <van-tab title="肉食类">肉食类 3</van-tab>
            <van-tab title="面包类">面包类 4</van-tab>
            <van-tab title="火腿肠">火腿肠 4</van-tab>
            <van-tab title="饮料">饮料 4</van-tab>
            <van-tab title="速食类">速食类</van-tab>
        </van-tabs>
        <!--    <div id="apps">-->
        <!--      <nav :class="{judge:judge <= 4}">-->
        <!--        <p-->
        <!--          v-for="(item,$index) in arrs"-->
        <!--          @click="toggle($index)"-->
        <!--          :class="{activenav:$index == activenav}"-->
        <!--        >{{item}}</p>-->
        <!--      </nav>-->
        <!--    </div>-->
    </div>
</template>
<script>
    // import footerTab from "../components/footerTab"
    // import topTitle from "../components/topTitle"

    export default {
        // components: {footerTab,topTitle},
        name: "index",
        data() {
            return {
                title: '零食选购',
                active: '/',
                activenav: 0,
                arrs: ["休闲食品", "辣条类", "肉食类", "面包类", '火腿肠', '饮料', '速食类',],
                judge: '1',
                goodsList: [{
                    id: '1',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '2',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '3',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '4',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '115',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '51',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '11',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '15',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }, {
                    id: '5',
                    value: 1,
                    text: '康师傅方便面大桶康师傅方便面大桶',
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206733228,1637722865&fm=26&gp=0.jpg'
                }]
            };
        },
        methods: {
            // 返回
            backClick(v) {
                this.$router.push({path: '/'})
            },
            toggle(index) {
                this.activenav = index;
            },
            plus() {
                console.log(this.value)
            },
            // goUrl(val) {
            //   if (val === 0) {
            //      this.$router.push({path:'/'})
            //   } else if (val === 1) {
            //     this.$router.push({path:'express'})
            //   } else if (val === 2) {
            //     this.$router.push({path:'shoppingCart'})
            //   } else {
            //     this.$router.push({path:'my'})
            //   }
            // }
        },
        created() {
            this.judge = this.arrs.length
        },
        mounted() {
        },
        watch: {},
    };
</script>
<style scoped lang="css" rel="stylesheet/css">
    .index >>> .van-tabs__wrap {
        position: fixed;
        top: 0;
        background: #ffffff;
        z-index: 9999;
        width: 100%;
    }

    .index {
        background: #EFEFEF;
        overflow: hidden;
    }

    .header {
        width: 100%;
        height: 88px;
        text-align: center;
        line-height: 88px;
        font-size: 13px;
        background: #ffffff;
    }

    #apps {
        width: 100%;
        overflow: hidden;
        background: #ffffff;
    }

    #apps nav {
        padding: 10px 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        box-sizing: border-box;
        -webkit-box-align: middle;
        -ms-flex-align: middle;
        align-items: middle;
        overflow: auto;
    }

    .judge {
        justify-content: space-between;
    }

    #apps p {
        text-align: center;
        font-size: 16px;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        /*padding: 10px;*/
        box-sizing: border-box;
        width: 80px;
        margin: 3px;
    }

    #apps p.activenav {
        /*background-color: #f0ad4e;*/
        color: white;
        border-radius: 10px;
        background-color: #FF0036;
    }

    /* scroll-view 不显示滚动条 */
    #apps nav::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
    }

    .goodsBox {
        width: 100%;
        /*height: 600px;*/
        height: auto;
        background: #ffffff;
        margin-top: 50px;
        padding-top: 20px;
        padding-bottom: 50px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .goodsBox-item {
        width: 45%;
        float: left;
        padding: 0 10px;
        box-sizing: border-box;
        margin-bottom: 20px;
        text-align: center;
    }

    .goodsBox-item:nth-child(even) {
        margin-left: 10%;
    }

    .goodsBox-item-img {
        width: 50%;
        height: 80px;
        margin: auto;
    }

    .goodsBox-item-img img {
        width: 100%;
        height: 100%;
    }

    .item-txt {
        /*width: 150px;*/
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 20px;
        /*margin-left: 10px;*/
        font-size: 14px;
        text-align: center;
    }

    .item-steppe {
        width: 80%;
        margin: auto;
        margin-top: 10px;
    }
</style>
