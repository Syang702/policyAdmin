/* 行业管理 */
<template>
  <div class="industry-manage">
    <div class="header-search">
      <div class="header-search-left">
        <!-- <el-button type="primary" @click="addIndustry()">导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
      </div>
      <div class="header-search-right">
        <el-input
          v-model="listQuery.enterprise_name"
          placeholder="公司名称"
        ></el-input>
        <!-- <el-input v-model="listQuery.account" placeholder="账号名称"></el-input> -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="listQuery.start_time"
          type="date"
          placeholder="添加时间"
        >
        </el-date-picker>
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
        <el-select
          v-model="listQuery.industry_id"
          placeholder="选择行业"
          clearable
        >
          <el-option
            v-for="item in options_industry"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
        <!-- <el-table-column prop="account" label="账号" align="center">
        </el-table-column> -->
        <el-table-column prop="name" label="企业名称" align="center">
        </el-table-column>
        <el-table-column
          prop="credit_code"
          label="社会统一信用代码"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="industry_name" label="所属行业" align="center">
        </el-table-column>
        <el-table-column prop="merger_name" label="所在地区" align="center">
        </el-table-column>
        <el-table-column prop="region_title" label="企业地址" align="center">
        </el-table-column>
        <el-table-column prop="number" label="上年企业人数" align="center">
        </el-table-column>
        <el-table-column prop="establish_time" label="添加时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              round
              plain
              @click="detail(scope.row.id)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="companyList"
    />
  </div>
</template>

<script>
import { companyList } from "@/api/company";
import { industryList } from "@/api/area";
import areaList from "../../assets/areaList.js";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        enterprise_name: "",
        start_time: "",
        end_time: "",
        account: ""
      },
      listLoading: false,
      tableData: [],
      count: 0,
      textMap: {
        update: "编辑",
        create: "添加"
      },
      dialogStatus: "",
      UserDialogVisible: false,
      dialogForm: {},
      rules: {
        //表单验证
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        region_id: [{ required: true, message: "请选择地区", trigger: "blur" }]
      },
      options_area: areaList,
      options_industry: []
    };
  },
  components: { Pagination },
  created() {
    this.industryList();
    this.companyList();
  },
  mounted() {},
  methods: {
    industryList() {
      //行业列表
      industryList().then(res => {
        this.options_industry = res;
      });
    },
    companyList() {
      //公司列表
      this.listLoading = true;
      companyList(this.listQuery).then(res => {
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
      this.companyList();
    },
    detail(id) {
      this.$router.push({
        path: "/company-list/company-detail",
        query: {
          id: id
        }
      });
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
    }
  }
  .table {
    padding-top: 30px;
  }
  ::v-deep .selectArea.el-cascader .el-input {
    width: 250px;
  }
}
</style>
