<template>
  <div class="app-container">
    <el-table
      :data="awardsData"
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
      <el-table-column label="奖项名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="奖项开关" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="awardsSwitch(scope.row.id,scope.row.status)"
          ></el-switch>
          <span>{{scope.row.status==0?"关闭":"开启" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="setOneCol(scope.row.id)"
            icon="el-icon-setting"
            round
            plain
          >设置</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { awardsList, awardsSwitchSubmit } from "@/api/awards-settings";
export default {
  data() {
    return {
      awardsData: null,
      listLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      awardsList().then(resp => {
        this.awardsData = resp;
        this.listLoading = false;
      });
    },
    awardsSwitch(id, status) {
      let statusDescription = status ? "开启" : "关闭";
      this.$confirm(
        "此操作将 " + statusDescription + " 此配置, 是否继续?",
        "提示",
        {
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            id: id,
            status
          };
          awardsSwitchSubmit(data).then(resp => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
          this.getList();
        });
    },
    setOneCol(id) {
      if (id == 1) {
        this.$router.push({
          path: "/intro-awards"
        });
      } else if (id == 2) {
        this.$router.push({ path: "/team-awards" });
      }
    }
  }
};
</script>
