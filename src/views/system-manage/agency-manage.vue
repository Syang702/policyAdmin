/* 代理机构 */
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
      <!-- <el-table-column label="资讯类型" align="center" prop="intype">
      </el-table-column> -->
      <el-table-column label="机构名称" align="center" prop="in_title">
      </el-table-column>
      <el-table-column label="机构logo" align="center" prop="content">
        <template slot-scope="scope">
          <img class="cover" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="create_time">
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
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
    <!-- 弹窗 -->
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
        <el-form-item label="机构名称" prop="in_title">
          <el-input v-model="userForm.in_title"></el-input>
        </el-form-item>
        <el-form-item label="机构logo" prop="image">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="uploadImg"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img
              v-if="userForm.image != ''"
              :src="userForm.image"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  </div>
</template>

<script>
import {
  getList,
  deleted,
  add,
  edit,
  editSubmit,
  uploadBase
} from "@/api/admin-manage";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        type: 3,
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
        type: 3,
        image: "",
        intype: "", //资讯类型
        in_title: "",
        content: ""
      },
      // 编辑+添加弹窗的条件限制
      rules: {
        // intype: [{ required: true, message: "请选择类型", trigger: "change" }],
        in_title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        image: [{ required: true, message: "请上传logo", trigger: "blur" }]
      }
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
        type: 3,
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
    // 编辑
    editBackstageUser(row) {
      this.userForm = {
        id: row.id,
        type: 3,
        image: row.image,
        intype: "", //资讯类型
        in_title: row.in_title,
        content: ""
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
    uploadImg(file) {
      this.getBase64(file.raw).then(res => {
        this.image = res.split(",")[1];
        uploadBase({ image: this.image }).then(resp => {
          // this.userForm.image = "http://192.168.1.8:8012/" + resp.path;
          this.userForm.image = resp.path;
        });
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.avatar {
  width: 180px;
  height: 180px;
  display: block;
  border-radius: 8px;
}
.cover {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}
</style>
