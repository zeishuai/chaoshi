<template>
    <div class="login">
        <van-row type="flex" justify="center" align="center">
            <van-col span="10" style="margin-top: 30%">
                <van-loading size="3rem" type="spinner" vertical color="#f00">
                    <span style="font-size: 1rem;color: #f00">登录中，请授权...</span>
                </van-loading>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import urlencode from 'urlencode'

    export default {
        name: 'reg',
        data() {
            return {};
        },
        created() {
            if (localStorage.getItem('token')) {
                return this.$router.push({path: '/index'})
            }
            this.onSubmit()
        },
        methods: {
            onSubmit() {
                //开始登录
                let AppId = 'wx8c464155e57164db';
                let redirectUri = urlencode('https://wksc.qdytcy.com/reg');
                let scope = 'snsapi_userinfo';
                let wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
                let url = wxUrl + 'appid=' + AppId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + scope + '&state=STATE&#wechat_redirect';
                window.location.href = url;
            },
        },
    };
</script>

<style scoped>
    .login {
        margin: 40px 10px;
    }

    .login-tips span {
        color: rgb(255, 0, 0);
    }
</style>
