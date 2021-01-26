import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar    进度条
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // getToken from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permission judge function
function hasPermission(permissions, permissionRoles) {
  // console.log(process,process.env.VUE_APP_PERMISSION_DEBUG,"process.env.VUE_APP_PERMISSION_DEBUG");

  if (process.env.VUE_APP_PERMISSION_DEBUG === "true") {
    //权限校验不生效
    return true;
  }
  // console.log(permissions,'quanxian') //获取权限的路由
  //if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true;
  return permissions.some(
    permission => permissionRoles.indexOf(permission) >= 0
  );
}

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/home" });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.permissions.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        // const bossToken= store.state.user.token;
        store
          .dispatch("user/getInfo")
          .then(res => {
            // 拉取user_info
            const menus = res.menuList; // note: permissions must be a array! such as: ['editor','develop']
            //console.log(menus,"menus");
            store
              .dispatch("permission/GenerateRoutes", { permissions: menus })
              .then(() => {
                // 根据permissions权限生成可访问的路由表   
                //console.log(store.getters.addRouters);
                router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                console.log(router)
                next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              });
          })
          .catch(err => {
            store.dispatch("user/logout").then(() => {
              Message.error(err || "Verification failed, please login again");
              next({ path: "/home" });
            });
          });
      } else {

        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.permissions, to.meta.permissions)) {
          next();
        } else {
          next({ path: "/404", replace: true, query: { noGoBack: true } });
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
