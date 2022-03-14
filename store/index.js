import Vue from "vue";
import Vuex from "vuex";
import catalog from "./states/catalog";
import cart from "./states/cart";
import popular from "./states/popular";
import week from "./states/week";
import searchValue from "./states/searchValue";

const allState = { ...catalog, ...cart, ...popular, ...week, ...searchValue };

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      allState,
    },
    mutations: {
      SET_CART(state, product) {
        if (state.allState.cart.length) {
          let isProductExist = false;
          state.allState.cart.map(function (item) {
            if (item.name === product.name) {
              isProductExist = true;
              item.quantity++;
            }
          });
          if (!isProductExist) {
            state.allState.cart.push(product);
          }
        } else {
          state.allState.cart.push(product);
        }
      },
      REMOVE_FROM_CART(state, index) {
        state.allState.cart.splice(index, 1);
      },
      INCREMENT(state, index) {
        state.allState.cart[index].quantity++;
      },
      DECREMENT(state, index) {
        if (state.allState.cart[index].quantity > 1) {
          state.allState.cart[index].quantity--;
        }
      },
      SHOW(state, index) {
        if (state.allState.catalog[index].show === false) {
          state.allState.catalog[index].show = true;
        }
      },
      CLOSE(state, index) {
        if (state.allState.catalog[index].show === true) {
          state.allState.catalog[index].show = false;
        }
      },
      SET_SEARCH_VALUE(state, value) {
        state.allState.searchValue = value;
      },
    },
    actions: {
      ADD_TO_CART({ commit }, product) {
        commit("SET_CART", product);
      },
      DELETE_FROM_CART({ commit }, index) {
        commit("REMOVE_FROM_CART", index);
      },
      INCREMENT_CART_ITEM({ commit }, index) {
        commit("INCREMENT", index);
      },
      DECREMENT_CART_ITEM({ commit }, index) {
        commit("DECREMENT", index);
      },
      SHOW_POPUP({ commit }, index) {
        commit("SHOW", index);
      },
      CLOSE_POPUP({ commit }, index) {
        commit("CLOSE", index);
      },
      GET_SEARCH_VALUE({ commit }, value) {
        commit("SET_SEARCH_VALUE", value);
      },
    },
    getters: {
      CART(state) {
        return state.allState.cart;
      },
      CATALOG(state) {
        return state.allState.catalog;
      },
      SEACH_VALUE(state) {
        return state.allState.searchValue;
      },
    },
  });

export default store;
