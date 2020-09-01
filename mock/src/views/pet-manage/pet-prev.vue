<template>
  <div class="order app-container">
    <div class="flex2">
      <div></div>
      <div class="filter-container" align="right">
        <el-input
          placeholder="请输入账号"
          v-model="listQuery.member"
          clearable
          :style="{width:'180px'}"
          size="small"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" round plain @click="getList" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="prevData"
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
      <el-table-column label="会员昵称" align="center">
        <template slot-scope="scope">{{ scope.row.nick_name }}</template>
      </el-table-column>
      <el-table-column label="预约宠物名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="宠物价值" align="center">
        <template slot-scope="scope">￥{{ scope.row.start_price }}</template>
      </el-table-column>
      <el-table-column label="合约时长" align="center">
        <template slot-scope="scope">{{ scope.row.day }}</template>
      </el-table-column>
      <el-table-column label="合约收益" align="center">
        <template slot-scope="scope">{{ scope.row.bonus_rate }}</template>
      </el-table-column>
      <el-table-column label="预约时间" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageindex"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { petsPrevList } from "@/api/pets";

import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  name: "prev",
  data() {
    return {
      prevData: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageindex: 1,
        pagesize: 10,
        member: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      petsPrevList(this.listQuery).then(resp => {
        this.prevData = resp.data;
        this.total = resp.count;
        this.listLoading = false;
      });
    }
  }
};
</script>
