<template>
  <!--  表单 -->
  <div>
    <div v-for="(item,index) in formData" :key="index">
      <!-- 输入框 -->
      <div class="item-box" v-if="item.type=='input'">
        <label class="item-label" :for="item.label">{{item.label}}</label>
        <div>
          <el-input
            class="item-right"
            :size="item.size?item.size:''"
            :placeholder="item.placeholder"
            v-model="item.data"
            clearable
            :rows="3"
            resize="none"
            :type="item.inputType?item.inputType:'text'"
            @blur="judgeError(item)"
          ></el-input>
          <div class="item-error" v-if="item.showError==true">{{item.errorText}}</div>
        </div>
      </div>

      <!-- 选择框 -->
      <div class="item-box" v-else-if="item.type=='select'">
        <label class="item-label" :for="item.label">{{item.label}}</label>
        <div>
          <el-select
            :size="item.size?item.size:''"
            class="item-right"
            :placeholder="item.placeholder"
            v-model="item.data"
            @change="judgeError(item)"
          >
            <el-option
              v-for="(option,id) in item.options"
              :key="id"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <div class="item-error" v-if="item.showError==true">{{item.errorText}}</div>
        </div>
      </div>

      <!-- 日期时间选择器 -->
      <div class="item-box" v-else-if="item.type=='date'">
        <label class="item-label" :for="item.label">{{item.label}}</label>
        <div>
          <!-- 时间的入参在父组件做处理 -->
          <el-date-picker
            class="item-right"
            v-model="item.data"
            @blur="judgeError(item)"
            :size="item.size?item.size:''"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <div class="item-error" v-if="item.showError==true">{{item.errorText}}</div>
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="btn-box">
      <el-button type="primary" size="small" :loading="isSubmitLoad" @click="submit()">提交</el-button>
      <el-button type="info" size="small" @click="reset()">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //  formData: [
    //         {
    //           label: "名字：",
    //           type: "input",-----------表单item类型（input,select,date）
    //             inputType:"textarea"---------在type为input的时候可以填
    //            options: [-------------------在type为select的时候填
    //             {
    //               label: "展示的数据",
    //               value: "实际的数据",
    //             },
    //             {
    //               label: "展示的数据22",
    //               value: "实际的数据22",
    //             },
    //           ],
    //           placeholder: "请输入名字",
    //           size: "small",
    //           query: "name",-----------参数key名
    //           data: "",-------------初始值
    //           isError: (item) => {--------------判断规则
    //             if (!item.data) {
    //               item.errorText = "姓名22不能为空";
    //               return true;
    //             } else if (item.data.length > 0 && item.data.length < 3) {
    //               item.errorText = "不应该小于3个";
    //               return true;
    //             } else {
    //               return false;
    //             }
    //           },
    //            errorText: "姓名22不能为空",---------------错误提示初始值
    //         },
    //       ],

    formData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    btnPosition: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      isSubmitLoad: false,
      listQuery: {},
    };
  },
  created() {
    if (this.btnPosition == "right") {
      document.documentElement.style.setProperty("--btnPosition", "flex-end");
    } else if (this.btnPosition == "center") {
      document.documentElement.style.setProperty("--btnPosition", "center");
    }
  },
  methods: {
    async submit() {
      await this.formData.forEach((item) => {
        // 绑定参数
        this.listQuery[item.query] = item.data;
        // 判断单个是否错误
        this.judgeError(item);

        console.log(this.listQuery, this.formData);
      });

      // 判断是否通过全部验证
      let result = await this.formData.some((item) => item.showError == true);
      console.log(result);
      if (result) {
        console.log("有错误");
        return false;
      } else {
        console.log("通过");
        this.$emit("getQuery", this.listQuery);
      }
    },
    // 重置
    reset() {
      this.formData.forEach((item) => {
        item.data = undefined;
        this.listQuery[item.query] = item.data;
        item.showError = false;
      });
    },
    judgeError(item) {
      if (item.isError) {
        if (item.isError(item)) {
          this.$set(item, "showError", true);
          this.$forceUpdate();
        } else {
          this.$set(item, "showError", false);
          this.$forceUpdate();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>

:root {
  --btnPosition: center;
}

.el-input {
  max-width: var(--inputWidth, "400px");//初始化好像不生效，只能在后面加了个备用值
}

/deep/ .el-textarea__inner {
  width: 300px;
}

.item-box {
  display: flex;
  /* // align-items: baseline; */
  margin-top: 15px;
}

.item-label {
  width: 80px;
  text-align: right;
}
.item-right {
  flex: 1;
}

.item-error {
  color: #f56c6c;
  font-size: 12px;
  text-align: left;
}

.btn-box {
  display: flex;
  justify-content: var(--btnPosition, center);
  margin-top: 50px;
}
</style>