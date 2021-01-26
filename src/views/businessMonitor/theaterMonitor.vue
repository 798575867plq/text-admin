<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div>
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
        ref="searchBar"
      ></searchBar>

      <el-button @click="goDetail()" size="small" style="width:80px" type="primary">查看</el-button>
      <!-- 表格 -->
      <myTable
        :tableHeadData="tableHeadData"
        :tableData="tableData"
        :page="page"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:button>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="goDetail(scope.row)"
                size="small"
                style="width:80px"
                type="primary"
              >查看</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>
    </div>
  </div>
</template>

<script>
import searchBar from "../../components/searchBar";
import myTable from "../../components/myTable";

export default {
  components: {
    searchBar,
    myTable,
  },
  data() {
    return {
      // 搜索条相关
      searchQuery: {
        userId: "",
        nickName: "",
      },
      searchList: [
        {
          label: "用户ID：",
          placeholder: "请输入用户ID",
          type: "input",
          value: "",
          isNumber: true,
        },

        {
          label: "用户昵称:",
          placeholder: "请输入用户昵称",
          type: "input",
          value: "",
          isNumber: false,
        },
      ],
      // 表格相关
      tableHeadData: [
        {
          label: "序号",
          prop: "userId",
        },
        {
          label: "房间ID",
          prop: "userId",
        },
        {
          label: "剧情封面",
          prop: "header",
          type: "img",
          imgWidth: "100px",
          imgHeight: "100px",
        },

        {
          label: "用户昵称",
          prop: "phone",
        },
        {
          label: "演员昵称",
          prop: "regTime",
        },
        {
          label: "开始时间",
          prop: "loginTime",
        },
        {
          label: "账号类型",
          prop: "online",
        },
        {
          label: "最后操作人",
          prop: "regType",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        kindId: "THEATER_MONITOR",
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 状态映射
    filterOnline(value) {
      let onlineMap = new Map([
        [0, "离线"],
        [1, "在线"],
        [2, "自定义下线"],
      ]);
      return onlineMap.get(value);
    },
    filterRegType(value) {
      let regTypeMap = new Map([
        [1, "手机号码"],
        [2, "一键登录"],
        [3, "qq"],
        [4, "微信"],
        [5, "apply"],
      ]);
      return regTypeMap.get(value);
    },
    filterUserStatus(value) {
      let userStatusMap = new Map([
        [1, "正常"],
        [2, "禁用"],
        [3, "注销"],
      ]);
      return userStatusMap.get(value);
    },
    filterUserType(value) {
      let userTypeMap = new Map([
        [1, "普通用户"],
        [2, "上架用户"],
      ]);
      return userTypeMap.get(value);
    },
    // 查列表
    getList(isReset) {
      this.$api.common
        .tableList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.list;
          this.page.pageIndex = res.pageIndex;
          this.page.pageSize = res.pageSize;
          this.page.totalSize = res.totalSize;
          this.tableData.forEach((item) => {
            item.online = this.filterOnline(item.online);
            item.regType = this.filterRegType(item.regType);
            item.userStatus = this.filterUserStatus(item.userStatus);
            item.userType = this.filterUserType(item.userType);
          });
          if (isReset) {
            this.$nextTick(() => {
              this.$refs.searchBar.stopLoad("reset");
            });
          } else {
            this.$nextTick(() => {
              this.$refs.searchBar.stopLoad("search");
            });
          }
        })
        .catch(() => {
          this.$nextTick(() => {
            this.$refs.searchBar.stopLoad("search");
            this.$refs.searchBar.stopLoad("reset");
          });
        });
    },
    // 搜索
    search(query) {
      console.log(query);
      if (Object.keys(query).length == 0) {
        return false;
      }
      this.listQuery.pageIndex = 1;
      this.listQuery = { ...this.listQuery, ...query };
      this.getList();
    },
    // 重置查询
    reset() {
      this.listQuery = {
        kindId: "THEATER_MONITOR",
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList(true);
    },
    getDate(val) {
      this.search({ loginTimelr: val });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 翻页,多少页
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    // 去详情
    goDetail(item) {
      this.$router.push({
        path: "/businessMonitor/monitorDetail",
        // query: { id: item.userId },
      });
    },
    shutup(id) {
      this.$util.default.comfirmFun(
        "是否要对该用户进行禁言操作",
        "禁言",
        this.$api.user.userShutUp,
        { userId: id },
        this.getList
      );
    },
    unShutup(id) {
      this.$util.default.comfirmFun(
        "是否要对该用户进行解除禁言操作",
        "解除禁言",
        this.$api.user.userUnShutUp,
        { userId: id },
        this.getList
      );
    },
    seal(id) {
      this.$util.default.comfirmFun(
        "是否要对该用户进行封号操作",
        "封号",
        this.$api.user.userSeal,
        { userId: id },
        this.getList
      );
    },
    unSeal(id) {
      this.$util.default.comfirmFun(
        "是否要对该用户进行解除封号操作",
        "解除封号",
        this.$api.user.userUnSeal,
        { userId: id },
        this.getList
      );
    },
  },
};
</script>

<style lang="less" scoped>
.all-box {
  padding: 20px;
}
.top-box {
  display: flex;
  flex-wrap: wrap;
  .top-item {
    display: flex;
    align-items: center;
    margin: 5px;
    .top-item-title {
      margin-right: 5px;
    }
  }
}
</style>