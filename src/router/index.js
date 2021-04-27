import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Index from '@/components/index/Index'
import Api from '@/components/index/Api'
import Hello from '@/components/index/Hello'
import User from '@/components/system/User'
import Role from '@/components/system/Role'
import Authority from '@/components/system/Authority'
import Resource from '@/components/system/Resource'

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
            component: Index,
            children: [
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
                {
                    path: '/user',
                    name: 'User',
                    component: User
                },
                {
                    path: '/role',
                    name: 'Role',
                    component: Role
                },
                {
                    path: '/authority',
                    name: 'Authority',
                    component: Authority
                },
                {
                    path: '/resource',
                    name: 'Resource',
                    component: Resource
                },
            ]
        },
    ]
})
