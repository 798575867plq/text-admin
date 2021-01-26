<template>
  <div class="couponManage">
    <!-- 添加优惠券、时间筛选 -->
    <div class="search-box">
      <searchBar :showDate="true" @search="search" @reset="reset" ref="searchBar"></searchBar>
      <div class="add-box">
        <el-button type="primary" @click="goPlot()">添加优惠劵</el-button>
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
              @click="pass(scope.row.userId)"
              size="small"
              style="width:80px"
              type="success"
              plain
            >编辑</el-button>
            <br />
            <el-button
              @click="noPass(scope.row.userId)"
              size="small"
              style="width:80px"
              type="danger"
              plain
            >隐藏</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>
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
      dateType: "date",
      dateTime: "",
      //表格
      tableHeadData: [
        {
          label: "序号",
          prop: "index",
        },
        {
          label: "标题",
          prop: "distName",
        },
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "内容",
          prop: "name",
        },
        {
          label: "有效期",
          prop: "relTime",
        },
        {
          label: "添加人",
          prop: "addby",
        },
        {
          label: "状态",
          prop: "status",
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
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 状态映射
    filterStatus(value) {
      let statusMap = new Map([
        [1, "正常"],
        [2, "禁用"],
        [3, "注销"],
      ]);
      return statusMap.get(value);
    },
    // 查列表
    getList() {
      this.$api.operationManage.couponList(this.listQuery).then((res) => {
        console.log(res);
        this.tableData = res.couponList;
        this.page.pageIndex = res.pageMap.pageIndex;
        this.page.pageSize = res.pageMap.pageSize;
        this.page.totalSize = res.pageMap.totalSize;
        this.tableData.forEach((item, index) => {
          item.status = this.filterStatus(item.status);
          // 序号
          let num = (this.page.pageIndex - 1) * this.page.pageSize + index + 1;
          item.index = num;
        });
      });
    },
    // 搜索
    search(query) {
      console.log(query);
      this.listQuery.pageIndex = 1;
      this.listQuery = { ...this.listQuery, ...query };
      this.getList();
    },
    // 重置查询
    reset() {
      this.listQuery = {
        kindId: "USER_LIST",
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList(true);
    },
    // 去编辑页
    goPlot() {
      this.$router.push({
        path: "/operationManage/couponeditor",
      });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 翻页，到多少页
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    couponType(val) {
      this.dateTime = "";
    },
    // 时间筛选
    getDate(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less" scoped>
.couponManage {
  padding: 20px;
}

.search-box {
  display: flex;
  justify-content: space-between;
}
</style>