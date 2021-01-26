<template>
  <div>
    <!-- 动作配音 -->
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
          prop: "id",
        },
        {
          label: "部位",
          prop: "avatar",
        },
        {
          label: "语音内容",
          prop: "content",
          type: "audio",
          width: "500px",
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
      tableData: [
        {
          content: "",
        },
      ],
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
        { id: 2, name: "头部" },
        { id: 3, name: "上半身" },
        { id: 4, name: "下半身" },
      ],
      postItem: {},
    };
  },
  methods: {
    getList() {
      this.$api.user.callLanguage(this.listQuery).then((res) => {
        console.log(res);
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