<template>
  <div>
    <!--  分页查询  -->
    <el-form
        ref="primaryForm"
        inline
        label-width="70px"
    >
      <el-form-item label="查询类型">
        <el-select
            v-model="page.query.type"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学校名称">
        <el-select
            :disabled="disabledCode"
            v-model="page.query.schoolCode"
            placeholder="请选择"
            clearable
            @change="schoolSelect"
        >
          <el-option
              v-for="item in schoolList"
              :key="item.schoolCode"
              :label="item.schoolName"
              :value="item.schoolCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="考点名称">
        <el-select
            v-model="page.query.examCode"
            placeholder="请选择"
            clearable
        >
          <el-option
              v-for="item in selectList"
              :key="item.examCode"
              :label="item.examName"
              :value="item.examCode"
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
      </el-form-item>
    </el-form>

    <!-- 页面列表 -->
    <el-table
        :data="tableData"
        border
    >
      <el-table-column label="考点名称">
        <span slot-scope="scope" v-html="scope.row.schoolName"></span>
      </el-table-column>
      <el-table-column label="考试名称">
        <span slot-scope="scope" v-html="scope.row.examName"></span>
      </el-table-column>
      <el-table-column label="参考人数">
        <span slot-scope="scope" v-html="scope.row.attendNumber"></span>
      </el-table-column>
      <el-table-column label="总异常人数">
        <span slot-scope="scope" v-html="scope.row.totalErrorNumber"></span>
      </el-table-column>
      <el-table-column label="缺考人数">
        <span slot-scope="scope" v-html="scope.row.totalAbsentNumber"></span>
      </el-table-column>
      <el-table-column label="违纪人数">
        <span slot-scope="scope" v-html="scope.row.totalDisciplinaryNumber"></span>
      </el-table-column>
      <el-table-column label="异常人数">
        <span slot-scope="scope" v-html="scope.row.totalExceptionNumber"></span>
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

  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      page: {
        query: {
          examCode: null,
          schoolCode: null,
          type: 1,
        },
        current: 1,
        size: 10,
      },
      typeList: [
        {
          value: 2,
          label: "按考点",
        },
        {
          value: 1,
          label: "按考试",
        },
      ],
      selectList: [],
      schoolList: [],
      tableData: [],
      disabledCode: false,
      total: 0,
    }
  },
  created() {
    this.getSelectList();
    this.getSchoolList();
    this.search();
  },
  methods: {
    getSelectList: function (schoolCode) {
      axios.get("examtool/exam/examCode?schoolCode="+schoolCode).then(response => {
        this.selectList = response.data;
      })
    },
    schoolSelect:function(schoolCode){
      this.getSelectList(schoolCode);
    },
    getSchoolList: function () {
      axios.get("examtool/school").then(response => {
        this.schoolList = response.data;
      })
    },
    search: function () {
      axios.post("examtool/student/statistics", this.page).then(response => {
        this.tableData = response.data.records;
        this.total = response.data.total;
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