const state = {
  visitedViews: [
    {
      name: "首页",
      path: "/home/index",
    },
  ],
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push({
      path: view.path,
      name: view.title,
    })
    // let arr = JSON.stringify(state.visitedViews)
    // console.log(JSON.parse(JSON.stringify(state.visitedViews)))
    // sessionStorage.setItem("visitedViews", arr)
  },
}

const actions = {
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
