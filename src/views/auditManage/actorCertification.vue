<template>
  <div class="performer">
      <!-- 查询栏 -->
      <div class="search-check">
        <searchBar
          :searchData = "searchList"
          :searchQuery = "searchQuery"
          @search = "search"
          @reset = "reset"
        ></searchBar>
        <div class="evalua-tion">
          <el-button type="primary" @click="batch">{{batchdistribution}}</el-button>
          <!-- <el-button type="success" @click="letPass('通过')">通过</el-button>
          <el-button type="warning" @click="letPass('不通过')">不通过</el-button> -->
        </div>
      </div>
        <!-- <div class="all-evalua" v-if="batchdistribution=='确认'">
          <el-input v-model="check" v-show="choicenumber" placeholder="请选择数目"></el-input>
        </div> -->
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
                  @click = "goDetail(scope.row)"
                  size = "small"
                  style = "width:80px"
                  type = "primary"
                >详情</el-button>
                <br />
                <br />
                <!-- <el-button size="small" type="warning" style="width:80px" plain>已认领</el-button> -->
              </template>
            </el-table-column>
          </template>
        </myTable>

       <el-dialog title="提示" :visible.sync="showPassDialog" width="30%">
          <span>
            您确定要对选中的对象进行
            <span style="color:#E6A23C">{{showPassText}}</span> 操作吗?
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showPassDialog = false">取 消</el-button>
            <el-button type="primary" @click="showPassDialog = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="switchCheckDialog" width="30%">  
          <div>
            <el-input v-model="ApplicationQuery.number" type="number" placeholder="请输入您要认领的数量"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="switchCheckDialog = false">取消</el-button>
            <el-button type="primary" @click="Application()">确定</el-button>
          </span>
        </el-dialog>


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
        // mytask: true,
        // batchclaim: true,
        batchdistribution: "批量认领",
        // check: "",
        // choicenumber: false,
        switchCheckDialog: false,
        showPassDialog: false,
        showPassText: "",
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
        // 表格
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
                label: "绑定手机",
                prop: "phone",
            },
            {
                label: "注册时间",
                prop: "regTime",
            },
            {
                label: "账号类型",
                prop: "userType",
            },
            {
                label: "操作人",
                prop: "operationpeople",
            },
            {
                label: "审核状态",
                prop: "userStatus",
            },
        ],
        tableData: [],
        // page: {
        //     currentPage: 1,
        //     pageSize: 10,
        //     totleCount: 0,
        // },
        page: {
          pageIndex: 1,
          pageSize: 10,
          totalSize: 0,
        },
        // listQuery: {
        //     page: 1,
        //     count: 10,
        // },
        listQuery: {
          kindId: "ACTOR_CERTIFICATION",
          pageIndex: 1,
          pageSize: 10,
        },
        ApplicationQuery: {
          number: undefined,
          bizType: "6",
        },
   }
 },
 created() {
     this.getList();
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
    // 批量认领
    batch() {
      this.switchCheckDialog = true;
    },
    Application() {
      if (!this.ApplicationQuery.number) {
        this.$message({
          message: "请输入数量",
          type: "warning",
        });
        return false;
      }
      this.ApplicationQuery.number = Number(this.ApplicationQuery.number);
      this.$api.auditManage.distribution(this.ApplicationQuery).then((res) => {
        console.log(res);
        this.$api.common.tableList(this.listQuery).then((res) => {
          console.log(res);
        });
      });
    },
    //查列表  
     getList(isReset) {
        this.$api.common
          .tableList(this.listQuery)
          .then((res) => {
            console.log(res);
            this.tableData = res.list;
            this.page.pageIndex = res.pageIndex;
            this.page.pageSize = res.pageSize;
            this.page.totalSize = res.totalSize;
            this.tableData.forEach((item,index) => {
              item.userType = this.filterUserType(item.userType);
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
    //  搜索
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
    //  重置
     reset() {
        this.listQuery = {
          kindId: "ACTOR_CERTIFICATION",
          pageIndex: 1,
          pageSize: 10,
        };
        this.getList(true);
     },
    //  每页多少条
     handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
        console.log(`每页 ${val} 条`);
     },
    //  翻页 到多少页
     handleCurrentChange(val) {
        this.listQuery.pageIndex = val;
        this.getList();
        console.log(`当前页: ${val}`);
     },
    //  去详情
    goDetail(item) {
      this.$router.push({
        path: "/auditManage/actordetails",
        query: { id: item.userId },
      });
    },
 },
}    
</script>

<style lang="less" scoped>
.performer {
  padding: 20px;
}
// .evalua-tion {
//   margin-left: 700px;
// }
.search-check {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

    .evalua-tion {
      button {
        // margin-right: 20px;
      }
    }
}
</style>