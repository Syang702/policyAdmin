<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="24" :sm="14" :md="9" :lg="7" :xl="6">
        <el-form ref="registerForm" :model="registerForm" label-width="150px">
          <el-form-item label="邀请码">
            <el-input @blur="inputblur" v-model="uuid"></el-input>
          </el-form-item>
          <el-form-item label="推荐人">
            <el-input disabled v-model="registerForm.parent_member"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input disabled v-model="registerForm.nick_name"></el-input>
          </el-form-item>
          <el-form-item label="会员手机号">
            <el-input v-model="registerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="registerForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认登录密码">
            <el-input v-model="registerForm.password_re" show-password></el-input>
          </el-form-item>
          <el-form-item label="二级密码">
            <el-input v-model="registerForm.pay_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认二级密码">
            <el-input v-model="registerForm.pay_password_re" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-upload2" plain round type="primary" @click="handleSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { blurRegInfo, regCommit } from "@/api/user-center";

export default {
  data() {
    return {
      uuid: "",
      registerForm: {
        parent_member: "",
        nick_name: "",
        phone: "",
        password: "",
        pay_password: "",
        password_re: "",
        pay_password_re: ""
      }
    };
  },
  created() {},
  methods: {
    inputblur() {
      blurRegInfo(this.uuid).then(resp => {
        console.log(resp);
        this.registerForm.parent_member = resp.member;
        this.registerForm.nick_name = resp.nick_name;
      });
    },
    handleSubmit() {
      regCommit(this.registerForm).then(resp => {
        this.$router.push({ path: "/member-list" });
      });
    }
  }
};
</script>

<style>
</style>
