/* 新加政策 */
<template>
  <div class="add-policy">
    <div class="form">
      <el-form
        :model="dialogForm"
        :rules="rules"
        ref="dialogForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div v-if="$route.query.id">
          <el-form-item label="ID" prop="id" style="display:none;">
            <el-input v-model="dialogForm.id"></el-input>
          </el-form-item>
        </div>
        <!-- <el-form-item label="政策名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item> -->
        <!-- multiple: true, -->
        <el-form-item label="选择地区" prop="region_id">
          <el-cascader
            class="selectClass"
            v-model="dialogForm.region_id"
            :options="options_area"
            clearable
            :props="{
              checkStrictly: true,
              value: 'id',
              label: 'title',
              children: 'son',
              emitPath: false
            }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="选择行业" prop="industry_id">
          <el-select
            class="selectClass"
            v-model="dialogForm.industry_id"
            placeholder="请选择"
          >
            <!-- multiple -->
            <el-option
              v-for="item in options_industry"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择政策" prop="policy_id">
          <el-select
            v-model="dialogForm.policy_id"
            placeholder="请选择"
            class="selectClass"
            clearable
          >
            <el-option
              v-for="item in options_policy"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <div class="form-flex">
          <el-form-item label="立项时间" prop="project_time">
            <el-date-picker
              v-model="dialogForm.project_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="添加时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开始时间" prop="start_time">
            <el-date-picker
              v-model="dialogForm.start_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="添加时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="end_time">
            <el-date-picker
              v-model="dialogForm.end_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="添加时间"
            >
            </el-date-picker>
          </el-form-item>
        </div> -->
        <!-- <el-form-item label="支持对象" prop="object">
          <el-input v-model="dialogForm.object"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="申报标准">
          <div class="declare" v-for="(item, index) in declare" :key="index">
            申报条件<el-input v-model="item.title"></el-input> 标准<el-input
              v-model="item.conditions"
            ></el-input>
            <el-button type="info" @click="delDeclare(index)">移除</el-button>
            <el-button type="primary" @click="addDeclare()">添加</el-button>
          </div>
        </el-form-item> -->
        <el-form-item label="提交资料">
          <div class="reward" v-for="(item, index) in titles" :key="index">
            <el-input v-model="item.title"></el-input>
            <span class="reward_btn">
              <el-button type="info" @click="delReward(index)">移除</el-button>
              <el-button type="primary" @click="addReward()">添加</el-button>
            </span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="
              !$route.query.id
                ? submitAddForm('dialogForm')
                : submitEditForm('dialogForm')
            "
            >提 交</el-button
          >
          <el-button plain round @click="resetForm()">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addData, editData, editDataSubmit } from "@/api/data-manage";
import { industryList, policyList } from "@/api/area";
import areaList from "../../assets/areaList.js";
export default {
  data() {
    return {
      dialogForm: {},
      //   declare: [{ title: "", conditions: "" }],
      titles: [{ title: "" }],
      rules: {
        //表单验证
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        region_id: [
          { required: true, message: "请选择地区", trigger: "change" }
        ],
        industry_id: [
          { required: true, message: "请选择行业", trigger: "blur" }
        ],
        policy_id: [{ required: true, message: "请选择部门", trigger: "blur" }],
        project_time: [
          { required: true, message: "请选择立项时间", trigger: "blur" }
        ],
        start_time: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        object: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      },
      options_industry: [],
      options_area: areaList,
      options_policy: []
    };
  },
  components: {},
  watch: {},
  created() {
    this.industryList();
    this.policyList();
    if (this.$route.query.id) {
      this.editForm();
    }
  },
  mounted() {},
  methods: {
    industryList() {
      //行业列表
      industryList().then(res => {
        this.options_industry = res;
      });
    },
    policyList() {
      //政策列表
      policyList(this.depart).then(res => {
        this.options_policy = res.data;
      });
    },
    editForm() {
      //编辑获取表单
      let id = this.$route.query.id;
      editData(id).then(res => {
        this.dialogForm = {
          region_id: res.region_id,
          industry_id: res.industry_id,
          policy_id: res.policy_id
        };
        let array = [];
        res.detail.forEach(item => {
          array.push({ title: item.title });
        });
        this.titles = array;
      });
    },
    delDeclare(index) {
      if (this.declare.length > 1) {
        this.declare.splice(index, 1);
      }
    },
    addDeclare() {
      this.declare.push({ title: "", conditions: "" });
    },
    delReward(index) {
      if (this.titles.length > 1) {
        this.titles.splice(index, 1);
      }
    },
    addReward() {
      this.titles.push({ title: "" });
    },
    submitAddForm(formName) {
      //新增提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   let areaID = this.dialogForm.region_id[
          //     this.dialogForm.region_id.length - 1
          //   ];
          //   this.$set(this.dialogForm, "region_id", areaID);
          this.$delete(this.dialogForm, "id");
          let titles = [];
          this.titles.forEach(item => {
            titles.push(item.title);
          });
          this.$set(this.dialogForm, "titles", titles);
          addData(this.dialogForm).then(res => {
            this.$router.go(-1);
          });
        }
      });
    },
    submitEditForm(formName) {
      //编辑提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$set(this.dialogForm, "id", this.$route.query.id);
          let titles = [];
          this.titles.forEach(item => {
            titles.push(item.title);
          });
          this.$set(this.dialogForm, "titles", titles);
          editDataSubmit(this.dialogForm).then(res => {
            this.$router.go(-1);
          });
        }
      });
    },
    resetForm() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.add-policy {
  width: 100%;
  padding: 30px;
  .form {
    width: 80%;
    ::v-deep .selectClass {
      width: 100%;
    }
    .form-flex {
      display: flex;
      justify-content: space-between;
    }
    .declare {
      width: 100%;
      ::v-deep .el-input {
        width: 35%;
        margin: 0 20px 10px 20px;
      }
    }
    .reward {
      width: calc(100% - 100px);
      ::v-deep .el-input {
        width: 85%;
        margin: 0 20px 10px 0;
      }
      .reward_btn {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
