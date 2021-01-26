<template>
  <div>
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
          label: "id",
          prop: "userId",
        },
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "内容",
          prop: "description",
        },
        {
          label: "修改时间",
          prop: "time",
        },
        {
          label: "操作人",
          prop: "operator",
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
        userId: this.$route.query.id,
      },
      // 单选条件
      radioArr: [
        { id: 1, name: "全部" },
        { id: 2, name: "禁言/封号" },
        { id: 3, name: "动态日志" },
        { id: 4, name: "头像日志" },
        { id: 5, name: "功能冻结日志" },
        { id: 6, name: "系统通知" },
      ],
      postItem: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    chooseItem(item) {
      this.postItem = item;
      console.log(item);
    },
    getList() {
      this.$api.user.personalData(this.listQuery).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page.pageNumber = res.pageNumber;
        this.page.pageSize = res.pageSize;
        this.page.totalRow = res.totalRow;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
</style>