<template>
  <div class="all-box">
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
        <el-button type="primary" @click="addUser()">添加角色</el-button>
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
              @click="editUser(scope.row.id)"
              size="small"
              style="width:80px"
              type="primary"
            >编辑</el-button>

            <el-button
              @click="delUser(scope.row.id)"
              size="small"
              style="width:80px"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>

    <el-dialog :title="dialogTitle" :visible.sync="addDialog" width="30%">
      <el-form ref="form" :model="userForm" label-width="80px" class="user-form">
        <el-form-item label="角色名称" required>
          <el-input v-model="userForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限字符" required>
          <el-input v-model="userForm.roleKey" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio v-model="userForm.status" label="0">正常</el-radio>
          <el-radio v-model="userForm.status" label="1">停用</el-radio>
        </el-form-item>
        <el-form-item label="菜单权限" required>
          <el-tree
            :data="roleTree"
            :props="props"
            node-key="id"
            @check-change="getChooseKey"
            show-checkbox
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注" required>
          <el-input type="textarea" v-model="userForm.remark"></el-input>
        </el-form-item>
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
        role_name: "",
      },
      searchList: [
        {
          label: "角色名称",
          placeholder: "请输入角色名称",
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
          label: "角色ID",
          prop: "id",
        },
        {
          label: "角色名称",
          prop: "role_name",
        },
        {
          label: "状态",
          prop: "status",
          type: "switch",
        },
        {
          label: "创建时间",
          prop: "create_time",
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
      //   添加角色
      addDialog: false,
      dialogTitle: "添加角色",
      userForm: {
        roleName: "",
        roleKey: "",
        status: "0",
        menus: [],
        remark: "",
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
      //   角色树
      props: {
        label: "menu_name",
        children: "childMenu",
      },
      roleTree: [],
      count: 1,
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
        .getRoles(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.roleList;
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
    loadNode(node, resolve) {
      console.log(node, resolve);
      this.$api.authorityManage.getMenuList().then((res) => {
        console.log(res);
        this.roleTree = res.menuList;
      });
    },
    getChooseKey() {
      this.userForm.menus = this.$refs.tree.getCheckedKeys();
      console.log(this.$refs.tree.getCheckedKeys());
    },
    addUser() {
      this.addDialog = true;
      this.dialogTitle = "添加角色";
      this.userForm = {
        roleName: "",
        roleKey: "",
        status: "0",
        menus: [],
        remark: "",
      };
      this.loadNode();
    },
    submitAdd() {
      this.userForm.status = Number(this.userForm.status);
      console.log(this.userForm);
      if (this.dialogTitle == "添加角色") {
        this.$api.authorityManage.addRole(this.userForm).then((res) => {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.addDialog = false;
          this.getList();
        });
      } else if (this.dialogTitle == "编辑角色") {
        this.$api.authorityManage.updRole(this.userForm).then((res) => {
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
      this.dialogTitle = "编辑角色";
      this.loadNode();
      this.getUserInfo(id);
    },
    getUserInfo(id) {
      this.$api.authorityManage.getRoleById({ id: id }).then((res) => {
        this.userForm.id = id;
        this.userForm.roleName = res.roleDetail.roleName;
        this.userForm.roleKey = res.roleDetail.roleKey;
        this.userForm.status = res.roleDetail.status + "";
        this.userForm.remark = res.roleDetail.remark;
        this.userForm.menus = res.currentRoleMenuIdList;
        this.$refs.tree.setCheckedKeys(res.currentRoleMenuIdList);
      });
    },
    // 删除角色
    delUser(id) {
      this.$util.default.comfirmFun(
        "确定要删除该角色吗",
        "删除",
        this.$api.authorityManage.delRole,
        {
          id: id,
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
.all-box {
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