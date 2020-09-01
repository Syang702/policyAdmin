<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div>
        <Magnify :vSrc="imgSrc" :vShow="imgShow" v-on:close="closeBigImg"></Magnify>
      </div>
      <div>
        <el-input
          placeholder="请输入搜索关键字"
          v-model="listQuery.member"
          clearable
          :style="{width:'180px'}"
          size="small"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="listQuery.state" size="small" placeholder="请选择状态">
          <el-option
            v-for="item in optionState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="listQuery.fromtime"
          type="datetime"
          placeholder="开始时间"
          class="margin"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
        ></el-date-picker>
        <el-date-picker
          v-model="listQuery.totime"
          type="datetime"
          placeholder="结束时间"
          class="margin"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
        ></el-date-picker>
        <el-button size="small" round plain @click="getList" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="petsMakeoverList"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
      <el-table-column prop="buymember" label="购买会员账号" align="center"></el-table-column>
      <el-table-column prop="buynickname" label="购买会员昵称" align="center"></el-table-column>
      <el-table-column prop="name" label="购买宠物名称" align="center"></el-table-column>
      <el-table-column prop="price" label="宠物价值" align="center"></el-table-column>
      <el-table-column prop="day" label="合约时长(天)" align="center"></el-table-column>
      <el-table-column prop="bonus_rate" label="合约收益" align="center"></el-table-column>
      <el-table-column prop="salemember" label="转让会员账号" align="center"></el-table-column>
      <el-table-column prop="salenickname" label="转让会员昵称" align="center"></el-table-column>
      <el-table-column label="打款凭证" align="center">
        <template slot-scope="scope">
          <img class="cover" @click="enlargeImg(scope.row.proof)" :src="scope.row.proof" alt />
        </template>
      </el-table-column>
      <el-table-column prop="addtime" label="匹配时间" align="center"></el-table-column>
      <el-table-column prop="paytime" label="打款时间" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <!-- 0 订单匹配成功 , 1 买家已打款 , 2 代表卖家已确认 , 3 代表卖家申诉 , 4 申诉成功（订单失败）, 5 代表申诉失败（订单成功）,6 代表自动完成 , 7 代表超时 , 8 代表买家取消 -->
          <span v-if="scope.row.status==0">订单匹配成功</span>
          <span v-if="scope.row.status==1">买家已打款</span>
          <span v-if="scope.row.status==2">卖家已确认</span>
          <span v-if="scope.row.status==3">卖家申诉</span>
          <span v-if="scope.row.status==4">申诉成功（订单失败）</span>
          <span v-if="scope.row.status==5">申诉失败（订单成功）</span>
          <span v-if="scope.row.status==6">自动完成</span>
          <span v-if="scope.row.status==7">超时</span>
          <span v-if="scope.row.status==8">买家取消</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            plain
            icon="el-icon-edit"
            size="small"
            @click="editCoin(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="count>0"
      :total="count"
      :page.sync="listQuery.pageindex"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />
    <el-dialog :modal="false" center title="详情" :visible.sync="petsDialog">
      <el-form :model="petsForm" ref="petsForm" label-width="120px" class="pets-form">
        <el-form-item label="id" prop="id">
          <div class="el-input__text">{{petsForm.id}}</div>
        </el-form-item>
        <el-form-item label="宠物图片:">
          <img :src="petsForm.image" class="avatar" />
        </el-form-item>
        <el-form-item label="宠物名称:" prop="name">
          <div class="el-input__text">{{petsForm.name}}</div>
        </el-form-item>
        <el-form-item label="宠物价值:" prop="price">
          <div class="el-input__text">{{petsForm.price}}</div>
        </el-form-item>
        <el-form-item label="每天消耗狗粮:" prop="cost">
          <div class="el-input__text">{{petsForm.cost}}</div>
        </el-form-item>
        <el-form-item label="合约时长(天):" prop="day">
          <div class="el-input__text">{{petsForm.day}}</div>
        </el-form-item>
        <el-form-item label="HKT收益:" prop="coin_hkt">
          <div class="el-input__text">{{petsForm.coin_hkt}}</div>
        </el-form-item>
        <el-form-item label="合约收益:" prop="bonus_rate">
          <div class="el-input__text">{{petsForm.bonus_rate}}</div>
        </el-form-item>
        <el-form-item label="匹配时间:" prop="addtime">
          <div class="el-input__text">{{petsForm.addtime}}</div>
        </el-form-item>
        <el-form-item label="打款时间:" prop="paytime">
          <div class="el-input__text">{{petsForm.paytime}}</div>
        </el-form-item>
        <el-form-item label="订单状态:" prop="status">
          <span v-if="petsForm.status==0">订单匹配成功</span>
          <span v-if="petsForm.status==1">买家已打款</span>
          <span v-if="petsForm.status==2">卖家已确认</span>
          <span v-if="petsForm.status==3">卖家申诉</span>
          <span v-if="petsForm.status==4">申诉成功（订单失败）</span>
          <span v-if="petsForm.status==5">申诉失败（订单成功）</span>
          <span v-if="petsForm.status==6">自动完成</span>
          <span v-if="petsForm.status==7">超时</span>
          <span v-if="petsForm.status==8">买家取消</span>
        </el-form-item>
        <h3>卖家信息：</h3>
        <el-form-item label="转让会员账号:" prop="salemember">
          <div class="el-input__text">{{petsForm.salemember}}</div>
        </el-form-item>
        <el-form-item label="转让会员昵称:" prop="salenickname">
          <div class="el-input__text">{{petsForm.salenickname}}</div>
        </el-form-item>
        <el-form-item label="收款方式:">
          <el-tabs>
            <el-tab-pane label="银行卡">
              <div>开户行：{{petsForm.bankname}}</div>
              <div>持卡人：{{petsForm.cardname}}</div>
              <div>银行卡号{{petsForm.cardno}}</div>
            </el-tab-pane>
            <el-tab-pane label="支付宝">
              <div>支付宝名称：{{petsForm.aliname}}</div>
              <div>支付宝账号：{{petsForm.alino}}</div>
              <div>
                支付宝二维码：
                <img :src="petsForm.aliqrcode" class="eravatar" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="微信">
              <div>微信名称：{{petsForm.wxname}}</div>
              <div>微信账号：{{petsForm.wxno}}</div>
              <div>
                微信二维码:
                <img :src="petsForm.wxqrcode" class="eravatar" />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <h3>买家信息：</h3>
        <el-form-item label="购买会员账号:" prop="buymember">
          <div class="el-input__text">{{petsForm.buymember}}</div>
        </el-form-item>
        <el-form-item label="购买会员账号:" prop="buynickname">
          <div class="el-input__text">{{petsForm.buynickname}}</div>
        </el-form-item>
        <el-form-item label="付款凭证:">
          <img :src="petsForm.image" class="avatar" />
        </el-form-item>
        <el-form-item v-if="petsForm.status==3">
          <el-button type="primary" plain round @click="passHandle(petsForm.id)">通过</el-button>
          <el-button type="danger" plain round @click="refuseHandle(petsForm.id)">拒绝</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  petsMakeoverList,
  passcomplain,
  refusecomplain,
  detailMakeover
} from "@/api/pets.js";
import Magnify from "@/components/Imgmagnify";
import Pagination from "@/components/Pagination";
export default {
  components: { Magnify, Pagination },
  data() {
    return {
      petsMakeoverList: null,
      listLoading: true,
      count: 0,
      listQuery: {
        pageindex: 1,
        pagesize: 10,
        state: "100",
        member: "",
        fromtime: "",
        totime: ""
      },

      // 订单状态：0 订单匹配成功 , 1 买家已打款 , 2 代表卖家已确认 , 3 代表卖家申诉 , 4 申诉成功（订单失败）, 5 代表申诉失败（订单成功）,6 代表自动完成 , 7 代表超时 , 8 代表买家取消
      optionState: [
        {
          label: "全部",
          value: "100"
        },
        {
          label: "订单匹配成功",
          value: "0"
        },
        {
          label: "买家已打款",
          value: "1"
        },
        {
          label: "卖家已确认",
          value: "2"
        },
        {
          label: "卖家申诉",
          value: "3"
        },
        {
          label: "申诉成功（订单失败）",
          value: "4"
        },
        {
          label: "申诉失败（订单成功）",
          value: "5"
        },
        {
          label: "自动完成",
          value: "6"
        },
        {
          label: "超时",
          value: "7"
        },
        {
          label: "买家取消",
          value: "8"
        }
      ],
      //   快捷键日期选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      petsDialog: false,
      petsForm: {
        addtime: "",
        aliname: "",
        alino: "",
        aliqrcode: "",
        bankname: "",
        bonus_rate: "0.0300",
        branch: "",
        buymember: "",
        buynickname: "",
        cardname: "",
        cardno: "",
        coin_hkt: "",
        cost: "",
        day: "",
        image: "",
        name: "",
        paytime: "",
        price: "",
        proof: "",
        salemember: "",
        salenickname: "",
        status: "",
        wxname: "",
        wxno: "",
        wxqrcode: ""
      },
      //   放大图片
      imgSrc: "",
      imgShow: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      petsMakeoverList(this.listQuery).then(resp => {
        this.petsMakeoverList = resp.data;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    enlargeImg(src) {
      this.imgSrc = src;
      this.imgShow = true;
    },
    closeBigImg() {
      this.imgShow = false;
    },
    editCoin(id) {
      this.petsDialog = true;
      detailMakeover(id).then(resp => {
        this.petsForm = resp.data[0];
        this.petsForm.id = id;
      });
    },
    passHandle(id) {
      this.$confirm("申诉通过操作, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          passcomplain(id).then(response => {
            this.getList();
            this.petsDialog = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    refuseHandle(id) {
      this.$confirm("拒绝申诉操作, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          refusecomplain(id).then(response => {
            this.getList();
            this.petsDialog = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 弹窗取消按钮
    closeHandle() {
      this.petsDialog = false;
      this.getList();
    }
  }
};
</script>


<style>
.pets-form {
  width: 300px;
  margin: 0 auto;
}
.cover {
  width: 50px;
  height: 50px;
}
.avatar {
  width: 250px;
}
.eravatar {
  width: 60px;
  height: 60px;
}
</style>


