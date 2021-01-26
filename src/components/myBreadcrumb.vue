<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item,index) in levelList"
        :key="index"
      >{{item.meta.title}}</el-breadcrumb-item>-->

      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in levelList"
          v-if="item.meta.title"
          :key="item.path"
        >
          <span
            v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect || item.path">
            {{
            item.meta.title
            }}
          </router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      // const first = matched[0];
      // if (first && first.name !== "工作台") {
      //   matched = [{ path: "/workbench", meta: { title: "工作台" } }].concat(
      //     matched
      //   );
      // }
      this.levelList = matched;
      this.$store.dispatch("user/getBreadcrumbList", this.levelList);
    },
  },
};
</script>

<style lang="less" scoped>
</style>