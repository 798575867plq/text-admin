<template>
  <div>
    <div class="items-box">
      <div
        class="item-box"
        v-for="(item,index) in tagList"
        :key="index"
        @click="getItem(item)"
        :class="item.isActive?'active-box':''"
      >{{item[tagKey]}}音</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tagKey: {
      type: String,
      default: "name",
    },
  },
  data() {
    return {
      activeArr: [],
    };
  },
  created() {
    this.tagList.forEach((ele) => {
      this.$set(ele, "isActive", false);
    });
  },
  methods: {
    getItem(item) {
      if (item.isActive) {
        item.isActive = false;
        this.activeArr.splice(
          this.activeArr.findIndex((ele) => {
            ele.id == item.id;
          }, 1)
        );
      } else {
        item.isActive = true;
        this.activeArr.push(item);
      }
      console.log(this.activeArr);
      this.$emit("getActive", this.activeArr);
    },
  },
};
</script>

<style lang="less" scoped>
.items-box {
  display: flex;
  flex-wrap: wrap;
  .item-box {
    border: 1px solid #53a8ff;
    color: #53a8ff;
    font-size: 12px;
    padding: 0px 15px;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .active-box {
    background-color: #53a8ff;
    color: #ffffff;
  }
}
</style>