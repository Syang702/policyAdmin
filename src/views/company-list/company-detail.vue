/* 公司列表详情 */
<template>
  <div class="company-detail">
    <div class="form">
      <el-form ref="form" :model="form" label-width="300px">
        <div class="form_content">
          <el-form-item label="账号">
            <el-input :value="form.account"></el-input>
            <!-- {{form.name}} -->
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input :value="form.name"></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码">
            <el-input :value="form.credit_code"></el-input>
          </el-form-item>
          <el-form-item label="所属地区">
            <el-input :value="form.merger_name"></el-input>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-input :value="form.industry_name"></el-input>
          </el-form-item>
          <el-form-item label="企业地址">
            <el-input :value="form.region_title"></el-input>
          </el-form-item>
          <el-form-item label="上年企业人数">
            <el-input :value="form.number"></el-input>
          </el-form-item>
          <el-form-item label="企业成立时间">
            <el-input :value="form.establish_time"></el-input>
          </el-form-item>
        </div>
        <div class="form_content">
          <el-form-item label="近两年销售额">
            <el-input :value="form.sales"></el-input>
          </el-form-item>
          <el-form-item label="上一年纳税额">
            <el-input :value="form.ratal"></el-input>
          </el-form-item>
          <el-form-item label="社保人数">
            <el-input :value="form.security"></el-input>
          </el-form-item>
          <el-form-item label="个税人数">
            <el-input :value="form.tax"></el-input>
          </el-form-item>
          <el-form-item label="专利数量">
            <el-input :value="form.patent"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-input :value="form.type"></el-input>
          </el-form-item>
          <el-form-item label="上一年度总资产">
            <el-input :value="form.assets"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 92%" border>
        <el-table-column type="index" label="序号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="condition" label="条件" align="center">
        </el-table-column>
        <el-table-column prop="is" label="是否符合" width="80" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { companyDetail } from "@/api/company";
export default {
  data() {
    return {
      form: {},
      tableData: []
    };
  },
  components: {},
  watch: {},
  created() {
    this.detail();
  },
  mounted() {},
  methods: {
    detail() {
      let enterprise_id = this.$route.query.id;
      companyDetail(enterprise_id).then(res => {
        this.form = res;
        this.tableData = [
          {
            condition: "是否做过科技型企业备案",
            is: res.record == 1 ? "是" : "否"
          },
          {
            condition: "企业进销项发票是否一致",
            is: res.invoice == 1 ? "是" : "否"
          },
          {
            condition: "是否有研发团队",
            is: res.team == 1 ? "是" : "否"
          },
          {
            condition: "是否制定过行业标准",
            is: res.standard == 1 ? "是" : "否"
          },
          {
            condition: "是否有研发费归集",
            is: res.development == 1 ? "是" : "否"
          },
          {
            condition: "收入是否超过2000万",
            is: res.income == 1 ? "是" : "否"
          }
        ];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.company-detail {
  width: 100%;
  padding-top: 30px;
  .form {
    width: 100%;
    .el-form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .form_content {
        width: 46%;
        // ::v-deep .el-form-item__label{
        // width: 200px!important;
        // }
      }
    }
  }
  .table {
    width: 100%;
    padding-left: 150px;
  }
}
</style>
