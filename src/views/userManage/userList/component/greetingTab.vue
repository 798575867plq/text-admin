<template>
  <div>
    <!-- 招呼语 -->
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
          label: "id",
          prop: "id",
        },
        {
          label: "动作",
          prop: "avatar",
        },
        {
          label: "类型",
          prop: "name",
        },
        {
          label: "内容",
          prop: "name",
        },
        {
          label: "修改时间",
          prop: "phone",
        },
        {
          label: "操作人",
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
      this.$api.user.callLanguage(this.listQuery).then((res) => {
        console.log(res);
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