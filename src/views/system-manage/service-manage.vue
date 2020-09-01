/* 客服管理 */
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="客服电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="客服邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="客服微信" prop="wx">
          <el-input v-model="ruleForm.wx"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="qq">
          <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="客服微信二维码">
          <el-upload
            class="editor-upload-btn"
            action
            :show-file-list="false"
            :on-change="onchange"
            :auto-upload="false"
            name="image"
          >
            <!-- <el-button size="small" type="primary" -->
            <el-button size="small" type="primary" v-if="ruleForm.code == ''"
              >上传客服微信二维码</el-button
            >
            <img
              class="editimg"
              v-else
              :src="ruleForm.code"
              style="width:150px;height:150px"
              alt
            />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="btn" style="display:flex;  justify-content: center;">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  selService, //客服列表
  addService,
  delService,
  editService,
  editServiceCommit, //编辑提交
  uploadBase
} from "@/api/admin-manage";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        phone: [{ required: true, message: "请输入客服名字", trigger: "blur" }],
        qq: [{ required: true, message: "请输入客服QQ", trigger: "blur" }],
        email: [{ required: true, message: "请输入客服邮箱", trigger: "blur" }],
        wx: [{ required: true, message: "请输入客服邮箱", trigger: "blur" }]
      }
    };
  },
  created() {
    this.selService();
  },
  methods: {
    selService() {
      selService().then(res => {
        if (res[0].id) {
          this.ruleForm = {
            id: res[0].id,
            phone: res[0].phone,
            qq: res[0].qq,
            email: res[0].email,
            wx: res[0].wx,
            code: res[0].code
          };
        }
      });
    },
    submitForm(formName) {
      //添加客服
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id) {
            editServiceCommit(this.ruleForm).then(res => {
              this.selService();
            });
          } else {
            addService(this.ruleForm).then(res => {
              this.selService();
            });
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //   上传图片
    onchange(file) {
      this.getBase64(file.raw).then(res => {
        this.image = res.split(",")[1];
        uploadBase({ image: this.image }).then(resp => {
          //   this.ruleForm.code = "http://192.168.1.8:8012/" + resp.path;
          this.ruleForm.code = resp.path;
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
    }
  }
};
</script>
