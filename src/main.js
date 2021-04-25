import Vue from 'vue'
import App from './App'
import router from '@/router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from '@/config/token'

// 注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // 后端判断该路由是否拥有访问权限。有则直接跳转，没有则跳转登陆页面
    let url = 'page' + to.path;
    if (to.path === "/") {
        url = "page/index";
    }
    axios.get(url).then(function () {
        next();
    }).catch(function (error) {
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        if (error.response.status === 401) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        }
    });
})

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
