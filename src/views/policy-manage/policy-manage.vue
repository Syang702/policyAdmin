/* 政策管理 */
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
          action="/public/index.php/admin/Policy/excelPolicy"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <el-button type="primary">导入Excell</el-button>
        </el-upload>
        <!-- <el-button type="primary" @click="exportExcell()">导入</el-button> -->
      </div>
      <div class="header-search-right">
        <el-input v-model="listQuery.name" placeholder="政策名称"></el-input>
        <el-date-picker
          v-model="listQuery.start_time"
          type="date"
          placeholder="添加时间"
        >
        </el-date-picker>
        <el-select
          v-model="listQuery.industry_id"
          clearable
          placeholder="选择行业"
        >
          <el-option
            v-for="item in options_industry"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-cascader
          class="selectArea"
          placeholder="选择地区"
          v-model="listQuery.region_id"
          :options="options_area"
          clearable
          :props="{
            checkStrictly: true,
            value: 'id',
            label: 'short_name',
            children: 'son'
          }"
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
        <el-table-column prop="name" label="政策名称" align="center">
        </el-table-column>
        <el-table-column prop="project_time" label="立项年份" align="center">
        </el-table-column>
        <el-table-column prop="department_name" label="主管部门" align="center">
        </el-table-column>
        <el-table-column prop="industry_id" label="所属行业" align="center">
        </el-table-column>
        <el-table-column prop="region_id" label="所在地区" align="center">
        </el-table-column>
        <el-table-column prop="start_time" label="申报开始时间" align="center">
        </el-table-column>
        <el-table-column prop="end_time" label="申报结束时间" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="360">
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
            <el-button
              type="success"
              icon="el-icon-upload"
              size="small"
              round
              plain
              @click="addFile(scope.row.id)"
              >管理政策文件</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="count"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagesize"
        @pagination="policyList"
      />
    </div>
    <!-- 文件弹窗 -->
    <!-- :title="textMap[dialogStatus]" -->
    <el-dialog
      :modal="false"
      center
      title="政策文件"
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
            <el-input v-model="userForm.policy_id"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="政策文件">
          <el-upload
            class="avatar-uploader"
            action="/public/index.php/admin/File/uploadFile"
            :show-file-list="false"
            ref="upload"
            :data="policyID"
            :on-success="handleSuccess"
          >
            <el-button type="primary" icon="el-icon-upload" size="small" round
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item label="已经上传">
          <div v-for="(item, index) in fileData" :key="index" class="fileData">
            <div class="fileName">
              {{ item.file_name + "." + item.file_path.split(".")[1] }}
            </div>
            <div>
              <el-button
                type="primary"
                size="small"
                round
                @click="delFile(item.id)"
                >删除</el-button
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  policyList,
  addPolicy,
  delPolicy,
  editPolicy,
  editSubmit,
  excelPolicy,
  uploadFile,
  fileList,
  delFile
} from "@/api/policy-manage";
import { industryList, departList } from "@/api/area";
import areaList from "../../assets/areaList.js";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        pagesize: 10,
        department_name: "",
        name: "",
        start_time: "",
        end_time: ""
        // industry_id:"",
        // region_id: ""
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
      declare: [{ title: "", conditions: "" }],
      rules: {
        //表单验证
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        region_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        industry_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        policy_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        declares_id: [
          { required: true, message: "请选择行业", trigger: "change" }
        ],
        start_time: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        object: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      },
      options_industry: [],
      options_area: areaList,
      options_depart: [],
      userForm: {},
      //   fileList: [],
      policyID: {},
      fileName: "",
      fileData: []
    };
  },
  components: { Pagination },
  watch: {},
  created() {
    this.policyList();
    this.departList();
    this.industryList();
  },
  mounted() {},
  methods: {
    industryList() {
      //行业列表
      industryList().then(res => {
        this.options_industry = res;
      });
    },
    departList() {
      //部门列表
      departList(this.depart).then(res => {
        this.options_depart = res;
      });
    },
    policyList() {
      //政策列表
      this.listLoading = true;
      policyList(this.listQuery).then(res => {
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
      this.policyList();
    },
    // 清除弹窗缓存数据
    resetTemp() {
      this.dialogForm = {
        id: "",
        name: "",
        region_id: "",
        department_id: "",
        industry_id: "",
        project_time: "",
        start_time: "",
        end_time: "",
        object: ""
      };
    },
    addIndustry() {
      //添加
      this.$router.push("/policy-manage/add-policy");
    },
    editIndustry(formItem) {
      //编辑
      this.$router.push({
        path: "/policy-manage/add-policy",
        query: {
          id: formItem.id
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
          delPolicy(id).then(res => {
            this.policyList();
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
      this.policyList();
    },
    addFile(id) {
      this.policyID = { policy_id: id };
      this.fileList(id);
      setTimeout(() => {
        this.UserDialogVisible = true;
      }, 100);
    },
    handleSuccess(response, file, fileList) {
      //上传成功后的回调
      this.fileList(this.policyID.policy_id);
    },
    fileList(id) {
      let params = {
        page: "",
        pagesize: "",
        policy_id: id
      };
      fileList(params).then(res => {
        this.fileData = res.data;
      });
    },
    delFile(id) {
      //删除上传文件
      delFile(id).then(res => {
        this.fileList(this.policyID.policy_id);
      });
    },
    handleChange(file, fileList) {
      this.fileName = file.name;
    },
    submitEditForm() {
      this.$refs.upload.submit();
      this.UserDialogVisible = false;
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
      ::v-deep .el-input {
        width: 180px;
        margin-right: 15px;
      }
      ::v-deep .selectArea .el-input {
        width: 250px;
      }
    }
  }
  .table {
    padding-top: 30px;
  }
  ::v-deep .selectClass {
    width: 100%;
  }
  .form-flex {
    display: flex;
    justify-content: space-between;
  }
  .declare {
    display: flex;
  }
  .fileData {
    display: flex;
    .fileName {
      margin-right: 30px;
    }
  }
}
</style>
