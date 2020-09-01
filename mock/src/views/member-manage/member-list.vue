<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-input
        size="small"
        v-model="listQuery.member"
        placeholder="请输入关键字"
        style="width: 150px"
        class="margin"
      ></el-input>
      <el-select
        size="small"
        v-model="listQuery.rank_id"
        placeholder="会员级别"
        class="margin"
        clearable
        clear
      >
        <el-option v-for="item in levelData" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-date-picker
        v-model="listQuery.start_time"
        type="datetime"
        placeholder="开始时间"
        class="margin"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="small"
      ></el-date-picker>
      <el-date-picker
        v-model="listQuery.end_time"
        type="datetime"
        placeholder="结束时间"
        class="margin"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="small"
      ></el-date-picker>
      <el-button size="small" round plain class="button" @click="getList()" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员账号">
        <template slot-scope="scope">
          <span>{{scope.row.member }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员手机号">
        <template slot-scope="scope">
          <span>{{scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员级别">
        <template slot-scope="scope">
          <span>{{scope.row.rank_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邀请码">
        <template slot-scope="scope">
          <span>{{scope.row.uuid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推荐人账号">
        <template slot-scope="scope">
          <span>{{ scope.row.parent_member }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员真实姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员身份证号">
        <template slot-scope="scope">
          <span>{{ scope.row.card }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="冻结状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="freezeUser(scope.row.id,scope.row.status)"
          ></el-switch>
          <span>{{scope.row.status==0?"冻结":"开启" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="激活时间" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.active_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="210">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-around">
            <el-button
              size="small"
              @click="detail(scope.row.id,'详情')"
              icon="el-icon-document"
              round
              plain
            >详情</el-button>
            <el-popover ref="popover" placement="bottom" trigger="click">
              <el-row type="flex" justify="center" style="margin-top:8px">
                <el-button
                  size="small"
                  round
                  plain
                  style="width:120px"
                  @click="recharged(scope.row.id)"
                  icon="el-icon-plus"
                >充值</el-button>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top:8px">
                <el-button
                  size="small"
                  round
                  plain
                  style="width:120px"
                  @click="feeDeductioned(scope.row.id)"
                  icon="el-icon-minus"
                >扣费</el-button>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top:8px">
                <el-button
                  size="small"
                  style="width:120px"
                  @click="resetPasswordDialog(scope.row.id)"
                  round
                  plain
                  icon="el-icon-refresh"
                >重置登录密码</el-button>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top:8px">
                <el-button
                  size="small"
                  style="width:120px"
                  @click="resetPayPasswordDialog(scope.row.id)"
                  round
                  plain
                  icon="el-icon-refresh"
                >重置支付密码</el-button>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top:8px">
                <el-button
                  size="small"
                  round
                  plain
                  style="width:120px"
                  @click="sendPet(scope.row.id,scope.row.member)"
                  icon="el-icon-goods"
                >赠送宠物</el-button>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top:8px">
                <el-button
                  size="small"
                  round
                  plain
                  style="width:120px"
                  @click="deleteMember(scope.row.id)"
                  icon="el-icon-delete"
                >删除</el-button>
              </el-row>
              <el-button size="small" round plain icon="el-icon-more-outline" slot="reference">更多</el-button>
            </el-popover>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="count>0"
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
    <!-- 重置密码 -->
    <el-dialog
      :modal="false"
      center
      title="重置登录密码"
      :visible.sync="passwordDialog"
      v-if="passwordDialog"
    >
      <el-form
        ref="password"
        :model="password"
        label-width="120px"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="ID">
          <div class="el-input__text">{{password.id}}</div>
        </el-form-item>
        <el-form-item label="新的密码值">
          <el-input type="password" v-model="password.password" placeholder="新的密码值" />
        </el-form-item>
        <el-form-item label="再次确认密码值">
          <el-input type="password" v-model="password.password_re" placeholder="再次确认密码值" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="resetPasswordSubmit()">提 交</el-button>
        <el-button plain round @click="passwordDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 重置支付密码 -->
    <el-dialog
      :modal="false"
      center
      title="重置支付密码"
      :visible.sync="payPasswordDialog"
      v-if="payPasswordDialog"
    >
      <el-form
        ref="payPassword"
        :model="payPassword"
        label-width="120px"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="ID">
          <div class="el-input__text">{{payPassword.id}}</div>
        </el-form-item>
        <el-form-item label="新的支付密码值">
          <el-input type="password" v-model="payPassword.pay_password" placeholder="新的支付密码值" />
        </el-form-item>
        <el-form-item label="确认支付密码值">
          <el-input type="password" v-model="payPassword.pay_password_re" placeholder="确认支付密码值" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="resetPayPasswordSubmit()">提 交</el-button>
        <el-button plain round @click="payPasswordDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 充值 -->
    <el-dialog
      :modal="false"
      center
      title="充值"
      :visible.sync="rechargeDialog"
      v-if="rechargeDialog"
    >
      <el-form
        ref="recharge"
        :model="recharge"
        label-width="120px"
        style="width: 80%; margin-left:50px;"
        :rules="rulesRecharge"
      >
        <el-form-item label="ID" style="display:none;">
          <el-input v-model="recharge.id" />
        </el-form-item>
        <el-form-item label="会员账号">
          <div class="el-input__text">{{recharge.userInfo.member}}</div>
        </el-form-item>
        <el-form-item label="账户余额">
          <div class="el-input__text">
            <span v-if="this.recharge.accountInfo.length == 0">0</span>
            <span v-else>
              <el-radio-group
                style="display: inline-block"
                v-model="recharge.currency_id"
                size="small"
              >
                <el-radio
                  disabled
                  v-for="currency in recharge.accountInfo"
                  :key="currency.id"
                  :label="currency.id"
                  border
                >{{currency.name}}(￥{{currency.account}})</el-radio>
              </el-radio-group>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="可充值币种">
          <el-radio-group style="display: inline-block" v-model="recharge.currency_id" size="small">
            <el-radio
              v-for="currency in recharge.currencyInfo"
              :key="currency.id"
              :label="currency.id"
              border
            >{{currency.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input v-model.number="recharge.money" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="resetrechargeSubmit('recharge')">提 交</el-button>
        <el-button plain round @click="rechargeDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 扣费 -->
    <el-dialog
      :modal="false"
      center
      title="扣费"
      :visible.sync="feeDeductionDialog"
      v-if="feeDeductionDialog"
    >
      <el-form
        ref="feeDeduction"
        :model="feeDeduction"
        label-width="120px"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="ID" style="display:none;">
          <el-input v-model="feeDeduction.id" />
        </el-form-item>
        <el-form-item label="会员账号">
          <div class="el-input__text">{{feeDeduction.userInfo.member}}</div>
        </el-form-item>
        <el-form-item label="会员昵称">
          <div class="el-input__text">{{feeDeduction.userInfo.nick_name}}</div>
        </el-form-item>
        <el-form-item label="账户余额">
          <div class="el-input__text">
            <span v-if="this.feeDeduction.accountInfo.length == 0">0</span>
            <span v-else>
              <el-radio-group
                style="display: inline-block"
                v-model="feeDeduction.currency_id"
                size="small"
              >
                <el-radio
                  disabled
                  v-for="currency in feeDeduction.accountInfo"
                  :key="currency.id"
                  :label="currency.id"
                  border
                >{{currency.name}}(￥{{currency.account}})</el-radio>
              </el-radio-group>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="可扣费币种">
          <el-radio-group
            style="display: inline-block"
            v-model="feeDeduction.currency_id"
            size="small"
          >
            <el-radio
              v-for="currency in feeDeduction.currencyInfo"
              :key="currency.id"
              :label="currency.id"
              border
            >{{currency.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="扣费金额">
          <el-input v-model="feeDeduction.account" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain round @click="resetfeeDeductionSubmit('feeDeduction')">提 交</el-button>
        <el-button plain round @click="feeDeductionDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="提示" :visible.sync="detailDialog" width="30%" center class="detailsForm">
      <el-form ref="form" :model="memberDetailData" label-width="120px">
        <el-form-item label="ID">
          <div class="el-input__text">{{memberDetailData.id}}</div>
        </el-form-item>
        <el-form-item label="会员昵称">
          <el-input v-model="memberDetailData.nick_name" />
        </el-form-item>
        <el-form-item label="会员手机号">
          <!-- <div class="el-input__text">{{memberDetailData.phone}}</div> -->
          <div class="el-input__text">{{memberDetailData.phone}}</div>
        </el-form-item>
        <el-form-item label="会员账号">
          <!-- <el-input v-model="memberDetailData.member" /> -->
          <div class="el-input__text">{{memberDetailData.member}}</div>
        </el-form-item>
        <el-form-item label="推荐人">
          <div class="el-input__text">{{memberDetailData.parent_member}}</div>
        </el-form-item>
        <el-form-item label="推荐人昵称">
          <div class="el-input__text">{{memberDetailData.parent_nick_name}}</div>
        </el-form-item>
        <el-form-item label="邀请码">
          <div class="el-input__text">{{memberDetailData.uuid}}</div>
        </el-form-item>
        <el-form-item label="级别">
          <div class="el-input__text">{{memberDetailData.rank_name}}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round @click="detailSubmit">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 赠送宠物弹窗 -->
    <el-dialog title="提示" :visible.sync="sendDialog" width="50%" center class>
      <el-form ref="petsForm" :model="petsForm" label-width="120px" :rules="rules">
        <el-form-item label="ID" style="display:none">
          <div class="el-input__text">{{petsForm.id}}</div>
        </el-form-item>
        <el-form-item label="赠送至">
          <div class="el-input__text">{{petsForm.member}}</div>
        </el-form-item>
        <el-form-item label="赠送宠物" prop="pet_id">
          <el-select v-model="petsForm.pet_id">
            <el-option v-for="item in petData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="赠送个数">
          <el-input v-model.number="petsForm.count" placeholder="请输入赠送个数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round @click="petHandle('petsForm')">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  memberLevelList, //级别列表
  petsList, //宠物
  sendPetSubmit,
  rechargeConfig,
  rechargeMoneySubmit,
  feeConfig,
  memberDetail,
  memberDetailSubmit,
  choicedSubmit,
  editExcludeAwards,
  freezeUserSubmit,
  feeDeductionMoneySubmit, //扣费提交
  deleteOneSubmit,
  resetPassword, //重置密码
  resetPayPassword //重置支付密码
} from "@/api/user-center";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        pagesize: 10,
        member: "", //手机号
        rank_id: "",
        start_time: "",
        end_time: ""
      },
      count: 0,

      temp: {},
      title: "",
      listLoading: true,
      list: [],
      id: null,
      activateId: null,

      // ----------------充值---------------
      recharge: {
        id: "",
        currency_id: "", //币种id
        money: "", //充值金额
        member: ""
      },
      rulesRecharge: {
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        currency_id: [
          { required: true, message: "请选择类别", trigger: "change" }
        ]
      },
      rechargeDialog: false,
      rechargeCurrency: null,
      // ----------------扣费---------------
      feeDeduction: {
        id: "",
        member: "",
        currency_id: "", //币种id
        account: "" //扣款金额
      },
      feeDeductionDialog: false,
      levelData: null, //级别列表
      awardsData: null, //奖项列表
      id: "",
      checkedBox: [],
      memberDetailData: {
        id: "",
        phone: "",
        member: "",
        nick_name: "",
        parent_member: "",
        parent_nick_name: "",
        uuid: "",
        rank_name: ""
      },
      detailDialog: false,
      // ----------------重置密码---------------
      password: {
        id: "",
        password: "",
        password_re: ""
      },
      passwordDialog: false,

      payPassword: {
        id: "",
        pay_password: "",
        pay_password_re: ""
      },
      payPasswordDialog: false,
      // 宠物
      sendDialog: false,
      petData: null,
      petsForm: {
        id: "",
        pet_id: "",
        member: "",
        count: ""
      },
      rules: {
        pet_id: [
          { required: true, message: "请选择美人名称", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getRankList();
    this.getPetsList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      if (this.listQuery.end_time == null || undefined || "") {
        this.listQuery.end_time = "";
      } else if (this.listQuery.start_time == null || undefined || "") {
        this.listQuery.start_time = "";
      }
      userList(this.listQuery).then(resp => {
        this.list = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    getRankList() {
      memberLevelList().then(resp => {
        this.levelData = resp;
      });
    },
    editHandle(id, title) {
      this.title = title;
      let that = this;
      this.dialogFormVisible = true;
      formcenterEdit({ id: id }).then(res => {
        that.temp = res[0];
        that.temp.bank_list = res.bank_list;
        this.dialogFormVisible = true;
      });
    },
    confirmHandle() {
      updateForm(this.temp).then(res => {
        this.dialogFormVisible = false;
        this.getList();
      });
    },

    //  1充值 2扣费
    recharged(id) {
      rechargeConfig(id).then(response => {
        this.recharge = response;
        this.rechargeDialog = true;
        this.recharge.id = id;
        this.recharge.member = response.userInfo.member;
      });
    },
    resetrechargeSubmit(formName) {
      // delete this.recharge.currencyInfo;
      // delete this.recharge.userInfo;
      // delete this.recharge.accountInfo;
      let data = {
        id: this.recharge.id,
        money: this.recharge.money,
        currency_id: this.recharge.currency_id,
        member: this.recharge.member
      };
      if (
        this.recharge.money == "" ||this.recharge.money == undefined ||
        this.recharge.currency_id == "" ||
        this.recharge.currency_id == undefined
      ) {
        this.$message({
          type: "warning",
          message: "请输入完整信息!"
        });
        return;
      } else {
        rechargeMoneySubmit(data).then(response => {
          this.rechargeDialog = false;
          this.getList();
        });
      }
    },
    feeDeductioned(id) {
      this.feeDeductionDialog = true;
      feeConfig(id).then(response => {
        this.feeDeduction = response;
        this.feeDeduction.id = id;
        this.feeDeduction.member = response.userInfo.member;
      });
    },
    resetfeeDeductionSubmit() {
      // delete this.feeDeduction.currencyInfo;
      // delete this.feeDeduction.userInfo;
      // delete this.feeDeduction.accountInfo;
      let data = {
        id: this.feeDeduction.id,
        money: this.feeDeduction.account,
        currency_id: this.feeDeduction.currency_id,
        member: this.feeDeduction.member
      };
      if (
        this.feeDeduction.account == "" || this.feeDeduction.account == undefined ||
        this.feeDeduction.currency_id == "" ||
        this.feeDeduction.currency_id == undefined
      ) {
        this.$message({
          type: "warning",
          message: "请输入完整信息!"
        });
        return;
      } else {
        feeDeductionMoneySubmit(data).then(response => {
          this.feeDeductionDialog = false;
          this.getList();
        });
      }
    },
    // 冻结用户
    freezeUser(id, status) {
      let statusDescription = status ? "启用" : "禁用";
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
          freezeUserSubmit(data).then(resp => {
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
    // 重置密码
    resetPasswordTemp() {
      this.password = {
        id: "",
        password: "",
        password_re: ""
      };
    },
    resetPasswordDialog(id) {
      this.resetPasswordTemp();
      this.password.id = id;
      this.passwordDialog = true;
    },
    resetPasswordSubmit(forname) {
      resetPassword(this.password).then(response => {
        this.passwordDialog = false;
        this.getList();
      });
    },

    // 重置支付密码
    resetPayPasswordTemp() {
      this.payPassword = {
        id: "",
        pay_password: "",
        pay_password_re: ""
      };
    },
    resetPayPasswordDialog(id) {
      this.resetPayPasswordTemp();
      this.payPassword.id = id;
      this.payPasswordDialog = true;
    },
    resetPayPasswordSubmit(forname) {
      resetPayPassword(this.payPassword).then(response => {
        this.payPasswordDialog = false;
        this.getList();
      });
    },

    // 详情
    detail(id) {
      this.detailDialog = true;
      memberDetail(id).then(resp => {
        this.memberDetailData = resp;
      });
    },
    detailSubmit() {
      memberDetailSubmit({
        id: this.memberDetailData.id,
        phone: this.memberDetailData.phone,
        nick_name: this.memberDetailData.nick_name
      }).then(resp => {
        this.detailDialog = false;
        this.getList();
      });
    },
    deleteMember(id) {
      this.$confirm("此操作将永久删除该会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteOneSubmit(id).then(resp => {
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
    getPetsList() {
      petsList().then(resp => {
        this.petData = resp;
      });
    },
    // 赠送宠物
    sendPet(id, member) {
      this.resetPet();
      this.petsForm.id = id;
      this.petsForm.member = member;
      this.sendDialog = true;
    },
    resetPet() {
      this.petsForm = {
        id: "",
        pet_id: "",
        member: "",
        count: ""
      };
    },
    petHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          sendPetSubmit(this.petsForm).then(resp => {
            this.sendDialog = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-checkbox.is-bordered + .el-checkbox.is-bordered[data-v-8e7670f6] {
  margin-left: 0px;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.el-checkbox.is-bordered {
  width: 200px;
  margin-top: 8px;
}
.detailsForm .el-input {
  width: 50%;
}
</style>
