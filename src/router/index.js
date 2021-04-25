import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Index from '@/components/index/Index'
import User from '@/components/index/User'
import Api from '@/components/index/Api'
import Hello from '@/components/index/Hello'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/api',
            name: 'Api',
            component: Api
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        },
    ]
})
