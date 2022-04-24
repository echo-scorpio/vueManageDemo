const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  // 添加
  ADD_VISITED_VIEW(state, view) {
    if (view.meta && view.meta.hidden) return
    if (state.visitedViews.some(v => v.name === view.name)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW(state, view) {
    if (view.meta && view.meta.hidden) return
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 删除单个 [i, v] => [0, {name: 'xxx'}]
  DEL_VISITED_VIEW(state, view) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.name === view.name) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  // 删除其他
  DEL_OTHERS_VISITED_VIEWS(state, view) {
    state.visitedViews = state.visitedViews.filter(v => v.name === view.name)
  },
  DEL_OTHERS_CACHED_VIEWS(state, view) {
    state.cachedViews = state.cachedViews.filter(name => name === view.name)
  },
  // 删除所有
  DEL_ALL_VISITED_VIEWS(state) {
    state.visitedViews = []
  },
  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = []
  },
  // 删除 左侧/右侧
  DEL_DIR_VISITED_VIEWS(state, { view, dir }) {
    let visitedViews = [...state.visitedViews]
    for (const [i, v] of visitedViews.entries()) {
      if (v.name === view.name) {
        if (dir === 'right') {
          let len = visitedViews.length - (i + 1) // 右边还有 len 个项
          visitedViews.splice(i + 1, len)
        } else visitedViews = visitedViews.slice(i)
        break
      }
    }
    state.visitedViews = visitedViews
  },
  DEL_DIR_CACHED_VIEWS(state, { view, dir }) {
    const index = state.cachedViews.indexOf(view.name)
    let cachedViews = [...state.cachedViews]
    if (index > -1) {
      if (dir === 'right') {
        let len = cachedViews.length - (index + 1) // 右边还有 len 个项
        cachedViews.splice(index + 1, len)
      } else cachedViews = cachedViews.slice(index)
    }
    state.cachedViews = cachedViews
  },
}

const actions = {
  // 添加
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 删除
  delView({ dispatch }, view) {
    dispatch('delVisitedView', view)
    dispatch('delCachedView', view)
  },
  delVisitedView({ commit }, view) {
    commit('DEL_VISITED_VIEW', view)
  },
  delCachedView({ commit }, view) {
    commit('DEL_CACHED_VIEW', view)
  },
  // 删除其他
  delOthersViews({ dispatch }, view) {
    dispatch('delOthersVisitedViews', view)
    dispatch('delOthersCachedViews', view)
  },
  delOthersVisitedViews({ commit }, view) {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
  },
  delOthersCachedViews({ commit }, view) {
    commit('DEL_OTHERS_CACHED_VIEWS', view)
  },
  // 删除所有
  delAllViews({ dispatch }, view) {
    dispatch('delAllVisitedViews', view)
    dispatch('delAllCachedViews', view)
  },
  delAllVisitedViews({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS')
  },
  delAllCachedViews({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS')
  },
  // 删除 左侧/右侧
  delDirViews({ dispatch }, { view, dir }) {
    dispatch('delDirVisitedViews', { view, dir })
    dispatch('delDirCachedViews', { view, dir })
  },
  delDirVisitedViews({ commit }, { view, dir }) {
    commit('DEL_DIR_VISITED_VIEWS', { view, dir })
  },
  delDirCachedViews({ commit }, { view, dir }) {
    commit('DEL_DIR_CACHED_VIEWS', { view, dir })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
