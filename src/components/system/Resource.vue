<template>
  <div>
    <!--  分页查询  -->
    <el-form
        ref="primaryForm"
        inline
        label-width="70px"
    >
      <el-form-item label="资源名称">
        <el-input
            v-model="page.query.resourceName"
            placeholder="请输入资源名称"
        />
      </el-form-item>
      <el-form-item label="页面请求">
        <el-select
            v-model="page.query.pageRequest"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模块">
        <el-input
            v-model="page.query.module"
            placeholder="请输入模块"
        />
      </el-form-item>
      <el-form-item label="Url">
        <el-input
            v-model="page.query.url"
            placeholder="请输入url"
        />
      </el-form-item>
      <el-form-item label="请求方式">
        <el-input
            v-model="page.query.method"
            placeholder="请输入请求方式"
        />
      </el-form-item>
      <el-form-item label="访问权限">
        <el-select
            v-model="page.query.ids"
            placeholder="请选择"
            multiple
        >
          <el-option
              v-for="item in authorityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开放访问">
        <el-select
            v-model="page.query.permitAll"
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
      <el-table-column label="资源名称">
        <span slot-scope="scope" v-html="scope.row.resourceName"></span>
      </el-table-column>
      <el-table-column
          label="页面请求"
          :formatter="formatRequests"
      ></el-table-column>
      <el-table-column label="模块">
        <span slot-scope="scope" v-html="scope.row.module"></span>
      </el-table-column>
      <el-table-column label="Url">
        <span slot-scope="scope" v-html="scope.row.url"></span>
      </el-table-column>
      <el-table-column label="请求方式">
        <span slot-scope="scope" v-html="scope.row.method"></span>
      </el-table-column>
      <el-table-column label="访问权限">
        <span slot-scope="scope" v-html="scope.row.authorityNames"></span>
      </el-table-column>
      <el-table-column
          label="开放访问"
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
        title="资源信息"
        :visible.sync="dialogVisible"
        width="35%"
    >
      <el-form :model="saveForm" label-width="90px">
        <el-row>
          <el-form-item label="资源名称" prop="resourceName">
            <el-input v-model="saveForm.resourceName" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="页面请求" prop="pageRequest">
            <el-select
                v-model="saveForm.pageRequest" style="width: 320px"
            >
              <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="模块" prop="module">
            <el-input v-model="saveForm.module" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Url" prop="url">
            <el-input v-model="saveForm.url" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="请求方式" prop="method">
            <el-input v-model="saveForm.method" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="访问权限" prop="authorityNames">
            <el-select
                v-model="saveForm.ids" style="width: 320px" multiple
            >
              <el-option
                  v-for="item in authorityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="开放访问" prop="permitAll">
            <el-select
                v-model="saveForm.permitAll" style="width: 320px"
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
      page: {
        query: {
          url: "",
          module: "",
          method: "",
          resourceName: "",
          pageRequest: null,
          permitAll: null,
          ids: null,
        },
        current: 1,
        size: 10,
      },
      saveForm: {
        id: "",
        url: "",
        module: "",
        method: "",
        permitAll: null,
        pageRequest: null,
        ids: null,
      },
      statusList: [
        {
          value: null,
          label: "请选择",
        },
        {
          value: false,
          label: "否",
        },
        {
          value: true,
          label: "是",
        },
      ],
      authorityList: [],
      tableData: [],
      total: 0,
      dialogVisible: false,
      path: "",
    }
  },
  created() {
    this.getAuthorityList();
    this.search();
  },
  methods: {
    formatStatus(row) {
      switch (row.permitAll) {
        case true:
          return "是";
        case false:
          return "否";
        default:
          return "";
      }
    },
    formatRequests(row) {
      switch (row.pageRequest) {
        case true:
          return "是";
        case false:
          return "否";
        default:
          return "";
      }
    },
    getAuthorityList: function () {
      axios.get("system/authority").then(response => {
        this.authorityList = response.data;
      })
    },
    search: function () {
      axios.post("system/resource/page", this.page).then(response => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      })
    },
    openSave(row) {
      if (row !== null) {
        this.saveForm = Object.assign({}, row);
        let authorityIds = [];
        if (row.authorityIds !== null && row.authorityIds !== undefined && row.authorityIds !== "") {
          let arrString = row.authorityIds.split(',')
          for (let arrInt in arrString) {
            authorityIds.push(parseInt(arrString[arrInt]))
          }
          this.saveForm.ids = authorityIds;
        }
      }
      this.dialogVisible = true
    },
    save: function () {
      delete this.saveForm.isTrusted;
      axios.post("system/resource", this.saveForm).then(() => {
        Message.success({
          message: '保存成功。'
        })
        this.dialogVisible = false;
        this.search();
      })
    },
    remove: function (id) {
      axios.delete("system/resource/" + id).then(() => {
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