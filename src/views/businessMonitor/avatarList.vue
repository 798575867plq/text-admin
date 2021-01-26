<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div class="search-box">
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        :showDate="true"
        @search="search"
        @reset="reset"
        @getDate="getDate"
        ref="searchBar"
      ></searchBar>
      <div class="operate-btn">
        <el-button type="primary" @click="switchs()">{{switchText}}</el-button>
      </div>
    </div>
    <hr />
    <div class="img-box" v-if="switchText=='切换到列表'">
      <myImage v-for="(item,index) in tableData" :key="index" :imgSrc="item.face">
        <div class="img-info">
          <div>ID：{{item.userId}}</div>
          <div>昵称：{{item.nickName}}</div>
        </div>
      </myImage>
      <!-- 分页 -->
      <el-pagination
        v-if="page.totalSize>1"
        class="page-box"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageIndex"
        :page-sizes="pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalSize"
      ></el-pagination>
    </div>

    <div v-if="switchText=='切换到照片墙'">
      <!-- 表格 -->
      <myTable
        :tableHeadData="tableHeadData"
        :tableData="tableData"
        :page="page"
        :page-sizes="pageSizes"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:button>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="offShelf(scope.row)"
                size="small"
                style="width:80px"
                type="primary"
              >下架</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>
    </div>

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
  </div>
</template>

<script>
import searchBar from "../../components/searchBar";
import myImage from "../../components/myImage";
import myTable from "../../components/myTable";

export default {
  components: {
    searchBar,
    myImage,
    myTable,
  },
  data() {
    return {
      switchText: "切换到列表",
      testArr: [
        { id: 1, checked: false },
        { id: 2, checked: true },
        { id: 3, checked: false },
      ],
      newArr: [],
      allCheck: false,
      showPassDialog: false,
      switchCheckDialog: false,
      showPassText: "",
      searchQuery: {
        userId: "",
      },
      searchList: [
        {
          label: "用户ID：",
          placeholder: "请输入用户ID：",
          type: "input",
          value: "",
          isNumber: true,
        },
      ],
      // 表格相关
      tableHeadData: [
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "头像",
          prop: "face",
          type: "img",
          imgWidth: "80px",
          imgHeight: "80px",
        },
        {
          label: "用户昵称",
          prop: "nickName",
        },
        {
          label: "注册时间",
          prop: "createTime",
        },
      ],
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      pageSizes: [10, 20, 30, 60, 100],
      listQuery: {
        kindId: "AVATAR_LIST",
        pageIndex: 1,
        pageSize: 10,
      },
      ApplicationQuery: {
        number: 0,
        bizType: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
          // this.tableData.forEach((item) => {
          //   item.online = this.filterOnline(item.online);
          //   item.regType = this.filterRegType(item.regType);
          //   item.userStatus = this.filterUserStatus(item.userStatus);
          //   item.userType = this.filterUserType(item.userType);
          // });
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
      this.getList();
    },
    // 重置查询
    reset() {
      this.listQuery = {
        kindId: "AVATAR_LIST",
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList(true);
    },
    switchs() {
      if (this.switchText == "切换到列表") {
        this.switchText = "切换到照片墙";
      } else if (this.switchText == "切换到照片墙") {
        this.switchText = "切换到列表";
      }
      // this.switchCheckDialog = true;
    },
    getChecked(value, item) {
      item.checked = value;
      this.getAllList(this.testArr);
    },
    allChecked(value) {
      if (value) {
        this.testArr.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.testArr.forEach((item) => {
          item.checked = false;
        });
      }
      this.getAllList(this.testArr);
      console.log(value, this.testArr);
    },
    getAllList(arr) {
      this.newArr = [];
      arr.forEach((item) => {
        if (item.checked == true) {
          this.newArr.push(item);
        }
      });
      console.log(this.newArr, "选中的数组");
    },
    showIsPass(type) {
      this.showPassDialog = true;
      this.showPassText = type;
    },

    getDate(val) {
      this.search({ createTimelr: val });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 翻页,多少页
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
  margin-bottom: 20px;
  .operate-btn {
    button {
      margin-right: 20px;
    }
  }
}

.all-check-box {
  padding: 20px 20px 0px 20px;
  text-align: left;
  .isAll-box {
    margin-left: 100px;
  }
}

.img-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  .img-info {
    text-align: center;
    div {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}

.page-box {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>