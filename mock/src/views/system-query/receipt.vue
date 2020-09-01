<template>
  <div class="app-container">
    <Magnify :vSrc="imgSrc" :vShow="imgShow" v-on:close="closeBigImg"></Magnify>
    <el-tabs type="border-card" v-model="activeName2" @tab-click="getList">
      <el-tab-pane name="1">
        <span slot="label">
          <i class="el-icon-date"></i> 银行卡设置
        </span>
        <div class="filter-container" style="display:flex;justify-content:flex-end;">
          <el-button
            size="small"
            icon="el-icon-circle-plus-outline"
            plain
            round
            @click="bankAddHandle"
          >添加</el-button>
        </div>

        <el-table
          :data="bankData"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="Loading"
          fit
          border
          stripe
          highlight-current-row
        >
          <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
          <el-table-column prop="bank_name" label="开户行" align="center"></el-table-column>
          <el-table-column prop="bank_open" label="开户支行" align="center"></el-table-column>
          <el-table-column prop="bank_open_name" label="开户名" align="center"></el-table-column>
          <el-table-column prop="bank_number" label="银行卡号" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                type="primary"
                round
                plain
                icon="el-icon-edit"
                size="small"
                @click="bankEditHandle(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="danger"
                round
                plain
                icon="el-icon-delete"
                size="small"
                @click="deleteHandle(scope.row.id,'1')"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" label="支付宝设置">
        <div class="filter-container" style="display:flex;justify-content:flex-end;">
          <el-button
            size="small"
            icon="el-icon-circle-plus-outline"
            plain
            round
            @click="aliAddHandle"
          >添加</el-button>
        </div>
        <el-table
          :data="aliData"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="Loading"
          fit
          border
          stripe
          highlight-current-row
        >
          <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
          <el-table-column prop="ali_number" label="支付宝账号" align="center"></el-table-column>
          <el-table-column prop="ali_name" label="支付宝昵称" align="center"></el-table-column>
          <el-table-column prop="ali_image" label="收款码" align="center">
            <template slot-scope="scope">
              <img
                class="cover"
                @click="enlargeImg(scope.row.ali_image)"
                :src="scope.row.ali_image"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                type="primary"
                round
                plain
                icon="el-icon-edit"
                size="small"
                @click="aliEditHandle(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="danger"
                round
                plain
                icon="el-icon-delete"
                size="small"
                @click="deleteHandle(scope.row.id,'2')"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="3" label="微信设置">
        <div class="filter-container" style="display:flex;justify-content:flex-end;">
          <el-button
            size="small"
            icon="el-icon-circle-plus-outline"
            plain
            round
            @click="wxAddHandle"
          >添加</el-button>
        </div>
        <el-table
          :data="wxData"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="Loading"
          fit
          border
          stripe
          highlight-current-row
        >
          <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
          <el-table-column prop="wx_name" label="微信账号" align="center"></el-table-column>
          <el-table-column prop="wx_number" label="微信昵称" align="center"></el-table-column>
          <el-table-column prop="wx_image" label="收款二维码" align="center">
            <template slot-scope="scope">
              <img
                class="cover"
                @click="enlargeImg(scope.row.wx_image)"
                :src="scope.row.wx_image"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                type="primary"
                round
                plain
                icon="el-icon-edit"
                size="small"
                @click="wxEditHandle(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="danger"
                round
                plain
                icon="el-icon-delete"
                size="small"
                @click="deleteHandle(scope.row.id,'3')"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 银行卡添加编辑弹窗 -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="bankDialog"
      width="50%"
    >
      <el-form
        ref="bank"
        :rules="bankRules"
        :model="bank"
        label-position="left"
        label-width="120px"
        width="30%"
      >
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input v-model="bank.id"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bank_name">
          <el-input v-model="bank.bank_name"></el-input>
        </el-form-item>
        <el-form-item label="开户支行" prop="bank_open">
          <el-input v-model="bank.bank_open"></el-input>
        </el-form-item>
        <el-form-item label="开户名" prop="bank_open_name">
          <el-input v-model="bank.bank_open_name"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_number">
          <el-input v-model="bank.bank_number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?bankAddSubmitHandle('bank'):bankEditSubmitHandle('bank')"
          >提交</el-button>
          <el-button plain round @click="bankDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 支付宝添加编辑弹窗 -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="aliDialog"
      width="50%"
    >
      <el-form
        ref="ali"
        :rules="aliRules"
        :model="ali"
        label-position="left"
        label-width="120px"
        width="30%"
      >
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input v-model="ali.id"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号" prop="ali_number">
          <el-input v-model="ali.ali_number"></el-input>
        </el-form-item>
        <el-form-item label="支付宝昵称" prop="ali_name">
          <el-input v-model="ali.ali_name"></el-input>
        </el-form-item>
        <el-form-item label="收款码" prop="ali_image">
          <img class="editimg" v-if="ali.ali_image!=''" :src="ali.ali_image" alt />
          <el-upload
            class="editor-upload-btn"
            action
            :show-file-list="false"
            :on-progress="onchange"
            name="image"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?aliAddSubmitHandle('ali'):aliEditSubmitHandle('ali')"
          >提交</el-button>
          <el-button plain round @click="aliDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 微信添加编辑弹窗 -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="wxDialog"
      width="50%"
    >
      <el-form
        ref="wx"
        :rules="wxRules"
        :model="wx"
        label-position="left"
        label-width="120px"
        width="30%"
      >
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input v-model="wx.id"></el-input>
        </el-form-item>
        <el-form-item label="微信账号" prop="wx_number">
          <el-input v-model="wx.wx_number"></el-input>
        </el-form-item>
        <el-form-item label="微信昵称" prop="wx_name">
          <el-input v-model="wx.wx_name"></el-input>
        </el-form-item>
        <el-form-item label="收款码" prop="wx_image">
          <img class="editimg" v-if="wx.wx_image!=''" :src="wx.wx_image" alt />
          <el-upload
            class="editor-upload-btn"
            action
            :show-file-list="false"
            :on-progress="onchangewx"
            name="image"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            round
            @click="dialogStatus=='create'?wxAddSubmitHandle('wx'):wxEditSubmitHandle('wx')"
          >提交</el-button>
          <el-button plain round @click="wxDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  receiptList,
  receiptAddSubmit,
  receiptEditSubmit,
  editFinancialColData,
  deleteReceiptSubmit,
  uploadFile
} from "@/api/system-query";
import Magnify from "@/components/Imgmagnify";
export default {
  components: { Magnify },
  name: "Tab",
  data() {
    return {
      activeName2: "1",
      listLoading: false,
      bankData: null,
      bankDialog: false,
      bank: {
        type: "1",
        bank_name: "",
        bank_open: "",
        bank_open_name: "",
        bank_number: ""
      },
      aliData: null,
      aliDialog: false,
      ali: {
        type: "2",
        ali_number: "",
        ali_name: "",
        ali_image: ""
      },
      wxData: null,
      wxDialog: false,
      wx: {
        type: "3",
        wx_number: "",
        wx_name: "",
        wx_image: ""
      },
      dialogStatus: "",
      textMap: {
        create: "添加",
        update: "编辑"
      },
      bankRules: {
        bank_name: [{ required: true, message: "请输入", trigger: "blur" }],
        bank_open: [{ required: true, message: "请输入", trigger: "change" }],
        bank_open_name: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        bank_number: [{ required: true, message: "请输入", trigger: "change" }]
      },
      aliRules: {
        ali_number: [{ required: true, message: "请输入", trigger: "blur" }],
        ali_name: [{ required: true, message: "请输入", trigger: "change" }],
        ali_image: [{ required: true, message: "请输入", trigger: "change" }]
      },
      wxRules: {
        wx_number: [{ required: true, message: "请输入", trigger: "blur" }],
        wx_name: [{ required: true, message: "请输入", trigger: "change" }],
        wx_image: [{ required: true, message: "请输入", trigger: "change" }]
      },
      //   放大图片
      imgSrc: "",
      imgShow: false
    };
  },
  mounted() {
    this.getList(1);
  },
  methods: {
    getList(activeName2) {
      if (activeName2 == 1) {
        //   默认请求
        let type = 1;
        this.listLoading = true;
        receiptList(type).then(resp => {
          this.bankData = resp;
          this.listLoading = false;
        });
      } else if (activeName2 == 2) {
        let type = 2;
        this.listLoading = true;
        receiptList(type).then(resp => {
          this.aliData = resp;
          this.listLoading = false;
        });
      } else if (activeName2 == 3) {
        let type = 3;
        this.listLoading = true;
        receiptList(type).then(resp => {
          this.wxData = resp;
          this.listLoading = false;
        });
      } else {
        let type = activeName2.name;
        if (type == 1) {
          receiptList(type).then(resp => {
            this.bankData = resp;
          });
        } else if (type == 2) {
          receiptList(type).then(resp => {
            this.aliData = resp;
          });
        } else if (type == 3) {
          receiptList(type).then(resp => {
            this.wxData = resp;
          });
        }
      }
    },
    bankAddHandle() {
      this.bankReset();
      this.dialogStatus = "create";
      this.bankDialog = true;
    },
    bankAddSubmitHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          receiptAddSubmit(this.bank).then(resp => {
            this.bankDialog = false;
            this.getList(1);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bankEditHandle(id) {
      this.bankReset();
      this.dialogStatus = "update";
      this.bankDialog = true;
      editFinancialColData(id).then(resp => {
        this.bank = resp;
      });
    },
    aliEditHandle(id) {
      this.aliReset();
      this.dialogStatus = "update";
      this.aliDialog = true;
      editFinancialColData(id).then(resp => {
        this.ali = resp;
      });
    },
    wxEditHandle(id) {
      this.wxReset();
      this.dialogStatus = "update";
      this.wxDialog = true;
      editFinancialColData(id).then(resp => {
        this.wx = resp;
      });
    },
    bankEditSubmitHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          receiptEditSubmit(this.bank).then(resp => {
            this.bankDialog = false;
            this.getList(1);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bankReset() {
      this.type = "1";
      this.bank_name = "";
      this.bank_open = "";
      this.bank_open_name = "";
      this.bank_number = "";
    },
    deleteHandle(id, type) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteReceiptSubmit(id).then(response => {
            if (type == 1) {
              this.getList(1);
            } else if (type == 2) {
              this.getList(2);
            } else if (type == 3) {
              this.getList(3);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    aliAddHandle() {
      this.aliReset();
      this.dialogStatus = "create";
      this.aliDialog = true;
    },
    wxAddHandle() {
      this.wxReset();
      this.dialogStatus = "create";
      this.wxDialog = true;
    },
    aliAddSubmitHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          receiptAddSubmit(this.ali).then(resp => {
            this.aliDialog = false;
            this.getList(2);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    aliEditSubmitHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          receiptEditSubmit(this.ali).then(resp => {
            this.aliDialog = false;
            this.getList(2);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    wxAddSubmitHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          receiptAddSubmit(this.wx).then(resp => {
            this.wxDialog = false;
            this.getList(3);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    wxEditSubmitHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          receiptEditSubmit(this.wx).then(resp => {
            this.wxDialog = false;
            this.getList(3);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bankReset() {
      this.bank = {
        type: "1",
        bank_name: "",
        bank_open: "",
        bank_open_name: "",
        bank_number: ""
      };
    },
    aliReset() {
      this.ali = {
        type: "2",
        ali_number: "",
        ali_name: "",
        ali_image: ""
      };
    },
    wxReset() {
      this.wx = {
        type: "3",
        wx_number: "",
        wx_name: "",
        wx_image: ""
      };
    },
    onchange(event, file) {
      let formData = new FormData();
      formData.append("image", file.raw);
      uploadFile(formData).then(resp => {
        this.ali.ali_image = resp.path;
      });
    },
    onchangewx(event, file) {
      let formData = new FormData();
      formData.append("image", file.raw);
      uploadFile(formData).then(resp => {
        this.wx.wx_image = resp.path;
      });
    },
    enlargeImg(src) {
      this.imgSrc = src;
      this.imgShow = true;
    },
    closeBigImg() {
      this.imgShow = false;
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
.cover {
  width: 150px;
  height: 50px;
}
</style>
