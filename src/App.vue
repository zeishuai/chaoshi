<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" active-color="#f00" inactive-color="#000" route>
      <van-tabbar-item replace to="/index" icon="home-o">零食选购</van-tabbar-item>
      <van-tabbar-item replace to="/express" icon="logistics">快递代取</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingCart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      active: "/index"
    };
  },
  mounted() {
    window.addEventListener(
      "hashchange",
      () => {
        var currentPath = window.location.hash.slice(1); // 获取输入的路由
        if (this.$router.path !== currentPath) {
          this.$router.push(currentPath); // 动态跳转
        }
      },
      false
    );
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.van-tabbar-item__text {
  font-size: 13px;
}
</style>
