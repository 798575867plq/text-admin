<template>
  <!-- 遮罩层 -->
  <div>
    <div
      class="mask"
      :style="showMask?'display:block':'display:none;'"
      id="mask"
      @click="closeMask()"
    >
      <div class="content" @click="clickContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMask: false,
    };
  },
  methods: {
    showMaskFun() {
      this.showMask = true;
    },
    closeMask() {
      this.showMask = false;
    },
    // 阻止冒泡，点击自身不会被关闭
    clickContent(e) {
      e.stopPropagation();
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  z-index: 2;
  //   display: none;
  .content {
    margin: 150px;
  }
}
.mask::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(20px);
  z-index: -1;
}
</style>