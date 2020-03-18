<template>
    <div>
      <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      />
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
    }
  },
  methods: {
    onAdd() {
      Toast('新增地址');
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index);
    }
  }
}
</script>
<style lang="less" scoped>
.van-address-list__bottom{
  // position: inherit;
  // margin-top: 20px;
}
.sbumit{
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