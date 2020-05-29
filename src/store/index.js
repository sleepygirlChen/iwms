import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: 0,
    userInfo: {}
  },
  mutations: {
    // 登录状态的更改触发
    changeState(state, options) {
      Object.keys(options).map((key) => {
        state[key] = options[key];
      })
    }
  },
  getters: {}
})