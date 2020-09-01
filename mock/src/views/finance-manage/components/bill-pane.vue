<template>
  <div class>
    <div class="flex2 filter-container">
      <div></div>
      <div>
        <el-input
          placeholder="请输入账号"
          v-model="listQuery.member"
          clearable
          :style="{width:'180px'}"
          size="small"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- <el-select size="small" v-model="listQuery.currency_id" clearable placeholder="请选择">
          <el-option
            v-for="item in currencyData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>-->
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
        <el-button size="small" round plain @click="getList" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table :data="runData" border stripe fit highlight-current-row style="width: 100%">
      <el-table-column v-loading="loading" element-loading-text="加载中......！"  align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员账号">
        <template slot-scope="scope">
          <span>{{ scope.row.member }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.bill_type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="变更后金额">
        <template slot-scope="scope">
          <span>{{ scope.row.after_account }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="币种">
        <template slot-scope="scope">
          <span>{{ scope.row.currency_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
  </div>
</template>

<script>
// currencyList
import { billRunning } from "@/api/fiance-manage";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  props: {
    type: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      runData: null,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10,
        type: this.type,
        start_time: "",
        end_time: "",
        member: "",
        currency_id: ""
      },
      loading: false,
      currencyData: null,
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
    // this.getcurrencyList();
  },
  methods: {
    getList() {
      this.loading = true;
      if (this.listQuery.end_time == null || undefined || "") {
        this.listQuery.end_time = "";
      } else if (this.listQuery.start_time == null || undefined || "") {
        this.listQuery.start_time = "";
      }
      billRunning(this.listQuery).then(resp => {
        this.runData = resp.data;
        this.total = resp.count;
        this.loading = false;
      });
    }
    // getcurrencyList() {
    //   currencyList().then(resp => {
    //     this.currencyData = resp;
    //   });
    // }
  }
};
</script>

