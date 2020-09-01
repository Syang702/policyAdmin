import {
  asyncRoutes,
  constantRoutes
} from '@/router'
/**
 * Use meta.role to determine决定 if the current user has permission
 * @param roles
 * @param route
 */

function hasPermission(roles, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }

  if (!route.id || roles.some(id => {
      return route.id == id
    })) {
    return true;
  }
  return false;
}

/**
 * Filter asynchronous routing tables by recursion递归
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles) //?asyncRoutes?
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations, //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation.
  //mutations: 类似于事件：每个 mutation 都有一个字符串的 事件类型(type) 和 一个 回调函数(handler:进行状态更改)
  actions //actions(异步),专门用来解决mutations只有同步无异步的问题.
}
