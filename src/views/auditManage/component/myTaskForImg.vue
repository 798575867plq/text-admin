<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div class="search-box">
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
      ></searchBar>
      <div class="operate-btn">
        <el-button type="primary" @click="showIsPass('通过')">通过</el-button>
        <el-button type="primary" @click="showIsPass('不通过')">不通过</el-button>
      </div>
    </div>
    <hr />
    <div class="all-check-box">
      <el-checkbox :value="allCheck&&newArr.length>0" @change="allChecked">全选</el-checkbox>
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
import searchBar from "../../../components/searchBar";
import myImage from "../../../components/myImage";

export default {
  components: {
    searchBar,
    myImage,
  },
  data() {
    return {
      testArr: [
        { id: 1, checked: false },
        { id: 2, checked: true },
        { id: 3, checked: false },
      ],
      newArr: [],
      allCheck: false,
      showPassDialog: false,
      showPassText: "",
      searchQuery: {
        id: "",
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
      listQuery: {
        id: "USER_AVATAR_REVIEW",
        pageIndex: 1,
        pageSize: 10,
      },
    };
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
        id: "USER_AVATAR_REVIEW",
        pageIndex: 1,
        pageSize: 10,
      };
      this.getList();
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