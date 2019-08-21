import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      "id": "",
      "email": "",
      "name": "",
      "password": "",
      "zipcode": "",
      "address": "",
      "number": "",
      "district": "",
      "state": "",
      "city": ""
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      // Usando um objeto vazio na combinação para o caso dos outros valores serem NULL, garantindo que o retorno continue sendo um OBJETO
      state.user = Object.assign({}, state.user, payload);
    }
  },
  actions: {
    getUser(context, payload) {
      return api.get(`/user/${payload}`)
        .then(r => {
          context.commit("UPDATE_USER", r.data);
          context.commit("UPDATE_LOGIN", true);
        })
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email })
      return api.post("/user", context.state.user );
    },
    logOutUser(context) {
      context.commit("UPDATE_USER", {
        "id": "",
        "email": "",
        "name": "",
        "password": "",
        "zipcode": "",
        "address": "",
        "number": "",
        "district": "",
        "state": "",
        "city": ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
})
