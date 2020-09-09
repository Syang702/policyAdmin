/* 主管部门管理 */
<template>
  <div class="industry-manage">
    <div class="header-search">
      <div class="header-search-left">
        <el-button
          type="primary"
          @click="addIndustry()"
          style="margin-right:20px"
          >添加</el-button
        >
        <!-- <el-button type="primary">导出</el-button> -->
        <el-upload
          class="upload-demo"
          action="/public/index.php/admin/Policy/excelDepartment"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <el-button type="primary">导入Excell</el-button>
        </el-upload>
      </div>
      <div class="header-search-right">
        <el-input
          v-model="listQuery.department_name"
          placeholder="部门名称"
        ></el-input>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="listQuery.start_time"
          type="date"
          placeholder="添加时间"
        >
        </el-date-picker>
        <el-select
          v-model="listQuery.industry_id"
          placeholder="选择行业"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="search()">搜索</el-button>
      </div>
    </div>
    <div
      class="table"
      stripe
      fit
      highlight-current-row
      border
      v-loading="listLoading"
    >
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="date"
          label="序号"
          width="80"
          type="index"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="de_name" label="部门名称" align="center">
        </el-table-column>
        <el-table-column prop="name" label="行业名称" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="320">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              round
              plain
              @click="editIndustry(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              round
              plain
              @click="deleteIndustry(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="industryList"
    />
    <!-- 新增弹窗 -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="UserDialogVisible"
      width="50%"
    >
      <el-form
        :model="dialogForm"
        :rules="rules"
        ref="dialogForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div v-if="this.dialogStatus == 'update'">
          <el-form-item label="ID" prop="id" style="display:none;">
            <el-input v-model="dialogForm.id"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选择行业" prop="industry_id">
          <el-select v-model="dialogForm.industry_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="
              dialogStatus == 'create'
                ? submitAddForm('dialogForm')
                : submitEditForm('dialogForm')
            "
            >提 交</el-button
          >
          <el-button plain round @click="resetForm('dialogForm')"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  departList,
  addDepart,
  deleteDepart,
  editDepart,
  editSubmit
} from "@/api/depart-manage";
import { industryList } from "@/api/area";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        department_name: "",
        start_time: "",
        end_time: "",
        industry_id: ""
      },
      listLoading: false,
      tableData: [],
      count: 0,
      textMap: {
        update: "编辑",
        create: "添加"
      },
      dialogStatus: "",
      UserDialogVisible: false,
      dialogForm: {},
      rules: {
        //表单验证
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        industry_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ]
      },
      araeCode: [],
      areaID: [],
      options: []
    };
  },
  components: { Pagination },
  watch: {},
  created() {
    this.industryList();
    this.departList();
  },
  mounted() {},
  methods: {
    industryList() {
      //行业列表
      industryList().then(res => {
        this.options = res;
      });
    },
    departList() {
      //部门列表
      this.listLoading = true;
      departList(this.listQuery).then(res => {
        this.tableData = res.data;
        this.count = res.count;
        this.listLoading = false;
      });
    },
    search() {
      //搜索
      if (this.listQuery.start_time == null) {
        this.$set(this.listQuery, "start_time", "");
      }
      this.departList();
    },
    // 清除弹窗缓存数据
    resetTemp() {
      this.dialogForm = {
        id: "",
        name: "",
        industry_id: ""
      };
    },
    addIndustry() {
      //添加
      this.resetTemp();
      this.dialogStatus = "create";
      this.UserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dialogForm"].clearValidate();
      });
    },
    submitAddForm(formName) {
      //新增提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          addDepart(this.dialogForm).then(res => {
            this.departList();
            this.UserDialogVisible = false;
            this.areaID = [];
          });
        }
      });
    },
    editIndustry(formItem) {
      //编辑
      this.dialogForm = {
        id: formItem.id,
        name: formItem.de_name,
        industry_id: formItem.name
      };
      this.options.forEach(item => {
        if (this.dialogForm.industry_id == item.name) {
          this.dialogForm.industry_id = item.id;
        }
      });
      this.dialogStatus = "update";
      this.UserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dialogForm"].clearValidate();
      });
    },
    submitEditForm(formName) {
      //编辑提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.dialogForm);
          editSubmit(this.dialogForm).then(res => {
            this.departList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    deleteIndustry(id) {
      //删除
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteDepart(id).then(res => {
            this.departList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetForm() {
      this.UserDialogVisible = false;
      this.areaID = [];
    },
    handleAvatarSuccess() {
      //导入模板
      this.departList();
    }
  }
};
</script>

<style scoped lang="scss">
.industry-manage {
  padding: 30px;
  .header-search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .header-search-left {
      display: flex;
    }
    .header-search-right {
      display: flex;
      //   justify-content: space-around;
      ::v-deep .el-input {
        width: 180px;
        margin-right: 15px;
      }
    }
  }
  .table {
    padding-top: 30px;
  }
  ::v-deep .selectArea.el-cascader .el-input {
    width: 250px;
  }
}
</style>
