 <!--  基础图片 -->
<template>
  <div>
    <el-image
      :style="{width:imgWidth?imgWidth:'',height: imgHeight?imgHeight:''}"
      :src="imgSrc"
      fit="contain"
      :preview-src-list="imgPreview?[imgSrc]:[]"
    >
      <div
        slot="error"
        :style="{width:imgWidth,lineHeight:imgHeight}"
        style="background-color: #f5f7fa;color: #C0C4CC;text-align: center;"
      >暂无图片</div>
    </el-image>
  </div>
</template>

<script>
export default {
  name: "myImg",
  props: {
    imgSrc: {
      type: String,
      default: "",
    },
    imgWidth: {
      type: String,
      default: "150px",
    },
    imgHeight: {
      type: String,
      default: "150px",
    },
    imgPreview: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  created() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>