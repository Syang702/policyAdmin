<template>
  <div class="app-container">
    <el-table
      :data="levelData"
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
      <el-table-column label="级别名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="editOneCol(scope.row)"
            icon="el-icon-edit"
            round
            plain
          >编辑</el-button>
          <el-button
            v-if="scope.row.id==2||scope.row.id==4||scope.row.id==5||scope.row.id==6"
            type="success"
            size="small"
            @click="setUpCondition(scope.row)"
            icon="el-icon-edit"
            round
            plain
          >设置升级条件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :modal="false" center title="编辑" :visible.sync="levelDialog" width="30%">
      <el-form ref="rank" :model="rank" label-position="left" label-width="100px" width="30%">
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input v-model="rank.id"></el-input>
        </el-form-item>
        <el-form-item label="级别名称" prop="name">
          <el-input v-model="rank.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="rank.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="editRankSubmit('rank')">提 交</el-button>
        <el-button plain round @click="closeHandle()">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :modal="false" center title="设置升级条件" :visible.sync="upgradeDialog" width="30%">
      <el-form ref="upgrade" :model="upgrade" label-position="left" label-width="100px" width="30%">
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input v-model="upgrade.id"></el-input>
        </el-form-item>
        <el-form-item label="级别名称" prop="name">
          <div class="el-input__text">{{upgrade.name}}</div>
        </el-form-item>
        <el-form-item label="动态收益金额" prop="income_money" v-if="upgrade.id!=2">
          <el-input v-model="upgrade.income_money"></el-input>
        </el-form-item>
        <el-form-item label="直接充值饲料" prop="invest_money">
          <el-input v-model="upgrade.invest_money"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="upgradeSubmit('upgrade')">提 交</el-button>
        <el-button plain round @click="closeHandle()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  memberLevelList,
  editNewLevelSubmit,
  upgradeLevelSubmit
} from "@/api/user-center";
export default {
  data() {
    return {
      levelData: null,
      listLoading: false,
      rank: {
        id: "",
        name: "",
        remark: ""
      },
      levelDialog: false,
      upgradeDialog: false,
      upgrade: {
        name: "",
        income_money: "",
        invest_money: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      memberLevelList().then(res => {
        this.levelData = res;
        this.listLoading = false;
      });
    },
    levelReset() {
      this.rank = {
        id: "",
        name: "",
        remark: ""
      };
    },
    // 编辑
    editOneCol(row) {
      this.levelReset();
      this.levelDialog = true;
      this.rank = row;
    },
    closeHandle() {
      this.levelDialog = false;
      this.upgradeDialog = false;
      this.getList();
    },
    editRankSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editNewLevelSubmit(this.rank).then(response => {
            this.getList();
            this.levelDialog = false;
          });
        }
      });
    },
    setUpCondition(row) {
      this.upgradeDialog = true;
      this.upgrade = row;
    },
    upgradeSubmit() {
      upgradeLevelSubmit(this.upgrade).then(resp => {
        this.getList();
        this.upgradeDialog = false;
      });
    }
  }
};
</script>
