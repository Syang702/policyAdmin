<template>
  <div class="count app-container">
    <div class="addUp">
      <!-- <el-table :data="addUp" border stripe fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="名称" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="预约量" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.appoint }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="被抢量" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="成交量" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.confirm }}</span>
          </template>
        </el-table-column>
      </el-table>-->

      <div class="addTable">
        <div class="thead">
          <thead>
            <div>统计</div>
          </thead>
          <thead>
            <div>预约量</div>
          </thead>
          <thead>
            <div>被抢量</div>
          </thead>
          <thead>
            <div>成交量</div>
          </thead>
        </div>

        <ul>
          <li v-for="(total,index) in addUp" :key="index">
            <div class="colcount" style="color:#DE3A4F">{{total.name}}</div>
            <div class="colcount">{{total.appoint}}</div>
            <div class="colcount">{{total.order}}</div>
            <div class="colcount">{{total.confirm}}</div>
          </li>
        </ul>
      </div>
    </div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日排单量/预约人数</div>
            <count-to
              :start-val="0"
              :end-val="countNum.appoint"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日抢购量/点击抢购</div>
            <count-to
              :start-val="0"
              :end-val="countNum.order"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('email')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="email" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日卖出量</div>
            <count-to
              :start-val="0"
              :end-val="countNum.confirm"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日注册人数</div>
            <count-to
              :start-val="0"
              :end-val="statistics.today_register"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">总注册人数</div>
            <count-to
              :start-val="0"
              :end-val="statistics.register"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">激活人数</div>
            <count-to
              :start-val="0"
              :end-val="statistics.today_active"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('email')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">未激活人数</div>
            <count-to
              :start-val="0"
              :end-val="statistics.un_active"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">冻结人数</div>
            <count-to
              :start-val="0"
              :end-val="statistics.forbid"
              :duration="1600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('table')">
          <div class="card-panel-icon-wrapper icon-date">
            <svg-icon icon-class="table" class-name="card-panel-icon" />
          </div>
          <div class="date-size">
            <div class="card-panel-text">{{this.datas}}</div>
            <p class="ymd-week">{{this.week}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { DateTime } from "@/utils/ymd";
import { countData } from "@/api/user";
export default {
  components: {
    CountTo,
    DateTime
  },
  data() {
    return {
      week: "",
      datas: "",
      times: "",

      countNum: {
        appoint: 0,
        confirm: 0,
        order: 0
      },
      statistics: {
        forbid: 0, //冻结人数
        register: 0, //总 注册
        today_active: 0, //今日激活
        today_register: 0, //今日注册
        un_active: 0 //未激活人数
      },
      addUp: null
    };
  },
  created() {
    let date = new DateTime();
    this.week = date.getWeek();
    this.datas = date.getDate();
    this.times = date.getTime();
    this.getHomeList();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    getHomeList() {
      countData().then(resp => {
        this.countNum = resp.total;
        this.addUp = resp.data;
        this.statistics.forbid = resp.forbid;
        this.statistics.register = resp.register;
        this.statistics.today_active = resp.today_active;
        this.statistics.today_register = resp.today_register;
        this.statistics.un_active = resp.un_active;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .date-size {
      font-size: 18px;
      margin: 26px;
      font-weight: bold;
    }
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
      .icon-date {
        background-color: #8c89fe;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }
    .icon-date {
      color: #8c89fe;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.addTable {
  padding-bottom: 20px;
  width: 100%;
  height: 180px;
}
.thead {
  position: absolute;
  background-color: #1ebfae;
  text-align: center;
  color: #ffffff;
  div {
    padding: 8px 15px;
    border-bottom: 2px solid #f4f4f4;
  }
}
ul {
  text-align: center;
  position: relative;
  margin-left: 40px;
}
li {
  float: left;
  list-style: none;
  width: 100px;
}
.colcount {
  border: 1px solid #f4f4f4;
  padding: 8px 15px;
}
</style>
