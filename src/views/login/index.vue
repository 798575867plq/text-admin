<template>
  <div class="all-box">
    <div class="login-box">
      <div>
        <h1>幻影未来后台管理系统</h1>
      </div>
      <el-form
        :rules="rules"
        :model="loginQuery"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginQuery.account"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-tools"
            placeholder="请输入密码"
            v-model="loginQuery.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码", trigger: "blur" }
        ]
      },
      loginQuery: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.replace({ path: "/" });
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-form-item__content {
  margin-left: 0px !important;
}

.all-box {
  display: flex;
  justify-content: center;
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  color: #ffffff;
  .login-box {
    width: 420px;
    margin-top: 200px;
    div {
      margin-top: 20px;
    }
    .login-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>