<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div>
        <el-button type="primary" @click="addHandle">添加</el-button>
      </div>
    </div>
    <el-table
      :data="rolesData"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="320px">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-news"
            size="small"
            round
            plain
            @click="authList(scope.row)"
            >权限</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            round
            plain
            @click="editColRoles(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            round
            plain
            @click="rolesDeleteHandle(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="userForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="
              dialogStatus === 'create'
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
    <!-- 权限 -->
    <el-dialog
      :modal="false"
      center
      title="授权"
      :visible.sync="authDialog"
      width="50%"
    >
      <el-form
        :model="authForm"
        :rules="rules"
        ref="authForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input v-model="authForm.id"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="rules">
          <el-tree
            class="auth-tree"
            :props="treeProps"
            :data="treeData"
            show-checkbox
            node-key="id"
            highlight-current
            ref="authtree"
            :default-expanded-keys="defaultExpandedIds"
            :default-checked-keys="defaultCheckedAuthIds"
          ></el-tree>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="authEditHandle('authForm')"
            >提 交</el-button
          >
          <el-button plain round @click="closeAuth()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  rolesList,
  addNewRoles, //添加新角色
  deleteOneRoles, //删除角色
  editRolesCommit, //编辑角色提交
  authRuleList, //权限列表
  //   defaultAuthList, //已有权限
  authEditSubmit //编辑权限提交
} from "@/api/admin-manage";
export default {
  name: "roles",
  data() {
    return {
      rolesData: null, //不赋值空数组：防止直接赋值空数组在次赋值时报错
      listLoading: true,
      UserDialogVisible: false, //编辑弹框
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      userForm: {
        id: "",
        name: "",
        remark: ""
      },
      defaultExpandedIds: [],
      // 编辑+添加弹窗的条件限制
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      authDialog: false,
      authForm: {
        id: "",
        rules: ""
      },
      defaultCheckedAuthIds: [],
      treeData: undefined,
      treeProps: {
        label: "name",
        children: "lower"
      },
      halfAuthIds: ""
    };
  },
  created() {
    this.getList();
    this.getAuthMuneList();
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      rolesList().then(resp => {
        this.rolesData = resp;
        this.listLoading = false;
      });
    },
    authList(formItem) {
      //点击授权
      this.resetAuth();
      this.resetTemp();
      this.authDialog = true;
      this.authForm.rules = formItem.rules;
      this.authForm.id = formItem.id;
      let defaultChecked = formItem.rules.split(","); //存当前角色权限id的数组
      // 获取列表所有父元素的id
      const parentIdsList = this.treeData.map(item => {
        if (item.pid == 0) {
          return item.id;
        }
      });
      // 默认选中打开的父级id
      this.defaultExpandedIds = defaultChecked.filter(id => {
        if (parentIdsList.indexOf(id) >= 0) {
          return id;
        }
      });
      //
      this.defaultCheckedAuthIds = defaultChecked.filter(id => {
        if (parentIdsList.indexOf(id) < 0) {
          return id;
        }
      });
    },
    // 菜单列表数据
    getAuthMuneList() {
      authRuleList().then(resp => {
        this.treeData = resp;
      });
    },
    resetAuth() {
      this.authForm = {
        id: "",
        rules: ""
      };
    },
    // 清除默认
    authEditHandle() {
      let halfAuthIds = this.$refs.authtree.getHalfCheckedKeys();
      let AuthIds = this.$refs.authtree.getCheckedKeys();
      AuthIds.splice(0, 0, 1); //想数组指定位置添加首页id:1
      AuthIds = [...new Set(AuthIds)]; //去重：id为1重复
      this.authForm.rules = new String(halfAuthIds.concat(AuthIds));
      authEditSubmit(this.authForm).then(resp => {
        this.authDialog = false;
        this.getList();
      });
    },
    // 删除
    rolesDeleteHandle(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteOneRoles(id).then(resp => {
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
        name: "",
        remark: ""
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
      delete this.userForm.id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addNewRoles(this.userForm).then(resp => {
            this.getList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    // 编辑
    editColRoles(row) {
      this.dialogStatus = "update";
      this.UserDialogVisible = true;
      this.userForm = { ...row };
      this.$nextTick(() => {
        this.$refs["userForm"].clearValidate();
      });
    },
    // 编辑提交修改内内容
    submitEditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editRolesCommit(this.userForm).then(resp => {
            this.getList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    //添加编辑弹窗取消操作
    resetForm(formName) {
      this.UserDialogVisible = false;
      this.getList();
    },
    closeAuth() {
      this.authDialog = false;
      this.getAuthMuneList();
    }
  }
};
</script>
