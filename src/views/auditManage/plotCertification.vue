<template>
  <div class="plotCertification">
    <!-- 查询栏 -->
    <div class="search-check">
      <searchBar
        :searchData = "searchList"
        :mytask = "mytask"
        :searchQuery = "searchQuery"
        @search = "search"
        @reset = "reset"
      ></searchBar>
      <div class="plot-tion">
        <div class="plot-start">
          <el-button type="primary" @click="plot">{{storyauthentication}}</el-button>
          <el-button type="primary" @click="movie">{{plotroom}}</el-button>
        </div>

        <el-dialog title="开启剧情房间" :visible.sync="dialogVisible" width="30%">
          <div>
            <el-input v-model="plotCation" type="number"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="Authentication">确认</el-button>
          </span>
        </el-dialog>
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
              @click="goSetail(scope.row)"
              size="small"
              style="width:80px"
              type="primary"
            >评审详情</el-button>
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
      //搜索条
      mytask: true,
      storyauthentication: "批量认领",
      dialogVisible: false,
      plotroom: "开启剧情房间",
      plotCation: "",
      searchQuery: {
        id: "",
        name: "",
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
          label: "认证剧",
          prop: "certified",
        },
        {
          label: "认证状态",
          prop: "certificationstatus"
        },
        {
          label: "申请时间",
          prop: "applytime",
        },
        {
          label: "账号状态",
          prop: "userStatus",
        },
        {
          label: "注册方式",
          prop: "regType",
        },
        {
          label: "账号类型",
          prop: "userType",
        },
        {
          label: "审核状态",
          prop: "examinestatus",
        },
      ],   
      tableData: [
        {
          userId: "1314",
          header: "",
          nickName: "张三",
          certified: "和你谈30分钟恋爱",
          certificationstatus: "已实名",
          applytime: "20年07月18日23:59",
          userStatus: "正常",
          regType: "QQ/微信/手机",
          userType: "审核账号",
          examinestatus: "未审核",
        }
      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        kindId: "PLOT_CERTIFICATION",
        pageIndex: 1,
        pageSize: 10,
      },
    }
  },
  // created() {
  //     this.getList();
  // },
  methods: {
    // 批量认领
    plot() {
      console.log(this.listQuery);
      // this.dialogVisible = true;
    },
    movie() {
      this.dialogVisible = true;
    },
    Authentication() {
      if(!this.plotCation) {
        this.$message({
          message: "请输入ID",
          type: "warning",
        });
        return false;
      }
    },
    // 查列表
    // getList() {
    //   this.$api.common.tableList(this.listQuery).then((res) => {
    //     console.log(res);
    //   });
    // },
    // 搜索
    search(query) {
      console.log(query);
      this.listQuery = {...this.listQuery, ...query};
      console.log(this.listQuery);
      this.getList();
    },
    // 重置查询
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
    // 去详情
    goSetail(item) {
      this.$router.push({
         path: "/auditManage/reviewdetails",
         query: { id: item.userId },
      });
    },
  }
}
</script>

<style lang="less" scoped>
.plotCertification {
  padding: 20px;
}
// .plot-start {
//   margin-left: 500px;
// }
.search-check {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .plot-start {
    display: flex;
    button {
      margin-right: 20px;
    }
  }  
}
</style>