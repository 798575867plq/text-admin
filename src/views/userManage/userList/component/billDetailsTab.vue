<template>
  <div>
    <!-- 账单明细 -->
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
      test: "全部",
      // 表格相关
      tableHeadData: [
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "类型",
          prop: "type",
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
          label: "操作人",
          prop: "update_by",
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
        { id: 2, name: "全部支出" },
        { id: 3, name: "订单支出" },
        { id: 4, name: "礼物支出" },
        { id: 4, name: "装扮支出" },
        { id: 4, name: "全部收入" },
        { id: 4, name: "订单收入" },
        { id: 4, name: "礼物收入" },
        { id: 4, name: "装扮收入" },
      ],
      postItem: {},
    };
  },
  methods: {
    // 状态映射
    filterStatus(value) {
      let statusMap = new Map([
        [0, "成功"],
        [1, "待处理"],
        [2, "冻结"],
        [3, "撤回"],
        [4, "失败"],
      ]);
      return statusMap.get(value);
    },
    filterType(value) {
      let typeMap = new Map([
        [1, "充值"],
        [2, "提现"],
        [3, "消耗服务订单"],
        [4, "服务获得"],
        [5, "礼物获得"],
        [6, "消耗礼物订单"],
      ]);
      return typeMap.get(value);
    },
    getList() {
      this.$api.user.billRecord(this.listQuery).then((res) => {
        this.tableData = res.billList;
        this.page.pageIndex = res.pageMap.pageIndex;
        this.page.pageSize = res.pageMap.pageSize;
        this.page.totalSize = res.pageMap.totalSize;
        this.tableData.forEach((item) => {
          item.status = this.filterStatus(item.status);
          item.type = this.filterType(item.business_type);
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