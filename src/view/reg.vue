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
        <van-field
          v-model="username"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          name="短信验证码"
          label="短信验证码"
          placeholder="短信验证码"
          :rules="[{ required: true, message: '请填写短信验证码' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-button style="background:rgb(255, 0, 0);border: none" round block type="info" native-type="submit">
          提交
        </van-button>
        <div class="login-tips">已有帐号?
          <router-link to="/index"><span>去登陆</span></router-link>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    name:'reg',
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
    background: #f7f8fa;
    margin: 40px 10px;
  }
  .login-tips{
    margin-top: 20px;
    font-size: 14px;
  }
  .login-tips span{
    color: rgb(255, 0, 0);
  }
</style>
