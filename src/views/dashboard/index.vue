/* 首页 */
<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <!-- @handleSetLineChartData="handleSetLineChartData" -->
    <!-- <panel-group /> -->
    <h2>欢迎使用龙头企业政策管理系统</h2>
    <el-table :data="tableData" style="width: 100%" border="">
      <el-table-column prop="total" label="统计" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="policy_count"
        label="政策数量"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="enterprise_count" label="新增企业" align="center">
      </el-table-column>
      <el-table-column prop="record_count" label="新增查询记录" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { homeList } from "@/api/home";
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {},
  name: "Dashboard",
  created() {
    this.homeList();
  },
  methods: {
    homeList() {
      homeList().then(res => {
        console.log(res);
        this.tableData = [
          {
            total: res.enterprise_count + res.policy_count + res.record_count,
            enterprise_count: res.enterprise_count,
            policy_count: res.policy_count,
            record_count: res.record_count
          }
        ];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}
</style>
