// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import Urlencode from 'urlencode'
import FastClick from 'fastclick'
import axios from 'axios'
import qs from 'qs'

Vue.use(Urlencode);
Vue.use(Vant);

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs;           //全局注册，使用方法为:this.qs


router.beforeEach((to, from, next) => {
    // 判断当前路由以及路由的父路由中是否包含meta，meta里是否有requiredAuth
    // to.matched中包含当前路由以及父路由
    // 如果判断出to.matched中某个路由里有meta.requiredAuth
    if (to.matched.some(route => route.meta.requireLogin)) {
        // 判断是否已经登录
        let token = localStorage.getItem('token');
        if (token) {
            next()
        } else {
            // 那就跳转到登录 并且添加query参数returnurl为to.path
            next({
                path: '/',
                query: {
                    rollback: to.path // 从哪来回哪去
                }
            })
        }
    } else {
        next()
    }
});
router.afterEach((to, from) => {
    // window.__wxjs_is_wkwebview
    // true 时 为 IOS 设备
    // false时 为 安卓 设备
    if (window.__wxjs_is_wkwebview) {  // IOS
        if (window.entryUrl == '' || window.entryUrl == undefined) {
            var url = `${FRONT_BASE}${to.fullPath}`;
            window.entryUrl = url;    // 将后面的参数去除
            window.history.pushState({}, null, url);
        }
    }
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
