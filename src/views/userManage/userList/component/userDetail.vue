<template>
  <div class="all-box">
    <div style="margin-bottom:10px">
      <el-button type="primary" @click="goBack()">返回</el-button>
    </div>
    <hr />

    <div class="person-box">
      <div class="img-box">
        <myImg :imgSrc="userInfo.baseUserInfoVO.face"></myImg>
        <div class="img-btn">
          <el-button type="primary" size="small" @click="resetDefault()">恢复默认头像</el-button>
        </div>
      </div>
      <div class="img-box">
        <myImg :imgSrc="userInfo.baseUserInfoVO.videoFace"></myImg>
        <div class="img-btn">
          <el-button type="primary" size="small" @click="delVideoAvatar()">删除视频头像</el-button>
        </div>
      </div>
      <el-card style="flex:2;margin-right:20px">
        <div class="person-info-box">
          <div class="person-top">
            <div>用户信息：</div>
            <div>
              <el-button type="primary" size="mini" @click="editInfo()">编辑</el-button>
            </div>
          </div>
          <div class="person-content">
            <el-row :gutter="20" class="person-row">
              <el-col :span="8">
                <div>ID：{{userInfo.baseUserInfoVO.userId}}</div>
              </el-col>
              <el-col :span="8">
                <div>昵称：{{userInfo.baseUserInfoVO.nickName}}</div>
              </el-col>
              <el-col :span="8">
                <div>绑定手机：{{userInfo.baseUserInfoVO.phone}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="person-row">
              <el-col :span="8">
                <div>类型：{{userInfo.baseUserInfoVO.userRole}}</div>
              </el-col>
              <el-col :span="8">
                <div>版本号：{{userInfo.baseUserInfoVO.version}}</div>
              </el-col>
              <el-col :span="8">
                <div>渠道：{{userInfo.baseUserInfoVO.regSource}}</div>
              </el-col>
              <!-- <el-col :span="6">
                <div>提现:{{userInfo.cashOut}}</div>
              </el-col>-->
            </el-row>
            <el-row :gutter="20" class="person-row">
              <el-col :span="12">
                <div>注册时间：{{userInfo.baseUserInfoVO.regTime}}</div>
              </el-col>
              <el-col :span="12">
                <div>最后登录时间：{{userInfo.baseUserInfoVO.lastLoginTime}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="person-row">
              <el-col :span="6">
                <div>充值金额：{{userInfo.baseUserInfoVO.investMoney}}</div>
              </el-col>
              <el-col :span="6">
                <div>余额:{{userInfo.baseUserInfoVO.balance}}</div>
              </el-col>
              <el-col :span="6">
                <div>服务总收入：{{userInfo.baseUserInfoVO.totalRevenue}}</div>
              </el-col>
              <el-col :span="6">
                <div>收入币余额：{{userInfo.baseUserInfoVO.income}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="person-row">
              <!-- <el-col :span="6">
                <div>最后登录IP：{{userInfo.lastLoginIp}}</div>
              </el-col>-->
            </el-row>
          </div>
        </div>
      </el-card>
      <el-card style="flex:2">
        <div class="person-info-box">
          <div class="person-top">
            <div>基本资料：</div>
            <!-- <div>
              <el-button type="primary" size="mini" @click="editInfo()">编辑</el-button>
            </div>-->
          </div>
          <div style="display:flex;align-items:center">
            <div>相册：</div>
            <div class="alumb-box">
              <myImg
                v-for="(img,index) in userInfo.baseInfoVO.albums"
                :key="index"
                :imgSrc="img"
                :imgWidth="'80px'"
                :imgHeight="'80px'"
              ></myImg>
              <!-- <myImg :imgWidth="'80px'" :imgHeight="'80px'"></myImg>
              <myImg :imgWidth="'80px'" :imgHeight="'80px'"></myImg>
              <myImg :imgWidth="'80px'" :imgHeight="'80px'"></myImg>
              <myImg :imgWidth="'80px'" :imgHeight="'80px'"></myImg>-->
            </div>
          </div>
          <div class="audio-box">
            <div>语音签名：</div>
            <myAudio :count="8" :src="userInfo.baseInfoVO.voiceSignature" style="flex:1"></myAudio>
          </div>

          <div class="audio-box">
            <div>
              个性签名：
              <span>{{userInfo.baseInfoVO.signature}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="操作日志" name="personalTab">
          <personalTab ref="personalTab"></personalTab>
        </el-tab-pane>
        <el-tab-pane label="动态" name="dynamicTab">
          <!-- <span slot="label">
            <el-badge :value="dynamicTabCount" :max="99" class="item">动态</el-badge>
          </span>-->
          <dynamicTab ref="dynamicTab"></dynamicTab>
        </el-tab-pane>
        <el-tab-pane label="招呼语" name="greetingTab">
          <greetingTab ref="greetingTab"></greetingTab>
        </el-tab-pane>
        <el-tab-pane label="动作配音" name="actionDubbTab">
          <actionDubbTab ref="actionDubbTab"></actionDubbTab>
        </el-tab-pane>
        <el-tab-pane label="装扮" name="dressupTab">
          <dressupTab ref="dressupTab"></dressupTab>
        </el-tab-pane>
        <el-tab-pane label="背包" name="bagTab">
          <bagTab ref="bagTab"></bagTab>
        </el-tab-pane>
        <el-tab-pane label="充值记录" name="rechargeRecordTab">
          <rechargeRecordTab ref="rechargeRecordTab"></rechargeRecordTab>
        </el-tab-pane>
        <el-tab-pane label="登入记录" name="loginRecordTab">
          <loginRecordTab ref="loginRecordTab"></loginRecordTab>
        </el-tab-pane>
        <el-tab-pane label="账单明细" name="billDetailsTab">
          <billDetailsTab ref="billDetailsTab"></billDetailsTab>
        </el-tab-pane>
        <el-tab-pane label="服务设置" name="serviceSetTab">
          <serviceSetTab ref="serviceSetTab"></serviceSetTab>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="withdrawRecordTab">
          <withdrawRecordTab ref="withdrawRecordTab"></withdrawRecordTab>
        </el-tab-pane>
        <el-tab-pane label="运营管理" name="operateManageTab">
          <operateManageTab ref="operateManageTab"></operateManageTab>
        </el-tab-pane>
        <el-tab-pane label="聊天记录" name="chatRecordTab">
          <chatRecordTab ref="chatRecordTab"></chatRecordTab>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="编辑个人资料" :visible.sync="editDialog" width="30%">
      <!-- <div class="edit-box">
        <span>昵称：</span>
        <el-input v-model="editQuery.nickName" placeholder="请输入昵称" style="flex:1"></el-input>
      </div>-->

      <myForm :formData="formData" :btnPosition="'right'" @getQuery="getQuery"></myForm>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import myTable from "../../../../components/myTable";
import personalTab from "../component/personalTab";
import dynamicTab from "../component/dynamicTab";
import actionDubbTab from "../component/actionDubbTab";
import dressupTab from "../component/dressupTab";
import bagTab from "../component/bagTab";
import greetingTab from "../component/greetingTab";
import rechargeRecordTab from "../component/rechargeRecordTab";
import loginRecordTab from "../component/loginRecordTab";
import billDetailsTab from "../component/billDetailsTab";
import serviceSetTab from "../component/serviceSetTab";
import withdrawRecordTab from "../component/withdrawRecordTab";
import operateManageTab from "../component/operateManageTab";
import chatRecordTab from "../component/chatRecordTab";

export default {
  components: {
    myTable,
    personalTab,
    dynamicTab,
    actionDubbTab,
    dressupTab,
    bagTab,
    greetingTab,
    rechargeRecordTab,
    loginRecordTab,
    billDetailsTab,
    serviceSetTab,
    withdrawRecordTab,
    operateManageTab,
    chatRecordTab,
  },
  data() {
    return {
      activeName: "personalTab",
      userInfo: {
        // baseUserInfoVO: {
        //   videoFace: "",
        // },
      },
      editDialog: false,
      editQuery: {
        userId: this.$route.query.id,
        nickName: "",
      },
      dynamicTabCount: 0,

      formData: [
        {
          label: "昵称：",
          type: "input",
          placeholder: "请输入昵称",
          size: "small",
          query: "nickName",
          data: "",
        },
      ],
    };
  },
  created() {
    if (this.$route.meta.title == "个人详情") {
      this.getDetail();
    }
  },
  methods: {
    getTotalSize(val) {
      this.dynamicTabCount = val;
    },
    handleClick(tab, event) {
      console.log(tab.name, "xasx");
      switch (tab.name) {
        case "personalTab":
          this.$refs.personalTab.getList();
          break;
        case "dynamicTab":
          this.$refs.dynamicTab.getList();
          break;
        case "actionDubbTab":
          this.$refs.actionDubbTab.getList();
          break;
        case "dressupTab":
          this.$refs.dressupTab.getList();
          break;
        case "bagTab":
          this.$refs.bagTab.getList();
          break;
        case "greetingTab":
          this.$refs.greetingTab.getList();
          break;
        case "rechargeRecordTab":
          this.$refs.rechargeRecordTab.getList();
          break;
        case "loginRecordTab":
          this.$refs.loginRecordTab.getList();
          break;
        case "billDetailsTab":
          this.$refs.billDetailsTab.getList();
          break;
        case "serviceSetTab":
          this.$refs.serviceSetTab.getList();
          break;
        case "withdrawRecordTab":
          this.$refs.withdrawRecordTab.getList();
          break;
        case "operateManageTab":
          this.$refs.operateManageTab.getList();
          break;
        case "chatRecordTab":
          this.$refs.chatRecordTab.getList();
          break;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    getDetail() {
      this.$api.user
        .getUserInfoById({ userId: this.$route.query.id })
        .then((res) => {
          this.userInfo = res;
          console.log(this.userInfo);
          this.$refs.personalTab.getList();
          // this.$refs.dynamicTab.getList();
        });
    },
    resetDefault() {
      this.$util.default.comfirmFun(
        "是否要对该用户进行恢复默认头像操作",
        "恢复默认头像",
        this.$api.user.restoreDefaultAvatar,
        {
          userId: this.$route.query.id,
        },
        this.getDetail
      );
    },
    delVideoAvatar() {
      this.$util.default.comfirmFun(
        "是否要对该用户进行删除视频头像操作",
        "删除视频头像",
        this.$api.user.delVideoAvatar,
        {
          userId: this.$route.query.id,
        },
        this.getDetail
      );
    },

    editInfo() {
      this.editDialog = true;
      this.formData[0].data = this.userInfo.baseUserInfoVO.nickName;
    },
    // 表单获取入参
    getQuery(data) {
      this.$api.user.updateUserDate(data).then((res) => {
        console.log(res);
        this.editDialog = false;
        this.getDetail();
      });
    },
    // submitEdit() {
    //   this.$api.user.updateUserDate(this.editQuery).then((res) => {
    //     console.log(res);
    //     this.editDialog = false;
    //     this.getDetail();
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-badge__content.is-fixed {
  top: 6px;
  right: 10px;
}
.all-box {
  text-align: left;
  padding: 0px 20px;
}

.alumb-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  div {
    margin-right: 10px;
    margin-top: 10px;
  }
}

.audio-box {
  display: flex;
  // align-items: flex-start;
  margin-top: 20px;
}

.person-box {
  display: flex;
  margin-top: 10px;
  .img-box {
    text-align: center;
    margin-right: 40px;
    img {
      width: 150px;
      height: 150px;
    }
    .el-image {
      width: 150px;
      height: 150px;
    }
    .img-btn {
      margin-top: 20px;
    }
  }
  .person-info-box {
    width: 100%;
    .person-top {
      display: flex;
      justify-content: space-between;
    }
    .person-content {
      word-break: break-all;
    }
    .person-row {
      margin-top: 15px;
    }
  }
}

.tabs-box {
  margin-top: 20px;
  .content-box {
    background-color: #ecf5ff;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    .img-box {
      width: 150px;
      height: 150px;
      margin-right: 20px;
    }
    .img-title {
      text-align: center;
      margin-top: 5px;
      font-size: 12px;
    }
  }
}

.edit-box {
  display: flex;
  align-items: center;
}
</style>