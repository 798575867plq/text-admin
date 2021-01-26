<template>
  <div>
    <!-- 运营管理 -->
    <radioTag :radioArr="radioArr" @chooseItem="chooseItem"></radioTag>
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
            <el-button size="small" type="warning" style="width:80px" plain>修改</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>
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
          prop: "id",
        },
        {
          label: "余额",
          prop: "avatar",
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
        { id: 2, name: "金币管理" },
        { id: 3, name: "钻石管理" },
        { id: 4, name: "金币收入管理" },
        { id: 4, name: "钻石收入管理" },
        { id: 4, name: "礼物管理" },
        { id: 4, name: "装扮管理" },
        { id: 4, name: "信誉分管理" },
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