<template>
  <div>
    <!-- 服务设置 -->
    <div>接单时间：08:00-次日8:00</div>
    <myTable
      :tableHeadData="tableHeadData"
      :tableData="tableData"
      :page="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:button>
        <el-table-column align="center" label="操作" fixed="right">
          <template>
            <el-button size="small" type="warning" style="width:80px" plain>禁用服务</el-button>
            <el-button size="small" type="success" style="width:80px" plain>解封服务</el-button>
          </template>
        </el-table-column>
      </template>
    </myTable>
  </div>
</template>

<script>
import myTable from "../../../../components/myTable";

export default {
  components: {
    myTable,
  },
  data() {
    return {
      // 表格相关
      tableHeadData: [
        {
          label: "服务名称",
          prop: "id",
        },
        {
          label: "认证时间",
          prop: "name",
        },
        {
          label: "认证状态",
          prop: "phone",
        },
        {
          label: "审核通过时间",
          prop: "createDate",
        },
        {
          label: "总单量",
          prop: "createDate",
        },
        {
          label: "好评率",
          prop: "createDate",
        },
        {
          label: "审核人",
          prop: "createDate",
        },
        {
          label: "操作人",
          prop: "createDate",
        },
      ],
      tableData: [
        {
          id: "你就能",
        },
      ],
      page: {
        currentPage: 1,
        pageSize: 10,
        totleCount: 0,
      },
    };
  },
  methods: {
    getList() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
</style>