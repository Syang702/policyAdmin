<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div></div>
      <div>
        <el-input
          placeholder="请输入搜索关键字"
          v-model="listQuery.member"
          clearable
          :style="{width:'180px'}"
          size="small"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="listQuery.state" size="small" placeholder="请选择状态">
          <el-option
            v-for="item in optionState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      :data="petsSendData"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
      <el-table-column prop="member" label="会员账号" align="center"></el-table-column>
      <el-table-column prop="nick_name" label="会员昵称" align="center"></el-table-column>
      <el-table-column prop="name" label="赠送宠物名称" align="center"></el-table-column>
      <el-table-column prop="price" label="宠物价值" align="center"></el-table-column>
      <el-table-column prop="day" label="合约时长(天)" align="center"></el-table-column>
      <el-table-column prop="bonus_rate" label="合约收益" align="center"></el-table-column>
      <el-table-column prop="admin_name" label="操作人" align="center"></el-table-column>
      <el-table-column prop="create_time" label="赠送时间" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <!-- 0 订单匹配成功 , 1 买家已打款 , 2 代表卖家已确认 , 3 代表卖家申诉 , 4 申诉成功（订单失败）, 5 代表申诉失败（订单成功）,6 代表自动完成 , 7 代表超时 , 8 代表买家取消 -->
          <span v-if="scope.row.status==0">订单匹配成功</span>
          <span v-if="scope.row.status==1">买家已打款</span>
          <span v-if="scope.row.status==2">卖家已确认</span>
          <span v-if="scope.row.status==3">卖家申诉</span>
          <span v-if="scope.row.status==4">申诉成功（订单失败）</span>
          <span v-if="scope.row.status==5">申诉失败（订单成功）</span>
          <span v-if="scope.row.status==6">自动完成</span>
          <span v-if="scope.row.status==7">超时</span>
          <span v-if="scope.row.status==8">买家取消</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="count>0"
      :total="count"
      :page.sync="listQuery.pageindex"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { petsSendList } from "@/api/pets.js";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      petsSendData: null,
      listLoading: true,
      count: 0,
      listQuery: {
        pageindex: 1,
        pagesize: 10,
        state: "100",
        member: "",
        fromtime: "",
        totime: ""
      },

      // 订单状态：0 订单匹配成功 , 1 买家已打款 , 2 代表卖家已确认 , 3 代表卖家申诉 , 4 申诉成功（订单失败）, 5 代表申诉失败（订单成功）,6 代表自动完成 , 7 代表超时 , 8 代表买家取消
      optionState: [
        {
          label: "订单匹配成功",
          value: "0"
        },
        {
          label: "买家已打款",
          value: "1"
        },
        {
          label: "卖家已确认",
          value: "2"
        },
        {
          label: "卖家申诉",
          value: "3"
        },
        {
          label: "申诉成功（订单失败）",
          value: "4"
        },
        {
          label: "申诉失败（订单成功）",
          value: "5"
        },
        {
          label: "自动完成",
          value: "6"
        },
        {
          label: "超时",
          value: "7"
        },
        {
          label: "买家取消",
          value: "8"
        },
        {
          label: "全部",
          value: "100"
        }
      ],
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
      },
      petsDialog: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      petsSendList(this.listQuery).then(resp => {
        this.petsSendData = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    }
  }
};
</script>


<style>
.pets-form {
  width: 300px;
  margin: 0 auto;
}
.cover {
  width: 50px;
  height: 50px;
}
.avatar {
  width: 250px;
}
</style>


