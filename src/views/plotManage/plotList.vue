<template>
  <div class="plotlist">
    <!-- 查询栏 -->
    <div style="text-align:right;margin-right:20px">
      <el-button @click="goAdd()" type="primary" size="small">添加剧情</el-button>
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
              @click="goDetail(scope.row)"
              size="small"
              style="width:80px;"
              type="primary"
            >编辑</el-button>
            <br />
            <br />
            <el-button size="small" type="info" style="width:80px" plain>上架</el-button>
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
      //表格相关
      tableHeadData: [
        {
          label: "序号",
          prop: "index",
        },
        {
          label: "剧名",
          prop: "name",
        },
        {
          label: "新手引导(video)",
          prop: "logoUrl",
          type: "img",
          imgWidth: "100px",
          imgHeight: "100px",
        },
        {
          label: "剧情介绍(video)",
          prop: "thumbUrl",
          type: "img",
          imgWidth: "100px",
          imgHeight: "100px",
        },
        {
          label: "添加时间",
          prop: "createTime",
        },
        {
          label: "最后编辑时间",
          prop: "updateTime",
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
        kindId: "PLOT_LIST",
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查列表
    getList() {
      this.$api.common.tableList(this.listQuery).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page.pageIndex = res.pageIndex;
        this.page.totalSize = res.totalSize;
        this.tableData.forEach((item,index) => {
          // 序号
          let num = 
            (this.page.pageIndex - 1) * this.page.pageSize + index + 1;
          item.index = num;
        });
      });
    },
    // 去详情
    goAdd() {
      this.$router.push({
        path: "/plotManage/addPlot",
      });
    },
    goDetail () {
      this.$router.push({
        path: "/plotManage/addPlot",
      });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 翻页 到多少页
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.plotlist {
  padding: 20px;
}
</style>