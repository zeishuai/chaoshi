<template>
    <div class="expr">
        <div>
            <van-form>
                <van-field
                    readonly
                    border
                    clickable
                    name="area"
                    :value="value"
                    label="送货地址"
                    placeholder="点击选择省市区"
                    @click="showArea = true"
                />
                <van-popup v-model="showArea" position="bottom">
                    <van-area
                        :area-list="areaList"
                        @confirm="onConfirm"
                        @cancel="showArea = false"
                    />
                </van-popup>
                <van-field
                    readonly
                    clickable
                    name="area"
                    :value="value"
                    label="取货地址"
                    placeholder="点击选择省市区"
                    @click="showArea = true"
                />
                <van-popup v-model="showArea" position="bottom">
                    <van-area
                        :area-list="areaList"
                        @confirm="onConfirm"
                        @cancel="showArea = false"
                    />
                </van-popup>
                <van-field
                    v-model="value"
                    name="取件信息"
                    label="取件信息"
                    placeholder="取件信息"
                    :rules="[{ required: true, message: '取件信息' }]"
                />
                <van-field name="uploader" label="可选附图">
                    <template #input>
                        <van-uploader v-model="uploader"/>
                    </template>
                </van-field>
                <van-field
                    v-model="value"
                    name="备注信息"
                    label="备注信息"
                    placeholder="备注信息"
                    :rules="[{ required: true, message: '备注信息' }]"
                />
                <van-field name="radio" label="规格">
                    <template #input>
                        <van-radio v-model="radio" name="1">质量<3kg且长宽高<40com ¥3</van-radio>
<!--                        <van-radio-group v-model="radio" direction="horizontal">-->
<!--                            <van-radio name="1">质量<3kg且长宽高<40com ¥3</van-radio>-->
<!--                            <van-radio name="2">质量<3kg且长宽高<40com ¥23</van-radio>-->
<!--                            <van-radio name="3">质量<3kg且长宽高<40com ¥13</van-radio>-->
<!--                        </van-radio-group>-->
                    </template>
                </van-field>
                <van-field name="radio" label=" ">
                    <template #input>
                        <van-radio v-model="radio" name="2">质量<3kg且长宽高<40com ¥3</van-radio>
                    </template>
                </van-field>
                <van-field name="radio" label=" ">
                    <template #input>
                        <van-radio v-model="radio" name="3">质量<3kg且长宽高<40com ¥13</van-radio>
                    </template>
                </van-field>
                <van-field name="radio" label="可选服务">
                    <template #input>
                        <van-radio-group v-model="checkboxGroup" direction="horizontal">
                            <van-radio name="1">服务 1</van-radio>
                            <van-radio name="2">服务 2</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-model="username"
                    name="单量"
                    label="单量"
                    placeholder="单量"
                    :rules="[{ required: true, message: '请填写单量' }]"
                />
                <van-field name="radio" label="小费">
                    <van-field
                        v-model="prices"
                        name="小费"
                        label="小费"
                        placeholder="小费"
                        :rules="[{ required: true, message: '小费' }]"
                    />
                </van-field>
            </van-form>
        </div>

    </div>
</template>

<script>
    import city from '../assets/js/city'

    export default {
        name: 'express',
        data() {
            return {
                radio: '',
                checkboxGroup:'',
                area: '',
                value: '',
                prices:'',
                showArea: false,
                areaList: {}, // 数据格式见 Area 组件文档
                pattern: /\d{6}/,
                uploader: [{url: 'https://img.yzcdn.cn/vant/leaf.jpg'}],
            }
        },
        mounted() {
            this.areaList = city
        },
        methods: {
            // 地区选择
            onConfirm(values) {
                this.value = values.map(item => item.name).join('/')
                this.showArea = false
            },
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
