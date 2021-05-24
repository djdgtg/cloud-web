<template>
  <div>
    <!--  分页查询  -->
    <el-form
        ref="primaryForm"
        inline
        label-width="70px"
    >
      <el-form-item label="考生名称">
        <el-input
            v-model="page.query.studentName"
            placeholder="请输入考生名称"
        />
      </el-form-item>
      <el-form-item label="学校名称">
        <el-select
            :disabled="disabledCode"
            v-model="page.query.schoolCode"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in schoolList"
              :key="item.schoolCode"
              :label="item.schoolName"
              :value="item.schoolCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="考场名称">
        <el-select
            v-model="page.query.examCode"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in selectList"
              :key="`${item.examName}${item.examCode}`"
              :label="item.examName"
              :value="item.examCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input
            v-model="page.query.identityNumber"
            placeholder="请输入身份证号"
        />
      </el-form-item>
      <el-form-item label="准考证号">
        <el-input
            v-model="page.query.ticketNumber"
            placeholder="请输入准考证号"
        />
      </el-form-item>
      <el-form-item label="异常类型">
        <el-select
            v-model="page.query.errorType"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in errorList"
              :key="item.id"
              :label="item.errorName"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="违纪编码">
        <el-select
            v-model="page.query.disciplineCode"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in disciplinesList"
              :key="item.disciplineCode"
              :label="`${item.disciplineCode}${item.disciplineDetail}`"
              :value="item.disciplineCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="座位号">
        <el-input
            v-model="page.query.siteNumber"
            placeholder="请输入座位号"
        />
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
        @selection-change="selectChange"
        border
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          width="70"
          sortable
      ></el-table-column>
      <el-table-column label="考生名称">
        <span slot-scope="scope" v-html="scope.row.studentName"></span>
      </el-table-column>
      <el-table-column label="学校名称">
        <span slot-scope="scope" v-html="scope.row.schoolName"></span>
      </el-table-column>
      <el-table-column label="考场名称">
        <span slot-scope="scope" v-html="scope.row.examName"></span>
      </el-table-column>
      <el-table-column label="身份证号" width="100">
        <span slot-scope="scope" v-html="scope.row.identityNumber"></span>
      </el-table-column>
      <el-table-column label="座位号">
        <span slot-scope="scope" v-html="scope.row.siteNumber"></span>
      </el-table-column>
      <el-table-column label="准考证号">
        <span slot-scope="scope" v-html="scope.row.ticketNumber"></span>
      </el-table-column>
      <el-table-column label="异常类型">
        <span slot-scope="scope" v-html="scope.row.errorName"></span>
      </el-table-column>
      <el-table-column label="违纪编码">
        <span slot-scope="scope" v-html="scope.row.disciplineCode"></span>
      </el-table-column>
      <el-table-column label="异常说明">
        <span slot-scope="scope" v-html="scope.row.remark"></span>
      </el-table-column>
      <el-table-column label="操作" width="180">
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
        title="考生信息"
        :visible.sync="dialogVisible"
        width="35%"
    >
      <el-form :model="saveForm" label-width="90px">
        <el-row>
          <el-form-item label="考生名称" prop="roleName">
            <el-input v-model="saveForm.studentName" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="学校">
            <el-select
                v-model="saveForm.schoolCode"
                placeholder="请选择"
                clearable
            >
              <el-option
                  v-for="item in schoolList"
                  :key="item.schoolCode"
                  :label="item.schoolName"
                  :value="item.schoolCode"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="考场">
            <el-select
                v-model="saveForm.examCode"
                placeholder="请选择"
                clearable
            >
              <el-option
                  v-for="item in selectList"
                  :key="`${item.examName}${item.examCode}`"
                  :label="item.examName"
                  :value="item.examCode"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="准考证号" prop="ticketNumber">
            <el-input v-model="saveForm.ticketNumber" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="座位号" prop="siteNumber">
            <el-input v-model="saveForm.siteNumber" style="width: 320px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="异常类型" prop="errorType">
            <el-select
                v-model="saveForm.errorType" style="width: 320px"
            >
              <el-option
                  v-for="item in errorList"
                  :key="item.id"
                  :label="item.errorName"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="违纪类型" prop="disciplineCode">
            <el-select
                v-model="saveForm.disciplineCode" style="width: 320px"
            >
              <el-option
                  v-for="item in disciplinesList"
                  :key="item.disciplineCode"
                  :label="`${item.disciplineCode}${item.disciplineDetail}`"
                  :value="item.disciplineCode"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="异常说明" prop="remark">
            <el-input v-model="saveForm.remark" style="width: 320px"></el-input>
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
                action="examtool/student/import"
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
              >选择文件
              </el-button
              >&nbsp;
              <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-check"
                  @click="submitUpload"
              >确认上传
              </el-button
              >
              <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-check"
                  @click="template"
              >下载模板
              </el-button
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
          studentName: null,
          identityNumber: null,
          ticketNumber: null,
          siteNumber: null,
          schoolCode: null,
          examCode: null,
          errorType: null,
          disciplineCode: null,
        },
        current: 1,
        size: 10,
      },
      saveForm: {
        id: null,
        studentName: null,
        identityNumber: null,
        ticketNumber: null,
        siteNumber: null,
        schoolCode: null,
        examCode: null,
        errorType: null,
        disciplineCode: null,
        remark: null,
      },
      selectList: [],
      schoolList: [],
      errorList: [],
      disciplinesList: [],
      tableData: [],
      impDialog: false,
      addHeader: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      },
      total: 0,
      dialogVisible: false,
      disabledCode: false,
      path: "",
    }
  },
  created() {
    this.getSchoolList();
    this.getSelectList();
    this.getErrors();
    this.getDisciplines();
    this.search();
  },
  methods: {
    getSelectList: function () {
      axios.get("examtool/exam/examCode").then(response => {
        this.selectList = response.data;
      })
    },
    getSchoolList: function () {
      axios.get("examtool/school").then(response => {
        this.schoolList = response.data;
      })
    },
    getErrors: function () {
      axios.get("examtool/student/errors").then(response => {
        this.errorList = response.data;
      })
    },
    getDisciplines: function () {
      axios.get("examtool/student/disciplines").then(response => {
        this.disciplinesList = response.data;
      })
    },
    search: function () {
      this.page.query.errorType = this.page.query.errorType === '' ? null : this.page.query.errorType
      this.page.query.subType = this.page.query.subType === '' ? null : this.page.query.subType
      axios.post("examtool/student/page", this.page).then(response => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      })
    },
    openSave(row) {
      this.saveForm = Object.assign({}, row);
      this.dialogVisible = true
    },
    save: function () {
      delete this.saveForm.isTrusted;
      axios.post("examtool/student", this.saveForm).then(() => {
        Message.success({
          message: '保存成功。'
        })
        this.dialogVisible = false;
        this.search();
      })
    },
    remove: function (id) {
      axios.delete("examtool/student/" + id).then(() => {
        Message.success({
          message: '删除成功。'
        })
        this.search();
      })
    },
    selectChange(row) {
      this.selectedIds = [];
      row.forEach((element) => {
        this.selectedIds.push(element.id);
      });
    },
    batchRemove: function () {
      let ids = "";
      this.selectedIds.forEach((id, index) => {
        if (index === this.selectedIds.length - 1) {
          ids += id;
        } else {
          ids += id + ",";
        }
      });
      this.remove(ids);
    },
    openImpDialog() {
      this.impDialog = true
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
      this.impDialog = false
      this.$refs.upload.clearFiles();
      this.search();
    },
    //下载模板
    template() {
      window.open("examtool/student/template", "_blank")
    },
    exports: function () {
      // 响应类型：arraybuffer, blob
      axios.post("examtool/student/export", this.page.query, {responseType: 'blob'}).then(resp => {
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