/* 轮播图管理 */
<template>
  <div class="app-container">
    <div class="filter-container flex2">
      <div>
        <el-button type="primary" @click="addHandle()">添加</el-button>
      </div>
    </div>
    <!-- 放大图片预览功能 -->
    <Magnify :vSrc="imgSrc" :vShow="imgShow" v-on:close="closeBigImg"></Magnify>
    <el-table
      ref="multipleTable"
      :data="swiperData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column label="banner图片" align="center">
        <template slot-scope="scope">
          <img
            class="cover"
            @click="enlargeImg(scope.row.image)"
            :src="scope.row.image"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接" align="center">
        <template slot-scope="scope">{{ scope.row.url }}</template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">{{ scope.row.order }}</template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="230">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="editColData(scope.row)"
            icon="el-icon-edit"
            round
            plain
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="delectOneCol(scope.row.id)"
            icon="el-icon-delete"
            plain
            round
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="count > 0"
      :total="count"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    /> -->
    <el-dialog
      :modal="false"
      center
      :title="textMap[dialogStatus]"
      :visible.sync="swiperdialogVisible"
      width="800px"
    >
      <el-form
        ref="swiperForm"
        :rules="rules"
        :model="swiperForm"
        label-position="left"
        label-width="110px"
        width="30%"
      >
        <el-form-item label="图片" prop="imgs">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="uploadImg"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img
              v-if="swiperForm.image != ''"
              :src="swiperForm.image"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="swiperForm.url" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input v-model="swiperForm.order" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          round
          @click="
            dialogStatus == 'create'
              ? swiperAddSubmit('swiperForm')
              : swiperEditSubmit('swiperForm')
          "
          >提 交</el-button
        >
        <el-button plain round @click="closeSwiper()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  swiperList,
  uploadBase,
  addSwiperCommit,
  editSwiperCommit,
  deleteOneSwiper
} from "@/api/admin-manage.js";
import Magnify from "@/components/Imgmagnify";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination, Magnify },
  data() {
    return {
      swiperData: null,
      multipleSelection: [],
      listLoading: true,
      //   放大图片
      imgSrc: "",
      imgShow: false,
      // 添加/编辑
      swiperdialogVisible: false,
      swiperForm: {
        id: "",
        url: "",
        image: "",
        order: "",
        type: 1
      },
      image: "",
      rules: {
        url: [{ message: "请输入链接(商品ID)", trigger: "blur" }],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
        order: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      dialogStatus: "",
      textMap: {
        create: "添加",
        update: "编辑"
      },
      listQuery: {
        pageindex: 1,
        pagesize: 10
      },
      count: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      swiperList(this.listQuery).then(resp => {
        this.swiperData = resp;
        this.count = resp.count;
        this.listLoading = false;
      });
    },
    getbindAwardsList() {
      bindAwardsList().then(resp => {
        this.awardsSelectData = resp;
      });
    },
    enlargeImg(src) {
      //放大
      this.imgSrc = src;
      this.imgShow = true;
    },
    closeBigImg() {
      this.imgShow = false;
    },
    uploadImg(file) {
      this.getBase64(file.raw).then(res => {
        this.image = res.split(",")[1];
        uploadBase({ image: this.image }).then(resp => {
          //   this.swiperForm.image = "http://192.168.1.8:8012/" + resp.path;
          this.swiperForm.image = resp.path;
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
    // 清除弹窗缓存数据
    resetTemp() {
      this.swiperForm = {
        id: "",
        image: "",
        url: "",
        order: "",
        type: 1
      };
    },
    addHandle() {
      this.swiperdialogVisible = true;
      this.resetTemp();
      this.dialogStatus = "create";
      this.$nextTick(() => {
        this.$refs["swiperForm"].clearValidate();
      });
    },

    // 获得当前编辑行数据
    editColData(row) {
      this.resetTemp();
      this.dialogStatus = "update";
      this.swiperdialogVisible = true;
      this.$nextTick(() => {
        this.$refs["swiperForm"].clearValidate();
      });
      this.swiperForm = { ...row };
    },
    swiperAddSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addSwiperCommit(this.swiperForm).then(resp => {
            this.getList();
            this.swiperdialogVisible = false;
          });
        }
      });
    },
    // 编辑提交
    swiperEditSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editSwiperCommit(this.swiperForm).then(resp => {
            this.getList();
            this.swiperdialogVisible = false;
          });
        }
      });
    },
    closeSwiper() {
      this.swiperdialogVisible = false;
      this.resetTemp();
      this.getList();
    },
    delectOneCol(id) {
      this.$confirm("此操作将永久删除此张轮播图, 是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(() => {
          deleteOneSwiper(id).then(response => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.flex2 {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 378px;
  height: 178px;
  display: block;
  border-radius: 8px;
}
.cover {
  width: 100px;
  height: 50px;
  border-radius: 8px;
}
</style>
