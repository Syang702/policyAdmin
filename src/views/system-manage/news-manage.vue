/* 资讯管理 */
<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div class="header">
        <el-button type="primary" @click="addHandle">添 加</el-button>
        <div class="header_right">
          <el-select
            v-model="listQuery.intype"
            placeholder="请选择资讯类型"
            @change="changeType"
          >
            <el-option
              v-for="rank in inTypeData"
              :key="rank.id"
              :label="rank.id"
              :value="rank.id"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <el-table
      :data="adminData"
      v-loading="listLoading"
      element-loading-text="加载中"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="80"
      ></el-table-column>
      <el-table-column label="资讯类型" align="center" prop="intype">
      </el-table-column>
      <el-table-column label="资讯标题" align="center" prop="in_title">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="create_time">
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="320px">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="prevDetail(scope.row)"
            icon="el-icon-document"
            round
            plain
            >预览</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            round
            plain
            @click="editBackstageUser(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            round
            plain
            @click="backstageUserDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
    <!-- 添加编辑弹窗 -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="UserDialogVisible"
      v-if="UserDialogVisible"
      width="50%"
    >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div v-if="this.dialogStatus == 'update'">
          <el-form-item label="ID" prop="id" style="display:none;">
            <el-input v-model="userForm.id"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="资讯类型" prop="intype">
          <el-select v-model="userForm.intype">
            <el-option
              v-for="rank in inTypeData"
              :key="rank.id"
              :label="rank.id"
              :value="rank.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯标题" prop="in_title">
          <el-input v-model="userForm.in_title"></el-input>
        </el-form-item>
        <el-form-item label="资讯内容" prop="content">
          <!-- <div v-if="isShowTinymce"> -->
          <Tinymce
            ref="tinymceChildren"
            v-model="userForm.content"
            :height="300"
          />
          <!-- </div> -->
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="
              dialogStatus == 'create'
                ? submitAddForm('userForm')
                : submitEditForm('userForm')
            "
            >提 交</el-button
          >
          <el-button plain round @click="resetForm('userForm')"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog title="预览" :visible.sync="detailDialog" width="50%" center>
      <el-form ref="form" :model="prevData" label-width="120px">
        <el-form-item label="标题">
          <div class="el-input__text">{{ prevData.in_title }}</div>
        </el-form-item>
        <el-form-item label="创建时间">
          <div class="el-input__text">{{ prevData.create_time }}</div>
        </el-form-item>
        <el-form-item label="内容">
          <div class="el-input__text" v-html="prevData.content"></div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleted, add, edit, editSubmit } from "@/api/admin-manage";
import Tinymce from "@/components/Tinymce";
import Pagination from "@/components/Pagination";
export default {
  components: { Tinymce, Pagination },
  data() {
    // let checkUrl = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("跳转链接能为空"));
    //   } else {
    //     const reg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
    //     if (reg.test(value)) {
    //       callback();
    //     } else {
    //       return callback(new Error("链接必须以http或者https开头"));
    //     }
    //   }
    // };
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        type: 1,
        intype: ""
      },
      count: 0,
      adminData: null, //不赋值空数组：防止直接赋值空数组在次赋值时报错
      listLoading: true,
      inTypeData: [{ id: "政策" }, { id: "行业" }, { id: "模板" }],
      UserDialogVisible: false, //编辑弹框
      currencyUserCol: null, //获取当前编辑用户全部信息
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      userForm: {
        id: "",
        type: 1,
        image: "",
        intype: "", //资讯类型
        in_title: "",
        content: ""
      },
      // 编辑+添加弹窗的条件限制
      rules: {
        intype: [{ required: true, message: "请选择类型", trigger: "change" }],
        in_title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      detailDialog: false,
      prevData: {}
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      getList(this.listQuery).then(resp => {
        this.adminData = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    search() {
      this.getList();
    },
    // 删除
    backstageUserDel(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleted(id).then(resp => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 清除弹窗缓存数据
    resetTemp() {
      this.userForm = {
        id: "",
        type: 1,
        image: "",
        intype: "", //资讯类型
        in_title: "",
        content: ""
      };
    },
    // 添加
    addHandle() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.UserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].clearValidate();
      });
    },
    //添加提交
    submitAddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$delete(this.userForm, "id");
          add(this.userForm).then(resp => {
            this.getList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    prevDetail(row) {
      //预览
      this.detailDialog = true;
      this.prevData = { ...row };
    },
    // 编辑
    editBackstageUser(row) {
      this.userForm = {
        id: row.id,
        type: 1,
        image: "",
        intype: row.intype, //资讯类型
        in_title: row.in_title,
        content: row.content
      };
      this.dialogStatus = "update";
      this.UserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].clearValidate();
      });
    },
    // 编辑提交修改内内容
    submitEditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editSubmit(this.userForm).then(resp => {
            this.getList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    //添加编辑弹窗取消操作
    resetForm(formName) {
      this.UserDialogVisible = false;
    },
    changeType(value) {
      this.listQuery.intype = value;
      this.getList();
    }
    // 通用：所有编辑框X：关闭功能
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .header_right {
    margin-right: 100px;
  }
}
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
::v-deep .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
</style>
