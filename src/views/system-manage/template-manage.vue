/* 模板管理 */
<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div>
        <el-button type="primary" @click="addHandle">添 加</el-button>
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
      <el-table-column label="模板标题" align="center" prop="in_title">
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
    <!-- 添加预览弹窗 -->
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
        <!-- <el-form-item label="资讯类型" prop="intype">
          <el-select v-model="userForm.intype">
            <el-option
              v-for="rank in inTypeData"
              :key="rank.id"
              :label="rank.id"
              :value="rank.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="资模标题" prop="in_title">
          <el-input v-model="userForm.in_title"></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <!-- <div> -->
          <Tinymce v-model="userForm.content" :height="300" />
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
import Pagination from "@/components/Pagination";
import Tinymce from "@/components/Tinymce";
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
        type: 2,
        intype: ""
      },
      count: 0,
      adminData: null, //不赋值空数组：防止直接赋值空数组在次赋值时报错
      listLoading: true,
      inTypeData: [{ id: "政策" }, { id: "行业" }, { id: "模板" }],
      UserDialogVisible: false, //编辑弹框
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      userForm: {
        id: "",
        type: 2,
        image: "",
        intype: "", //资讯类型
        in_title: "",
        content: ""
      },
      // 编辑+添加弹窗的条件限制
      rules: {
        // intype: [{ required: true, message: "请选择类型", trigger: "change" }],
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
        type: 2,
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
      //   console.log(row);
      this.userForm = {
        id: row.id,
        type: 2,
        image: "",
        intype: "", //资讯类型
        in_title: row.in_title,
        content: row.content
      };
      console.log(this.userForm);
      this.dialogStatus = "update";
      this.UserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].clearValidate();
      });
      //   this.$refs.tinymceChild.initTinymce();
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
    //重置密码弹窗取消操作
    resetpsw() {
      this.resetPsdDialogVisible = false;
    }
    // 通用：所有编辑框X：关闭功能
    // handleClose(done) {
    //   done();
    // },
  }
};
</script>
<style lang="scss" scoped>
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
