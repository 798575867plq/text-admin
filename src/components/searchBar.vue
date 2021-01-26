<template>
  <div>
    <div class="top-box">
      <div class="top-item" v-for="(item,index) in listData" :key="index">
        <!-- 字段说明 -->
        <div class="top-item-title">{{item.label}}</div>
        <div>
          <!-- 输入框 -->
          <el-input
            v-if="item.type=='input'"
            :placeholder="item.placeholder"
            v-model="listQuery[item.query]"
            size="small"
          ></el-input>
          <!-- 筛选框 -->
          <el-select
            v-if="item.type=='select'"
            size="small"
            v-model="listQuery[item.query]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <!-- 时间选择器 -->
          <el-date-picker
            v-if="item.type=='date'"
            @change="getDate($event,item)"
            v-model="item.value"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </div>
      <!-- 查询/重置按钮 -->
      <div class="top-item">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          :loading="isSearchLoad"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          size="small"
          icon="el-icon-refresh-left"
          :loading="isResetLoad"
          @click="reset()"
        >重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/*
searchData:查询条件数组
      [
          {
            label: "用户ID：",
            placeholder: "请输入用户ID",
            type: "input",
            value: "",
            isNumber: true-----------是否是数字类型
            query:"userId"-------------入参key
          },
          {
            label: "注册时间:",
            type: "date",
            value: "",
            query: {------------------可为对象，时间特殊处理
              regTimeStart: "",
              regTimeEnd: "",
            },
          },
          {
            label: "用户昵称：",
            placeholder: "请选择",
            type: "select",
            value: "",
            options: [
              { value: "1", label: "张三" },
              { value: "2", label: "李四" }
            ],
            query:"nickName"-------------入参key
          }
        ];
*/
export default {
  props: {
    searchData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      listData: [],
      listQuery: {},
      isSearchLoad: false,
      isResetLoad: false,
    };
  },
  created() {
    // 不能直接修改prop的值
    this.listData = this.searchData;
  },
  methods: {
    // 时间筛选
    getDate(val, item) {
      let keys = Object.keys(item.query);
      for (let i = 0; i < keys.length; i++) {
        item.query[keys[i]] = val[i];
      }
      this.listQuery = { ...this.listQuery, ...item.query };
    },
    // 过滤对象的空值
    filterNull(obj) {
      let param = {};
      for (let key in obj) {
        if (obj[key] != "") {
          param[key] = obj[key];
        }
      }
      return param;
    },
    search() {
      // 绑定入参的key值
      // let keys = Object.keys(this.listQuery);
      // for (let i = 0; i < keys.length; i++) {
      //   this.listQuery[keys[i]] = this.listData[i].value;
      // }

      // 开启loading;
      if (Object.keys(this.filterNull(this.listQuery)).length != 0) {
        this.isSearchLoad = true;
      } else {
        this.isSearchLoad = false;
        return false;
      }
      this.$emit("search", this.filterNull(this.listQuery));
    },
    reset() {
      this.listData.forEach((item) => {
        item.value = "";
      });
      this.listQuery = {};
      this.isResetLoad = true;
      this.$emit("reset", "");
    },

    stopLoad(type) {
      if (type == "search") {
        this.isSearchLoad = false;
      } else if (type == "reset") {
        this.isResetLoad = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.top-box {
  display: flex;
  flex-wrap: wrap;
  .top-item {
    display: flex;
    align-items: center;
    margin: 5px;
    .top-item-title {
      margin-right: 5px;
    }
  }
}
</style>