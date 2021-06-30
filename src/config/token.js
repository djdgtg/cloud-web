import axios from 'axios'
import {Message} from 'element-ui'
import Router from '../router'

let path = '';

axios.interceptors.request.use(function (config) {
    path = axios.getUri(config)
    // 跳转登陆页、登陆这两个接口不能加请求头，会返回401
    if (localStorage.getItem("token") && path !== 'page/login' && path !== 'auth/oauth/token') {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token")
    }
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
        msg = '未登陆，请先登陆。'
        Router.push('/login')
    }
    if (error.response.status === 403) {
        msg = '权限不够。';
    }
    if (error.response.status === 400) {
        msg = '操作失败。'
        if (path.indexOf("oauth/token") !== -1) {
            msg = error.response.data.error_description
        }
    }
    if (error.response.status === 500) {
        msg = '服务异常。'
    }
    Message.error({
        duration: 1500,
        message: '响应错误：' + msg
    })
    return Promise.reject(error)
})

export default axios