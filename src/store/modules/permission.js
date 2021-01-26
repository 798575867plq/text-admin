import { asyncRouterMap, constantRouterMap } from "@/router";

/**
 * 通过meta.permissions判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  if (process.env.VUE_APP_PERMISSION_DEBUG === "true") {
    //权限校验不生效
    return true;
  }
  if (route.meta && route.meta.permissions) {
    return permissions.some(permission =>
      route.meta.permissions.includes(permission)
    );
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissions   后台给的
 */
function filterAsyncRouter(routes, permissions) {
  // const res = [];
  // routes.forEach(route => {
  //   const tmp = { ...route };
  //   if (hasPermission(permissions, tmp)) {
  //     if (tmp.children) {
  //       tmp.children = filterAsyncRouter(tmp.children, permissions);
  //     }
  //     res.push(tmp);
  //   }
  // });
  // // console.log(res, "ajsxbkasbx ")
  // return res;


  let arr = [];
  routes.forEach((element) => {
    // 保留hidden的路由
    if (element.hidden) {
      arr.push(element)
    }
    permissions.forEach((item) => {
      if (element.meta && element.meta.title == item.menu_name) {
        let obj = Object.assign(element);
        if (item.childNodeList) {
          obj.children = filterAsyncRouter(element.children, item.childNodeList);
        }
        arr.push(obj);
      }
    });
  });

  return arr;
}

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions } = data;
        console.log(permissions, "后台给的")
        let accessedRouters;
        accessedRouters = filterAsyncRouter(asyncRouterMap, permissions);
        console.log(accessedRouters, "结果")
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
