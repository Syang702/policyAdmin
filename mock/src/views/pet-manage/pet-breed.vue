<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div>
        <Magnify :vSrc="imgSrc" :vShow="imgShow" v-on:close="closeBigImg"></Magnify>
      </div>
      <div>
        <el-button
          size="small"
          round
          plain
          @click="addNewHandle"
          icon="el-icon-circle-plus-outline"
        >添 加</el-button>
      </div>
    </div>
    <el-table
      :data="petsData"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
      <!-- <el-table-column prop="image" label="宠物图片" align="center"> -->
      <el-table-column label="宠物图片" align="center">
        <template slot-scope="scope">
          <img class="cover" @click="enlargeImg(scope.row.image)" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <!-- </el-table-column> -->
      <el-table-column prop="name" label="宠物品种" align="center"></el-table-column>
      <el-table-column prop="start_price" label="区块价值最小值" align="center"></el-table-column>
      <el-table-column prop="end_price" label="区块价值最大值" align="center"></el-table-column>
      <el-table-column prop="cost" label="消耗饲料" align="center"></el-table-column>
      <el-table-column prop="day" label="收益时长(天)" align="center"></el-table-column>
      <el-table-column prop="bonus_rate" label="合约收益" align="center"></el-table-column>
      <el-table-column prop="appoint" label="预约消耗" align="center"></el-table-column>
      <el-table-column prop="purchase" label="即抢消耗" align="center"></el-table-column>
      <el-table-column prop="coin_hkt" label="HKT收入" align="center"></el-table-column>
      <el-table-column prop="start_time" label="即抢开始时间" align="center"></el-table-column>
      <el-table-column prop="end_time" label="即抢结束时间" align="center"></el-table-column>
      <el-table-column label="前台是否显示" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_show==0" style="color:red">不显示</span>
          <span v-if="scope.row.is_show==1" style="color:green">显示</span>
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
            @click="editCoin(scope.row)"
          >编 辑</el-button>
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
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="petsDialog"
      width="40%"
    >
      <el-form
        :model="petsForm"
        :rules="rules"
        ref="petsForm"
        label-width="120px"
        class="pets-form"
      >
        <el-form-item label="id" prop="id" v-if="dialogStatus=='update'">
          <div class="el-input__text">{{petsForm.id}}</div>
        </el-form-item>
        <el-form-item label="宠物图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="uploadImg"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img v-if="petsForm.image!=''" :src="petsForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="宠物品种" prop="name">
          <el-input v-model="petsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="区块价值最小值" prop="start_price">
          <el-input v-model="petsForm.start_price"></el-input>
        </el-form-item>
        <el-form-item label="区块价值最大值" prop="end_price">
          <el-input v-model="petsForm.end_price"></el-input>
        </el-form-item>
        <el-form-item label="消耗饲料" prop="cost">
          <el-input v-model="petsForm.cost"></el-input>
        </el-form-item>
        <el-form-item label="收益时长(天)" prop="day">
          <el-input v-model="petsForm.day"></el-input>
        </el-form-item>
        <el-form-item label="合约收益" prop="bonus_rate">
          <el-input v-model="petsForm.bonus_rate"></el-input>
        </el-form-item>
        <el-form-item label="预约消耗" prop="appoint">
          <el-input v-model="petsForm.appoint"></el-input>
        </el-form-item>
        <el-form-item label="即抢消耗" prop="purchase">
          <el-input v-model="petsForm.purchase"></el-input>
        </el-form-item>
        <el-form-item label="HKT收入" prop="coin_hkt">
          <el-input v-model="petsForm.coin_hkt"></el-input>
        </el-form-item>
        <el-form-item label="即抢开始时间" prop="start_time">
          <el-time-picker
            v-model="petsForm.start_time"
            value-format="HH:mm:ss"
            placeholder="即抢开始时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="即抢结束时间" prop="end_time">
          <el-time-picker v-model="petsForm.end_time" value-format="HH:mm:ss" placeholder="即抢结束时间"></el-time-picker>
        </el-form-item>
        <el-form-item label="前台是否显示" prop="is_show">
          <el-switch
            v-model="petsForm.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
          <span>{{petsForm.is_show==1?"显示":"不显示"}}</span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?createHandle('petsForm'):updateSubmit('petsForm')"
          >提 交</el-button>
          <el-button plain round @click="closeHandle()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { petsList, petsCreate, uploadBase } from "@/api/pets.js";
