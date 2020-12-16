import Vue from 'vue'
import Vuex from 'vuex'

import api from './../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    logged: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: ""
    }
  },

  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.logged = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    }
  },

  actions: {
    getUser(context, payload) {
      api.get(`user/${payload}`).then(response => {
        context.commit("UPDATE_USER", response.data);
        context.commit("UPDATE_LOGIN", true);
      })
    }
  },

  modules: {
  }
})
