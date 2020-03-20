<template>
    <div>
        <van-row type="flex" justify="center" align="center">
            <van-col span="10" style="margin-top: 30%">
                <van-loading size="3rem" type="spinner" vertical color="#f00">
                    <span style="font-size: 1rem;color: #f00">清理缓存中....</span>
                </van-loading>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "relogin",
        created() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push({path:'/'})
        }
    }
</script>

<style scoped>
    .login {
        margin: 40px 10px;
    }
    .login-tips span {
        color: rgb(255, 0, 0);
    }
</style>
