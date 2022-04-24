import Vue from 'vue'
import Vuex from 'vuex'
import cache from './cache'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cache
  }
})
