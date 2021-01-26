<template>
  <div>
    <el-aside width="180px" class="aside-box">
      <!-- 超过2级路由的时候处理一下 -->
      <el-menu
        active-text-color="#1890ff"
        :default-active="this.$route.matched.length>2?this.$route.matched[this.$route.matched.length-2].path:$route.path"
      >
        <div class="logo-name" @click="flushCom('/home/index','首页')">幻影未来</div>
        <el-submenu
          :index="items.path"
          v-for="(items,index) in routeList"
          :key="index"
          v-if="!items.hidden"
        >
          <template slot="title" v-if="items.meta&&!items.hidden">{{items.meta.title}}</template>
          <el-menu-item-group v-if="items.children">
            <router-link
              :to="resolvePath(items.path,item.path)"
              @click.native="flushCom(resolvePath(items.path,item.path),item.meta.title)"
              v-for="(item,id) in items.children"
              :key="id"
            >
              <el-menu-item
                :index="resolvePath(items.path,item.path)"
                v-if="item.meta&&!item.hidden"
              >{{item.meta.title}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import path from "path";

export default {
  data() {
    return {
      routeList: [
        // {
        //   title: "用户管理",
        //   children: [
        //     { title: "用户列表", path: "/userManage/userList/userList" },
        //     { title: "充值记录", path: "/userManage/rechargeRecord" },
        //     { title: "演员提现", path: "/userManage/actorWithdrawal" },
        //   ],
        // },
        // {
        //   title: "剧情管理",
        //   children: [{ title: "剧情列表", path: "/plotManage/plotList" }],
        // },
      ],
    };
  },
  created() {
    this.routeList = this.$store.getters.addRouters;
  },
  methods: {
    flushCom(path, title) {
      this.$router.push({
        path,
        query: {
          t: +new Date(), //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        },
      });
      this.$store.dispatch("tagsView/addVisitedView", {
        path: path,
        title: title,
      });
      console.log(this.$store.getters.visitedViews);
    },
    // 拼接选中菜单的父级路由（"/aa/b","ccc"）tip:子级路由不要给‘/’
    resolvePath(basePath, routePath) {
      return path.resolve(basePath, routePath);
    },
  },
};
</script>

<style lang="less" scoped>
ul,
li {
  margin: 0px;
  padding: 0px;
}
/deep/.el-menu {
  background-color: #304156;
  border: none;
  color: #bfcbd9;
}

/deep/.el-menu-item {
  background-color: #1f2d3d;
  color: #bfcbd9;
}

/deep/.el-menu-item-group__title {
  padding: 0px;
}

/deep/.el-submenu__title i {
  color: #bfcbd9;
}

/deep/.el-submenu__title {
  color: #bfcbd9;
}

/deep/.el-submenu__title:hover {
  background-color: #263445;
}

/deep/.el-menu-item.is-active {
  color: #1890ff;
  background-color: #1f2d3d;
}

/deep/ .el-menu-item:hover {
  background-color: #001528;
  color: #bfcbd9;
}

/deep/.router-link-active {
  color: #1890ff;
  background-color: #1f2d3d;
}

/deep/.router-link-exact-active {
  color: #1890ff;
  background-color: #1f2d3d;
}

.aside-box {
  overflow: hidden;
  height: 100%;
  min-height: 100vh;
  ul:first-child {
    min-height: 100%;
  }
  .logo-name {
    text-align: center;
    padding: 18px 0px;
    border-bottom: 1px solid #000;
  }
}
</style>