<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" plain round icon="el-icon-s-release" @click="reset">初始化</el-button>
    </div>
  </div>
</template>

<script>
import { resetData } from "@/api/admin-manage";
export default {
  data() {
    return {};
  },
  methods: {
    reset() {
      this.$confirm("此操作将初始化数据,请谨慎操作， 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          resetData().then(response => {
            // this.$message({
            //   type: "success",
            //   message: "初始化成功"
            // });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>