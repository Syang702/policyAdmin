<template>
  <div class="award app-container">
    <div class="flex2 filter-container">
      <div></div>
      <div>
        <el-input
          placeholder="请输入会员"
          v-model="listQuery.member"
          clearable
          :style="{width:'180px'}"
          size="small"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-date-picker
          v-model="listQuery.start_time"
          type="datetime"
          placeholder="开始时间"
          class="margin"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
        ></el-date-picker>
        <el-date-picker
          v-model="listQuery.end_time"
          type="datetime"
          placeholder="结束时间"
          class="margin"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
        ></el-date-picker>
        <el-button size="small" plain round @click="getRecondList" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="awardData"
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
      <el-table-column label="得奖账号" align="center">
        <template slot-scope="scope">{{ scope.row.member }}</template>
      </el-table-column>
      <el-table-column label="得奖金额" align="center">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="奖项类型" align="center">
        <template slot-scope="scope">{{ scope.row.award_name }}</template>
      </el-table-column>
      <el-table-column label="币种名称" align="center">
        <template slot-scope="scope">{{ scope.row.currency_name }}</template>
      </el-table-column>
      <el-table-column label="得奖金额" align="center">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="触发账号" align="center">
        <template slot-scope="scope">{{ scope.row.from_member }}</template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="时间" align="center">
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
import { awardRecond } from "@/api/fiance-manage.js";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      awardData: null,
      listLoading: false,
      data_time: "",
      total: 0,
      listQuery: {
        pageindex: 1,
        pagesize: 10,
        member: "",
        start_time: "",
        end_time: ""
      },
      //   快捷键日期选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getRecondList();
  },
  methods: {
    getRecondList() {
      if (this.listQuery.end_time == null || undefined || "") {
        this.listQuery.end_time = "";
      } else if (this.listQuery.start_time == null || undefined || "") {
        this.listQuery.start_time = "";
      }
      this.listLoading = true;
      awardRecond(this.listQuery).then(response => {
        this.awardData = response.data;
        this.total = response.count;
        this.listLoading = false;
      });
    }
  }
};
</script>