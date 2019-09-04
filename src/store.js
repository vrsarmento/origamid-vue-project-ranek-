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
    },
    user_products: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      // Usando um objeto vazio na combinação para o caso dos outros valores serem NULL, garantindo que o retorno continue sendo um OBJETO
      state.user = Object.assign({}, state.user, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.user_products = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.user_products.unshift(payload);
    }
  },
  actions: {
    getUser(context) {
      return api.get(`/user`)
        .then(r => {
          context.commit("UPDATE_USER", r.data);
          context.commit("UPDATE_LOGIN", true);
        })
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email })
      return api.post("/user", context.state.user );
    },
    loginUser(context, payload) {
      return api.login({
        username: payload.email,
        password: payload.password,
      }).then(response => {
        window.localStorage.rnktkn = `Bearer ${response.data.token}`; 
      })
    },
    logoutUser(context) {
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
      window.localStorage.removeItem("rnktkn");
      context.commit("UPDATE_LOGIN", false);
    },
    getUserProducts(context) {
      return api.get(`/product?user_id=${context.state.user.id}`).then(r => {
        context.commit("UPDATE_USER_PRODUCTS", r.data);
      })
    }
  }
});
