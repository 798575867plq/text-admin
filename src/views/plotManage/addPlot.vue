<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item label="上传新手引导video">
        <myUpload></myUpload>
      </el-form-item>
      <el-form-item label="上传剧情示例video">
        <myUpload></myUpload>
      </el-form-item>
      <el-form-item label="剧情标签">
        <multipleTag></multipleTag>
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="小编一句话短评">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button plain @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import myUpload from "../../components/myUpload";
import multipleTag from "../../components/multipleTag";

export default {
  components: {
    myUpload,
    multipleTag,
  },
  data() {
    return {
      form: {},
      input: "",
    };
  },
  methods: {
    uploadFile(e) {
      console.log(e);
    },
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-form {
  margin: 10px auto;
  width: 40%;
  .el-form-item__content {
    display: flex;
  }
  label {
    font-size: 16px;
    font-weight: bold;
  }
}

.submit-btn {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  button {
    width: 150px;
  }
}
</style>