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
        <el-form-item label="政策名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选择地区" prop="region_id">
          <!-- multiple: true, -->
          <el-cascader
            class="selectClass"
            v-model="dialogForm.region_id"
            :options="options_area"
            clearable
            :props="{
              checkStrictly: true,
              value: 'id',
              label: 'title',
              children: 'son'
            }"
          ></el-cascader>
          <!-- emitPath: false -->
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select
            v-model="dialogForm.department_id"
            placeholder="请选择"
            class="selectClass"
            clearable
          >
            <el-option
              v-for="item in options_depart"
              :key="item.id"
              :label="item.de_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择行业">
          <el-select
            class="selectClass"
            v-model="dialogForm.industry_id[0]"
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
        <div class="form-flex">
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
        </div>
        <el-form-item label="支持对象" prop="object">
          <el-input v-model="dialogForm.object"></el-input>
        </el-form-item>
        <el-form-item label="申报标准" class="declare">
          <div v-for="(item, index) in declare" :key="index">
            申报条件
            <el-select
              v-model="item.conditions_id"
              placeholder="请选择"
              class="selectConditions"
            >
              <el-option
                v-for="item in options_conditions"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
            标准
            <el-select
              v-if="item.conditions_id == '3'"
              v-model="item.conditions"
              placeholder="请选择"
              class="declare_select"
            >
              <el-option label="发明" :value="1"> </el-option>
              <el-option label="实用新型软著" :value="0"> </el-option>
            </el-select>
            <el-select
              v-else-if="item.conditions_id == '4'"
              v-model="item.conditions"
              placeholder="请选择"
              class="declare_select"
            >
              <el-option label="自主研发" :value="1"> </el-option>
              <el-option label="仅有受让，受赠和并购等" :value="0"> </el-option>
            </el-select>
            <el-radio-group
              v-else-if="
                item.conditions_id == '5' ||
                  item.conditions_id == '9' ||
                  item.conditions_id == '13'
              "
              v-model="item.conditions"
              class="declare_group"
            >
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
            <el-input
              v-else
              v-model="item.conditions"
              class="declare_input"
            ></el-input>
            <span class="declare_btn">
              <el-button type="info" @click="delDeclare(index)">移除</el-button>
              <el-button type="primary" @click="addDeclare()">添加</el-button>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="奖励制度">
          <div class="reward" v-for="(item, index) in reward" :key="index">
            奖励条件<el-input v-model="item.title"></el-input>
            <span class="declare_btn">
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
import {
  addPolicy,
  editPolicy,
  editSubmit,
  conditionsList,
  declareList, //编辑页面返回的申报标准列表
  rewardList //编辑页面返回的奖励制度列表
} from "@/api/policy-manage";
import { industryList, departList } from "@/api/area";
import areaList from "../../assets/areaList.js";
export default {
  data() {
    return {
      dialogForm: {
        industry_id: []
      },
      declare: [{ conditions_id: "", conditions: "" }],
      reward: [{ title: "" }],
      declareType: "1",
      rules: {
        //表单验证
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        region_id: [
          { required: true, message: "请选择地区", trigger: "change" }
        ],
        industry_id: [
          { required: true, message: "请选择行业", trigger: "blur" }
        ],
        department_id: [
          { required: true, message: "请选择部门", trigger: "blur" }
        ],
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
      options_depart: [],
      options_conditions: []
    };
  },
  components: {},
  watch: {},
  created() {
    this.industryList();
    this.departList();
    this.conditionsList();
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
    departList() {
      //部门列表
      departList(this.depart).then(res => {
        this.options_depart = res.data;
      });
    },
    conditionsList() {
      conditionsList().then(res => {
        this.options_conditions = res;
      });
    },
    editForm() {
      //编辑获取表单
      let id = this.$route.query.id;
      editPolicy(id).then(res => {
        this.dialogForm = {
          id: res.id,
          name: res.name,
          region_id: res.region_id,
          department_id: res.department_id,
          industry_id: [res.industry_id],
          project_time: res.project_time,
          start_time: res.start_time,
          end_time: res.end_time,
          object: res.object
        };
      });
      let policy_id = this.$route.query.id;
      declareList(policy_id).then(res => {
        let array = [];
        res.data.forEach(item => {
          array.push({
            conditions_id: item.conditions_id,
            conditions: item.conditions
          });
        });
        this.declare = array;
      });
      rewardList(policy_id).then(res => {
        let array = [];
        res.forEach(item => {
          array.push({
            title: item.title
          });
        });
        this.reward = array;
      });
    },
    delDeclare(index) {
      if (this.declare.length > 1) {
        this.declare.splice(index, 1);
      }
    },
    addDeclare() {
      this.declare.push({ conditions_id: "", conditions: "" });
    },
    delReward(index) {
      if (this.reward.length > 1) {
        this.reward.splice(index, 1);
      }
    },
    addReward() {
      this.reward.push({ title: "" });
    },
    submitAddForm(formName) {
      //新增提交
      let areaID = [];
      areaID.push(
        this.dialogForm.region_id[this.dialogForm.region_id.length - 1]
      );
      this.$delete(this.dialogForm, "id");
      this.$set(this.dialogForm, "region_id", areaID);
      this.$set(this.dialogForm, "declare", JSON.stringify(this.declare));
      this.$set(this.dialogForm, "reward", JSON.stringify(this.reward));
      addPolicy(this.dialogForm).then(res => {
        this.$router.go(-1);
      });
    },
    submitEditForm(formName) {
      //编辑提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$set(this.dialogForm, "id", this.$route.query.id);
          this.$set(this.dialogForm, "declare", JSON.stringify(this.declare));
          this.$set(this.dialogForm, "reward", JSON.stringify(this.reward));
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
    width: 90%;
    ::v-deep .selectClass {
      width: 100%;
    }
    .form-flex {
      display: flex;
      justify-content: space-between;
    }
    .declare {
      width: 100%;
      ::v-deep .el-select.selectConditions {
        width: calc((100% - 155px) * 0.4);
        margin-left: 18px;
        // .el-input {
        // }
      }
      ::v-deep .declare_input.el-input {
        width: calc((100% - 155px) * 0.4);
        margin: 0 20px 10px 20px;
      }
      ::v-deep .declare_select.el-select {
        margin: 0 20px 10px 20px;
        // width: 35%;
        width: calc((100% - 155px) * 0.4);
      }
      ::v-deep .el-radio-group.declare_group {
        margin: 0 20px 10px 20px;
        // width: 35%;
        width: calc((100% - 155px) * 0.4);
        .el-radio-button {
          margin-right: 36px;
        }
        .el-radio-button__inner {
          width: 100px;
          border-left: 1px solid #dcdfe6;
          box-shadow: none;
          border-radius: 4px;
        }
      }
      .declare_btn {
        position: absolute;
        right: 0;
      }
    }
    .reward {
      width: calc(100% - 100px);
      ::v-deep .el-input {
        width: 81.4%;
        margin: 0 20px 10px 20px;
      }
      .declare_btn {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
