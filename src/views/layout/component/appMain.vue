<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
</style>