<template>
  <div class="app-container">
    <el-table
      :data="coinList"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="币种名称" align="center"></el-table-column>
      <el-table-column prop="rate" label="充值到账比例%" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            plain
            icon="el-icon-edit"
            size="small"
            @click="editCoin(scope.row)"
          >编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :modal="false" center title="编辑" :visible.sync="coinDialog" width="500px">
      <el-form
        :model="coinForm"
        :rules="rules"
        ref="coinForm"
        label-width="100px"
        class="coin-form"
      >
        <el-form-item label="id" prop="id">
          <div class="el-input__text">{{coinForm.id}}</div>
        </el-form-item>
        <el-form-item label="币种名称" prop="name">
          <el-input v-model="coinForm.name"></el-input>
        </el-form-item>
        <el-form-item label="比例%" prop="rate">
          <el-input v-model="coinForm.rate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round @click="updateSubmit('coinForm')">提 交</el-button>
          <el-button plain round @click="closeHandle()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrencyList, updateCurrency } from "@/api/coin-manage.js";
export default {
  data() {
    return {
      coinList: [],
      listLoading: true,
      coinForm: {
        id: "",
        name: "",
        rate: ""
      },
      coinDialog: false,
      rules: {
        name: [
          { required: true, message: "请输入币种名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "请输入比例(%)", trigger: "change" },
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getCurrencyList().then(resp => {
        this.coinList = resp;
        this.listLoading = false;
      });
    },
    resetTemp() {
      this.coinForm = {
        id: "",
        name: "",
        rate: ""
      };
    },
    editCoin(row) {
      this.resetTemp();
      this.coinDialog = true;
      this.coinForm = row;
    },
    updateSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          updateCurrency(this.coinForm).then(resp => {
            this.getList();
            this.listLoading = false;
            this.coinDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    // 弹窗取消按钮
    closeHandle() {
      this.coinDialog = false;
      this.getList();
    }
  }
};
</script>


<style>
.coin-form {
  width: 300px;
  margin: 0 auto;
}
</style>


