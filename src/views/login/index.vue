<template>
  <div class="all-box">
    <div class="login-box">
      <div>
        <h1 style="color:#fff">幻影未来后台管理系统</h1>
      </div>
      <el-form
        :rules="rules"
        :model="loginQuery"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginQuery.username"
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
          <el-button
            class="login-btn"
            type="primary"
            :loading="isLoading"
            @click="submitForm('ruleForm')"
          >登录</el-button>
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
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码", trigger: "blur" },
        ],
      },
      loginQuery: {
        username: "admin",
        password: "123456",
      },
      isLoading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.isLoading = true;
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginQuery)
            .then((res) => {
              this.isLoading = false;
              this.$router.push({ path: "/home" });
              this.$refs[formName].resetFields();
            })
            .catch(() => {
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
  },
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
    width: 380px;
    margin-top: 220px;
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