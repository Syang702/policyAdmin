<template>
  <div class="recharge">
    <p class>
      可充值币种：
      <small style="color:#666666;">(*未选择的币种类型不可进行充值操作)</small>
    </p>

    <div class="checkbox-group">
      <el-checkbox-group style="display: inline-block" v-model="currencycheckbox" size="small">
        <el-checkbox
          v-for="currency in currencysData"
          :key="currency.id"
          :label="currency.id"
          border
        >{{currency.name}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="currency-submit">
      <el-button
        type="primary"
        icon="el-icon-upload2"
        plain
        round
        size="small"
        @click="choicedCurrencys()"
      >提 交</el-button>
    </div>
  </div>
</template>

<script>
import {
  currencysList,
  backstageFeeEdit,
  choicedSubmit
} from "@/api/financial-paramters.js";

export default {
  name: "Recharge",
  data() {
    return {
      currencysData: null, //币种列表
      currencycheckbox: []
    };
  },
  created() {
    this.getcurrencysList();
    this.getCheckedFeeEdit();
  },
  methods: {
    // 币种列表
    getcurrencysList() {
      currencysList().then(response => {
        this.currencysData = response;
      });
    },
    getCheckedFeeEdit() {
      let type = 1;
      backstageFeeEdit(type).then(response => {
        this.currencycheckbox = response.currency_ids.split(",").map(item => {
          return parseInt(item);
        });
      });
    },
    choicedCurrencys() {
      var data = {
        type: 1,
        currency_ids: this.currencycheckbox.join(",")
      };
      choicedSubmit(data).then(response => {});
    }
  }
};
</script>
<style scoped>
/* 复选框宽度 */
.el-checkbox.is-bordered.el-checkbox--small {
  width: 100px;
  margin-left: 15px;
  margin-top: 15px;
}
.checkbox-group {
  margin-left: 80px;
}
.currency-submit {
  margin: 30px 95px;
}
</style>

