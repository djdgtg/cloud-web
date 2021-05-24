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
import School from '@/components/examtool/School'
import Exam from '@/components/examtool/Exam'
import Student from '@/components/examtool/Student'
import StudentStatistics from '@/components/examtool/StudentStatistics'

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
                    path: '/school',
                    name: 'School',
                    component: School
                },
                {
                    path: '/exam',
                    name: 'Exam',
                    component: Exam
                },
                {
                    path: '/student',
                    name: 'Student',
                    component: Student
                },
                {
                    path: '/st-statistics',
                    name: 'StudentStatistics',
                    component: StudentStatistics
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
