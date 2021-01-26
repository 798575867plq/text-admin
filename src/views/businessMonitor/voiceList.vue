<template>
  <div class="voiceList">
    <!-- 查询栏 -->
    <div>
      <searchBar
        :searchData="searchList"
        :showDate="showDate"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
      ></searchBar>
      <!-- 表格 -->
      <myTable
        :tableHeadData="tableHeadData"
        :tableData="tableData"
        :page="page"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:button>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="goDetail(scope.row)"
                size="small"
                style="width:80px"
                type="primary"
              >隐藏</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>
    </div>
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
        userId: "",
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
          isNumber: true,
        },
        {
          label: "用户手机号:",
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
          label: "序号",
          prop: "index",
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
          label: "语音签名",
          prop: "voiceSignature",
          type: "audio",
          width: "330px",
        },
        {
          label: "内容",
          prop: "content",
        },
        {
          label: "账号类型",
          prop: "userType",
        },
        {
          label: "审核人",
          prop: "reviewer",
        },
        {
          label: "质检人",
          prop: "qualityinspector",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        kindId: "VOICE_LIST",
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 状态映射
    filteruserType(value) {
      let userTypeMap = new Map([
        [1, "普通用户"],
        [2, "上架用户"],
      ]);
      return userTypeMap.get(value);
    },
    // 查列表
    getList(isReset) {
      this.$api.common
        .tableList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.list;
          this.page.pageIndex = res.pageIndex;
          this.page.pageSize = res.pageSize;
          this.page.totalSize = res.totalSize;
          this.tableData.forEach((item, index) => {
            item.userType = this.filteruserType(item.userType);
            // 序号
            let num =
              (this.page.pageIndex - 1) * this.page.pageSize + index + 1;
            item.index = num;
          });
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
    // 搜索
    search(query) {
      console.log(query);
      if (Object.keys(query).length == 0) {
        return false;
      }
      this.listQuery.pageIndex = 1;
      this.listQuery = { ...this.listQuery, ...query };
      // console.log(this.listQuery);
      this.getList();
    },
    // 重置
    reset() {
      this.listQuery = {
        kindId: "VOICE_LIST",
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList(true);
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
.voiceList {
  padding: 20px;
}
</style>