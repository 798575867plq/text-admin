<template>
  <div>
    <div class="scroll-box">
      <div class="items-box">
        <el-tag
          class="item-box"
          v-for="(tag,index) in tags"
          :key="index"
          :closable="tag.name!='首页'"
          @close="handleClose(tag)"
          :effect="isActive(tag)?'dark':'plain'"
          @click="goView(tag)"
        >{{tag.name}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTag: "",
      tags: [
        // {
        //   name: "首页",
        //   path: "/home/index",
        // },
      ],
    };
  },
  created() {
    this.tags = this.$store.getters.visitedViews;
    console.log(this.$store.getters.visitedViews, this.$route);
    // this.tags = JSON.parse(sessionStorage.getItem("visitedViews"));
    // console.log(sessionStorage.getItem("visitedViews"));
  },
  methods: {
    isActive(tag) {
      return tag.path == this.$route.path;
    },
    goView(tag) {
      this.currentTag = tag;
      this.$router.replace({
        path: tag.path,
        query: {
          t: +new Date(), //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        },
      });
    },
    getIndex() {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].path == this.$route.path) {
          return i;
        }
      }
    },
    handleClose(tag) {
      // 如果删除得是选中项，那么选中项会变为前面一项
      if (this.isActive(tag)) {
        this.$router.replace({
          path: this.tags[this.getIndex() - 1].path,
          query: {
            t: +new Date(), //保证每次点击路由的query项都是不一样的，确保会重新刷新view
          },
        });
      }
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-box {
  overflow-x: auto;
}

.items-box {
  display: flex;
  padding: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #d8dce5;
  .item-box {
    margin-right: 5px;
    cursor: pointer;
  }
}
</style>