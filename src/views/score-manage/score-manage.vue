/* 评分管理 */
<template>
  <div class="industry-manage">
    <div class="header-search">
      <div class="header-search-left">
        <el-button type="primary" @click="addIndustry()">添加</el-button>
        <!-- <el-button type="primary">导出</el-button> -->
      </div>
      <div class="header-search-right">
        <el-input
          v-model="listQuery.declares_name"
          placeholder="评分条件"
        ></el-input>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="listQuery.start_time"
          type="date"
          placeholder="添加时间"
        >
        </el-date-picker>
        <el-select v-model="listQuery.industry_id" clearable placeholder="选择行业">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-cascader
          class="selectArea"
          clearable
          placeholder="选择地区"
          v-model="listQuery.region_id"
          :options="options_area"
          :props="{
            checkStrictly: true,
            value: 'id',
            label: 'short_name',
            children: 'son'
          }"
        ></el-cascader>
        <el-button type="primary" @click="search()">搜索</el-button>
      </div>
    </div>
    <div
      class="table"
      stripe
      fit
      highlight-current-row
      border
      v-loading="listLoading"
    >
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="date"
          label="序号"
          width="80"
          type="index"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="pname" label="政策名称" align="center">
        </el-table-column>
        <el-table-column prop="name" label="所属行业" align="center">
        </el-table-column>
        <el-table-column prop="merger_name" label="所在地区" align="center">
        </el-table-column>
        <!-- <el-table-column prop="title" label="报表信息" align="center">
        </el-table-column> -->
        <el-table-column prop="conditions" label="评分条件" align="center">
        </el-table-column>
        <el-table-column prop="score" label="可得分数" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="320">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              round
              plain
              @click="editIndustry(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              round
              plain
              @click="deleteIndustry(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="scoreList"
    />
  </div>
</template>

<script>
import {
  scoreList,
  addScore,
  deleteScore,
  editScore,
  editSubmit
} from "@/api/score-manage";
import { industryList, policyList, reportList } from "@/api/area";
import areaList from "../../assets/areaList.js";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        declares_name: "",
        start_time: "",
        end_time: ""
        // industry_id: ""
      },
      listLoading: false,
      tableData: [],
      textMap: {
        update: "编辑",
        create: "添加"
      },
      count: 0,
      dialogStatus: "",
      UserDialogVisible: false,
      dialogForm: {},
      rules: {
        //表单验证
        region_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        industry_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        policy_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        declares_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        conditions: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        score: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      },
      araeCode: [],
      areaID: [],
      options: [], //行业
      options_area: areaList, //地区
      options_policy: [], //政策
      options_report: [] //报表
    };
  },
  components: { Pagination },
  watch: {},
  created() {
    this.industryList();
    this.policyList();
    this.reportList();
    this.scoreList();
  },
  mounted() {},
  methods: {
    industryList() {
      //行业列表
      industryList().then(res => {
        this.options = res;
      });
    },
    policyList() {
      //政策列表
      policyList().then(res => {
        this.options_policy = res;
      });
    },
    reportList() {
      //报表列表
      reportList().then(res => {
        this.options_report = res;
      });
    },
    scoreList() {
      //评分列表
      this.listLoading = true;
      scoreList(this.listQuery).then(res => {
        this.tableData = res.data;
        this.count = res.count;
        this.listLoading = false;
      });
    },
    search() {
      //搜索
      if (this.listQuery.start_time == null) {
        this.$set(this.listQuery, "start_time", "");
      }
      //   if (this.listQuery.region_id == undefined) {
      //     this.$set(this.listQuery, "region_id", "");
      //   }
      if (Array.isArray(this.listQuery.region_id)) {
        this.$set(
          this.listQuery,
          "region_id",
          this.listQuery.region_id[this.listQuery.region_id.length - 1]
        );
      }
      this.scoreList();
    },
    // 清除弹窗缓存数据
    resetTemp() {
      this.dialogForm = {
        id: "",
        region_id: "",
        policy_id: "",
        industry_id: "",
        declares_id: "",
        conditions: "",
        score: ""
      };
    },
    addIndustry() {
      //添加
      this.$router.push("/score-manage/add-score");
    },
    editIndustry(formItem) {
      //编辑
      this.$router.push({
        path: "/score-manage/add-score",
        query: {
          id: formItem.id
        }
      });
    },
    deleteIndustry(id) {
      //删除
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteScore(id).then(res => {
            this.scoreList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetForm() {
      this.UserDialogVisible = false;
      this.areaID = [];
    }
  }
};
</script>

<style scoped lang="scss">
.industry-manage {
  padding: 30px;
  .header-search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .header-search-right {
      display: flex;
      ::v-deep .el-input {
        width: 180px;
        margin-right: 15px;
      }
      ::v-deep .selectArea .el-input {
        width: 250px;
      }
    }
  }
  .table {
    padding-top: 30px;
  }
  ::v-deep .selectArea .el-input {
    width: 300px;
  }
  ::v-deep .el-select.selectPolicy {
    width: 100%;
  }
  .form-flex {
    display: flex;
    justify-content: space-between;
  }
}
</style>
