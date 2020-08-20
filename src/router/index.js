import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

import Layout from '../views/layout'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/layout/index",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("@/views/login/index.vue")
  },
  {
    path: "/layout/index",
    name: "layout",
    component: Layout,
  },
  {
    path: "/userManage",
    name: "userManage",
    component: Layout,
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: 'userList',
        component: () =>
          import("@/views/userManage/userList.vue"),
        name: 'userList',
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'rechargeRecord',
        component: () =>
          import("@/views/userManage/rechargeRecord.vue"),
        name: 'rechargeRecord',
        meta: {
          title: '充值记录'
        }
      },
      {
        path: 'actorWithdrawal',
        component: () =>
          import("@/views/userManage/actorWithdrawal.vue"),
        name: 'actorWithdrawal',
        meta: {
          title: '演员提现'
        }
      }
    ]
  },
  {
    path: "/plotManage",
    name: "plotManage",
    component: Layout,
    meta: {
      title: '剧情管理'
    },
    children: [
      {
        path: 'plotList',
        component: () =>
          import("@/views/plotManage/plotList.vue"),
        name: 'plotList',
        meta: {
          title: '剧情列表'
        }
      },
    ]
  },
  {
    path: "/auditManage",
    name: "auditManage",
    component: Layout,
    meta: {
      title: '审核管理'
    },
    children: [
      {
        path: 'actorCertification',
        component: () =>
          import("@/views/auditManage/actorCertification.vue"),
        name: 'actorCertification',
        meta: {
          title: '演员认证'
        }
      },
      {
        path: 'plotCertification',
        component: () =>
          import("@/views/auditManage/plotCertification.vue"),
        name: 'plotCertification',
        meta: {
          title: '剧情认证'
        }
      },
      {
        path: 'actorProfileReview',
        component: () =>
          import("@/views/auditManage/actorProfileReview.vue"),
        name: 'actorProfileReview',
        meta: {
          title: '演员头像审核'
        }
      },
      {
        path: 'userAvatarReview',
        component: () =>
          import("@/views/auditManage/userAvatarReview.vue"),
        name: 'userAvatarReview',
        meta: {
          title: '用户头像审核'
        }
      },
      {
        path: 'userVoiceReview',
        component: () =>
          import("@/views/auditManage/userVoiceReview.vue"),
        name: 'userVoiceReview',
        meta: {
          title: '用户语音签名审核'
        }
      },
      {
        path: 'userSignatureReview',
        component: () =>
          import("@/views/auditManage/userSignatureReview.vue"),
        name: 'userSignatureReview',
        meta: {
          title: '用户个性签名审核'
        }
      },
      {
        path: 'dynamicReview',
        component: () =>
          import("@/views/auditManage/dynamicReview.vue"),
        name: 'dynamicReview',
        meta: {
          title: '动态审核'
        }
      },
      {
        path: 'commentReview',
        component: () =>
          import("@/views/auditManage/commentReview.vue"),
        name: 'commentReview',
        meta: {
          title: '评论审核'
        }
      },
      {
        path: 'evaluationReview',
        component: () =>
          import("@/views/auditManage/evaluationReview.vue"),
        name: 'evaluationReview',
        meta: {
          title: '评价审核'
        }
      },
    ]
  },
  {
    path: "/knowledgeManage",
    name: "knowledgeManage",
    component: Layout,
    meta: {
      title: '知识库管理'
    },
    children: [
      {
        path: 'generalTopic',
        component: () =>
          import("@/views/knowledgeManage/generalTopic.vue"),
        name: 'generalTopic',
        meta: {
          title: '通用话题库'
        }
      },
      {
        path: 'storyTopic',
        component: () =>
          import("@/views/knowledgeManage/storyTopic.vue"),
        name: 'storyTopic',
        meta: {
          title: '剧情话题库'
        }
      },
    ]
  },
  {
    path: "/businessMonitor",
    name: "businessMonitor",
    component: Layout,
    meta: {
      title: '业务监控'
    },
    children: [
      {
        path: 'avatarList',
        component: () =>
          import("@/views/businessMonitor/avatarList.vue"),
        name: 'avatarList',
        meta: {
          title: '头像列表'
        }
      },
      {
        path: 'dynamicList',
        component: () =>
          import("@/views/businessMonitor/dynamicList.vue"),
        name: 'dynamicList',
        meta: {
          title: '动态列表'
        }
      },
      {
        path: 'textChatMonitor',
        component: () =>
          import("@/views/businessMonitor/textChatMonitor.vue"),
        name: 'textChatMonitor',
        meta: {
          title: '文字聊天监控'
        }
      },
      {
        path: 'theaterMonitor',
        component: () =>
          import("@/views/businessMonitor/theaterMonitor.vue"),
        name: 'theaterMonitor',
        meta: {
          title: '剧场监控'
        }
      },
      {
        path: 'greetingList',
        component: () =>
          import("@/views/businessMonitor/greetingList.vue"),
        name: 'greetingList',
        meta: {
          title: '招呼语列表'
        }
      },
      {
        path: 'voiceList',
        component: () =>
          import("@/views/businessMonitor/voiceList.vue"),
        name: 'voiceList',
        meta: {
          title: '语音签名列表'
        }
      },
      {
        path: 'commentList',
        component: () =>
          import("@/views/businessMonitor/commentList.vue"),
        name: 'commentList',
        meta: {
          title: '评论列表'
        }
      },
      {
        path: 'evaluationList',
        component: () =>
          import("@/views/businessMonitor/evaluationList.vue"),
        name: 'evaluationList',
        meta: {
          title: '评价列表'
        }
      },
    ]
  },
  {
    path: "/operationManage",
    name: "operationManage",
    component: Layout,
    meta: {
      title: '运营管理'
    },
    children: [
      {
        path: 'couponManage',
        component: () =>
          import("@/views/operationManage/couponManage.vue"),
        name: 'couponManage',
        meta: {
          title: '优惠劵管理'
        }
      },
    ]
  },

  {
    path: "/authorityManage",
    name: "authorityManage",
    component: Layout,
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: 'index',
        component: () =>
          import("@/views/authorityManage/index.vue"),
        name: 'authTree',
        meta: {
          title: '权限树'
        }
      },
    ]
  },

  {
    path: "*",
    component: resolve => require(["@/views/404"], resolve),
    hidden: true
  },
];

const router = new VueRouter({
  routes
});

export default router;
