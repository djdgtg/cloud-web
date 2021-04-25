<template>
  <div>
    <el-form
        ref="primaryForm"
        inline
        style="text-align: center"
        label-width="70px"
    >
      <el-form-item class="d-block">
        <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="user"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
        ref="primaryForm"
        :model="userForm"
        inline
        style="text-align: center"
        label-width="70px"
    >
      <el-row>
        <el-form-item label="用户名">
          <el-input
              v-model="userForm.username"
              class="input_width_lg"
              placeholder="请输入用户名"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="密码">
          <el-input
              v-model="userForm.password"
              class="input_width_lg"
              placeholder="请输入密码"
          />
        </el-form-item>
      </el-row>
      <el-form-item class="d-block">
        <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="add"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

import {Message} from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      userForm: {
        username: "",
        password: "",
      },
      path: "",
    }
  },
  methods: {
    user: function () {
      axios.get("user/1").then(function (response) {
        Message.success({
          message: '响应成功：' + response.data
        })
      })
    },
    add: function () {
      axios.post("user",this.userForm).then(function (response) {
        Message.success({
          message: '响应成功：' + response.data
        })
      })
    }
  }
}
</script>