<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button size="small" plain round @click="goBack()">返回上一级</el-button>
    </div>
    <el-table
      :data="introData"
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
      <el-table-column label="奖项" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="发奖层数" align="center">
        <template slot-scope="scope">{{ scope.row.floor }}</template>
      </el-table-column>
      <el-table-column label="比例" align="center">
        <template slot-scope="scope">{{ scope.row.rate }}%</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="editOneCol(scope.row.id)"
            icon="el-icon-setting"
            round
            plain
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :modal="false" center title="编辑" :visible.sync="introDialog" width="30%">
      <el-form ref="intro" :model="intro" label-position="left" label-width="100px" width="30%">
        <el-form-item label="比例（%）" prop="rate">
          <el-input v-model="intro.rate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="introSettings('intro')">提 交</el-button>
        <el-button plain round @click="introDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { introList, introEdit, introEditSubmit } from "@/api/awards-settings";
export default {
  data() {
    return {
      introData: null,
      listLoading: false,
      introDialog: false,
      intro: {
        rate: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      introList().then(resp => {
        this.introData = resp;
        this.listLoading = false;
      });
    },
    editOneCol(id) {
      this.introDialog = true;
      introEdit(id).then(resp => {
        this.intro = resp;
      });
    },
    introSettings() {
      introEditSubmit(this.intro).then(resp => {
        this.introDialog = false;
        this.getList();
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
