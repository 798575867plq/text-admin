<template>
  <div class="table-box">
    <el-table
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      :data="tableData"
      empty-text="暂无数据"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column v-if="showCheck" type="selection" width="55"></el-table-column>

      <el-table-column
        v-for="(item,index) in tableHeadData"
        :key="index"
        :align="item.align?item.align:'center'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width?item.width:''"
      >
        <template slot-scope="scope">
          <!-- 需要做处理的文字 -->
          <span v-if="item.render">{{item.render(scope.row)}}</span>
          <!-- 图片 -->
          <myImg
            v-else-if="typeof item.type=='function'? item.type(scope.row)=='img':item.type=='img'"
            :imgSrc="scope.row[item.prop]"
            :imgWidth="item.imgWidth?item.imgWidth:''"
            :imgHeight="item.imgHeight?item.imgHeight:''"
          ></myImg>

          <!-- 多张图片，（动态） -->
          <div
            style="display:flex;flex-wrap:wrap;"
            v-else-if="typeof item.type=='function'? item.type(scope.row)=='imgArr':item.type=='imgArr'"
          >
            <myImg
              style="margin-right:10px"
              v-for="(one,id) in scope.row[item.prop]"
              :key="id"
              :imgSrc="item.imgKey?one[item.imgKey]:one"
              :imgWidth="item.imgWidth?item.imgWidth:''"
              :imgHeight="item.imgHeight?item.imgHeight:''"
            ></myImg>
          </div>

          <!-- 视频 -->
          <!-- <video
            v-else-if="typeof item.type=='function'? item.type(scope.row)=='video':item.type=='video'"
            :src="Array.isArray(scope.row[item.prop])?scope.row[item.prop][0][item.imgKey]:scope.row[item.prop]"
            controls="controls"
          ></video>-->

          <myVideo
            v-else-if="typeof item.type=='function'? item.type(scope.row)=='video':item.type=='video'"
            :src="Array.isArray(scope.row[item.prop])?scope.row[item.prop][0][item.imgKey]:scope.row[item.prop]"
          ></myVideo>

          <!-- 音频 -->
          <!-- <audio
            v-else-if="typeof item.type=='function'? item.type(scope.row)=='audio':item.type=='audio'"
            :src="scope.row[item.prop]"
            controls="controls"
          ></audio>-->

          <myAudio
            v-else-if="typeof item.type=='function'? item.type(scope.row)=='audio':item.type=='audio'"
            :src="scope.row[item.prop]"
          ></myAudio>

          <!-- 开关 -->
          <el-switch
            v-else-if="item.type=='switch'"
            v-model="scope.row[item.prop]"
            :active-text="scope.row.activeText?scope.row.activeText:'停用'"
            :inactive-text="scope.row.inactiveText?scope.row.inactiveText:'正常'"
          ></el-switch>
          <!-- 普通展示文字 -->
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <!-- 操作栏 -->
      <slot name="button"></slot>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="page.totalRow>1"
      class="page-box"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNumber"
      :page-sizes="pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalRow"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "myTable",
  props: {
    /*tableHeadData:[
        {
          label: "用户名字", -----表头名称
          prop: "avatar",--------属性
          align: "center",-------对齐方式
          type: "img",-----------类型（img/video/audio）
          imgWidth: "100px",-----图片宽度
          imgHeight: "100px",----图片高度
          render: (row) => {----------------------需要做处理的数据
            if (row.status == 0) {
              return "未审核";
            } else if (row.status == 1) {
              return "审核通过";
            } else if (row.status == 2) {
             return "审核不通过";
            } else {
              return "禁用";
            }
          },
        },
    ]
    */

    //  表头内容
    tableHeadData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 表格内容
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 是否展示多选框
    showCheck: {
      type: Boolean,
      default: false,
    },
    // 是否显示loading动效
    isLoading: {
      type: Boolean,
      default: false,
    },
    // 分页的参数
    page: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 分页大小
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 30];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 改变页码大小
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    // 改变当前页数
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 多选框
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  },
};
</script>

<style lang="less" scoped>
.table-box {
  margin-top: 30px;
}
.page-box {
  margin-top: 20px;
}
</style>
