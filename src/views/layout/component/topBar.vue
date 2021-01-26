<template>
  <div>
    <el-header>
      <myBreadcrumb></myBreadcrumb>
      <div>
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{$store.state.user.userInfo.userName}}</span>
      </div>
    </el-header>
  </div>
</template>

<script>
import myBreadcrumb from "../../../components/myBreadcrumb";
export default {
  components: {
    myBreadcrumb,
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.user.userInfo.userName);
  },
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        console.log(this.$store);
        this.$store.dispatch("user/logout").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 56px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 56px !important;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-aside {
  color: #333;
}
</style>