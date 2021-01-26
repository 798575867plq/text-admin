<template>
  <div class="plottopic">
    <!-- 查询栏 -->
    <searchBar
      :searchData = "searchList"
      :searchQuery = "searchQuery"
      @search = "search"
      @reset = "reset"
    ></searchBar>
    <!-- 表格 -->
    <myTable
      :tableHeadData = "tableHeadData"
      :tableData = "tableData"
      :page = "page"
      @handleSizeChange = "handleSizeChange"
      @handleCurrentChange = "handleCurrentChange"
    >
      <template v-slot:button>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="goDetail(scope.row)"
              size="small"
              style="width:80px"
              type="primary"
            >编辑</el-button>
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
      // 搜索栏
      // addtopic: true,
      searchQuery: {
          shield: "",
          addby: "",
          edit: "",
      },
      searchList: [
        {
          label: "屏蔽词:",
          placeholder: "请输入屏蔽词",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "添加人:",
          placeholder: "请添加人",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "编辑:",
          placeholder: "请输入最后编辑人",
          type: "input",
          value: "",
          isNumber: true,
        },
      ],  
      //表格
      tableHeadData: [
          {
            label: "ID",
            prop: "id",
          },
          {
            label: "话题",
            prop: "topic",
          },
          {
            label: "话题",
            prop: "conversation",
          },
          {
            label: "添加时间",
            prop: "addtime",
          },
          {
            label: "添加人",
            prop: "addby",
          },
          {
            label: "最后操作时间",
            prop: "lastoperationtime",
          },
          {
            label: "最后操作人",
            prop: "lastoperationby",
          },
       ],   
       tableData: [],
       page: {
         pageIndex: 1,
         pageSize: 10,
         totalSize: 0,
       },
       listQuery: {
         kindId: "STORY_TOPIC",
         pageIndex: 1,
         pageSize: 10,
       },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 查列表
    getList() {
      this.$api.common.tableList(this.listQuery).then((res) => {
         console.log(res);
      });
    },
    search(query) {
      console.log(query);
      this.listQuery = {...this.listQuery, ...query};
      console.log(this.listQuery);
      this.getList();
    },
    reset() {
      this.listQuery = {};
      this.getList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>

<style lang="less" scoped>
.plottopic {
  padding: 20px;
}
</style>

