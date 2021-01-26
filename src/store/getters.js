const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roless,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.tagsView.visitedViews,
}
export default getters
