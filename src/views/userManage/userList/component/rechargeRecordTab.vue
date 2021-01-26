<template>
  <!-- 充值记录 -->
  <div>
    <radioTag :radioArr="radioArr" @chooseItem="chooseItem"></radioTag>
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
              @click="changePay(scope.row.id)"
            >完成支付</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>
  </div>
</template>

<script>
import myTable from "../../../../components/myTable";
import radioTag from "../../../../components/radioTag";

export default {
  components: {
    myTable,
    radioTag,
  },
  data() {
    return {
      // 表格相关
      tableHeadData: [
        {
          label: "订单创建时间",
          prop: "create_time",
        },
        {
          label: "平台订单号",
          prop: "id",
        },
        {
          label: "支付方式",
          prop: "name",
        },
        {
          label: "充值金额",
          prop: "trade_amount",
        },
        {
          label: "到账状态",
          prop: "createDate",
        },
        {
          label: "发货状态",
          prop: "lastDate",
        },
        {
          label: "操作人",
          prop: "update_by",
        },
      ],
      tableData: [
        {
          id: 87070,
        },
      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      listQuery: {
        userId: this.$route.query.id,
        pageIndex: 1,
        pageSize: 10,
      },

      // 单选条件
      radioArr: [
        { id: 1, name: "全部" },
        { id: 2, name: "已支付" },
        { id: 3, name: "未支付" },
      ],
      postItem: {},
    };
  },
  methods: {
    getList() {
      // this.$api.user.reChargeRecord(this.listQuery).then((res) => {
      //   console.log(res);
      //   this.tableData = res.reChargeList;
      //   this.page.pageIndex = res.pageMap.pageIndex;
      //   this.page.pageSize = res.pageMap.pageSize;
      //   this.page.totalSize = res.pageMap.totalSize;
      // });
    },
    chooseItem(item) {
      this.postItem = item;
      console.log(item);
    },
    changePay(id) {
      this.$util.default.comfirmFun(
        "请仔细核对信息确定是否要改变支付状态",
        "确定",
        this.$api.auditManage.actorUnApproved,
        { userId: id },
        this.getList
      );
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
</style>