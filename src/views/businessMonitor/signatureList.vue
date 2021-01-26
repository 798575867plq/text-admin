<template>
  <div class="signatureList">
    <!-- 查询栏 -->
    <searchBar
      :searchData = "searchList"
      :searchQuery = "searchQuery"
      
    ></searchBar>
    <!-- 表格 -->
    <myTable
      :tableHeadData = "tableHeadData"
      :tableData = "tableData"
      :page = "page"
    >
      <template v-slot:button>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click = "goDetail(scope.row)"
              size = "small"
              style = "width:80px"
              type = "primary"
            >隐藏</el-button>
            <br />
            <el-button
              @click = "shutup(scope.row.userId)"
              size = "small"
              style = "width:80px"
              type = "warning"
              plain
              v-if = "scope.row"
            ></el-button>
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
      // 搜索条
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
          placeholder: "请输入手机号",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "邀请人手机",
          placeholder: "请输入邀请人手机",
          type: "input",
          value: "",
          isNumber: true,
        },
      ], 
      // 表格
      tableHeadData: [
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "头像",
          prop: "header",
          type: "img",
          imgWidth: "100px",
          imgHeight: "100px",
        },
        {
          label: "用户昵称",
          prop: "nickName",
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
          prop: "examine",
        },
        {
          label: "质检人",
          prop: "quality",
        },
      ], 
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
    }
  }  
}
</script>

<style lang="less" scoped>

</style>