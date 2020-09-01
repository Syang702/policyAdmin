<template>
  <div class="tab-container">
        <el-table
          :data="bankData"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="Loading"
          fit
          border
          stripe
          highlight-current-row
        >
          <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
          <el-table-column prop="address" label="USDT管理" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                type="danger"
                round
                plain
                icon="el-icon-delete"
                size="small"
                @click="deleteHandle(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import {
  deleteReceiptSubmit
} from "@/api/system-query";
export default {
  name: "Tab",
  data() {
    return {
      listLoading: false,
    };
  },
  
  methods: {
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteReceiptSubmit(id).then(response => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
