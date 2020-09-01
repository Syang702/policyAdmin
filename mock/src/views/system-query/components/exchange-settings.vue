<template>
  <div class="recharge">
    <p class>
      可兑换宠物：
      <small style="color:#666666;">(*未选择的宠物不可进行兑换操作)</small>
    </p>

    <div class="checkbox-group">
      <el-checkbox-group style="display: inline-block" v-model="currencycheckbox" size="small">
        <el-checkbox
          v-for="currency in petsData"
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
  petsList,
  petsChoicedEdit,
  petschoicedSubmit
} from "@/api/financial-paramters.js";

export default {
  name: "Recharge",
  data() {
    return {
      petsData: null, //宠物列表
      currencycheckbox: []
    };
  },
  created() {
    this.getpetsList();
    this.getCheckedFeeEdit();
  },
  methods: {
    // 币种列表
    getpetsList() {
      petsList().then(response => {
        this.petsData = response;
      });
    },
    getCheckedFeeEdit() {
      petsChoicedEdit().then(response => {
        this.currencycheckbox = response.dog_ids.split(",").map(item => {
          return parseInt(item);
        });
      });
    },
    choicedCurrencys() {
      var data = {
        id: 1,
        dog_ids: this.currencycheckbox.join(",") //修改选中值传值类型
      };
      petschoicedSubmit(data).then(response => {});
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

