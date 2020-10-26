import Vue from 'vue'
import Vuex from 'vuex'
import createPersisteadState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersisteadState()],
    state: {
      count: 0
    },
    mutations: {
        setCount: (state, count) => state.count = count,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        }
    }
  })
  export default store;