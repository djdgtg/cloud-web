<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="20" style="text-align: left">
          spring-cloud-oauth2 web
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button
              size="small"
              icon="el-icon-d-arrow-left"
              @click="logout()"
          >退出
          </el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user">
                <i class="el-icon-setting"></i>
                用户管理
              </el-menu-item>
              <el-menu-item index="/role">
                <i class="el-icon-setting"></i>
                角色管理
              </el-menu-item>
              <el-menu-item index="/authority">
                <i class="el-icon-setting"></i>
                权限管理
              </el-menu-item>
              <el-menu-item index="/resource">
                <i class="el-icon-setting"></i>
                资源管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限测试</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/hello">
                <i class="el-icon-document"></i>
                <span slot="title">欢迎页</span>
              </el-menu-item>
              <el-menu-item index="/api">
                <i class="el-icon-document"></i>
                <span slot="title">Api</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>考务页面</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/school">
                <i class="el-icon-document"></i>
                <span slot="title">学校管理</span>
              </el-menu-item>
              <el-menu-item index="/exam">
                <i class="el-icon-document"></i>
                <span slot="title">考场管理</span>
              </el-menu-item>
              <el-menu-item index="/student">
                <i class="el-icon-document"></i>
                <span slot="title">考生管理</span>
              </el-menu-item>
              <el-menu-item index="/st-statistics">
                <i class="el-icon-document"></i>
                <span slot="title">考生统计</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import {Message} from "element-ui";

export default {
  methods: {
    logout: function () {
      localStorage.removeItem("token")
      Message.success({
        message: '退出登录。',
        showClose: true
      })
      this.$router.push({
        path: '/login'
      })
    },
  }
}
</script>

<style scoped>

.el-header {
  background-color: orange;
  color: #333;
  line-height: 80px;
}

</style>