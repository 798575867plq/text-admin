<template>
  <div class="all-box">
    <el-form ref="form" :model="addFormQuery">
      <el-form-item label="标题">
        <el-input v-model="addFormQuery.name"></el-input>
      </el-form-item>
      <el-form-item label="优惠劵模板">
        <el-select v-model="addFormQuery.releaseId" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="addFormQuery.type">
          <el-radio :label="1">自动发放</el-radio>
          <el-radio :label="2">手动领取</el-radio>
          <el-radio :label="3">兑换码</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="有效期">
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="发放对象">
        <el-radio-group v-model="addFormQuery.target">
          <el-radio :label="1" disabled>全部用户</el-radio>
          <el-radio :label="2" disabled>角色</el-radio>
          <el-radio :label="3">指定用户</el-radio>
          <el-radio :label="4" disabled>按用户属性发放</el-radio>
          <el-radio :label="5" disabled>按用户行为发放</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input type="textarea" placeholder="请用,分隔开" :rows="4" v-model="ids"></el-input>
      </el-form-item>
      <el-form-item class="form-btn">
        <el-button type="success" plain @click="publish()">发布</el-button>
        <el-button type="primary" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      addFormQuery: {
        name: "",
        type: "",
        releaseId: "",
        startTime: "",
        endTime: "",
        target: "",
        targetArray: [],
      },
      ids: "",
      dateTime: [],
      options: [],
    };
  },
  created() {
    this.getCouponList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getCouponList() {
      this.$api.operationManage.releaseList().then((res) => {
        this.options = res;
      });
    },
    publish() {
      this.addFormQuery.startTime = this.dateTime[0];
      this.addFormQuery.endTime = this.dateTime[1];
      this.addFormQuery.targetArray = this.ids.split(",");
      this.$api.operationManage.addCoupon(this.addFormQuery).then((res) => {
        console.log(res);
        this.$message({
          type: "success",
          message: "添加成功",
        });
        this.addFormQuery = {
          name: "",
          type: "",
          releaseId: "",
          startTime: "",
          endTime: "",
          target: "",
          targetArray: [],
        };
        this.dateTime = [];
        this.ids = "";
      });
      console.log(this.addFormQuery);
      console.log(this.ids.split(","));
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-form {
  margin: 40px auto;
  width: 60%;
  .el-form-item {
    // display: flex;
    align-items: center;
  }
  label {
    font-size: 16px;
    font-weight: bold;
    // flex: 1;
    margin-right: 30px;
  }
  .el-form-item__content {
    flex: 2;
    text-align: left;
    .el-input {
      width: 400px;
    }
    .el-textarea {
      width: 400px;
    }
  }
}

.form-btn {
  margin-top: 50px;
  margin-left: 20%;
}
</style>