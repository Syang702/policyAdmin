/* 查询记录 */
<template>
  <div class="industry-manage">
    <div class="header-search">
      <div class="header-search-left">
        <!-- <el-button type="primary">导出</el-button> -->
      </div>
      <div class="header-search-right">
        <el-input v-model="listQuery.account" placeholder="账号"></el-input>
        <el-input
          v-model="listQuery.enterprise_name"
          placeholder="企业名称"
        ></el-input>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="listQuery.add_time"
          type="date"
          placeholder="添加时间"
        >
        </el-date-picker>
        <el-select
          v-model="listQuery.industry_id"
          clearable
          placeholder="选择行业"
        >
          <el-option
            v-for="item in options_industry"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-cascader
          class="selectArea"
          placeholder="选择地区"
          v-model="listQuery.region_id"
          :options="options_area"
          clearable
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
        <el-table-column prop="account" label="账号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="企业名称" align="center">
        </el-table-column>
        <el-table-column prop="policy_name" label="政策名称" align="center">
        </el-table-column>
        <el-table-column prop="industry_name" label="所属行业" align="center">
        </el-table-column>
        <el-table-column prop="merger_name" label="所在地区" align="center">
        </el-table-column>
        <el-table-column prop="title" label="公司提交信息" align="center">
        </el-table-column>
        <el-table-column label="信息查看" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              round
              plain
              @click="detail(scope.row)"
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
      @pagination="industryList"
    />
  </div>
</template>

<script>
import { selEnterprise } from "@/api/inquiry-record";
import { industryList, policyList } from "@/api/area";
import areaList from "../../assets/areaList.js";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        account: "",
        enterprise_name: "",
        add_time: "",
        region_id: "",
        industry_id: ""
      },
      options_area: areaList,
      options_industry: [],
      tableData: [],
      listLoading: false,
      count: 0
    };
  },
  components: { Pagination },
  created() {
    this.industryList();
    this.selEnterprise();
  },
  methods: {
    industryList() {
      industryList().then(res => {
        this.options_industry = res;
      });
    },
    selEnterprise() {
      this.listLoading = true;
      selEnterprise(this.listQuery).then(res => {
        this.tableData = res.data;
        this.count = res.count;
        this.listLoading = false;
      });
    },
    search() {
      if (this.listQuery.add_time == null) {
        this.$set(this.listQuery, "add_time", "");
      }
      if (Array.isArray(this.listQuery.region_id)) {
        this.$set(
          this.listQuery,
          "region_id",
          this.listQuery.region_id[this.listQuery.region_id.length - 1]
        );
      }
      this.selEnterprise();
    },
    detail(formItem) {
      //   sessionStorage.setItem(
      //     "policy_data",
      //     JSON.stringify(formItem.policy_data)
      //   );
      //   sessionStorage.setItem("score_data", JSON.stringify(formItem.score_data));
      this.$router.push({
        path: "/inquiry-record/view-score",
        query: {
          id: formItem.id
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
      ::v-deep .selectArea .el-input {
        width: 300px;
      }
    }
  }
  .table {
    padding-top: 30px;
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
