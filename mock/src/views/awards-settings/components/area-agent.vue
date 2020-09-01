<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button size="small" plain round @click="goBack()">返回上一级</el-button>
    </div>
    <el-table
      :data="areaData"
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
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="投放广告收益比例" align="center">
        <template slot-scope="scope">{{ scope.row.rate }}%</template>
      </el-table-column>
      <el-table-column label="新增设备得奖金额" align="center">
        <template slot-scope="scope">{{ scope.row.money }}</template>
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
    <el-dialog :modal="false" center title="编辑" :visible.sync="areaDialog" width="30%">
      <el-form ref="area" :model="area" label-position="left" label-width="150px" width="30%">
        <el-form-item label="投放广告收益比例" prop="rate">
          <el-input v-model="area.rate"></el-input>
        </el-form-item>
        <el-form-item label="新增设备得奖金额" prop="money">
          <el-input v-model="area.money"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="areaSettings('area')">提 交</el-button>
        <el-button plain round @click="areaDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { areaList, areaEdit, areaEditSubmit } from "@/api/awards-settings";
export default {
  data() {
    return {
      areaData: null,
      listLoading: false,
      areaDialog: false,
      area: {
        id: "",
        rate: "",
        money: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      areaList().then(resp => {
        this.areaData = resp;
        this.listLoading = false;
      });
    },
    editOneCol(id) {
      this.areaDialog = true;
      areaEdit(id).then(resp => {
        this.area = resp;
      });
    },
    areaSettings() {
      areaEditSubmit(this.area).then(resp => {
        this.areaDialog = false;
        this.getList();
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
