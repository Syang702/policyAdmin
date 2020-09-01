<template>
  <div class="app-container">
    <div class="row-space">
      <el-row>
        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
          <el-form ref="protocolForm" :model="protocolForm" label-width="150px">
            <el-form-item label="标题">
              <el-input v-model="protocolForm.title"></el-input>
            </el-form-item>
            <el-form-item label="正文">
              <el-input type="textarea" v-model="protocolForm.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-upload2"
                plain
                round
                type="primary"
                @click="handleSubmit"
              >立即提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { originalProtocol, regProtocolCommit } from "@/api/user-center";

export default {
  data() {
    return {
      protocolForm: {
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let type = 1;
      originalProtocol(type).then(resp => {
        this.protocolForm = resp;
      });
    },
    handleSubmit() {
      regProtocolCommit(this.protocolForm).then(resp => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.row-space {
  margin-top: 50px;
}
</style>
