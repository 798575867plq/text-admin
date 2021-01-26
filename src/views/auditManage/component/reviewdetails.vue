<template>
  <div class="actordetails">
    <el-form ref="form" :model="detailData">
      <el-form-item label="用户头像">
        <myImg :imgSrc="detailData.face"></myImg>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="detailData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="语音签名">
        <audio :src="detailData.soundUrl" controls="controls"></audio>
      </el-form-item>
      <el-form-item label="标签">
        <multipleTag :tagList="tagList"></multipleTag>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input type="textarea" :rows="2" v-model="detailData.selfSign"></el-input>
      </el-form-item>
      <el-form-item label="审核意见">
        <el-input type="textarea" :rows="5" v-model="passQuery.reason"></el-input>
      </el-form-item>
      <el-form-item class="adopt">
        <el-button type="success" plain @click="pass()">通过</el-button>
        <el-button type="danger" plain @click="nopass()">不通过</el-button>
        <el-button type="primary" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import myImage from "../../../components/myImage";
import multipleTag from "../../../components/multipleTag";

export default {
  components: {
    myImage,
    multipleTag,
  },
  data() {
    return {
      tagList: [],
      listQuery: {
        applyId: "1598692038153813371",
      },
      detailData: {},
      passQuery: {
        reason: "",
      },
    };
  },
  created() {
    // this.listQuery.applyId = this.$route.query.id;
    this.getList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 演员详情
    getList() {
      this.$api.auditManage.Actordetails(this.listQuery).then((res) => {
        console.log(res);
        this.detailData = res.actorDetail;
        this.tagList = res.soundTag;
      });
    },
    pass() {
      if (!this.passQuery.reason) {
        this.$message({ type: "warning", message: "请输入原因" });
        return false;
      }
      console.log(this.passQuery.reason);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-form {
  margin: 10px auto;
  width: 40%;
  .el-form-item_content {
    display: flex;
  }
  label {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>