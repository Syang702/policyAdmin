/* 行业管理 */
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
        <el-upload
          class="upload-demo"
          action="/public/index.php/admin/Policy/excelIndustry"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <el-button type="primary">导入Excell</el-button>
        </el-upload>
      </div>
      <div class="header-search-right">
        <el-input
          v-model="listQuery.industry_name"
          placeholder="行业名称"
        ></el-input>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="listQuery.start_time"
          type="date"
          placeholder="添加时间"
        >
        </el-date-picker>
        <el-cascader
          class="selectArea"
          placeholder="所在地区"
          clearable
          v-model="listQuery.region_id"
          :options="options"
          :props="{
            checkStrictly: true,
            value: 'id',
            label: 'title',
            children: 'son'
          }"
          @blur="handleBlur_search"
        ></el-cascader>
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
        <el-table-column prop="name" label="行业名称" align="center">
        </el-table-column>
        <el-table-column prop="merger_name" label="所在地区" align="center">
        </el-table-column>
        <el-table-column prop="policy_count" label="政策数量" align="center">
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
        <el-form-item label="行业名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="region_id">
          <el-cascader
            class="selectArea"
            v-model="dialogForm.region_id"
            :options="options"
            clearable
            :props="{
              checkStrictly: true,
              value: 'id',
              label: 'short_name',
              children: 'son'
            }"
          ></el-cascader>
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
  industryList,
  addIndustry,
  deleteIndustry,
  editIndustry,
  editSubmit
} from "@/api/industry";
import areaList from "../../assets/areaList.js";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        industry_name: "",
        start_time: "",
        end_time: "",
        region_id: ""
      },
      listLoading: false,
      tableData: [],
      textMap: {
        update: "编辑",
        create: "添加"
      },
      count: 0,
      dialogStatus: "",
      UserDialogVisible: false,
      dialogForm: {},
      rules: {
        //表单验证
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        region_id: [
          { required: true, message: "请选择地区", trigger: "change" }
        ]
      },
      options: areaList
    };
  },
  components: { Pagination },
  watch: {},
  created() {
    this.industryList();
  },
  mounted() {},
  methods: {
    industryList() {
      //行业列表
      this.listLoading = true;
      industryList(this.listQuery).then(res => {
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
      //   if (this.listQuery.region_id == undefined) {
      //     this.$set(this.listQuery, "region_id", "");
      //   }
      if (Array.isArray(this.listQuery.region_id)) {
        this.$set(
          this.listQuery,
          "region_id",
          this.listQuery.region_id[this.listQuery.region_id.length - 1]
        );
      }
      this.industryList();
    },
    // 清除弹窗缓存数据
    resetTemp() {
      this.dialogForm = {
        id: "",
        name: "",
        region_id: ""
      };
    },
    addIndustry() {
      //添加
      this.resetTemp();
      this.dialogStatus = "create";
      this.UserDialogVisible = true;
      this.$delete(this.dialogForm, "id");
      this.$nextTick(() => {
        this.$refs["dialogForm"].clearValidate();
      });
    },
    submitAddForm(formName) {
      //新增提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          let areaID = this.dialogForm.region_id[
            this.dialogForm.region_id.length - 1
          ];
          this.$delete(this.dialogForm, "id");
          this.$set(this.dialogForm, "region_id", areaID);
          console.log(this.dialogForm);
          addIndustry(this.dialogForm).then(res => {
            this.industryList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    editIndustry(formItem) {
      //编辑
      this.dialogForm = {
        id: formItem.id,
        name: formItem.name,
        region_id: formItem.region_id
      };
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
          if (Array.isArray(this.dialogForm.region_id)) {
            let areaID = this.dialogForm.region_id[
              this.dialogForm.region_id.length - 1
            ];
            this.$set(this.dialogForm, "region_id", areaID);
          }
          editSubmit(this.dialogForm).then(res => {
            this.industryList();
            this.UserDialogVisible = false;
          });
        }
      });
    },
    handleBlur_search() {},
    handleBlur_add() {
      let area_id = this.areaID.pop();
      this.$set(this.dialogForm, "region_id", area_id);
    },
    handleChange() {},
    deleteIndustry(id) {
      //删除
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteIndustry(id).then(res => {
            this.industryList();
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
    },
    handleAvatarSuccess() {
      //导入模板
      this.industryList();
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
