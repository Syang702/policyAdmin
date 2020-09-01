<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div></div>
      <div>
        <el-button
          size="small"
          round
          plain
          @click="addHandle"
          icon="el-icon-circle-plus-outline"
        >添 加</el-button>
        <!-- <el-input
          placeholder="请输入搜索关键字"
          v-model="listQuery.search"
          clearable
          :style="{width:'180px'}"
          size="small"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" round plain @click="getList" icon="el-icon-search">搜索</el-button>-->
      </div>
    </div>

    <el-table
      :data="adminData"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column label="ID" align="center" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="账户" align="center">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="后台角色" align="center">
        <template slot-scope="scope">{{ scope.row.role_name }}</template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="320px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            round
            plain
            @click="editBackstageUser(scope.row.id)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            round
            plain
            @click="backstageUserDel(scope.row.id)"
          >删除</el-button>
          <el-button
            size="small"
            icon="el-icon-refresh"
            round
            plain
            @click="backstageUserResetPsd(scope.row.id)"
          >重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="count>0"
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />-->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="UserDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div v-if="this.dialogStatus=='update'">
          <el-form-item label="ID" prop="id" style="display:none;">
            <el-input v-model="userForm.id"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="名称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="后台角色" prop="role_id">
          <el-select v-model="userForm.role_id">
            <el-option
              v-for="rank in this.rankData"
              :key="rank.id"
              :label="rank.name"
              :value="rank.id"
            >{{rank.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?submitAddForm('userForm'):submitEditForm('userForm')"
          >提 交</el-button>
          <el-button plain round @click="resetForm('userForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :modal="false"
      center
      title="重置密码"
      :visible.sync="resetPsdDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="resetForm2"
        status-icon
        ref="resetForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input v-model="resetForm2.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="resetForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_re">
          <el-input type="password" v-model="resetForm2.password_re" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round @click="resetPsdSubmit('resetForm2')">提 交</el-button>
          <el-button plain round @click="resetpsw('resetForm2')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAdminList,
  rankList,
  delAdmin,
  currencyEditColData,
  editUserCommit,
  resetBackstageUserPsd,
  addNewUser
} from "@/api/admin-manage";
export default {
  name: "admin",
  data() {
    return {
      adminData: null, //不赋值空数组：防止直接赋值空数组在次赋值时报错
      listLoading: true,
      rankData: null,
      // listQuery: {
      //   page: 1,
      //   pagesize: 10,
      //   search: ""
      // },
      UserDialogVisible: false, //编辑弹框
      currencyUserCol: null, //获取当前编辑用户全部信息
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      userForm: {
        id: "",
        email: "",
        name: "",
        account: "",
        phone: "",
        role_id: ""
      },
      // 编辑+添加弹窗的条件限制
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur" }]
      },
      backstageRolelist: null, //后台角色list

      // 重置密码
      resetPsdDialogVisible: false, //重置密码弹框
      resetForm2: {
        id: "",
        password: "",
        password_re: ""
      }
    };
  },
  created() {
    this.getList();
    this.getRankList();
  },

  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      getAdminList().then(resp => {
        this.adminData = resp;
        this.listLoading = false;
      });
    },
    getRankList() {
      rankList().then(resp => {
        this.rankData = resp;
      });
    },
    // tree数据
    getAuthMuneList() {
      authMuneList().then(resp => {
        this.treeData = resp;
      });
    },
    // 搜索input绑定回车键事件
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
          delAdmin(id).then(resp => {
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
        email: "",
        name: "",
        account: "",
        phone: "",
        role_id: ""
      };
    },
    // 清空重置密码输入框
    resetPswTemp() {
      this.resetForm2 = {
        id: "",
        password: "",
        password_re: ""
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

    submitAddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addNewUser(this.userForm).then(resp => {
            this.getList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    // 编辑
    editBackstageUser(id) {
      currencyEditColData(id).then(resp => {
        this.userForm = resp;
      });
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
          editUserCommit(this.userForm).then(resp => {
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
    },
    // 通用：所有编辑框X：关闭功能
    handleClose(done) {
      done();
    },
    // 重置密码
    backstageUserResetPsd(id) {
      this.resetPswTemp();
      this.resetForm2.id = id;
      this.resetPsdDialogVisible = true;
    },
    resetPsdSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          resetBackstageUserPsd(this.resetForm2).then(resp => {
            this.getList();
            this.resetPsdDialogVisible = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>


