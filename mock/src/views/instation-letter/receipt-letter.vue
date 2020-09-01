<template>
  <div class="withadudit app-container">
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
      v-loading="listLoading"
      :data="systemReceiptData"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.member }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发送内容">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="replyLetter(scope.row)"
            icon="el-icon-message"
            round
            plain
          >回复</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteLetter(scope.row.id)"
            icon="el-icon-delete"
            round
            plain
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="count>0"
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
    <el-dialog :modal="false" center title="回复" :visible.sync="replyDialog" width="30%">
      <el-form
        ref="replyMail"
        :rules="rules"
        :model="replyMail"
        label-position="left"
        label-width="80px"
        width="50%"
      >
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input v-model="replyMail.id"></el-input>
        </el-form-item>
        <el-form-item label="回复至：">
          <div class="el-input__text">{{member}}</div>
          <!-- <el-input v-model="member"></el-input> -->
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="replyMail.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="replyMail.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round @click="replyHandle('replyMail')">提交</el-button>
          <el-button plain round @click="replyDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  receiptReceiptList,
  receiptReceiptDelete,
  replySendSubmit
} from "@/api/instation-letter";

import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      systemReceiptData: null,
      listLoading: false,
      replyMail: {
        id: "",
        title: "",
        content: ""
      },
      member: "",
      count: 0,
      replyDialog: false,
      rules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      listQuery: {
        member: "",
        page: 1,
        pagesize: 10,
        start_time: "",
        end_time: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      receiptReceiptList(this.listQuery).then(resp => {
        this.systemReceiptData = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    replyLetter(row) {
      this.replyDialog = true;
      this.replyMail.id = row.id;
      this.member = row.member;
    },
    replyHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          replySendSubmit(this.replyMail).then(resp => {
            this.replyDialog = false;
            this.getList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteLetter(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          receiptReceiptDelete(id).then(response => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
