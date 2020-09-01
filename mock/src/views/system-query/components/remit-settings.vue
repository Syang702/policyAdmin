<template>
  <div class="transfer">
    <div class="filter-container" align="right">
      <el-button
        size="small"
        plain
        round
        @click="CreateTransfer()"
        icon="el-icon-circle-plus-outline"
      >添 加</el-button>
    </div>
    <el-table
      :data="fianceData"
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
      <el-table-column label="可充值币种" align="center">
        <template slot-scope="scope">{{ scope.row.currency_name }}</template>
      </el-table-column>
      <el-table-column label="充值基数" align="center">
        <template slot-scope="scope">{{ scope.row.cardinal_number }}</template>
      </el-table-column>
      <el-table-column label="最小充值值" align="center">
        <template slot-scope="scope">{{ scope.row.min }}</template>
      </el-table-column>
      <el-table-column label="最大充值值" align="center">
        <template slot-scope="scope">{{ scope.row.max }}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="230">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            round
            size="small"
            @click="getTransferColData(scope.row.id)"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            type="danger"
            plain
            round
            size="small"
            @click="delOneWithdrawCash(scope.row.id)"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 充值添加编辑弹窗 -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="moneydialogVisible"
    >
      <el-form
        ref="cash"
        :model="cash"
        :rules="rules"
        label-position="left"
        label-width="100px"
        width="30%"
      >
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input v-model="cash.id"></el-input>
        </el-form-item>
        <el-form-item label="充值币种" prop="currency_id" v-if="dialogStatus=='create'">
          <el-select v-model="cash.currency_id">
            <el-option
              v-for="currency in this.currencysData"
              :key="currency.id"
              :label="currency.name"
              :value="currency.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值币种" prop="currency_id" v-else>
          <el-select v-model="cash.currency_id">
            <el-option
              disabled
              v-for="currency in this.currencysData"
              :key="currency.id"
              :label="currency.name"
              :value="currency.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值基数" prop="cardinal_number">
          <el-input v-model="cash.cardinal_number" />
        </el-form-item>
        <el-form-item label="最小充值值" prop="min">
          <el-input v-model="cash.min" />
        </el-form-item>
        <el-form-item label="最大充值值" prop="max">
          <el-input v-model="cash.max" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          plain
          round
          type="primary"
          @click="dialogStatus==='create'?addCashSubmit('cash'):updateCashSubmit('cash')"
        >提 交</el-button>
        <el-button plain round @click="closeHandle()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fianceList,
  deleteOneFinancialSettings,
  addNewFinanceial,
  updateNewFinanceial,
  currencysList,
  editFinancialColData
} from "@/api/financial-paramters.js";
export default {
  name: "WithdrawCash",
  data() {
    return {
      listLoading: true,
      fianceData: null, //充值列表
      moneydialogVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      cash: {
        type: "",
        id: undefined,
        currency_id: "",
        cardinal_number: "",
        max: "",
        min: ""
      },
      rules: {
        currency_id: [
          { required: true, message: "请选择币种", trigger: "blur" }
        ],
        cardinal_number: [
          { required: true, message: "请输入提现基数", trigger: "blur" }
        ],
        min: [{ required: true, message: "请输入最小提现值", trigger: "blur" }],
        max: [{ required: true, message: "请输入最大提现值", trigger: "blur" }]
      },
      currencysData: null //币种列表
    };
  },
  created() {
    this.getTranferList();
    this.getcurrencysList();
  },
  methods: {
    getTranferList() {
      this.listLoading = true;
      let type = "4";
      fianceList(type).then(response => {
        this.fianceData = response;
        this.listLoading = false;
      });
    },
    // 删除
    delOneWithdrawCash(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: id,
            type: "4"
          };
          deleteOneFinancialSettings(data).then(response => {
            // this.$message({
            //   message: "删除成功",
            //   type: "success"
            // });
            this.getTranferList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 重置弹框内容
    resetTemp() {
      this.cash = {
        type: 4,
        id: undefined,
        currency_id: "",
        cardinal_number: "",
        max: "",
        min: ""
      };
    },
    closeHandle() {
      this.moneydialogVisible = false;
      // this.getTranferList();
    },
    // 添加充值
    CreateTransfer() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.moneydialogVisible = true;
      this.$nextTick(() => {
        this.$refs["cash"].clearValidate();
      });
    },
    addCashSubmit() {
      console.log(this.cash);
      addNewFinanceial(this.cash).then(response => {
        this.getTranferList();
        this.moneydialogVisible = false;
      });
    },
    //编辑-获取当前编辑行列表
    getTransferColData(id) {
      let data = {
        id: id,
        type: 4
      };
      editFinancialColData(data).then(response => {
        this.cash = response;
      });
      // this.cash = row;
      this.dialogStatus = "update";
      this.moneydialogVisible = true;
      this.$nextTick(() => {
        this.$refs["cash"].clearValidate();
      });
    },
    // 币种列表
    getcurrencysList() {
      currencysList().then(response => {
        this.currencysData = response;
      });
    },
    updateCashSubmit() {
      console.log(this.cash);
      this.cash.type = 4;
      updateNewFinanceial(this.cash).then(response => {
        this.getTranferList();
        this.moneydialogVisible = false;
      });
    }
  }
};
</script>
