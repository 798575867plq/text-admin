<template>
  <div>
    <div class="img-box" :style="{width:imgWidth?imgWidth:''}">
      <div class="my-img-box">
        <myImg :imgSrc="imgSrc" :imgWidth="imgWidth" :imgHeight="imgHeight"></myImg>
        <div v-if="showChecked" class="check-box">
          <el-checkbox @change="postCheck" v-model="checkData"></el-checkbox>
        </div>
      </div>

      <div class="del-icon" v-if="showDelete" @click="delImg()">
        <i class="el-icon-error"></i>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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
    showDelete: {
      type: Boolean,
      default: false,
    },
    showChecked: {
      type: Boolean,
      default: false,
    },
    checkValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkData: false,
    };
  },
  created() {
    console.log(this.checkValue);
    this.$nextTick(() => {
      this.checkData = this.checkValue;
    });
  },
  watch: {
    checkValue: {
      handler(newV, oldV) {
        this.checkData = newV;
        console.log(newV, oldV, "检测");
      },
      deep: true,
    },
  },
  methods: {
    postCheck(value) {
      this.$emit("getChecked", value);
    },
    delImg() {
      this.$emit("delImg", true);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-checkbox {
  font-size: 18px;
}

.img-box {
  position: relative;
  margin-right: 30px;
  margin-top: 10px;
  .del-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 20px;
  }
}

.my-img-box {
  position: relative;
  .check-box {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}
</style>