<template>
  <div>
    <el-form
        ref="primaryForm"
        inline
        :model="loginForm"
        style="text-align: center"
        label-width="70px"
    >
      <el-row>
        <el-form-item label="用户名">
          <el-input
              v-model="loginForm.username"
              class="input_width_lg"
              placeholder="请输入用户名"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="密码">
          <el-input
              v-model="loginForm.password"
              class="input_width_lg"
              placeholder="请输入密码"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item class="d-block">
          <el-button
              size="small"
              type="primary"
              @click="login"
          >LOGIN
          </el-button
          >
        </el-form-item>
      </el-row>
    </el-form>
  </div>
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
      path: "",
    }
  },
  created() {
  },
  computed: {},
  methods: {
    login: function () {
      axios.post("auth/oauth/token", qs.stringify(this.loginForm)).then(function (response) {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token)
          let redirect =  (new RegExp('[?|&]redirect=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [""])[1];
          this.$router.push({
            path: decodeURIComponent(redirect === undefined? '%2F' :redirect.replace(/\+/g, '%20'))
          })
        }
      }.bind(this))
    },
  }
}
</script>