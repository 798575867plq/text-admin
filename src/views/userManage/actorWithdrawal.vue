<template>
  <div class="withdrawal">
    <!-- 查询栏 -->
    <div>
      <searchBar
        :searchData="searchList"
        :showDate="showDate"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
      ></searchBar>
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
                @click="pass(scope.row.userId)"
                size="small"
                style="width:80px"
                type="success"
                plain
              >通过</el-button>
              <br />
              <el-button
                @click="noPass(scope.row.userId)"
                size="small"
                style="width:80px"
                type="danger"
                plain
              >不通过</el-button>
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
      //   搜索条相关
      showDate: true,
      searchQuery: {
        userId: "",
        phone: "",
        orderId: "",
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
          label: "用户手机号",
          placeholder: "请输入用户手机号",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "订单号",
          placeholder: "请输入订单号",
          type: "input",
          value: "",
          isNumber: true,
        },
      ],
      // 表格相关
      tableHeadData: [
        {
          label: "序号",
          prop: "index",
        },
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "昵称",
          prop: "nickName",
        },
        {
          label: "提现方式",
          prop: "withdrawalType",
        },
        {
          label: "提现账号",
          prop: "userAcount",
        },
        {
          label: "提现订单号",
          prop: "orderId",
        },
        {
          label: "提现金额",
          prop: "withdrawalAmount",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "免费货币占比",
          prop: "admission",
        },
        {
          label: "邀请奖励占比",
          prop: "invitation",
        },
        {
          label: "账号类型",
          prop: "userType",
        },
        {
          label: "邀请人",
          prop: "invitees",
        },
      ],
      tableData: [],
      // page: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   totleCount: 0,
      // },
      page: {
        pageIndex: 1,
        pageSize: 1,
        totalSize: 0,
      },
      // listQuery: {
      //   page: 1,
      //   count: 10,
      // },
      listQuery: {
        kindId: "ACTOR_WITH_DRAWAL",
        pageIndex: 1,
        pageSize: 10,
      },
      listPass: {
        userId: "1597220559343840971",
      },
      listNoPass: {
        userId: "1597220559343840971",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 状态映射
    filterstatus(value) {
      let statusMap = new Map([
        [1, "提现中"],
        [2, "提现失败"],
        [3, "提现成功"],
      ]);
      return statusMap.get(value);
    },
    filterwithdrawal(value) {
      let withdrawalTypeMap = new Map([[1, "银行卡"]]);
      return withdrawalTypeMap.get(value);
    },
    filteruserType(value) {
      let userTypeMap = new Map([
        [1, "普通用户"],
        [2, "上架用户"],
      ]);
      return userTypeMap.get(value);
    },
    // 列表查询
    getList(isReset) {
      this.$api.common
        .tableList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.list;
          this.page.pageIndex = res.pageIndex;
          this.page.pageSize = res.pageSize;
          this.page.totalSize = res.totalSize;
          this.tableData.forEach((item, index) => {
            item.status = this.filterstatus(item.status);
            // 序号
            let num =
              (this.page.pageIndex - 1) * this.page.pageSize + index + 1;
            item.index = num;

            item.withdrawalType = this.filterwithdrawal(item.withdrawalType);
            item.userType = this.filteruserType(item.userType);
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
      // console.log(this.listQuery);
      this.getList();
    },
    // 重置
    reset() {
      this.listQuery = {
        kindId: "ACTOR_WITH_DRAWAL",
        pageIndex: 1,
        pageSize: 10,
      };
      this.arr = [];
      this.getList(true);
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 翻页 到多少页
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();

      console.log(`当前页: ${val}`);
    },
    pass(id) {
      this.$util.default.comfirmFun(
        "是否要对该提现进行通过操作",
        "通过",
        this.$api.auditManage.actorApproved,
        { userId: id },
        this.getList
      );
    },
    noPass(id) {
      this.$util.default.comfirmFun(
        "是否要对该提现进行不通过操作",
        "不通过",
        this.$api.auditManage.actorUnApproved,
        { userId: id },
        this.getList
      );
    },
  },
};
</script>

<style lang="less" scoped>
.withdrawal {
  padding: 20px;
}
</style>