<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div v-if="this.$route.meta.title=='用户列表'">
      <searchBar :searchData="searchList" @search="search" @reset="reset" ref="searchBar"></searchBar>
      <!-- 表格 -->
      <myTable
        :tableHeadData="tableHeadData"
        :tableData="tableData"
        :page="page"
        :isLoading="isLoading"
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
              >详 情</el-button>
              <br />
              <br />
              <el-button
                size="mini"
                type="warning"
                style="width:80px"
                plain
                v-if="scope.row.sayStatus==1"
                @click="shutup(scope.row.userId)"
              >禁言</el-button>
              <el-button
                size="small"
                type="warning"
                style="width:80px"
                plain
                v-if="scope.row.sayStatus==2"
                @click="unShutup(scope.row.userId)"
              >解除禁言</el-button>
              <br />
              <el-button
                size="mini"
                type="danger"
                style="width:80px"
                plain
                v-if="scope.row.userStatus==1"
                @click="seal(scope.row.userId)"
              >封号</el-button>
              <el-button
                size="small"
                type="danger"
                style="width:80px"
                plain
                v-if="scope.row.userStatus==2"
                @click="unSeal(scope.row.userId)"
              >解除封号</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>

      <el-dialog :title="dialogTitle" :visible.sync="editDialog" width="30%">
        <myForm ref="myForm" :formData="formData" :btnPosition="'right'" @getQuery="getQuery"></myForm>
      </el-dialog>
    </div>

    <div v-else>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import searchBar from "../../../components/searchBar";
import myTable from "../../../components/myTable";

export default {
  components: {
    searchBar,
    myTable,
  },
  data() {
    return {
      // 搜索条相关
      searchList: [
        {
          label: "用户ID：",
          placeholder: "请输入用户ID",
          type: "input",
          value: "",
          query: "userId",
        },
        {
          label: "用户昵称:",
          placeholder: "请输入用户昵称",
          type: "input",
          value: "",
          query: "nickName",
        },
        {
          label: "用户手机号:",
          placeholder: "请输入用户手机号",
          type: "input",
          value: "",
          query: "phone",
        },
        {
          label: "邀请人手机:",
          placeholder: "请输入邀请人手机",
          type: "input",
          value: "",
          query: "inviter",
        },
        {
          label: "注册时间:",
          type: "date",
          value: "",
          query: {
            startTime: "",
            endTime: "",
          },
        },
      ],
      // 表格相关
      isLoading: false,
      tableHeadData: [
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "头像",
          prop: "face",
          type: "img",
          imgWidth: "100px",
          imgHeight: "100px",
        },
        {
          label: "用户昵称",
          prop: "nickName",
        },
        {
          label: "绑定手机",
          prop: "phone",
        },
        {
          label: "注册时间",
          prop: "regTime",
        },
        {
          label: "最后一次登录时间",
          prop: "loginTime",
          width: "180px",
        },
        {
          label: "在线状态",
          prop: "online",
        },
        {
          label: "账号状态",
          prop: "userStatusDoc",
        },
        {
          label: "信誉分",
          prop: "score",
        },
        {
          label: "用户应用市场来源",
          prop: "regSource",
          width: "180px",
        },
      ],
      tableData: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        totalRow: 0,
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      // 对话框相关
      editDialog: false,
      dialogTitle: "",
      currentId: "",
      formData: [
        {
          label: "时间：",
          type: "input",
          placeholder: "请输入时间（小时）",
          size: "small",
          query: "time",
          data: "",
          isError: (item) => {
            if (!item.data) {
              item.errorText = "请输入时间，单位为小时";
              return true;
            } else {
              return false;
            }
          },
          errorText: "请输入时间，单位为小时",
        },
        {
          label: "原因：",
          type: "input",
          inputType: "textarea",
          placeholder: "请输入原因",
          size: "small",
          query: "reason",
          data: "",
          isError: (item) => {
            if (!item.data) {
              item.errorText = "请输入原因！";
              return true;
            } else {
              return false;
            }
          },
          errorText: "请输入原因！",
        },
      ],
    };
  },
  created() {
    console.log(this.$route);
    if (this.$route.meta.title == "用户列表") {
      this.getList();
    }
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
      this.editDialog = false;
      this.isLoading = true;
      this.$api.user
        .userList(this.listQuery)
        .then((res) => {
          this.tableData = res.list;
          this.page.pageNumber = res.pageNumber;
          this.page.pageSize = res.pageSize;
          this.page.totalRow = res.totalRow;
          this.tableData.forEach((item) => {
            item.online = this.filterOnline(item.online);
            item.regType = this.filterRegType(item.regType);
            item.userStatusDoc = this.filterUserStatus(item.userStatus);
            item.userType = this.filterUserType(item.userType);
          });
          this.isLoading = false;
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
          this.isLoading = false;
          this.$nextTick(() => {
            this.$refs.searchBar.stopLoad("search");
            this.$refs.searchBar.stopLoad("reset");
          });
        });
    },
    // 搜索
    search(query) {
      this.listQuery.pageIndex = 1;
      this.listQuery = { ...this.listQuery, ...query };
      console.log(query, 1111111111111111111111, this.listQuery);
      this.getList();
    },
    // 重置查询
    reset() {
      this.listQuery = {
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList(true);
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
        path: "/userManage/userList/userDetail",
        query: { id: item.userId },
      });
    },
    shutup(id) {
      this.dialogTitle = "禁言";
      this.editDialog = true;
      this.$nextTick(() => {
        this.$refs.myForm.reset();
      });
      this.currentId = id;
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
      this.dialogTitle = "封号";
      this.editDialog = true;
      this.$nextTick(() => {
        this.$refs.myForm.reset();
      });
      this.currentId = id;
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
    getQuery(data) {
      if (this.dialogTitle == "禁言") {
        this.$util.default.comfirmFun(
          "是否要对该用户进行禁言操作",
          "禁言",
          this.$api.user.userShutUp,
          { userId: this.currentId, ...data },
          this.getList
        );
      } else if (this.dialogTitle == "封号") {
        this.$util.default.comfirmFun(
          "是否要对该用户进行封号操作",
          "封号",
          this.$api.user.userSeal,
          { userId: this.currentId, ...data },
          this.getList
        );
      }
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