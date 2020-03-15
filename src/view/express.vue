<template>
  <div class="expr">
    <div>
      <ul>
        <van-form >
        <li>
          <van-field
            readonly

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
        </li>
        <li>
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
        </li>
        <li>
          <van-field
            v-model="value"
            name="取件信息"
            label="取件信息"
            placeholder="取件信息"
            :rules="[{ required: true, message: '取件信息' }]"
          />
        </li>
        <li>
          <van-field  name="uploader" label="可选附图">
            <template #input>
              <van-uploader v-model="uploader" />
            </template>
          </van-field>
        </li>
        <li>
          <van-field

            v-model="value"
            name="备注信息"
            label="备注信息"
            placeholder="备注信息"
            :rules="[{ required: true, message: '备注信息' }]"
          />
        </li>
        <li>
          <van-field  name="radio" label="单选框">
            <template #input>
              <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="1">质量<3kg且长宽高<40com ¥3</van-radio>
                <van-radio name="2">质量<3kg且长宽高<40com ¥23</van-radio>
                <van-radio name="3">质量<3kg且长宽高<40com ¥13</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </li>
        <li>
          <van-field  name="radio" label="可选服务">
            <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
              <van-checkbox name="1" shape="square">贵重物品运险费 <span>+¥1</span></van-checkbox>
              <van-checkbox name="2" shape="square">冬季赞赏 <span>+¥1</span></van-checkbox>
            </van-checkbox-group>
          </van-field>
        </li>
        <li>
          <van-field  name="radio" label="单量">
            <van-field
              label-width="30"
              v-model="username"
              name="单量"
              label="单量"
              placeholder="单量"
              :rules="[{ required: true, message: '请填写单量' }]"
            />
          </van-field>
        </li>
        <li>
          <van-field  name="radio" label="小费">
            <van-field
              v-model="username"
              name="小费"
              label="小费"
              placeholder="小费"
              :rules="[{ required: true, message: '小费' }]"
            />
          </van-field>
        </li>
        </van-form>
      </ul>
    </div>

  </div>
</template>

<script>
  import city from "../assets/js/city";

  export default {
    name: "express",
    data() {
      return {
        radio:'',
        area:'',
        value: '',
        showArea: false,
        areaList: {}, // 数据格式见 Area 组件文档
        pattern: /\d{6}/,
        uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      }
    },
    mounted() {
      this.areaList = city
    },
    methods: {
      // 地区选择
      onConfirm(values) {
        this.value = values.map(item => item.name).join('/');
        this.showArea = false;
      },
      // 返回
      backClick(v) {
        this.$router.push({path: '/'})
      },
      goUrl(val) {
        if (val === 0) {
          this.$router.push({path: '/'})
        } else if (val === 1) {
          this.$router.push({path: 'express'})
        } else if (val === 2) {
          this.$router.push({path: 'shoppingCart'})
        } else {
          this.$router.push({path: 'my'})
        }
      }
    }
  }
</script>

<style scoped>
  .expr >>> .van-fiel{
    text-align: left;
  }
  .expr >>> .van-cell{
    padding: 10px 10px;
  }
</style>
