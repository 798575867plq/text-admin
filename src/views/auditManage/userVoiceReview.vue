<template>
  <div class="uservoice">
      <!-- 查询栏 -->
      <div class="search-check">
        <searchBar
          :searchData = "searchList"
          :searchQuery = "searchQuery"
          @search = "search"
          @reset = "reset"
        ></searchBar>
        <div class="user-review">
          <el-button type="primary" @click="userVoice">{{uservoicesignature}}</el-button>
        </div>
      </div>

      <!-- 表格 -->
      <myTable
        :tableHeadData = "tableHeadData"
        :tableData = "tableData"
      >
        <template v-slot:button> 
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click = "goDetail(scope.row)"
                size = "small"
                style = "width:80px"
                type = "primary"
              >通过</el-button> 
              <br />
              <br />
              <el-button 
                @click = "goNoPass(scope.row)"
                size = "small" 
                type = "warning" 
                style = "width:80px"
              >不通过</el-button>
            </template>  
          </el-table-column>
        </template>
      </myTable>

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
      // batchclaim: true,
      // mytask: true,
      uservoicesignature: "批量认领",
      switchCheckDialog: false,
      searchQuery: {
          id: "",
          name: "",
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
              label: "用户昵称: ",
              placeholder: "请输入用户昵称",
              type: "input",
              value: "",
              isNumber: true,
          },
          {
              label: "用户手机号: ",
              placeholder: "请输入用户手机号",
              type: "input",
              value: "",
              isNumber: true,
          },
          {
              label: "邀请人手机: ",
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
              prop: "id",
          },
          {
              label: "头像",
              prop: "avatar",
              type: "img",
              imgWidth: "100px",
              imgHeight: "100px",
          },
          {
              label: "用户昵称",
              prop: "name",
          },
           {
              label: "语音签名",
              prop: "avatars",
              type: "img",
              imgWidth: "100px",
              imgHeight: "100px",
          },
          {
              label: "内容",
              prop: "content",
          },
          {
              label: "账号类型",
              prop: "accounttype",
          },
          {
              label: "审核状态",
              prop: "auditstatus",
          },
      ],   
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      // listQuery: {
      //   kindId: "USER_VOICE_REVIEW",
      //   pageIndex: 1,
      //   pageSize: 10,
      // },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: "",
        nickName: "",
        phone: "",
      },
      ApplicationQuery: {
        number: undefined,

      },
    }
  },
  created(){
    this.getList();
  },
  methods: {
    // 批量认领
    userVoice() {
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
    // 查列表
    getList() {
      this.$api.auditManage
        .userVoiceList(this.listQuery)
        .then((res) => {
          console.log(res);
      });
    },
    // 搜索
    search(query) {
      console.log(query);
      this.listQuery = {...this.listQuery,...query};
      console.log(this.listQuery);
      this.getList();
    },
    // 重置
    reset() {
      this.listQuery = {};
      this.getList();
    },
  },
}
</script>

<style lang="less" scoped>
.uservoice {
  padding: 20px;
}

.search-check {
  display: flex;
  justify-content: space-between;

  .user-review {
    button {
      margin-right: 20px;
    }
  }
}
</style>