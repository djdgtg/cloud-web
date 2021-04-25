import axios from 'axios'
import { Message } from 'element-ui'
import Router from '../router'

let path = '';

axios.interceptors.request.use(function (config) {
    if (localStorage.getItem("token")) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token")
    }
    path = axios.getUri(config)
    console.log(path.startsWith('page'))
    return config
}, function (error) {
    Message.error({
        message: '请求错误：' + error.message
    })
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    // do nothing
    return response
}, function (error) {
    let msg = error.message
    if (error.response.status === 401) {
        msg = '未登陆，请先登陆'
        Router.push('/login')
    }
    if (error.response.status === 403) {
        msg = '权限不够';
    }
    if (path === 'auth/oauth/token' && error.response.status === 400){
        msg = error.response.data.error_description
    }
    Message.error({
        message: '响应错误：' + msg
    })
    return Promise.reject(error)
})

export default axios