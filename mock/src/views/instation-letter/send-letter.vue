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
      :data="systemSendData"
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
      <el-table-column align="center" label="发送时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import { sendLetterList, sendLletterDelete } from "@/api/instation-letter";

import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      systemSendData: null,
      listLoading: false,
      systemSend: {
        id: "",
        title: "",
        content: ""
      },
      count: 0,
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
      sendLetterList(this.listQuery).then(resp => {
        this.systemSendData = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    deleteLetter(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          sendLletterDelete(id).then(response => {
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
