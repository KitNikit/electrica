import Vue from "vue";
import Vuex from "vuex";
import catalog from "./states/catalog";
import cart from "./states/cart";
import popular from "./states/popular";
import week from "./states/week";
import searchValue from "./states/searchValue";
import query from "./states/query";
import menu from "./states/menu";
import product from "./states/product";

const allState = {
  ...catalog,
  ...cart,
  ...popular,
  ...week,
  ...searchValue,
  ...query,
  ...menu,
  ...product,
};

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      allState,
    },
    mutations: {
      // SET_DATA(state, items) {
      //   state.allState.items = items;
      // },
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
      SHOW_WEEK(state, index) {
        if (state.allState.week[index].show === false) {
          state.allState.week[index].show = true;
        }
      },
      CLOSE_WEEK(state, index) {
        if (state.allState.week[index].show === true) {
          state.allState.week[index].show = false;
        }
      },
      SET_SEARCH_VALUE(state, value) {
        state.allState.searchValue = value;
      },
      SET_QUERY(state, value) {
        state.allState.query = value;
      },
      SET_MENU(state) {
        state.allState.catalog.map(function (item) {
          if (item.category) {
            if (!state.allState.menu.includes(item.category)) {
              state.allState.menu.push(item.category);
            }
          }
        });
      },
      SET_PRODUCT(state, value) {
        state.allState.product = [];
        state.allState.product.push(value);
      },
    },
    actions: {
      // GET_FROM_API({commit}) {
      //   return this.$axios('http://localhost:3000/', {
      //     method: 'GET'
      //   })
      //   .then((response) => {
      //     commit('SET_DATA', response.data)
      //   })
      // },
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
      SHOW_POPUP_WEEK({ commit }, index) {
        commit("SHOW_WEEK", index);
      },
      CLOSE_POPUP_WEEK({ commit }, index) {
        commit("CLOSE_WEEK", index);
      },
      GET_SEARCH_VALUE({ commit }, value) {
        commit("SET_SEARCH_VALUE", value);
      },
      GET_QUERY({ commit }, value) {
        commit("SET_QUERY", value);
      },
      GET_MENU({ commit }) {
        commit("SET_MENU");
      },
      GET_PRODUCT({ commit }, value) {
        commit("SET_PRODUCT", value);
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
      WEEK(state) {
        return state.allState.week;
      },
      POPULAR(state) {
        return state.allState.popular;
      },
      QUERY(state) {
        return state.allState.query;
      },
      MENU(state) {
        return state.allState.menu;
      },
      PRODUCT(state) {
        return state.allState.product;
      },
    },
  });

export default store;
