<template>
  <div class="evaluate">
    <!-- 查询栏 -->
    <div>
      <div class="search-check">
        <searchBar
          :searchData="searchList"
          :searchQuery="searchQuery"
          @search="search"
          @reset="reset"
          ref="searchBar"
        ></searchBar>
        <div class="evaluation-review">
          <el-button type="primary" @click="switchCheck()">批量认领</el-button>
        </div>
      </div>
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
                @click="goPast(scope.row,'通过')"
                size="small"
                style="width:80px"
                type="primary"
              >通过</el-button>
              <br />
              <br />
              <el-button
                @click="goPast(scope.row,'不通过')"
                size="small"
                style="width:80px"
                type="primary"
              >不通过</el-button>
              <el-button
                @click="goPast(scope.row,'改变状态')"
                size="small"
                style="width:80px"
                type="primary"
              >改变状态</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>
    </div>

    <el-dialog title="提示" :visible.sync="showPassDialog" width="30%">
      <span>
        您确定要对选中的对象进行
        <span style="color:#E6A23C">{{showPassText}}</span>操作码?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPassDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitIsPass()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="switchCheckDialog" width="30%">
      <div>
        <el-input v-model="ApplicationQuery.number" type="number" placeholder="请输入您要申请的数量"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="switchCheckDialog = false">取 消</el-button>
        <el-button type="primary" @click="Application()">确 定</el-button>
      </span>
    </el-dialog>
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
      //搜索栏
      // batchclaim: true,
      // mytask: true,
      evaluatebyreview: "批量认领",
      showPassDialog: false,
      showPassText: "",
      searchQuery: {
        fromUserId: "",
        nickName: "",
        phone: "",
        mobile: "",
      },
      searchList: [
        {
          label: "用户ID:",
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
          isNumber: true,
        },
        {
          label: "用户手机号:",
          placeholder: "请输入用户手机号",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "邀请人手机:",
          placeholder: "请输入邀请人手机",
          type: "input",
          value: "",
          isNumber: true,
        },
      ],
      //表格
      tableHeadData: [
        {
          label: "序号",
          prop: "index",
        },
        {
          label: "用户ID",
          prop: "fromUserId",
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
          label: "内容",
          prop: "commentContent",
        },
        {
          label: "账号类型",
          prop: "accountType",
        },
        {
          label: "审核状态",
          prop: "userStatus",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      // listQuery: {
      //   kindId: "EVALUATION_REVIEW",
      //   pageIndex: 1,
      //   pageSize: 10,
      // },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: "",
        nickName: "",
        phone: "",
      },
      switchCheckDialog: false,
      ApplicationQuery: {
        number: undefined,
        bizType: "8",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 状态映射
    filterUserStatus(value) {
      let userStatusMap = new Map([
        [1, "正常"],
        [2, "禁用"],
        [3, "注销"],
      ]);
      return userStatusMap.get(value);
    },
    // 批量认领
    switchCheck() {
      this.switchCheckDialog = true;
    },
    Application() {
      if (!this.ApplicationQuery.number) {
        this.$message({
          message: "请输入数量",
          type: "warning",
        });
        return false;
      }
      this.ApplicationQuery.number = Number(this.ApplicationQuery.number);
      this.$api.auditManage.distribution(this.ApplicationQuery).then((res) => {
        console.log(res);
        this.getList();
        this.switchCheckDialog = false;
      });
    },
    // 查列表
    getList(isReset) {
      this.$api.auditManage
        .evaluationReviewList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.evaluationList;
          this.page.pageIndex = res.pageMap.pageIndex;
          this.page.pageSize = res.pageMap.pageSize;
          this.page.totalSize = res.pageMap.totalSize;
          this.tableData.forEach((item, index) => {
            item.userStatus = this.filterUserStatus(item.userStatus);
            // 序号
            let num =
              (this.page.pageIndex - 1) * this.page.pageSize + index + 1;
            item.index = num;
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
    goPast(row,type) {
      this.showPassDialog = true;
      this.showPassText = type;
      this.currentItem = row;
    },
    submitIsPass() {
      if (this.showPassText == "通过" || this.showPassText == "改变状态") {
        this.$api.auditManage
          .evaluationReviewPass({
             id: this.currentItem.id,
             applyId: this.currentItem.applyId,
          })
          .then((res) => {
            console.log(res);
          });
      } else if (this.showPassText == "不通过") {
        this.$api.auditManage
          .evaluationReviewNoPass({
            id: this.currentItem.id,
            applyId: this.currentItem.applyId,
          })
          .then((res) => {
            console.log(res);
          });
      }
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
        pageIndex: 1,
        pageSize: 10,
        userId: "",
        nickName: "",
        phone: "",
      };
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
      console.log(`当前页 ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.evaluate {
  padding: 20px;
}

.search-check {
  display: flex;
  justify-content: space-between;

  .evaluation-review {
    button {
      margin-right: 20px;
    }
  }
}
</style>