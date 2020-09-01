<template>
  <div class="recond app-container">
    <div class="flex2 filter-container">
      <div class="addUp">
      </div>
      <div>
        <el-input
          placeholder="请输入会员账号"
          v-model="listQuery.member"
          clearable
          :style="{width:'180px'}"
          size="small"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" round plain @click="getRecondList" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="recondData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
     <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="会员账号" align="center">
        <template slot-scope="scope">{{ scope.row.member }}</template>
      </el-table-column>
      <el-table-column label="充值金额" align="center">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="充值币种" align="center">
        <template slot-scope="scope">{{ scope.row.currency_name }}</template>
      </el-table-column>
      <el-table-column label="充值时间" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getRecondList"
    />
  </div>
</template>

<script>
import { rechargeRecond  } from "@/api/fiance-manage.js";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      recondData: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10,
        member: "",
      }
    };
  },
  created() {
    this.getRecondList();
  },
  methods: {
    getRecondList() {
      this.listLoading = true;
      rechargeRecond(this.listQuery).then(response => {
        this.recondData = response.data;
        this.total = response.count;
        this.listLoading = false;
      });
    },
    getcurrencyList() {
      currencyList().then(response => {
        this.currencyData = response;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.addUp {
  font-size: 14px;
  line-height: 28px;
}
</style>
