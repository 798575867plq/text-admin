
<template>
  <div class="radio-box">
    <!--  单选 -->
    <div
      class="item-box"
      v-for="(item,index) in radioArr"
      :key="index"
      @click="goChoose(item,index)"
      :class="activeNum==index?'active-box':''"
    >{{item.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    radioArr: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      activeNum: 0,
    };
  },
  methods: {
    goChoose(item, index) {
      this.activeNum = index;
      this.$emit("chooseItem", item);
    },
  },
};
</script>

<style lang="less" scoped>
.radio-box {
  display: flex;
  align-items: center;

  .item-box {
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #999;
    cursor: pointer;
  }
  .active-box {
    border: 1px solid #409EFF;
    color: #409EFF;
  }
}
</style>