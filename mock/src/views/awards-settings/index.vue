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
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
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
    <el-dialog :modal="false" center title="车身广告收益设置" :visible.sync="oneDialog" width="30%">
      <el-form ref="one" :model="one" label-position="left" label-width="100px" width="30%">
        <el-form-item label="比例" prop="rate">
          <el-input v-model="one.rate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="oneSettings('one')">提 交</el-button>
        <el-button plain round @click="oneDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog :modal="false" center title="招商广告提成设置" :visible.sync="fourDialog" width="30%">
      <el-form ref="four" :model="four" label-position="left" label-width="100px" width="30%">
        <el-form-item label="直推" prop="rate">
          <el-input v-model="four.rate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="fourSettings('four')">提 交</el-button>
        <el-button plain round @click="fourDialog = false">取 消</el-button>
      </span>
    </el-dialog> -->
    <el-dialog :modal="false" center title="区县代理特权" :visible.sync="fiveDialog" width="30%">
      <el-form ref="five" :model="five" label-position="left" label-width="100px" width="30%">
        <el-form-item label="县代" prop="rate">
          <el-input v-model="five.floor"></el-input>
        </el-form-item>
        <el-form-item label="市代" prop="rate">
          <el-input v-model="five.floor"></el-input>
        </el-form-item>
        <el-form-item label="省代" prop="rate">
          <el-input v-model="five.floor"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="fiveSettings('five')">提 交</el-button>
        <el-button plain round @click="fiveDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  awardsList,
  carBodyEarning,
  carBodyEarningSubmit,
} from "@/api/awards-settings";
export default {
  data() {
    return {
      awardsData: null,
      listLoading: false,
      oneDialog: false,
      fiveDialog: false,
      one: {
        id: "",
        rate: ""
      },
      five: {}
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
    setOneCol(id) {
      if (id == 1) {
        this.oneDialog = true;
        carBodyEarning().then(resp => {
          this.one = resp;
        });
      } else if (id == 2) {
        this.$router.push({ path: "/intro-earnings" });
      } else if (id == 3) {
        this.$router.push({ path: "/advertise-earnings" });

      } else if (id == 4) {
         this.$router.push({ path: "/enlist-royalty" });
      
      } else if (id == 5) {
        this.$router.push({ path: "/area-agent" });
      }
    },
    oneSettings() {
      carBodyEarningSubmit(this.one).then(resp => {
        this.oneDialog = false;
      });
    },
  }
};
</script>
