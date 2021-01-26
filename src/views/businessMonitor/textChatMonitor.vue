<template>
  <div class="all-box">
    <!-- 查询栏 -->
    <div>
      <searchBar
        :searchData="searchList"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
        ref="searchBar"
      ></searchBar>
    </div>
    <!-- 表格 -->
    <myTable
      :tableHeadData="tableHeadData"
      :tableData="tableData"
      :page="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:button>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="goDetail(scope.row)"
              size="small"
              style="width:80px"
              type="primary"
            >查看</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>

    <el-dialog title="聊天记录" :visible.sync="recordDialog" width="50%">
      <div class="record-time">
        <el-date-picker
          @change="getDateTime"
          v-model="timeRange"
          type="datetimerange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp"
        ></el-date-picker>
        <div>
          <el-button @click="searchDetail()" size="small" style="width:80px" type="primary">查询</el-button>
        </div>
      </div>
      <div v-for="(item,index) in recordList">
        <div
          class="item-date"
          v-if="!(recordList[index-1]&&recordList[index].time==recordList[index-1].time)"
        >{{item.time}}</div>
        <div class="item-left-box" v-if="item.from==currentRow.toIdInfo.userId">
          <div>
            <el-avatar shape="square" :size="50" :src="currentRow.toIdInfo.face"></el-avatar>
          </div>
          <div class="item-text">
            <div class="name">{{currentRow.toIdInfo.nickName}}</div>
            <div class="content" v-if="item.type==0" v-html="textToEmoji(item.body.msg)"></div>
            <div v-else-if="item.type==1">
              <myImg :imgSrc="item.body.url" alt></myImg>
            </div>
            <div v-else-if="item.type==2">
              <audio :src="item.body.url" controls="controls" alt></audio>
            </div>
            <div v-else-if="item.type==3">
              <video :src="item.body.url" controls="controls" alt></video>
            </div>
          </div>
        </div>
        <div class="item-right-box" v-else-if="item.from==currentRow.fromIdInfo.userId">
          <div class="item-text">
            <div class="name">{{currentRow.fromIdInfo.nickName}}</div>
            <div class="content" v-if="item.type==0" v-html="textToEmoji(item.body.msg)"></div>
            <div v-else-if="item.type==1">
              <myImg :imgSrc="item.body.url" alt></myImg>
            </div>
            <div v-else-if="item.type==2">
              <audio :src="item.body.url" controls="controls" alt></audio>
            </div>
            <div v-else-if="item.type==3">
              <video :src="item.body.url" controls="controls" alt></video>
            </div>
          </div>
          <div>
            <el-avatar shape="square" :size="50" :src="currentRow.fromIdInfo.face"></el-avatar>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchBar from "../../components/searchBar";
import myTable from "../../components/myTable";
import emoji from "../../utils/emoji";

export default {
  components: {
    searchBar,
    myTable,
  },
  data() {
    return {
      // 搜索条相关
      searchQuery: {
        userId: "",
        nickName: "",
      },
      searchList: [
        {
          label: "用户ID：",
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
      ],
      //表格
      tableHeadData: [
        {
          label: "发送者id",
          render: (row) => {
            return row.fromIdInfo.userId;
          },
        },
        {
          label: "发送者昵称",
          render: (row) => {
            return row.fromIdInfo.nickName;
          },
        },
        {
          label: "接收者id",
          render: (row) => {
            return row.toIdInfo.userId;
          },
        },
        {
          label: "接收者昵称",
          render: (row) => {
            return row.toIdInfo.nickName;
          },
        },
        // {
        //   label: "内容",
        //   prop: "content",
        //   type: (row) => {
        //     if (row.type == 1) {
        //       return "";
        //     } else if (row.type == 2) {
        //       return "img";
        //     } else if (row.type == 3) {
        //       return "audio";
        //     }
        //   },
        // },
        {
          label: "发送时间",
          render: (row) => {
            return this.$util.default.timeFormat(row.msgTime);
          },
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
      // 聊天记录详情
      recordDialog: false,
      squareUrl: "",
      timeRange: [],
      recordList: [],
      currentRow: {},
      recordQuery: {
        from: "", //发送者accid
        to: "", //接收者accid
        begintime: "", //开始时间，毫秒级
        endtime: "", //截止时间，毫秒级
        limit: "100", //本次查询的消息条数上限(最多100条)
        reverse: "1", //1按时间正序排列，2按时间降序排列
        type: "0,1,2,3", //查询指定的多个消息类型，类型之间用","分割，不设置该参数则查询全部类型消息  格式示例： 0,1,2,3   类型支持： 1:图片，2:语音，3:视频，4:地理位置，5:通知，6:文件，10:提示，11:Robot，100:自定义
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 表情包
    textToEmoji(val, size = 18) {
      return emoji(val, size);
    },
    // 查列表
    getList(isReset) {
      this.$api.bussiness
        .getChatList(this.listQuery)
        .then((res) => {
          console.log(res);
          this.tableData = res.pageResult.pageList;
          this.page.pageIndex = res.pageResult.pageIndex;
          this.page.pageSize = res.pageResult.pageSize;
          this.page.totalSize = res.pageResult.totalSize;

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
    // 聊天记录
    goDetail(row) {
      this.recordList = [];
      this.timeRange = [];
      this.recordDialog = true;
      this.recordQuery.from = row.fromIdInfo.userId;
      this.recordQuery.to = row.toIdInfo.userId;
      this.currentRow = row;
    },
    getDateTime(val) {
      this.recordQuery.begintime = val[0];
      this.recordQuery.endtime = val[1];
    },
    searchDetail() {
      if (this.timeRange.length < 1) {
        this.$message({
          type: "warning",
          message: "请选择时间",
        });
        return false;
      }
      this.$api.bussiness.getChatInfo(this.recordQuery).then((res) => {
        this.recordList = res.msgs;
        this.recordList.forEach((item, index) => {
          item.time = this.$util.default.timeFormat(item.sendtime);
          item.time = item.time.substring(0, item.time.length - 3);
          console.log(item.time);
        });
      });
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

.record-time {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  div {
    margin-left: 20px;
  }
}

.item-date {
  background-color: #dadada;
  color: #ffffff;
  border-radius: 5px;
  padding: 2px 5px;
  width: fit-content;
  margin: 0px auto;
}

/deep/.el-dialog__body {
  overflow-y: auto;
  height: 550px;
}

.item-left-box {
  display: flex;
  margin-top: 15px;
  .item-text {
    text-align: left;
    margin-top: -15px;
    padding: 5px 10px;
    .content {
      background-color: #eee;
      border-radius: 0px 10px 10px 10px;
      color: #000000;
      max-width: 300px;
      padding: 5px 10px;
      margin-top: 5px;
    }
  }
}

.item-right-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  .item-text {
    text-align: right;
    margin-top: -15px;
    padding: 5px 10px;
    .content {
      text-align: left;
      background-color: #409eff;
      border-radius: 10px 0px 10px 10px;
      color: #ffffff;
      max-width: 300px;
      padding: 5px 10px;
      margin-top: 5px;
    }
  }
}
</style>