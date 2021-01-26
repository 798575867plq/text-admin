<template>
  <div>
    <!-- 登入记录 -->
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
export default {
  components: {
    myTable,
  },
  data() {
    return {
      // 表格相关
      tableHeadData: [
        {
          label: "登录时间",
          prop: "id",
        },
        {
          label: "登录设备号",
          prop: "avatar",
        },
        {
          label: "登录IP",
          prop: "name",
        },
        {
          label: "版本号",
          prop: "name",
        },
        {
          label: "渠道",
          prop: "phone",
        },
        {
          label: "登录方式",
          prop: "createDate",
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
    };
  },
  methods: {
    getList() {
      this.$api.user.loginRecord(this.listQuery).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page.pageIndex = res.pageIndex;
        this.page.pageSize = res.pageSize;
        this.page.totalSize = res.totalSize;
      });
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