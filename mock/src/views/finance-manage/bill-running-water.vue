<template>
  <div class="tab-container">
    <el-tabs type="border-card" v-model="activeName" style="margin-top:15px;"  >
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <!-- <keep-alive> -->
        <tab-pane v-if="activeName==item.key" :type="item.key"/>
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from "./components/bill-pane";

export default {
  name: "Tab",
  components: { tabPane },
  data() {
    return {
      // 类型 1:收入 2：支出  默认 1
      tabMapOptions: [{ label: "收入", key: "1" }, { label: "支出", key: "2" }],
      activeName: "1"
    };
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
