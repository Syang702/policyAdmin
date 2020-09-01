<template>
  <div class="audit app-container">
    <el-tabs v-model="activeName" type="border-card">
       <el-tab-pane label="会员充值设置" name="first" lazy>
        <remitSettings :is-edit="true" />
      </el-tab-pane>
      <el-tab-pane label="会员转账设置" name="second" lazy>
        <tranferSettings :is-edit="true" />
      </el-tab-pane>
      <el-tab-pane label="后台充值设置" name="five" lazy>
        <rechargeSettings :is-edit="true" />
      </el-tab-pane>
      <el-tab-pane label="后台扣费设置" name="seven" lazy>
        <feededuction :is-edit="true" />
      </el-tab-pane>
      <el-tab-pane label="前台兑换设置" name="third" lazy>
        <exchangeSettings :is-edit="true" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import rechargeSettings from "./components/backstage-recharge-settings";
import tranferSettings from "./components/tranfer-settings";
import exchangeSettings from "./components/exchange-settings";
import feededuction from "./components/fee-deduction-settings";
import remitSettings from "./components/remit-settings";
export default {
  name: "Financial",
  components: {
    remitSettings,
    rechargeSettings,
    tranferSettings,
    exchangeSettings,
    feededuction
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
