<template>
  <div>
    <!-- 查询条件 -->
    <searchBar :searchData="searchList" @search="search" @reset="reset" ref="searchBar"></searchBar>
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
              size="small"
              type="warning"
              style="width:80px"
              plain
              @click="goDetail(scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>

    <!-- 聊天记录对话框 -->
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
import myTable from "../../../../components/myTable";
import searchBar from "../../../../components/searchBar";
import emoji from "../../../../utils/emoji";

export default {
  components: {
    myTable,
    searchBar,
  },
  data() {
    return {
      // 搜索条相关
      searchList: [
        {
          label: "用户ID：",
          placeholder: "请输入用户ID",
          type: "input",
          value: "",
          query: "userId",
        },
        {
          label: "用户昵称：",
          placeholder: "请输入用户昵称",
          type: "input",
          value: "",
          query: "userName",
        },
      ],
      // 表格相关
      tableHeadData: [
        {
          label: "对象ID",
          prop: "id",
        },
        {
          label: "昵称",
          prop: "name",
        },
        {
          label: "最后联系时间",
          prop: "createDate",
        },
      ],
      tableData: [
        {
          id: "89799869",
        },
      ],
      page: {
        currentPage: 1,
        pageSize: 10,
        totleCount: 0,
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
  methods: {
    // 表情包
    textToEmoji(val, size = 18) {
      return emoji(val, size);
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
    getList() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
  },
};
</script>

<style lang="less" scoped>
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