import Magnify from "@/components/Imgmagnify";
import Pagination from "@/components/Pagination";
export default {
  components: { Magnify, Pagination },
  data() {
    return {
      petsData: null,
      listLoading: true,
      count: 0,
      listQuery: {
        pageindex: 1,
        pagesize: 10,
        state: "",
        totime: "",
        fromtime: ""
      },
      petsForm: {
        appoint: "",
        bonus_rate: "",
        coin_hkt: "",
        cost: "",
        create_time: "",
        day: "",
        end_price: "",
        end_time: "",
        id: "",
        image: "",
        name: "",
        purchase: "",
        start_price: "",
        start_time: "",
        is_show: ""
      },
      petsDialog: false,
      rules: {
        appoint: [{ required: true, message: "请输入", trigger: "blur" }],
        bonus_rate: [{ required: true, message: "请输入", trigger: "blur" }],
        coin_hkt: [{ required: true, message: "请输入", trigger: "blur" }],
        cost: [{ required: true, message: "请输入", trigger: "blur" }],
        create_time: [{ required: true, message: "请输入", trigger: "blur" }],
        day: [{ required: true, message: "请输入", trigger: "blur" }],
        end_price: [{ required: true, message: "请输入", trigger: "blur" }],
        end_time: [{ required: true, message: "请输入", trigger: "blur" }],
        image: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        purchase: [{ required: true, message: "请输入", trigger: "blur" }],
        start_price: [{ required: true, message: "请输入", trigger: "blur" }],
        start_time: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      dialogStatus: "",
      textMap: {
        create: "添加",
        update: "编辑"
      },
      //   放大图片
      imgSrc: "",
      imgShow: false,
      image: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      petsList(this.listQuery).then(resp => {
        this.petsData = resp.data;
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
    uploadImg(file) {
      this.getBase64(file.raw).then(res => {
        this.image = res.split(",")[1];
        uploadBase(this.image).then(resp => {
          this.petsForm.image = resp.path;
        });
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    resetTemp() {
      this.petsForm = {
        appoint: "",
        bonus_rate: "",
        coin_hkt: "",
        cost: "",
        create_time: "",
        day: "",
        end_price: "",
        end_time: "",
        id: 0,
        image: "",
        name: "",
        purchase: "",
        start_price: "",
        start_time: "",
        is_show: ""
      };
    },
    addNewHandle() {
      this.petsDialog = true;
      this.dialogStatus = "create";
      this.resetTemp();
    },
    createHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          this.petsForm.rate = this.petsForm.bonus_rate;
          delete this.petsForm.bonus_rate;
          //   console.log(this.petsForm);
          petsCreate(this.petsForm).then(resp => {
            this.getList();
            this.listLoading = false;
            this.petsDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    editCoin(row) {
      this.resetTemp();
      this.petsDialog = true;
      this.dialogStatus = "update";
      this.petsForm = {...row};
    },
    updateSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.petsForm.rate = this.petsForm.bonus_rate;
          delete this.petsForm.bonus_rate;
          this.listLoading = true;
          petsCreate(this.petsForm).then(resp => {
            this.getList();
            this.listLoading = false;
            this.petsDialog = false;
          });
        } else {
          return false;
        }
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
  width: 500px;
  margin: 0 auto;
}
.avatar-uploader img {
  width: 320px;
  height: 220px;
}
.cover {
  width: 80px;
  height: 50px;
}
</style>


