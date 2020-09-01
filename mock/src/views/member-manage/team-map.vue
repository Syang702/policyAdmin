<template>
  <div>
    <el-row type="flex" justify="end" align="middle" style="margin-top:20px">
      <el-form :inline="true" :model="filterForm">
        <el-form-item>
          <el-input size="small" v-model="filterForm.member" placeholder="请输入会员账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="filterForm.start_level" placeholder="请输入开始层数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="filterForm.end_level" placeholder="请输入结束层数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" round plain @click="initMap" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col id="chart-container"></el-col>
    </el-row>

    <el-dialog title="信息" :visible.sync="showInfoDialog" width="30%" center>
      <el-form ref="showData" :model="showData" label-width="120px" style="margin-left:50px;">
        <el-form-item label="账号" center>
          <div class="el-input__text">{{showData.member}}</div>
        </el-form-item>
        <el-form-item label="昵称" center>
          <div class="el-input__text">{{showData.nick_name}}</div>
        </el-form-item>
        <el-form-item label="级别" center>
          <div class="el-input__text">{{showData.rank_name}}</div>
        </el-form-item>
        <el-form-item label="直推人数" center>
          <div class="el-input__text">{{showData.total_direct}}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTeamMap } from "@/api/admin-manage";
import OrgChart from "@/utils/orgchart";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      filterForm: { member: "", start_level: "", end_level: "" },
      ds: undefined,
      orgChart: undefined,
      showInfoDialog: false,
      showData: {
        member: "root",
        nick_name: "root",
        group_person_count: 16,
        group_achievement_money: "113.0000",
        rank_name: "一星会员"
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let member = this.filterForm.member || "root";

      let start_level = this.filterForm.start_level || "1";
      let end_level = this.filterForm.end_level || "20";
      this.getMapData(member, start_level, end_level);
    },
    getMapData(member, start_level, end_level) {
      getTeamMap(member, start_level, end_level).then(resp => {
        let first = resp[0];
        first.className = "top-level";

        let colorPool = ["middle-level", "top-level", "bottom-level"];

        resp.forEach(outerItem => {
          outerItem.showRegister = false;
          let colorClassName = colorPool[Math.ceil(Math.random() * 10) % 3];
          resp.forEach((item, index, resp) => {
            if (item.upid == outerItem.id) {
              if (!outerItem.children) {
                outerItem.children = [];
              }
              item.className = colorClassName;
              outerItem.children.push(item);
            }
          });
        });
        this.initOrgChart(first);
      });
    },
    initOrgChart(ds) {
      let that = this;
      document.getElementById("chart-container").innerHTML = "";

      this.orgChart = new OrgChart({
        chartContainer: "#chart-container",
        data: ds,
        zoom: true,
        pan: true,
        nodeTitle: "member",
        createNode: function(node, data) {
          let appendDiv = document.createElement("div");
          appendDiv.setAttribute("class", "orgchart-content");

          if (data.showRegister) {
            appendDiv.innerHTML = `
              <a style="padding:5px 10px;margin-top:-20px;" href="#/user-center/register?parent_account=${data.parent_account}&node_account=${data.node_account}&position=${data.position}">点 击 注 册</a>`;
          } else {
            appendDiv.innerHTML = `
            <span>昵称：${data.nick_name}</span>
            <span>级别：${data.rank_name}</span>
            <span> 直推：(${data.total_direct})人</span>
            `;
          }
          appendDiv.addEventListener("click", event => {
            that.showData = data;
            that.showInfoDialog = true;
            setTimeout(function() {
              that.showInfoDialog = false;
            }, 5000);
          });
          node.appendChild(appendDiv);
        }
      });
    }
  }
};
</script>

<style>
#chart-container {
  display: flex;
  justify-content: center;
  color: #663333;
}

#chart-container > div {
  border: 0;
  background-image: none;
}

.orgchart-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: white;
  font-size: 14px;
}

.orgchart-content > span {
  height: 22px;
  line-height: 22px;
}

.orgchart .top-level .title {
  /* background-color: #006699; */
  border: 1px dotted #333333;
  border-bottom: 0px dotted #333333;
  background-color: #29ced0;
  color: #663333;
}
.orgchart .top-level .orgchart-content {
  /* border: 2px solid #006699; */
  border: 1px dotted #333333;
  border-top: 0px dotted #333333;
  background-color: #29ced0;
}
.orgchart .middle-level .title {
  /* background-color: #009933; */
  background-color: #29ced0;
  border: 1px dotted #333333;
  color: #663333;
  border-bottom: 0px dotted #333333;
}
.orgchart .middle-level .orgchart-content {
  /* border: 2px solid #009933; */
  border: 1px dotted #333333;
  border-top: 0px dotted #333333;
  background-color: #29ced0;
}
.orgchart .bottom-level .title {
  /* background-color: #993366; */
  background-color: #29ced0;
  border: 1px dotted #333333;
  color: #663333;
  border-bottom: 0px dotted #333333;
}
.orgchart .bottom-level .orgchart-content {
  /* border: 2px solid #993366; */
  border: 1px dotted #333333;
  border-top: 0px dotted #333333;
  background-color: #29ced0;
}
</style>

