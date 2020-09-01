/* 新加评分 */
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
        <el-form-item label="选择地区" prop="region_id">
          <!-- multiple: true, -->
          <el-cascader
            class="selectClass"
            v-model="dialogForm.region_id"
            :options="options_area"
            :disabled="!$route.query.id ? false : true"
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
            :disabled="!$route.query.id ? false : true"
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
            @change="selectPolicy"
            :disabled="!$route.query.id ? false : true"
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
        <el-form-item label="评分标准">
          <div class="declare" v-for="(item, index) in standard" :key="index">
            评分条件
            <el-select
              v-model="item.conditions_id"
              placeholder="请选择"
              class="selectReport"
              disabled
            >
              <!-- @focus="focusReport" -->
              <el-option
                v-for="item in options_report"
                :key="item.id"
                :label="item.title"
                :value="item.conditions_id"
              >
              </el-option>
            </el-select>
            评分标准
            <el-select
              v-if="item.conditions_id == '3'"
              v-model="item.conditions"
              placeholder="请选择"
              class="standard_select"
              disabled
            >
              <el-option label="发明" :value="1"> </el-option>
              <el-option label="实用新型软著" :value="0"> </el-option>
            </el-select>
            <el-select
              v-else-if="item.conditions_id == '4'"
              v-model="item.conditions"
              placeholder="请选择"
              class="standard_select"
              disabled
            >
              <el-option label="自主研发" :value="1"> </el-option>
              <el-option label="仅有受让，受赠和并购等" :value="0"> </el-option>
            </el-select>
            <el-radio-group
              disabled
              v-else-if="
                item.conditions_id == '5' ||
                  item.conditions_id == '9' ||
                  item.conditions_id == '13'
              "
              v-model="item.conditions"
              class="standard_group"
            >
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
            <el-input
              v-else
              v-model="item.conditions"
              class="standard_input"
              disabled
            ></el-input>
            可得分数<el-input
              v-model="item.score"
              class="standard_input"
            ></el-input>
            <!-- <el-button type="info" @click="delDeclare(index)">移除</el-button> -->
            <!-- <el-button type="primary" @click="addDeclare()">添加</el-button> -->
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
import {
  addScore,
  editScore,
  editSubmit,
  declareList
} from "@/api/score-manage";
import { industryList, policyList } from "@/api/area";
import areaList from "../../assets/areaList.js";
export default {
  data() {
    return {
      dialogForm: {},
      standard: [{ declares_id: "", score: "", conditions: "" }],
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
      options_policy: [],
      options_report: []
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
    selectPolicy() {
      //选择政策后执行
      this.declareList();
    },
    // focusReport() {
    //   if (
    //     this.dialogForm.policy_id == "" ||
    //     this.dialogForm.policy_id == null ||
    //     this.dialogForm.policy_id == undefined
    //   ) {
    //     this.$message.error("请先选择政策");
    //   }
    // },
    declareList() {
      //   评分标准列表,根据政策id 返回
      let policy_id = this.dialogForm.policy_id;
      declareList(policy_id).then(res => {
        this.options_report = res.data;
        let array = [];
        res.data.forEach(item => {
          array.push({
            declares_id: item.id,
            conditions_id: item.conditions_id,
            conditions: item.conditions
          });
        });
        this.standard = array;
      });
    },
    editForm() {
      //编辑获取表单
      let id = this.$route.query.id;
      editScore(id).then(res => {
        // let array = [
        //   {
        //     conditions: res.conditions,
        //     score: res.score,
        //     declares_id: res.declares_id
        //   }
        // ];
        // this.standard = array;
        this.dialogForm = {
          region_id: res.region_id,
          industry_id: res.industry_id,
          policy_id: res.policy_id
        };
        let array = [];
        res.detail.forEach(item => {
          array.push({
            declares_id: item.declares_id,
            conditions_id: item.conditions_id,
            conditions: item.conditions,
            score: item.score
          });
        });
        this.standard = array;
        // declareList(res.policy_id).then(res => {
        //   this.options_report = res.data;
        //   let array = [];
        //   res.data.forEach(item => {
        //     array.push({
        //       declares_id: item.id,
        //       conditions_id: item.conditions_id,
        //       conditions: item.conditions,
        //       score: item.score
        //     });
        //   });
        //   this.standard = array;
        // });
      });
    },
    delDeclare(index) {
      if (this.standard.length > 1) {
        this.standard.splice(index, 1);
      }
    },
    addDeclare() {
      this.standard.push({ score: "", conditions: "", declares_id: "" });
    },
    submitAddForm(formName) {
      //新增提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          let array = JSON.parse(JSON.stringify(this.standard));
          array.forEach(item => {
            this.$delete(item, "conditions_id");
          });
          //   this.$delete(this.dialogForm, "id");
          this.$set(this.dialogForm, "standard", JSON.stringify(array));
          console.log(this.dialogForm);
          addScore(this.dialogForm).then(res => {
            this.$router.go(-1);
          });
        }
      });
    },
    submitEditForm(formName) {
      //编辑提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          let array = JSON.parse(JSON.stringify(this.standard));
          array.forEach(item => {
            this.$delete(item, "conditions_id");
          });
          this.$set(this.dialogForm, "id", this.$route.query.id);
          this.$set(this.dialogForm, "standard", JSON.stringify(array));
          editSubmit(this.dialogForm).then(res => {
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
      ::v-deep .el-input.standard_input {
        width: 20%;
        margin: 0 20px 10px 20px;
      }
      ::v-deep .el-select.selectReport {
        width: 20%;
        margin: 0 20px 10px 20px;
      }
      ::v-deep .standard_select.el-select {
        margin: 0 20px 10px 20px;
        width: 20%;
      }
      ::v-deep .el-radio-group.standard_group {
        margin: 0 20px 10px 20px;
        width: 20%;
        .el-radio-button {
          margin-right: 36px;
        }
        .el-radio-button__inner {
          width: 80px;
          border-left: 1px solid #dcdfe6;
          box-shadow: none;
          border-radius: 4px;
        }
      }
    }
    .reward {
      width: 100%;
      ::v-deep .el-input {
        width: 85%;
        margin: 0 20px 10px 0;
      }
    }
  }
}
</style>
