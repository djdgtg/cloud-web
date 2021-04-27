<template>
  <el-form :model="loginForm" :rules="rules"
           status-icon
           ref="loginForm"
           label-position="left"
           label-width="0px"
           class="login-page">
    <h3 style="text-align: center">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary"  @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      loginForm: {
        grant_type: "password",
        client_id: "client_2",
        client_secret: "123456",
        username: "",
        password: "",
      },
      rules: {
        username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
        password: [{required: true, message: 'enter your password', trigger: 'blur'}]
      },
      path: "",
    }
  },
  created() {
  },
  computed: {},
  methods: {
    login: function () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios.post("auth/oauth/token", qs.stringify(this.loginForm)).then(response => {
            if (response.data.access_token) {
              localStorage.setItem('token', response.data.access_token)
              let redirect = (new RegExp('[?|&]redirect=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [""])[1];
              this.$router.push({
                path: decodeURIComponent(redirect === undefined ? '%2F' : redirect.replace(/\+/g, '%20'))
              })
            }
          });
        } else {
          console.log('login failed!');
          return false;
        }
      })
    },
  }
}
</script>

<style scoped>

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: orange;
  border: 1px solid red;
  box-shadow: 0 0 25px grey;
}

</style>