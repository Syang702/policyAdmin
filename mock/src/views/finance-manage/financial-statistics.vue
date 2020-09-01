<template>
  <div class="recond app-container">
    <el-row :gutter="60" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">充值统计</div>
          <div class="card-panel-description-total">
            <count-to
              :start-val="0"
              :end-val="recondData.remittance_money"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">转账统计</div>
          <div class="card-panel-description-total">
            <count-to
              :start-val="0"
              :end-val="recondData.transfer_money"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">拨出统计</div>
          <div class="card-panel-description-total">
            <count-to
              :start-val="0"
              :end-val="recondData.award_money"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">利润统计</div>
          <div class="card-panel-description-total">
            <span class="card-panel-num">{{recondData.profit_money}}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">拨比率=拨出/报单</div>
          <div class="card-panel-description-total">
            <span class="card-panel-num">{{recondData.profit_rate}}</span>%
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { financialStatistics } from "@/api/fiance-manage.js";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      financialData: null,
      listLoading: false,
      recondData: {
        remittance_money: 102000,
        transfer_money: 100,
        award_money: 16600.54,
        profit_money: 85399.45999999999,
        profit_rate: "0.16"
      }
    };
  },
  created() {
    this.getStatisticsList();
  },
  methods: {
    getStatisticsList() {
      this.listLoading = true;
      financialStatistics(this.listQuery).then(resp => {
        this.recondData = resp;
        this.listLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-top: 20px;
  }
  .card-panel {
    height: 140px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    border-radius: 8px;

    .card-panel-icon-wrapper {
      color: #333;
      font-size: 22px;
      margin: 30px 0 0 14px;

      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-description-total {
      font-weight: bold;
      margin: 25px 0;
      .card-panel-num {
        font-size: 18px;
        color: #ff6666;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
}
</style>
