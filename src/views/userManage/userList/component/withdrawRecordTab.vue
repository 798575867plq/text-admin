<template>
  <div>
    <!-- 提现记录 -->
    <radioTag :radioArr="radioArr" @chooseItem="chooseItem"></radioTag>

    <myTable
      :tableHeadData="tableHeadData"
      :tableData="tableData"
      :page="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></myTable>
  </div>
</template>

<script>
import myTable from "../../../../components/myTable";
import radioTag from "../../../../components/radioTag";

export default {
  components: {
    myTable,
    radioTag,
  },
  data() {
    return {
      // 表格相关
      tableHeadData: [
        {
          label: "类型",
          prop: "business_type",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "数量",
          prop: "trade_amount",
        },
        {
          label: "余额",
          prop: "wallet_balance",
        },
        {
          label: "时间",
          prop: "update_time",
        },
        {
          label: "审核人",
          prop: "update_by",
        },
        {
          label: "原因",
          prop: "remark",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        userId: this.$route.query.id,
        pageIndex: 1,
        pageSize: 10,
      },
      // 单选条件
      radioArr: [
        { id: 1, name: "全部" },
        { id: 2, name: "审核中" },
        { id: 3, name: "已通过" },
        { id: 4, name: "未通过" },
      ],
      postItem: {},
    };
  },
  methods: {
    // 状态映射
    filterType(value) {
      let map = new Map([[2, "提现"]]);
      return map.get(value);
    },
    filterStatus(value) {
      let map = new Map([
        [0, "成功"],
        [1, "待处理"],
        [2, "冻结"],
        [3, "撤回"],
        [4, "失败"],
      ]);
      return map.get(value);
    },
    getList() {
      this.$api.user.withdrawalRecord(this.listQuery).then((res) => {
        this.tableData = res.withdrawalList;
        this.page.pageIndex = res.pageMap.pageIndex;
        this.page.pageSize = res.pageMap.pageSize;
        this.page.totalSize = res.pageMap.totalSize;
        this.tableData.forEach((item) => {
          item.status = this.filterStatus(item.status);
          item.business_type = this.filterType(item.business_type);
        });
      });
    },
    chooseItem(item) {
      this.postItem = item;
      console.log(item);
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
  },
};
</script>

<style lang="less" scoped>
</style>