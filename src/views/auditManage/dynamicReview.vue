<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div class="search-box">
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
        ref="searchBar"
      ></searchBar>
      <div class="operate-btn">
        <el-button type="primary" @click="switchCheck()">批量认领</el-button>
      </div>
    </div>

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
              @click="showIsPass(scope.row,'通过')"
              size="small"
              style="width:80px"
              type="success"
              plain
            >通过</el-button>
            <br />
            <el-button
              @click="showIsPass(scope.row,'不通过')"
              size="small"
              style="width:80px"
              type="danger"
              plain
            >不通过</el-button>
            <br />
            <el-button
              @click="showIsPass(scope.row,'改变状态')"
              size="small"
              style="width:80px"
              type="warning"
              plain
            >改变状态</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>

    <el-dialog title="提示" :visible.sync="showPassDialog" width="30%">
      <span>
        您确定要对选中的对象进行
        <span style="color:#E6A23C">{{showPassText}}</span> 操作吗?
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
      batchclaim: true,
      mytask: true,
      searchQuery: {
        id: "",
        name: "",
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
      isLoading: false,
      tableHeadData: [
        {
          label: "动态ID",
          prop: "id",
        },
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
          label: "内容",
          prop: "content",
        },
        {
          label: "账号类型",
          prop: "accountType",
        },
        {
          label: "操作人",
          prop: "operationpeople",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: "",
        nickName: "",
        phone: "",
      },
      showPassDialog: false,
      showPassText: "",
      switchCheckDialog: false,
      ApplicationQuery: {
        number: undefined,
        bizType: "4",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(isReset) {
      this.isLoading = true;
      this.$api.auditManage
        .dynamicReviewList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.dynamicList;
          this.page.pageIndex = res.pageMap.pageIndex;
          this.page.pageSize = res.pageMap.pageSize;
          this.page.totalSize = res.pageMap.totalSize;
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
      console.log(query);
      this.listQuery = { ...this.listQuery, ...query };
      console.log(this.listQuery);
      this.getList();
    },
    // 重置查询
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
    // 翻页,多少页
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
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
    showIsPass(row, type) {
      this.showPassDialog = true;
      this.showPassText = type;
      this.currentItem = row;
    },
    submitIsPass() {
      if (this.showPassText == "通过" || this.showPassText == "改变状态") {
        this.$api.auditManage
          .dynamicReviewPass({
            id: this.currentItem.id,
            applyId: this.currentItem.applyId,
          })
          .then((res) => {
            console.log(res);
          });
      } else if (this.showPassText == "不通过") {
        this.$api.auditManage
          .dynamicReviewNopass({
            id: this.currentItem.id,
            applyId: this.currentItem.applyId,
          })
          .then((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.all-box {
  padding: 20px;
}

.search-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .operate-btn {
    button {
      margin-right: 20px;
    }
  }
}
</style>