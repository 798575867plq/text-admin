<template>
  <div>
    <div class="top-box">
      <div class="top-left">
        <div>修改时间：2020-07-14 14:00:50</div>
        <div>类型：删除/新增/修改</div>
        <div>操作人：张三</div>
      </div>
      <div>
        <el-button type="primary" size="mini" v-if="showHide">隐藏</el-button>
        <el-button type="danger" size="mini" v-if="showDel">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHide: {
      type: Boolean,
      defalut: false,
    },
    showDel: {
      type: Boolean,
      defalut: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.top-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b3d8ff;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  .top-left {
    display: flex;
    div {
      margin-right: 50px;
    }
  }
}
</style>