/* 个人中心 */
<template>
  <div class="personal_center">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="头像">
        <div class="imgAvator">
          <!-- <el-avatar :size="100" :src="circleUrl" fit="fill"></el-avatar> -->
          <img :src="circleUrl" alt="" />
        </div>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" class="password">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="20">
            <el-input
              v-model="form.name"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-col>
          <el-col :span="4" class="editpass">
            <el-button type="primary" @click="editPassword()"
              >修改密码</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="后台角色">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="logout">
      <el-button type="info" @click="logout()">注销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: require("../../assets/images/gold-coin.png"),
      form: {}
    };
  },
  components: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    editPassword() {},
    logout() {}
  }
};
</script>

<style scoped lang="scss">
.personal_center {
  padding: 20px;
  ::v-deep .el-form-item__label {
    padding: 0 30px 0 0;
  }
  //   ::v-deep .el-form-item__content {
  //     width: 800px;
  //   }
  ::v-deep .editpass.el-col {
    display: flex;
    justify-content: flex-end;
  }
  .imgAvator {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: fill;
    }
  }
  .logout {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
