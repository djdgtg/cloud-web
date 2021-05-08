<template>
  <div class="box-body">
    <!--  分页查询  -->
    <el-form
        ref="page.query"
        :model="page.query"
        inline
        label-width="70px"
    >
      <el-form-item label="用户名称">
        <el-input
            v-model="page.query.username"
            placeholder="请输入用户名称"
        />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input
            v-model="page.query.name"
            placeholder="请输入真实姓名"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select
            v-model="page.query.enabled"
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
      <el-form-item label="角色">
        <el-select
            v-model="page.query.ids"
            placeholder="请选择"
            multiple
            clearable
        >
          <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
        <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="batchRemove"
        >
          删除
        </el-button>
        <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            @click="enabled(true)"
        >
          开启
        </el-button>
        <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            @click="enabled(false)"
        >
          关闭
        </el-button>
        <el-button
            size="small"
            type="primary"
            icon="el-icon-upload"
            @click="openImpDialog"
        >
          导入
        </el-button>
        <el-button
            size="small"
            type="primary"
            icon="el-icon-download"
            @click="exports"
        >
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 页面列表 -->
    <el-table
        :data="tableData"
        style="width: 100%; text-align: center"
        @selection-change="selectChange"
        border
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          width="65"
          sortable
      ></el-table-column>
      <el-table-column label="用户名称">
        <span slot-scope="scope" v-html="scope.row.username"></span>
      </el-table-column>
      <el-table-column label="真实姓名">
        <span slot-scope="scope" v-html="scope.row.name"></span>
      </el-table-column>
      <el-table-column label="用户密码">
        <span slot-scope="scope" v-html="scope.row.password"></span>
      </el-table-column>
      <el-table-column label="角色">
        <span slot-scope="scope" v-html="scope.row.roleNames"></span>
      </el-table-column>
      <el-table-column
          prop="enabled"
          label="是否已启用"
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
        title="用户信息"
        :visible.sync="dialogVisible"
        width="35%"
    >
      <el-form :model="saveForm" label-width="90px">
        <el-row>
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="saveForm.username" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="密码" prop="password">
            <el-input v-model="saveForm.password" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="saveForm.name" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="角色" prop="ids">
            <el-select
                v-model="saveForm.ids" style="width: 320px" multiple
            >
              <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否启用" prop="enabled">
            <el-select
                v-model="saveForm.enabled" style="width: 320px"
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

    <!-- 导入弹窗 -->
    <el-dialog title="导入窗口" width="520px" :visible.sync="impDialog">
      <el-form>
        <el-row>
          <el-form-item style="text-align: center">
            <el-upload
                ref="upload"
                action="system/user/import"
                accept=".xlsx,.xls"
                :headers="addHeader"
                :on-error="onError"
                :on-success="onSuccess"
                :auto-upload="false"
                :multiple="false"
            >
              <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  icon="el-icon-search"
              >选择文件</el-button
              >&nbsp;
              <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-check"
                  @click="submitUpload"
              >确认上传</el-button
              >
              <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-check"
                  @click="template"
              >下载模板</el-button
              >
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>


<script>

import {Message} from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      page: {
        query: {
          username: "",
          name: "",
          ids: null,
          enabled: null,
        },
        current: 1,
        size: 10,
      },
      saveForm: {
        id: "",
        username: "",
        name: "",
        password: "",
        ids: "",
        enabled: null,
      },
      statusList: [
        {
          value: null,
          label: "请选择",
        },
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
      roleList: [],
      selectedIds: [],
      tableData: [],
      impDialog: false,
      addHeader: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      },
      total: 0,
      dialogVisible: false,
      path: "",
    }
  },
  created() {
    this.getRoleList();
    this.search();
  },
  methods: {
    selectChange(row) {
      this.selectedIds = [];
      row.forEach((element) => {
        this.selectedIds.push(element.id);
      });
    },
    formatStatus(row) {
      switch (row.enabled) {
        case true:
          return "是";
        case false:
          return "否";
        default:
          return "";
      }
    },
    getRoleList: function () {
      axios.get("system/role").then(response => {
        this.roleList = response.data;
      })
    },
    search: function () {
      axios.post("system/user/page", this.page).then(response => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      })
    },
    exports: function () {
      // 响应类型：arraybuffer, blob
      axios.post("system/user/export", this.page.query, {responseType: 'blob'}).then(resp => {
        let headers = resp.headers;
        let contentType = headers['content-type'];
        if (!resp.data) {
          return false;
        } else {
          const blob = new Blob([resp.data], {type: contentType});
          const contentDisposition = resp.headers['content-disposition'];
          let fileName = 'unknown';
          if (contentDisposition) {
            fileName = window.decodeURI(resp.headers['content-disposition'].split('=')[1]);
          }
          this.downFile(blob, fileName);
        }
      });
    },
    /* 下载方法 */
    downFile(blob, fileName) {
      // 非IE下载
      if ('download' in document.createElement('a')) {
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob); // 创建下载的链接
        link.download = fileName; // 下载后文件名
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click(); // 点击下载
        window.URL.revokeObjectURL(link.href); // 释放掉blob对象
        document.body.removeChild(link); // 下载完成移除元素
      } else {
        // IE10+下载
        window.navigator.msSaveBlob(blob, fileName);
      }
    },
    openSave(row) {
      if (row !== null && row !== undefined) {
        this.saveForm = Object.assign({}, row);
        let roleIds = [];
        if (row.roleIds !== null && row.roleIds !== undefined && row.roleIds !== "") {
          let arrString = row.roleIds.split(',')
          for (let arrInt in arrString) {
            roleIds.push(parseInt(arrString[arrInt]))
          }
          this.saveForm.ids = roleIds;
        }
      }
      this.dialogVisible = true
    },
    save: function () {
      delete this.saveForm.isTrusted;
      axios.post("system/user", this.saveForm).then(() => {
        Message.success({
          message: '保存成功。'
        })
        this.dialogVisible = false;
        this.search();
      })
    },
    remove: function (id) {
      axios.delete("system/user/" + id).then(() => {
        Message.success({
          message: '删除成功。'
        })
        this.search();
      })
    },
    batchRemove: function () {
      let ids = "";
      this.selectedIds.forEach((id, index) => {
        if(index === this.selectedIds.length - 1){
          ids += id;
        } else {
          ids += id+",";
        }
      });
      this.remove(ids);
    },
    enabled(enabled) {
      axios.post("system/user/enabled/"+enabled ,this.selectedIds).then(() => {
        Message.success({
          message: '切换成功。'
        })
        this.search();
      })
    },
    openImpDialog(){
      this.impDialog=true
    },
    //确定上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    onError() {
      Message.error({
        duration: 1500,
        message: '导入失败。'
      })
    },
    onSuccess() {
      Message.success({
        duration: 1500,
        message: '导入成功。'
      })
      this.impDialog=false
      this.$refs.upload.clearFiles();
      this.search();
    },
    //下载模板
    template() {
      window.open("system/user/template", "_blank")
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