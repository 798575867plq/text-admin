<template>
  <div class="personality">
    <!-- 查询栏  -->
    <div>
      <div class="search-check">
        <searchBar
          :searchData = "searchList"
          :searchQuery = "searchQuery"
          @search = "search"
          @reset = "reset"
          @getDate = "getDate"
          ref = "searchBar"
        ></searchBar>
        <div class="user-ture">
          <el-button type="primary" @click="personal">{{personalsignature}}</el-button>
        </div>
      </div>
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
                @click = "goDist(scope.row)"
                size = "small"
                style = "width:80px"
                type = "primary"
              >通过</el-button>
              <br />
              <br />
              <el-button
               @click = "goDist(scope.row)"
               size = "small"
               style = "width:80px"
               type = "primary"
              >不通过</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>
      <!-- 通过弹出框 -->
      <el-dialog title="提示" :visible.sync="showPassDialog" width="30%">
        <span>
          确定
          <span style="color:#E6A23C">{{showPassText}}</span>
          <span>确定个数{{newArr.length}}</span>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showPassDialog = false">取消</el-button>
          <el-button type="primary" @click="submitIsPass()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 批量认领弹出框 -->
      <el-dialog title="提示" :visible.sync="switchCheckDialog" width="30%">
        <div>
          <el-input v-model="ApplicationQuery.number" type="number" placeholder="请输入要认领的数量"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="switchCheckDialog = false">取消</el-button>
          <el-button type="primary" @click="Application()">确定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import searchBar from "../../components/searchBar"
import myTable from "../../components/myTable"

export default {
  components: {
    searchBar,
    myTable,  
  },
  data() {
    return {
      //搜索栏
      // batchclaim: true,   
      // mytask: true,
      personalsignature: "批量认领",
      showPassDialog: false,
      switchCheckDialog: false,
      showPassText: "",
      newArr:[],
      // personalized: "true",
      searchQuery: {
          userId: "",
          nickName: "",
          phone: "",
          mobile: "",
      },
      searchList: [
        {
          label: "用户ID: ",
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
            label: "内容",
            prop: "signature",
          },
          {
            label: "账号类型",
            prop: "userType",
          },
          {
            label: "审核状态",
            prop: "userStatus",
          },
       ],
      tableData: [],  
      //  page: {
      //    currentPage: 1,
      //    pageSize: 10,
      //    totleCount: 0,
      //  }, 
      page: {
         pageIndex: 1,
         pageSize: 10,
         totalSize: 0,
      },
      //  listQuery: {
      //    page: 1,
      //    count: 10,
      //  },
      listQuery: {
         kindId: "USER_SIGN_ATURE_REVIEW",
         pageIndex: 1,
         pageSize: 10,
      },
      ApplicationQuery: {
         number: undefined,
      },
      listPass: {
        pageIndex: 1,
        pageSize: 10,
        userId: "",
        nickName: "",
        phone: "",
      },
    }
  },
  created() {
    this.getList();
    // this.getAuditlist();
  },
  methods: {
    // 状态映射
    filterUserType(value) {
      let userTypeMap = new Map([
        [1,"普通用户"],
        [2,"上架用户"],
      ]);
      return userTypeMap.get(value);
    },
    filterUserStatus(value) {
      let userStatusMap = new Map([
        [1,"正常"],
        [2,"禁用"],
        [3,"注销"],
      ]);
      return userStatusMap.get(value);
    },
    // 批量认领
    personal() {
      console.log(this.listQuery);
      this.switchCheckDialog = true;
    },
    // 通过/不通过 按钮
    goDist(type) {
      this.showPassDialog = true;
      this.showPassText = type;
    },
    submitIsPass() {
      let param = [];
      console.log(param);
      if (this.showPassText == "通过") {
        this.$api.auditManage
          .userSignaturePass({ applyIds: param })
          .then((res) => {
            console.log(res);
          });
      } else if (this.showPassText == "不通过") {
        this.$api.auditManage
          .userSignatureNoPass({ applyIds: param })
          .then((res) => {
            console.log(res);
          });
      }
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
         this.tableData.forEach((item) => {
           item.userType = this.filterUserType(item.userType);
           item.userStatus = this.filterUserStatus(item.userStatus);
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
    Application() {
      if(!this.ApplicationQuery.number) {
        this.$api.auditManage.userSignatureList(this.listPass).then((res) => {
          console.log(res);
        });
      }
    },
    // 审核列表
    // getAuditlist() {
    //   this.$api.auditManage.signaturecation(this.listTable).then((res) => {
    //     console.log(res);
    //   });
    // },
    // 搜索
    search(query) {
      console.log(query);
      if (Object.keys(query).length == 0) {
        return false;
      }
      this.listQuery.pageIndex = 1;
      this.listQuery = {...this.listQuery, ...query};
      // console.log(this.listQuery);
      this.getList();
    },
    // 重置
    reset() {
      this.listQuery = {
         kindId: "USER_SIGN_ATURE_REVIEW",
         pageIndex: 1,
         pageSize: 10,
      };
      this.getList(true);
    },
    getDate(val) {
      this.search({ loginTimelr: val });
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
}
</script>

<style lang="less" scoped>
.personality {
  padding: 20px;
}
// .user-ture {
//   margin-left: 600px;
// }
.search-check {
  display: flex;
  justify-content: space-between;
}
.search-check {
  .user-ture {
    button {
      margin-right: 20px;
    }
  }
}
</style>