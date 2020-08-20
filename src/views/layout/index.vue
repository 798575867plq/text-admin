<template>
  <div>
    <el-container>
      <sideBar></sideBar>
      <el-container class="right-box">
        <topBar></topBar>
        <appMain></appMain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from "../layout/component/sideBar";
import topBar from "../layout/component/topBar";
import appMain from "../layout/component/appMain";

export default {
  components: {
    sideBar,
    topBar,
    appMain
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.right-box {
  display: block;
}
</style>



