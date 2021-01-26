<template>
  <div>
    <myTable
      :tableHeadData="tableHeadData"
      :tableData="tableData"
      :page="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></myTable>

    <myMask></myMask>
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
          label: "动态ID",
          prop: "id",
        },
        {
          label: "动态内容文字",
          prop: "content",
        },
        {
          label: "动态内容",
          prop: "resourceData",
          type: (row) => {
            if (row.type == 1) {
              return "";
            } else if (row.type == 2) {
              return "imgArr";
            } else if (row.type == 3) {
              return "video";
            }
          },
          // type: "dynamic",
          imgWidth: "80px",
          imgHeight: "80px",
          imgKey: "url",
          width: "300px",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "操作人",
          prop: "update_by",
        },
        {
          label: "修改时间",
          prop: "update_time",
        },
      ],
      tableData: [
        {
          resourceData: [
            {
              url:
                "https://qiniu.withufuture.com/%E7%85%A7%E7%89%87%E5%A2%995.png",
            },
            {
              url:
                "https://qiniu.withufuture.com/%E7%85%A7%E7%89%87%E5%A2%995.png",
            },
            {
              url:
                "https://qiniu.withufuture.com/%E7%85%A7%E7%89%87%E5%A2%995.png",
            },
            {
              url:
                "https://qiniu.withufuture.com/%E7%85%A7%E7%89%87%E5%A2%995.png",
            },
          ],
          type: 2,
        },
        {
          resourceData: [
            {
              url: "https://qiniu.withufuture.com/%E6%81%90%E9%BE%99.mp4",
            },
          ],
          type: 3,
        },
        {
          resourceData: [
            {
              url: "https://qiniu.withufuture.com/%E7%BD%91%E6%98%93.mp4",
            },
          ],
          type: 3,
        },
      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: this.$route.query.id,
      },
    };
  },
  methods: {
    // 查列表
    getList() {
      // this.$api.user.userDynamic(this.listQuery).then((res) => {
      //   this.tableData = res.dynamicList;
      //   this.page.pageIndex = res.pageMap.pageIndex;
      //   this.page.pageSize = res.pageMap.pageSize;
      //   this.page.totalSize = res.pageMap.totalSize;
      //   this.$emit("getTotalSize", this.page.totalSize);
      // });
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