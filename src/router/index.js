import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from '../views/layout/index'


export const constantRouterMap = [
  {
    path: "/login",
    component: resolve => require(["@/views/login/index"], resolve),
    hidden: true
  },
  {
    path: "/",
    redirect: "/home",
    component: Layout,
  },
  // {
  //   path: "/layout/index",
  //   name: "layout",
  //   component: Layout,
  // },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: Layout,
  // },
  {
    path: "/404",
    component: resolve => require(["@/views/404"], resolve),
    hidden: true
  },]


/**
* 需要判断权限的路由
*/
export const asyncRouterMap = [
  {
    path: "/home",
    name: "home",
    component: Layout,
    redirect: "/home/index",
    // meta: {
    //   title: '首页'
    // },
    hidden: true,
    children: [
      {
        path: 'index',
        component: () =>
          import("@/views/home/index.vue"),
        name: 'index',
        meta: {
          title: '首页'
        },
      }
    ]
  },
  {
    path: "/userManage",
    name: "userManage",
    redirect: "/userManage/userList",
    component: Layout,
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: 'userList',
        component: () =>
          import("@/views/userManage/userList/userList.vue"),
        name: 'userList',
        meta: {
          title: '用户列表'
        },
        children: [
          {
            path: 'userDetail',
            component: () =>
              import("@/views/userManage/userList/component/userDetail.vue"),
            name: 'userDetail',
            meta: {
              title: '个人详情'
            },
            hidden: true
          },
        ]
      },
      // {
      //   path: 'userList/component/userDetail',
      //   component: () =>
      //     import("@/views/userManage/userList/component/userDetail.vue"),
      //   name: 'userDetail',
      //   meta: {
      //     title: '个人详情'
      //   },
      //   hidden: true
      // },
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
    redirect: "/plotManage/plotList",
    meta: {
      title: '剧情管理',
      permissions: ["plotManage"]
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
      {
        path: 'addPlot',
        component: () =>
          import("@/views/plotManage/addPlot.vue"),
        name: 'addPlot',
        meta: {
          title: '添加剧情'
        },
        hidden: true
      },
    ]
  },
  {
    path: "/auditManage",
    name: "auditManage",
    component: Layout,
    redirect: "/auditManage/actorCertification",
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
        path: 'actordetails',
        component: () =>
          import("@/views/auditManage/component/actordetails.vue"),
        name: 'actordetails',
        meta: {
          title: '演员认证-演员详情'
        },
        hidden: true
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
        path: 'reviewdetails',
        component: () =>
          import("@/views/auditManage/component/reviewdetails.vue"),
        name: 'reviewdetails',
        meta: {
          title: '剧情认证-评审详情'
        },
        hidden: true
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
        },
      },
      {
        path: 'userAvatarReview/myTaskForImg',
        component: () =>
          import("@/views/auditManage/component/myTaskForImg.vue"),
        name: 'myTaskForImg',
        meta: {
          title: '用户头像审核-我的任务'
        },
        hidden: true
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
    redirect: "/knowledgeManage/generalTopic",
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
    redirect: "/businessMonitor/avatarList",
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
        path: 'monitorDetail',
        component: () =>
          import("@/views/businessMonitor/component/monitorDetail.vue"),
        name: 'monitorDetail',
        meta: {
          title: '监控详情'
        },
        hidden: true
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
      {
        path: 'signatureList',
        component: () =>
          import("@/views/businessMonitor/signatureList.vue"),
        name: 'signatureList',
        meta: {
          title: '个性签名列表'
        }
      },
    ]
  },
  {
    path: "/operationManage",
    name: "operationManage",
    redirect: "/operationManage/couponManage",
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
      {
        path: 'couponeditor',
        component: () =>
          import("@/views/operationManage/couponeditor.vue"),
        name: 'couponeditor',
        meta: {
          title: '编辑页'
        },
        hidden: true
      },
    ]
  },

  {
    path: "/authorityManage",
    name: "authorityManage",
    component: Layout,
    redirect: "/authorityManage/index",
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: 'userManage',
        component: () =>
          import("@/views/authorityManage/userManage.vue"),
        name: 'userManageTree',
        meta: {
          title: '用户权限管理'
        }
      },
      {
        path: 'roleManage',
        component: () =>
          import("@/views/authorityManage/roleManage.vue"),
        name: 'roleManage',
        meta: {
          title: '角色管理'
        }
      },
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  },

  // {
  //   path: "*",
  //   component: resolve => require(["@/views/404"], resolve),
  //   hidden: true
  // },
];


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

