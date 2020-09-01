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
        <el-date-picker
          v-model="listQuery.fromtime"
          type="datetime"
          placeholder="开始时间"
          class="margin"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
        ></el-date-picker>
        <el-date-picker
          v-model="listQuery.totime"
          type="datetime"
          placeholder="结束时间"
          class="margin"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
        ></el-date-picker>
        <el-button size="small" round plain @click="getList" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="transferData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <!--<el-table-column align="center" label="序号" type="index" width="50"></el-table-column>-->
      <el-table-column label="会员账号" align="center">
        <template slot-scope="scope">{{ scope.row.member }}</template>
      </el-table-column>
      <el-table-column label="会员昵称" align="center">
        <template slot-scope="scope">{{ scope.row.nick_name }}</template>
      </el-table-column>
      <el-table-column label="转让宠物名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="宠物价值" align="center">
        <template slot-scope="scope">￥{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="合约时长(天)" align="center">
        <template slot-scope="scope">{{ scope.row.day }}</template>
      </el-table-column>
      <el-table-column label="合约收益" align="center">
        <template slot-scope="scope">{{ scope.row.bonus_rate }}</template>
      </el-table-column>
      <el-table-column label="转让时间" align="center">
        <template slot-scope="scope">{{ scope.row.intime }}</template>
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
import { petsTransferList } from "@/api/pets";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  name: "transfer",
  data() {
    return {
      transferData: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageindex: 1,
        pagesize: 10,
        member: "",
        fromtime: "",
        totime: ""
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
    this.getList();
  },
  methods: {
    getList() {
      if (this.listQuery.totime == null || undefined || "") {
        this.listQuery.totime = "";
      } else if (this.listQuery.fromtime == null || undefined || "") {
        this.listQuery.fromtime = "";
      }
      this.listLoading = true;
      petsTransferList(this.listQuery).then(resp => {
        this.transferData = resp.data;
        this.total = resp.count;
        this.listLoading = false;
      });
    }
  }
};
</script>
