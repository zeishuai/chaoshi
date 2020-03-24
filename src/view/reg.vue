<template>
    <div class="login"></div>
</template>
<script>
    export default {
        name: 'reg',
        data() {
            return {};
        },
        created() {
            let code = window.location.search.split("=")[1].split("&")[0];
            // this.goosList(code)
            this.onSubmit(code)
        },
        methods: {
            // 登陆获取token
            onSubmit(values) {
                let apiurl = '/api/system/wxfdb0d4b10b8496bf/loginByCode?code=' + values
                this.$axios({
                    method: 'get',
                    url: apiurl,
                }).then(res => {
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('userInfo', JSON.stringify(res.data.data.user));
                    if (localStorage.getItem('token')) {
                        this.$router.push({path: '/index'});
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
    };

</script>
<style scoped>
    .login {
        background: #f7f8fa;
        margin: 40px 10px;
    }

    .login-tips {
        margin-top: 20px;
        font-size: 14px;
    }

    .login-tips span {
        color: rgb(255, 0, 0);
    }
</style>
