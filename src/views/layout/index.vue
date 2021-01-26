<template>
  <div>
    <el-container>
      <sideBar></sideBar>
      <el-container class="right-box">
        <topBar></topBar>
        <scrollBar></scrollBar>
        <appMain></appMain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from "../layout/component/sideBar";
import topBar from "../layout/component/topBar";
import scrollBar from "../layout/component/scrollBar";
import appMain from "../layout/component/appMain";

export default {
  components: {
    sideBar,
    topBar,
    scrollBar,
    appMain,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.right-box {
  display: block;
}
</style>



