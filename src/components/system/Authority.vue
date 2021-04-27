<template>
  <div>
    <!--  分页查询  -->
    <el-form
        ref="primaryForm"
        inline
        label-width="70px"
    >
      <el-form-item label="权限名称">
        <el-input
            v-model="page.query.authorityName"
            placeholder="请输入权限名称"
        />
      </el-form-item>
      <el-form-item label="名称">
        <el-input
            v-model="page.query.name"
            placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="权限状态">
        <el-select
            v-model="page.query.status"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作">
        <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search"
        >
          查询
        </el-button>
        <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="openSave"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 页面列表 -->
    <el-table
        :data="tableData"
        border
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          width="65"
          sortable
      ></el-table-column>
      <el-table-column label="权限名称">
        <span slot-scope="scope" v-html="scope.row.authorityName"></span>
      </el-table-column>
      <el-table-column label="名称">
        <span slot-scope="scope" v-html="scope.row.name"></span>
      </el-table-column>
      <el-table-column
          prop="status"
          label="权限状态"
          :formatter="formatStatus"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <div slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openSave(scope.row)"
          >修改
          </el-button
          >
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row.id)"
          >删除
          </el-button
          >
        </div>
      </el-table-column>
    </el-table>
    <div class="page pull-right">
      <el-pagination
          :current-page="page.current"
          :page-size="page.size"
          :page-sizes="[10, 20, 50, 100, 200, 300]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <el-dialog
        title="权限信息"
        :visible.sync="dialogVisible"
        width="35%"
    >
      <el-form :model="saveForm" label-width="90px">
        <el-row>
          <el-form-item label="权限名称" prop="username">
            <el-input v-model="saveForm.authorityName" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="名称" prop="password">
            <el-input v-model="saveForm.name" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="状态" prop="status">
            <el-select
                v-model="saveForm.status" style="width: 320px"
            >
              <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>

import {Message} from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      page:{
        query: {
          authorityName: "",
          name: "",
          status: null,
        },
        current: 1,
        size: 10,
      },
      saveForm: {
        id: "",
        authorityName: "",
        name: "",
        status: null,
      },
      statusList: [
        {
          value: 0,
          label: "关闭",
        },
        {
          value: 1,
          label: "开启",
        },
      ],
      tableData: [],
      total: 0,
      dialogVisible: false,
      path: "",
    }
  },
  created() {
    this.search();
  },
  methods: {
    formatStatus(row) {
      switch (row.status) {
        case 1:
          return "开启";
        case 0:
          return "关闭";
        default:
          return "";
      }
    },
    search: function () {
      axios.post("system/authority/page", this.page).then(response => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      })
    },
    openSave(row) {
      if (row !== null) {
        this.saveForm = Object.assign({}, row);
      }
      this.dialogVisible = true
    },
    save: function () {
      delete this.saveForm.isTrusted;
      axios.post("system/authority", this.saveForm).then(()=> {
        Message.success({
          message: '保存成功。'
        })
        this.dialogVisible = false;
        this.search();
      })
    },
    remove: function (id) {
      axios.delete("system/authority/" + id).then(()=> {
        Message.success({
          message: '删除成功。'
        })
        this.search();
      })
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.search();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.search();
    },
  }
}
</script>