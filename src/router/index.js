import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Api from '@/components/Api'
import Hello from '@/components/Hello'
import User from '@/components/system/User'
import Role from '@/components/system/Role'
import Authority from '@/components/system/Authority'
import Resource from '@/components/system/Resource'

Vue.use(Router)

const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',  //去掉url中的#
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
