<template>
  <div class="dynamicList">
    <!-- 查询栏 -->
    <div class="search-box">
      <searchBar
        :searchData="searchList"
        :showDate="showDate"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
        ref="searchBar"
      ></searchBar>
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
              @click="showItem(scope.row.dynamicId)"
              size="small"
              style="width:80px"
              type="primary"
              plain
            >展示</el-button>
            <br />
            <br />
            <el-button
              @click="exhibition(scope.row.dynamicId)"
              size="small"
              style="width:80px"
              type="danger"
              plain
            >下架</el-button>
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
      //搜索栏
      showDate: true,
      searchQuery: {
        id: "",
        nickName: "",
        phone: "",
        mobile: "",
      },
      searchList: [
        {
          label: "用户ID:",
          placeholder: "请输入用户ID",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "用户昵称:",
          placeholder: "请输入用户昵称",
          type: "input",
          value: "",
          isNumber: false,
        },
        {
          label: "用户手机号",
          placeholder: "请输入用户手机号",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "邀请人手机:",
          placeholder: "请输入邀请人手机",
          type: "input",
          value: "",
          isNumber: true,
        },
      ],
      //表格
      tableHeadData: [
        {
          label: "动态ID",
          prop: "dynamicId",
        },
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "头像",
          prop: "face",
          type: "img",
          imgWidth: "100px",
          imgHeight: "100px",
        },
        {
          label: "用户昵称",
          prop: "nickName",
        },
        {
          label: "文字内容",
          prop: "content",
        },
        {
          label: "音频视频照片",
          prop: "resourceData",
          type: "dynamic",
          imgWidth: "80px",
          imgHeight: "80px",
          imgKey: "url",
          width: "300px",
        },
        {
          label: "账号状态",
          prop: "accountStatus",
        },
        {
          label: "账号类型",
          prop: "accountType",
        },
        {
          label: "审核人",
          prop: "reviewerName",
        },
        {
          label: "操作人",
          prop: "operation",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        userId: "",
        nickName: "",
        phone: "",
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
    getList(isReset) {
      this.$api.bussiness
        .busDynamicList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.busDynamicList;
          this.page.pageIndex = res.pageMap.pageIndex;
          this.page.pageSize = res.pageMap.pageSize;
          this.page.totalSize = res.pageMap.totalSize;
          if (isReset) {
            this.$nextTick(() => {
              this.$refs.searchBar.stopLoad("reset");
            });
          } else {
            this.$nextTick(() => {
              this.$refs.searchBar.stopLoad("search");
            });
          }
        })
        .catch(() => {
          this.$nextTick(() => {
            this.$refs.searchBar.stopLoad("search");
            this.$refs.searchBar.stopLoad("reset");
          });
        });
    },

    // 下架
    exhibition(id) {
      console.log(id);
      this.$util.default.comfirmFun(
        "是否要进行下架操作",
        "下架",
        this.$api.bussiness.delDynamic,
        {
          dynamicId: id,
        },
        this.getList
      );
      console.log(this.$util);
    },

    //  每页多少条
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 翻页 多少页
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    // 搜索
    search(query) {
      console.log(query);
      this.listQuery = { ...this.listQuery, ...query };
      console.log(this.listQuery);
      this.getList();
    },
    // 重置查询
    reset() {
      this.listQuery = {
        kindId: "DYNAMIC_LIST",
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
</style>