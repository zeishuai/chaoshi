<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <div>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" style="background:rgb(255, 0, 0);border: none" native-type="submit">提交</van-button>
        <div class="login-tips">没有帐号?
          <router-link to="reg"><span>立即去注册</span></router-link>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    name:'login',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
    },
  };
</script>

<style scoped>
  .login{
    margin: 40px 10px;
  }
  .login-tips{
    margin-top: 20px;
    font-size: 14px;
  }
  .login-tips span{
    color:rgb(255, 0, 0);
  }
</style>
