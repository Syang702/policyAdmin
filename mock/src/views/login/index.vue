<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="title">健康商城</div>
      </div>

      <el-form-item prop="username">
        <svg-icon icon-class="user"/>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          clearable
        />
      </el-form-item>

      <el-form-item prop="password">
        <svg-icon icon-class="password"/>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入登录密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
          clearable
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        style="width:100%;margin-top:100px;"
        @click.native.prevent="handleLogin"
      >登 录</el-button>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error("请输入正确的账号"));
    //   } else {
    //     callback();
    //   }
    // };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: '请输入账号', }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        //  this.redirect = route.query && route.query.redirect;
        this.redirect ='/';
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #333333;
$cursor: #46b3ac;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

// 账号密码输入框样式
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: #46b3ac;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        color: $light_gray;
        -webkit-text-fill-color: $light_gray !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #46b3ac;
$dark_gray: #889aa4;
$light_gray: #46b3ac;

.login-container {
  min-height: 100%;
  background-color: $bg;
  overflow: hidden;

  display: flex;
  justify-content: space-between;

  .login-form {
    position: relative;
    width: 520px;
    margin: auto;
    height: 700px;
    background-color: #ffffff;
    max-width: 100%;
    padding: 60px 73px 0;
    overflow: hidden;
    z-index: 99;
    // 提示语
    .title-container {
      .title {
        font-size: 36px;
        color: $light_gray;
        font-weight: bold;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  // 登录按钮
  .el-button {
    background-color: #46b3ac;
    color: #ffffff;
    border-radius: 10px;
    font-weight: bold;
    font-size: 26px;
  }
}

// 输入框
.el-form-item {
  background-color: #ffffff;
  color: #666666;
  border-bottom: 1px solid #aaaaaa;
  margin-top: 39px;
}
</style>
