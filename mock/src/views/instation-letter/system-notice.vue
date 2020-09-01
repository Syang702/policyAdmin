<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div></div>
      <div class="filter-container" align="right">
        <el-input
          placeholder="请输入标题"
          v-model="listQuery.title"
          clearable
          :style="{width:'180px'}"
          size="small"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" round plain @click="getList" icon="el-icon-search">搜索</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          plain
          round
          size="small"
          @click="addHandle()"
        >添加</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="noticeData"
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
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="prevDetail(scope.row.id)"
            icon="el-icon-document"
            round
            plain
          >预览</el-button>
          <el-button
            type="primary"
            size="small"
            @click="editOneCol(scope.row.id)"
            icon="el-icon-edit"
            round
            plain
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteCol(scope.row.id)"
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
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="noticeDialog"
      width="30%"
    >
      <el-form
        ref="notice"
        :rules="rules"
        :model="notice"
        label-position="left"
        label-width="120px"
        width="30%"
      >
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input v-model="notice.id"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="notice.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="notice.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?addSubmit('notice'):editSubmit('notice')"
          >提交</el-button>
          <el-button plain round @click="noticeDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="提示" :visible.sync="detailDialog" width="50%" center>
      <el-form ref="form" :model="prevData" label-width="120px">
        <el-form-item label="ID">
          <div class="el-input__text">{{prevData.id}}</div>
        </el-form-item>
        <el-form-item label="标题">
          <div class="el-input__text">{{prevData.title}}</div>
        </el-form-item>
        <el-form-item label="内容">
          <div class="el-input__text">{{prevData.content}}</div>
        </el-form-item>
        <el-form-item label="时间">
          <div class="el-input__text">{{prevData.create_time}}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  noticeList,
  noticeDelete,
  noticePrev,
  noticeEdit,
  noticeEditSubmit,
  noticeAddSubmit
} from "@/api/instation-letter";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      noticeData: null,
      notice: {
        id: "",
        title: "",
        content: ""
      },
      noticeDialog: false,
      rules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      dialogStatus: "",
      textMap: {
        create: "添加",
        update: "编辑"
      },
      count: 0,
      listQuery: {
        title: "",
        page: 1,
        pagesize: 10
      },
      detailDialog: false,
      prevData: {
        content: "",
        create_time: "",
        id: "",
        title: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      noticeList(this.listQuery).then(resp => {
        this.noticeData = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    prevDetail(id) {
      this.detailDialog = true;
      noticePrev(id).then(resp => {
        this.prevData = resp;
      });
    },
    resetTemp() {
      this.notice = {
        id: "",
        title: "",
        content: ""
      };
    },
    addHandle() {
      this.resetTemp();
      this.noticeDialog = true;
      this.dialogStatus = "create";
    },
    editOneCol(id) {
      this.resetTemp();
      this.noticeDialog = true;
      this.dialogStatus = "update";
      noticeEdit(id).then(resp => {
        this.notice = resp;
      });
    },
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          noticeAddSubmit(this.notice).then(resp => {
            this.getList();
            this.noticeDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    editSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          noticeEditSubmit(this.notice).then(resp => {
            this.getList();
            this.noticeDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    deleteCol(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          noticeDelete(id).then(response => {
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

<style>
</style>
