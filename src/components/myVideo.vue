<template>
  <div>
    <video :src="src" controls="controls" @click="preview()"></video>
    <myMask ref="myMask">
      <video :src="src" width="900px" height="600px" controls="controls"></video>
    </myMask>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    preview() {
      this.$nextTick(() => {
        this.$refs.myMask.showMaskFun();
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>