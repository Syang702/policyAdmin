/* 管理员管理 */
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
      <el-table-column label="管理员名字" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="后台角色" align="center">
        <template slot-scope="scope">{{ scope.row.role_name }}</template>
      </el-table-column>
      <el-table-column label="手机" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <!-- <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="管理员状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            inactive-color="#13ce66"
            active-color="#ff4949"
            @change="freezeUser(scope.row.id, scope.row.status)"
          ></el-switch>
          <span>{{ scope.row.status == 1 ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" align="center">
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
          <el-button
            size="small"
            icon="el-icon-refresh"
            round
            plain
            @click="backstageUserResetPsd(scope.row.id)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- v-show="count > 0" -->
    <!-- <pagination
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    /> -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="UserDialogVisible"
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item> -->
        <el-form-item
          label="登录密码"
          prop="password"
          v-if="this.dialogStatus == 'create'"
        >
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="确认登录密码"
          prop="password_re"
          v-if="this.dialogStatus == 'create'"
        >
          <el-input v-model="userForm.password_re" type="password"></el-input>
        </el-form-item> -->
        <el-form-item label="后台角色" prop="role_id">
          <el-select v-model="userForm.role_id">
            <el-option
              v-for="rank in rankData"
              :key="rank.id"
              :label="rank.name"
              :value="rank.id"
            ></el-option>
          </el-select>
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

    <el-dialog
      :modal="false"
      center
      title="重置密码"
      :visible.sync="resetPsdDialogVisible"
      width="50%"
    >
      <el-form
        :model="resetForm2"
        status-icon
        ref="resetForm2"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rulesReset"
      >
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input v-model="resetForm2.id"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input
            type="password"
            v-model="resetForm2.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="password_re">
          <el-input
            type="password"
            v-model="resetForm2.password_re"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="resetPsdSubmit('resetForm2')"
            >提 交</el-button
          >
          <el-button plain round @click="resetpsw('resetForm2')"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAdminList,
  delAdmin,
  editUserCommit,
  resetBackstageUserPsd,
  addNewUser,
  rolesList, //角色列表
  adminDetails
  //   isStatus
} from "@/api/admin-manage";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    let checkPhone = (rule, value, callback) => {
      //手机号验证规则
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      listQuery: {
        page: 1,
        pagesize: 10
      },
      count: 0,
      adminData: null, //不赋值空数组：防止直接赋值空数组在次赋值时报错
      listLoading: true,
      rankData: [],
      UserDialogVisible: false, //编辑弹框
      currencyUserCol: null, //获取当前编辑用户全部信息
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      userForm: {
        // id: "",
        name: "",
        account: "",
        password: "",
        role_id: "",
        phone: "",
        email: "" //无用
      },
      // 编辑+添加弹窗的条件限制
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      backstageRolelist: null, //后台角色list
      // 重置密码
      resetPsdDialogVisible: false, //重置密码弹框
      resetForm2: {
        id: "",
        password: "",
        password_re: ""
      },
      rulesReset: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password_re: [
          { required: true, message: "请确认密码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // setTimeout(() => {
    //   this.haveOrder();
    // }, 3000);
    this.getList();
    this.getrolesList();
  },

  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      getAdminList(this.listQuery).then(resp => {
        this.adminData = resp;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    // 后台角色
    getrolesList() {
      rolesList().then(resp => {
        this.rankData = resp;
      });
    },
    // tree数据
    // getAuthMuneList() {
    //   authMuneList().then(resp => {
    //     this.treeData = resp;
    //   });
    // },
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
    // 冻结用户
    // freezeUser(id, status) {
    //   let statusDescription = status ? "启用" : "禁用";
    //   this.$confirm(
    //     "此操作将 " + statusDescription + " 此配置, 是否继续?",
    //     "提示",
    //     {
    //       confirmButtonText: "确 定",
    //       cancelButtonText: "取 消",
    //       type: "warning"
    //     }
    //   )
    //     .then(() => {
    //       let data = {
    //         id: id,
    //         status: status
    //       };
    //       isStatus(data).then(resp => {
    //         this.getList();
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消该操作"
    //       });
    //       this.getList();
    //     });
    // },
    // 清除弹窗缓存数据
    resetTemp() {
      this.userForm = {
        id: "",
        name: "",
        account: "",
        password: "",
        role_id: "",
        phone: "",
        email: ""
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
    editBackstageUser(row) {
      this.userForm = { ...row };
      this.rankData.forEach(item => {
        if (this.userForm.role_name == item.name) {
          this.userForm.role_id = item.id;
        }
      });
      this.$delete(this.userForm, "role_name");
      this.$delete(this.userForm, "create_time");
      this.dialogStatus = "update";
      this.UserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].clearValidate();
      });
    },
    // 编辑提交修改内内容
    submitEditForm(formName) {
      delete this.userForm["status"];
      delete this.userForm["create_time"];
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
    // handleClose(done) {
    //   done();
    // },
    // 重置密码
    backstageUserResetPsd(id) {
      this.resetPswTemp();
      this.resetForm2.id = id;
      this.resetPsdDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["resetForm2"].clearValidate();
      });
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
