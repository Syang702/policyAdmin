<template>
  <div class="order app-container">
    <div class="flex2">
      <div>
        <Magnify :vSrc="imgSrc" :vShow="imgShow" v-on:close="closeBigImg"></Magnify>
      </div>
      <div class="filter-container" align="right">
        <el-input
          placeholder="请输入关键字"
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
    <el-table
      ref="multipleTable"
      :data="withdrawData"
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
      <!-- <el-table-column label="会员昵称" align="center">
        <template slot-scope="scope">{{ scope.row.nick_name }}</template>
      </el-table-column>-->
      <el-table-column label="充值方式" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.pay_type==1">银行卡</div>
          <div v-if="scope.row.pay_type==2">支付宝</div>
          <div v-if="scope.row.pay_type==3">微信</div>
        </template>
      </el-table-column>
      <el-table-column label="实际到账金额" align="center">
        <template slot-scope="scope">{{ scope.row.reality_money }}</template>
      </el-table-column>
      <el-table-column label="充值金额" align="center">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="充值凭证" align="center">
        <!-- <template slot-scope="scope">{{ scope.row.pay_voucher }}</template> -->
        <template slot-scope="scope">
          <img
            class="tableImg"
            @click="enlargeImg(scope.row.pay_voucher)"
            :src="scope.row.pay_voucher"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column label="币种名称" align="center">
        <template slot-scope="scope">{{ scope.row.currency_name }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==2">
            <span style="color:#F56C6C">拒绝</span>
          </div>
          <div v-if="scope.row.status==1">
            <span style="color:green">通过</span>
          </div>
          <div v-if="scope.row.status==0">
            <span>待审核</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="拒绝原因" align="center">
        <template slot-scope="scope">{{scope.row.refuse}}</template>
      </el-table-column>
      <el-table-column label="提交时间" align="center">
        <template slot-scope="scope">{{ scope.row.update_time}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="230">
        <template slot-scope="scope">
          <div v-if="scope.row.status==0">
            <el-button
              type="primary"
              icon="el-icon-check"
              plain
              round
              size="small"
              @click="pass(scope.row.id,scope.row.status)"
            >通过</el-button>
            <el-button
              type="danger"
              icon="el-icon-close"
              plain
              round
              size="small"
              @click="reject(scope.row.id)"
            >拒绝</el-button>
          </div>
          <div v-if="scope.row.status==1||scope.row.status==2">
            <el-button type="success" disabled icon="el-icon-check" plain round size="small">已操作</el-button>
          </div>
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
    <el-dialog title="原因" :visible.sync="refuseDialogVisible" width="30%" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="拒绝原因" prop="refuse">
          <el-input type="textarea" v-model="ruleForm.refuse"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round @click="submitForm('ruleForm')">提交</el-button>
          <el-button plain round @click="refuseDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  rechargeList,
  rechargePassStatus,
  rechargeRejectStatus
  //   currencyList
} from "@/api/user-center";

import Pagination from "@/components/Pagination";
import Magnify from "@/components/Imgmagnify";

export default {
  components: { Pagination, Magnify },
  name: "equipment",
  data() {
    return {
      //   放大图片
      imgSrc: "",
      imgShow: false,
      withdrawData: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pagesize: 10,
        start_time: "",
        end_time: "",
        member: "",
        currency_id: "",
        status: ""
      },
      //   currencyData: null,
      orderstatus: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "2",
          label: "拒绝"
        },
        {
          value: "1",
          label: "通过"
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
      refuseDialogVisible: false,
      rules: {
        refuse: [{ required: true, message: "请填写拒绝原因", trigger: "blur" }]
      },
      ruleForm: {
        refuse: "",
        id: ""
      }
    };
  },
  created() {
    this.getList();
    // this.getCurrencyList();
  },
  methods: {
    getList() {
      if (this.listQuery.end_time == null || undefined || "") {
        this.listQuery.end_time = "";
      } else if (this.listQuery.start_time == null || undefined || "") {
        this.listQuery.start_time = "";
      }
      this.listLoading = true;
      rechargeList(this.listQuery).then(resp => {
        this.withdrawData = resp.data;
        this.total = resp.count;
        this.listLoading = false;
      });
    },
    // getCurrencyList() {
    //   currencyList().then(resp => {
    //     this.currencyData = resp;
    //   });
    // },

    pass(id) {
      this.$confirm("通过, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          rechargePassStatus(id).then(response => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    reject(id, status) {
      this.ruleForm.id = id;
      this.ruleForm.refuse = "";
      this.refuseDialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          rechargeRejectStatus(this.ruleForm).then(response => {
            this.getList();
            this.refuseDialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    enlargeImg(src) {
      this.imgSrc = src;
      this.imgShow = true;
    },
    closeBigImg() {
      this.imgShow = false;
    }
  }
};
</script>
<style  scoped>
  .tableImg{
    width:50px;
    height:50px;
  }
</style>
