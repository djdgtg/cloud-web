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
            @click="api('hello')"
        >hello</el-button
        >
        <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="api('test')"
        >test</el-button
        >
        <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="api('admin')"
        >admin</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {Message} from "element-ui";
import axios from "axios";

export default {
  methods: {
    api: function (api) {
      axios.get("basic/"+api).then(function (response) {
        Message.success({
          message: '响应成功：' + response.data
        })
      })
    },
  }
}
</script>