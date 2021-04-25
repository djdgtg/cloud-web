<template>
  <div>
    <el-form
        style="text-align: center"
        label-width="70px"
    >
      <router-link to='/user'>
        <el-button
            size="small"
            type="primary"
        >To 用户</el-button
        >
      </router-link>
      <router-link to='/api'>
        <el-button
            size="small"
            type="primary"
        >To API</el-button
        >
      </router-link>
      <router-link to='/hello'>
        <el-button
            size="small"
            type="primary"
        >To Hello</el-button
        >
      </router-link>
      <router-link to='/login'>
        <el-button
            size="small"
            type="primary"
        >To LOGIN</el-button
        >
      </router-link>
    </el-form>
  </div>
</template>
