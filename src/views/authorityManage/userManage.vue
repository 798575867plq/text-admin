<template>
  <div class="voiceList">
    <!-- 查询栏 -->
    <div class="search-box">
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        @getDate="getDate"
        @search="search"
        @reset="reset"
        ref="searchBar"
      ></searchBar>
      <div class="add-box">
        <el-button type="primary" @click="addUser()">添加用户</el-button>
      </div>
    </div>
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
              @click="editUser(scope.row.userId)"
              size="small"
              style="width:80px"
              type="primary"
            >编辑</el-button>

            <el-button
              @click="delUser(scope.row.userId)"
              size="small"
              style="width:80px"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>

    <el-dialog :title="dialogTitle" :visible.sync="addDialog" width="50%">
      <el-form ref="form" :model="userForm" label-width="80px" class="user-form">
        <div class="flex-form">
          <el-form-item label="用户昵称" required>
            <el-input v-model="userForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" required>
            <el-input v-model="userForm.phoneNumber" maxlength="11"></el-input>
          </el-form-item>
        </div>
        <div class="flex-form">
          <el-form-item label="性别">
            <el-select v-model="userForm.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
        </div>
        <div class="flex-form">
          <el-form-item label="用户名称" required>
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" required>
            <el-input v-model="userForm.password"></el-input>
          </el-form-item>
        </div>
        <div class="flex-form">
          <el-form-item label="状态" required>
            <el-radio v-model="userForm.status" label="0">正常</el-radio>
            <el-radio v-model="userForm.status" label="1">停用</el-radio>
          </el-form-item>
          <el-form-item label="角色" required>
            <el-select v-model="userForm.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.role_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="form-btn">
          <el-button type="primary" @click="submitAdd()">确定</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
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
      //搜索栏
      showDate: true,
      searchQuery: {
        userName: "",
        phoneNumber: "",
      },
      searchList: [
        {
          label: "用户名称:",
          placeholder: "请输入用户名称",
          type: "input",
          value: "",
        },
        {
          label: "用户手机号:",
          placeholder: "请输入用户手机号",
          type: "input",
          value: "",
        },
        {
          label: "创建时间:",
          type: "date",
          value: "",
        },
      ],
      //表格
      tableHeadData: [
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "用户昵称",
          prop: "nickName",
        },
        {
          label: "用户名称",
          prop: "userName",
        },
        {
          label: "手机号",
          prop: "phoneNumber",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      //   添加用户
      addDialog: false,
      dialogTitle: "添加用户",
      userForm: {
        nickName: "",
        userName: "",
        userType: "00",
        email: "",
        phoneNumber: "",
        sex: "",
        password: "",
        status: 0,
        roleId: "",
      },
      sexOptions: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
      roleOptions: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 状态映射

    // 查列表
    getList(isReset) {
      this.$api.authorityManage
        .findAllUser(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.userList;
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
    getRole() {
      this.$api.authorityManage.getRoles().then((res) => {
        this.roleOptions = res.roleList;
      });
    },
    addUser() {
      this.addDialog = true;
      this.dialogTitle = "添加用户";
      this.userForm = {
        nickName: "",
        userName: "",
        userType: "00",
        email: "",
        phoneNumber: "",
        sex: "",
        password: "",
        status: 0,
        roleId: "",
      };
      this.getRole();
    },
    submitAdd() {
      console.log(this.userForm);
      if (this.dialogTitle == "添加用户") {
        this.$api.authorityManage.insertUser(this.userForm).then((res) => {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.addDialog = false;
          this.getList();
        });
      } else if (this.dialogTitle == "编辑用户") {
        this.$api.authorityManage.editUser(this.userForm).then((res) => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.addDialog = false;
          this.getList();
        });
      }
    },
    editUser(id) {
      this.addDialog = true;
      this.dialogTitle = "编辑用户";
      this.getRole();
      this.getUserInfo(id);
    },
    getUserInfo(id) {
      this.$api.authorityManage.findUserById({ userId: id }).then((res) => {
        this.userForm.id = id;
        this.userForm.nickName = res.userRecord.nickName;
        this.userForm.userName = res.userRecord.userName;
        this.userForm.email = res.userRecord.email;
        this.userForm.phoneNumber = res.userRecord.phoneNumber;
        this.userForm.password = res.userRecord.password;
        this.userForm.sex = res.userRecord.sex + "";
        this.userForm.status = res.userRecord.status + "";
        this.userForm.roleId = res.userRoleRecord.roleId;
      });
    },
    // 删除用户
    delUser(id) {
      this.$util.default.comfirmFun(
        "确定要删除该用户吗",
        "删除",
        this.$api.authorityManage.delUserById,
        {
          userId: id,
        },
        this.getList
      );
    },
    getDate(val) {
      console.log(val);
      this.listQuery.createTimeStart = val[0];
      this.listQuery.createTimeEnd = val[1];
    },
    // 搜索
    search(query) {
      this.listQuery.pageIndex = 1;
      this.listQuery = { ...this.listQuery, ...query };
      // console.log(this.listQuery);
      this.getList();
    },
    // 重置
    reset() {
      this.listQuery = {
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

.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.user-form {
  .flex-form {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  /deep/.el-form-item__content {
    width: 200px;
  }
  .form-btn {
    margin-top: 50px;
    /deep/.el-form-item__content {
      margin: 0 auto !important;
    }
  }
}
</style>