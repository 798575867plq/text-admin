<template>
  <div class="recharge">
    <!-- 查询栏 -->
    <div>
      <searchBar
        :searchData="searchList"
        :showDate="showDate"
        :searchQuery="searchQuery"
        @search="search"
        @reset="reset"
        @getDate="getDate"
        ref="searchBar"
      ></searchBar>
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
              <el-button @click="edit(scope.row)" size="small" style="width:80px" type="primary">修改</el-button>
            </template>
          </el-table-column>
        </template>
      </myTable>
    </div>

    <el-dialog title="提示" :visible.sync="editDialog" width="30%">
      <div>
        <label for>到货状态：</label>
        <el-select v-model="arrivalStatus" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false">确 定</el-button>
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
      showDate: true,
      searchQuery: {
        userId: "",
        phone: "",
        orderId: "",
        mchOrderNo: "",
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
          label: "用户手机号:",
          placeholder: "请输入用户手机号",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "订单号",
          placeholder: "请输入订单号",
          type: "input",
          value: "",
          isNumber: true,
        },
        {
          label: "平台订单号",
          placeholder: "请输入平台订单号",
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
          label: "用户昵称",
          prop: "nickName",
        },
        {
          label: "手机号",
          prop: "phone",
        },
        {
          label: "订单创建时间",
          prop: "createTime",
        },
        {
          label: "订单号",
          prop: "orderId",
        },
        {
          label: "平台订单号",
          prop: "mchOrderNo",
        },
        {
          label: "支付方式",
          prop: "payWayName",
        },
        {
          label: "充值金额",
          prop: "tradeAmount",
        },
        {
          label: "到账状态",
          prop: "status",
        },
      ],
      tableData: [],
      // page: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   totleCount: 0,
      // },
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
      // listQuery: {
      //   page: 1,
      //   count: 10,
      // },
      listQuery: {
        kindId: "RECHARGE_RECORD",
        pageIndex: 1,
        pageSize: 10,
      },
      editDialog: false,
      arrivalStatus: "",
      statusOptions: [
        {
          label: "未到账",
          value: "1",
        },
        {
          label: "已到账",
          value: "2",
        },
      ],
      deliveryStatus: "",
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
          this.tableData.forEach((item) => {
            item.status = this.filterStatus(item.status);
          });
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
    // 状态映射
    filterStatus(value) {
      let statusMap = new Map([
        [1, "支付创建"],
        [2, "支付成功"],
        [3, "支付失败"],
        [4, "支付关闭"],
      ]);
      return statusMap.get(value);
    },
    // 搜索
    search(query) {
      console.log(query);
      if (Object.keys(query).lenght == 0) {
        return false;
      }
      this.listQuery.pageIndex = 1;
      this.listQuery = { ...this.listQuery, ...query };
      // console.log(this.listQuery);
      this.getList();
    },
    // 重置
    reset() {
      this.listQuery = {
        kindId: "RECHARGE_RECORD",
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
    edit() {
      this.editDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>
.recharge {
  padding: 20px;
}
</style>