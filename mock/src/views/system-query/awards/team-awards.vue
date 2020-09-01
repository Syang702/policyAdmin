<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-button
        size="small"
        plain
        round
        @click="addHandle()"
        icon="el-icon-circle-plus-outline"
      >添 加</el-button>
    </div>
    <el-table
      :data="awardsData"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="rank_name" label="会员级别" align="center"></el-table-column>
      <el-table-column prop="floor" label="发奖代数(0为无限代)" align="center"></el-table-column>
      <el-table-column prop="rate" label="发奖比例%" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            plain
            icon="el-icon-edit"
            size="small"
            @click="editHandle(scope.row)"
          >编 辑</el-button>
          <el-button
            type="danger"
            round
            plain
            icon="el-icon-delete"
            size="small"
            @click="deleteHandle(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="awardsDialog"
      width="500px"
    >
      <el-form
        :model="awardsForm"
        :rules="rules"
        ref="awardsForm"
        label-width="100px"
        class="awards-form"
      >
        <el-form-item label="id" prop="id" v-if="this.dialogStatus=='update'">
          <div class="el-input__text">{{awardsForm.id}}</div>
        </el-form-item>
        <el-form-item label="会员级别" prop="rank_id">
          <el-select size="small" v-model="awardsForm.rank_id" clearable placeholder="请选择会员级别">
            <el-option v-for="item in rankData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发奖代数" prop="floor">
          <el-input v-model="awardsForm.floor"></el-input>
        </el-form-item>
        <el-form-item label="发奖比例%" prop="rate">
          <el-input v-model="awardsForm.rate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?addSubmit('awardsForm'):updateSubmit('awardsForm')"
          >提 交</el-button>
          <el-button plain round @click="closeHandle()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  teamList,
  rankList,
  addteamAwards,
  teamAwardsSubmit,
  deleteTeamAwardsSubmit
} from "@/api/awards-settings.js";
export default {
  data() {
    return {
      awardsData: [],
      listLoading: true,
      awardsForm: {
        id: "",
        rank_id: "",
        floor: "",
        rate: ""
      },
      awardsDialog: false,
      rules: {
        floor: [
          { required: true, message: "请输入发奖代数", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "请输入发奖比例(%)", trigger: "change" }
        ]
      },
      rankData: null,
      dialogStatus: "",
      textMap: {
        create: "添加",
        update: "编辑"
      }
    };
  },
  created() {
    this.getList();
    this.getRankList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      teamList().then(resp => {
        this.awardsData = resp;
        this.listLoading = false;
      });
    },
    getRankList() {
      rankList().then(resp => {
        this.rankData = resp;
      });
    },
    resetTemp() {
      this.awardsForm = {
        id: "",
        rank_id: "",
        floor: "",
        rate: ""
      };
    },
    addHandle() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.awardsDialog = true;
    },
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          addteamAwards(this.awardsForm).then(resp => {
            this.getList();
            this.listLoading = false;
            this.awardsDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    editHandle(row) {
      this.resetTemp();
      this.awardsDialog = true;
      this.dialogStatus = "update";
      this.awardsForm = row;
    },
    updateSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          teamAwardsSubmit(this.awardsForm).then(resp => {
            this.getList();
            this.listLoading = false;
            this.awardsDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteTeamAwardsSubmit(id).then(response => {
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
    // 弹窗取消按钮
    closeHandle() {
      this.awardsDialog = false;
      this.getList();
    }
  }
};
</script>


<style>
.awards-form {
  width: 300px;
  margin: 0 auto;
}
</style>


