/* 报表结果 */
<template>
  <div class="result" ref="result">
    <div class="result_main">
      <div class="content" ref="content">
        <div class="title">评估结果</div>
        <div class="prompt">
          （仅以填报人提供的数据为基础予以测评、结果仅供参考）
        </div>
        <div class="company">
          受评企业 :
          <p>{{ enterpriseName }}</p>
        </div>
        <div class="detail">具体情况如下：</div>
      </div>
      <el-button type="text" class="exportBtn" @click="exportBtn()"
        >导出</el-button
      >
      <div class="table">
        <el-tabs v-model="activeName">
          <el-tab-pane label="政策评估结果" name="first">
            <el-table
              :data="tablePolicy"
              style="width: 100%"
              :height="tableHeight"
            >
              <el-table-column prop="isOk" label="是否符合" align="center">
                <template slot-scope="scope">
                  <span>{{
                    (scope.row.isOk = scope.row.isOk == 1 ? "是" : "否")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="政策标准" align="center">
              </el-table-column>
              <el-table-column
                prop="actual"
                label="企业实际情况"
                align="center"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="企业评估结果" name="second">
            <el-table
              :data="tableScore"
              style="width: 100%"
              :height="tableHeight"
            >
              <el-table-column
                prop="conditions"
                label="评分条件"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="criterion" label="评分标准" align="center">
              </el-table-column>
              <el-table-column
                prop="actual"
                label="企业实际情况"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="score"
                label="得分"
                align="center"
                width="120"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { enterprise } from "@/api/inquiry-record";
export default {
  data() {
    return {
      activeName: "first",
      tablePolicy: [],
      tableScore: [],
      enterpriseName: "",
      tableHeight: 300
    };
  },
  components: {},
  watch: {},
  created() {
    this.enterprise();
  },
  mounted() {
    setTimeout(() => {
    //   let resultHeight = this.$refs.result.offsetHeight;
      let resultHeight =  window.innerHeight;
      let contentHeight = this.$refs.content.offsetHeight;
      this.tableHeight = resultHeight - contentHeight - 150;
    }, 100);
  },
  methods: {
    enterprise() {
      let enterprise_id = this.$route.query.id;
      enterprise(enterprise_id).then(res => {
        (this.tablePolicy = res.policy_data),
          (this.tableScore = res.score_data);
        this.enterpriseName = res.name;
      });
    },
    exportBtn() {
      let id = this.$route.query.id;
      if (this.activeName == "first") {
        window.location.href = "admin/Enterprise/policy_data?id=" + id;
      } else if (this.activeName == "second") {
        window.location.href = "admin/Enterprise/score_data?id=" + id;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.result {
  width: 100%;
  height: 100%;
  .result_main {
    position: relative;
    .content {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 30px 10px 30px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      .title {
        text-align: left;
        height: 30px;
      }
      .prompt {
        height: 40px;
        font-size: 16px;
        font-weight: 400;
      }
      .company,
      .detail {
        height: 40px;
        padding-left: 50px;
        display: flex;
        align-items: center;
        p {
          font-weight: 400;
          padding-left: 10px;
        }
      }
    }
    ::v-deep .el-button--text {
      position: absolute;
      right: 50px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      z-index: 666;
    }
    .table {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      //   ::v-deep .el-tabs__content {
      // height: 500px;
      // overflow:auto;
      //   }
      ::v-deep .el-tabs__item {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: bold;
      }
      ::v-deep .el-tabs__nav-wrap::after {
        height: 0;
      }
    }
  }
}
</style>
