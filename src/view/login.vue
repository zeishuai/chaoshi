<template>
  <div class="login">
    <!-- <van-form @submit="onSubmit">
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
    </van-form> -->
    <!-- <van-button @click="onSubmit" round block type="info" style="background:rgb(255, 0, 0);border: none" native-type="submit">登陆</van-button> -->
  </div>
</template>

<script>
import urlencode from 'urlencode'
  export default {
    name:'login',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    created () {
       this.onSubmit()
    },
    methods: {
      onSubmit() {
        //开始登录
        this.$router.push('reg')
        // let AppId = 'wxfdb0d4b10b8496bf';
        // // let redirectUri = urlencode('http://yt.qdytcy.com/');
        // let redirectUri = urlencode('http://ui.qdytcy.com/reg');
        // let scope = 'snsapi_userinfo';
        // let wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
        // let url = wxUrl + 'appid='+AppId+'&redirect_uri='+redirectUri+'&response_type=code&scope='+scope+'&state=STATE&#wechat_redirect';
        // window.location.href =url 
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
