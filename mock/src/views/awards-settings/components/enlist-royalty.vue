<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button size="small" plain round @click="goBack()">返回上一级</el-button>
    </div>
    <el-table
      :data="royaltyData"
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
    <el-dialog :modal="false" center title="编辑" :visible.sync="royaltyDialog" width="30%">
      <el-form
        ref="royalty"
        :model="royalty"
        label-position="left"
        label-width="100px"
        width="30%"
      >
        <el-form-item label="比例（%）" prop="rate">
          <el-input v-model="royalty.rate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="royaltySettings('royalty')">提 交</el-button>
        <el-button plain round @click="royaltyDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  royaltyList,
  royaltyEdit,
  royaltyEditSubmit
} from "@/api/awards-settings";
export default {
  data() {
    return {
      royaltyData: null,
      listLoading: false,
      royaltyDialog: false,
      royalty: {
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
      royaltyList().then(resp => {
        this.royaltyData = resp;
        this.listLoading = false;
      });
    },
    editOneCol(id) {
      this.royaltyDialog = true;
      royaltyEdit(id).then(resp => {
        this.royalty = resp;
      });
    },
    royaltySettings() {
      royaltyEditSubmit(this.royalty).then(resp => {
        this.royaltyDialog = false;
        this.getList();
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
