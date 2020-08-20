<template>
  <div>
    <el-aside width="180px" class="aside-box">
      <el-menu>
        <!-- <el-menu-item :index="100">幻影未来</el-menu-item> -->
        <el-submenu :index="index+''" v-for="(items,index) in routeList" :key="index">
          <template slot="title">{{items.title}}</template>
          <el-menu-item-group>
            <router-link
              @click="getItem(item)"
              :to="item.path"
              v-for="(item,id) in items.children"
              :key="id"
            >
              <el-menu-item :index="index+'-'+id">{{item.title}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeList: [
        {
          title: "用户管理",
          children: [
            { title: "用户列表", path: "/userManage/userList" },
            { title: "充值记录", path: "/userManage/rechargeRecord" },
            { title: "演员提现", path: "/userManage/actorWithdrawal" }
          ]
        },
        {
          title: "导航二",
          children: [{ title: "选项1", path: "选项2" }]
        }
      ]
    };
  },
  methods: {
    getItem(item) {
      console.log(item);
    }
  }
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

.aside-box {
  overflow: hidden;
  ul:first-child {
    min-height: 100vh;
  }
}
</style>