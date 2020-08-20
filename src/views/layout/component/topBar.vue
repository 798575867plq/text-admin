<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 56px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 56px !important;
  margin-bottom: 20px;
}

.el-aside {
  color: #333;
}
</style>