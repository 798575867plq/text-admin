<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div class="search-box">
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
        ref="searchBar"
      ></searchBar>
      <div class="operate-btn">
        <el-button type="primary" @click="switchCheck()">批量认领</el-button>

        <el-button type="success" @click="showIsPass('通过')">通过</el-button>
        <el-button type="warning" @click="showIsPass('不通过')">不通过</el-button>
      </div>
    </div>
    <hr />
    <div class="all-check-box">
      <el-checkbox v-model="allCheck" @change="allChecked">全选</el-checkbox>
      <span class="isAll-box">您已选中{{newArr.length}}个</span>
    </div>
    <div class="img-box">
      <myImage
        v-for="(item,index) in testArr"
        :key="index"
        :showChecked="true"
        :checkValue="item.checked"
        @getChecked="getChecked($event,item)"
      >
        <div class="img-info">
          <div>ID：XXXXX</div>
          <div>昵称：XXXXX</div>
        </div>
      </myImage>
    </div>

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

    <el-dialog title="提示" :visible.sync="showPassDialog" width="30%">
      <span>
        您确定要对选中的对象进行
        <span style="color:#E6A23C">{{showPassText}}</span> 操作吗?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPassDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitIsPass()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="switchCheckDialog" width="30%">
      <div>
        <el-input v-model="ApplicationQuery.number" type="number" placeholder="请输入您要申请的数量"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="switchCheckDialog = false">取 消</el-button>
        <el-button type="primary" @click="Application()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchBar from "../../components/searchBar";
import myImage from "../../components/myImage";

export default {
  components: {
    searchBar,
    myImage,
  },
  data() {
    return {
      switchCheckDialog: false,
      showPassDialog: false,
      showPassText: "",
      checkStatus: "",
      allCheck: false,
      testArr: [
        { id: 1, checked: false },
        { id: 2, checked: true },
        { id: 3, checked: false },
      ],
      newArr: [],
      searchQuery: {
        userId: "",
      },
      searchList: [
        {
          label: "推荐人ID：",
          placeholder: "请输入推荐人ID：",
          type: "input",
          value: "",
          isNumber: true,
        },
      ],
      pageSizes: [10, 20, 30],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: "",
      },
      ApplicationQuery: {
        number: undefined,
        bizType: "1",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
        pageIndex: 1,
        pageSize: 10,
        userId: "",
      };
      this.getList(true);
    },
    getList(isReset) {
      this.$api.auditManage
        .getAvatarList(this.listQuery)
        .then((res) => {
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
    // 批量认领
    switchCheck() {
      this.switchCheckDialog = true;
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
    // myTask() {
    //   this.$router.push({
    //     path: "/auditManage/userAvatarReview/myTaskForImg",
    //   });
    //   console.log(this.$router);
    // },
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
        this.getList();
      });
    },
    showIsPass(type) {
      this.showPassDialog = true;
      this.showPassText = type;
    },
    submitIsPass() {
      let param = [];
      this.newArr.forEach((item) => {
        param.push(item.id);
      });
      console.log(param);
      if (this.showPassText == "通过") {
        this.$api.auditManage
          .userAvatarPass({ applyIds: param })
          .then((res) => {
            console.log(res);
          });
      } else if (this.showPassText == "不通过") {
        this.$api.auditManage
          .userAvatarNopass({ applyIds: param })
          .then((res) => {
            console.log(res);
          });
      }
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
</style>