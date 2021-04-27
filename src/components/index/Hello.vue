<template>
  <div>
    <h2>Hello, welcome to spring-cloud-oauth2 web</h2>
  </div>
</template>

<script>

import {Message} from "element-ui";
import axios from "axios";

export default {
  methods: {
    api: function (api) {
      axios.get("api/"+api).then(response=> {
        Message.success({
          message: '响应成功：' + response.data
        })
      })
    },
  }
}
</script>