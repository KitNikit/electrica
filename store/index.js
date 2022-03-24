import catalog from "./states/catalog";
import cart from "./states/cart";
import popular from "./states/popular";
import week from "./states/week";
import searchValue from "./states/searchValue";
import query from "./states/query";
import menu from "./states/menu";
import product from "./states/product";
import cartMail from "./states/cartMail";
import popupItem from "./states/popupItem";

const allState = {
  ...catalog,
  ...cart,
  ...popular,
  ...week,
  ...searchValue,
  ...query,
  ...menu,
  ...product,
  ...cartMail,
  ...popupItem,
};

export const state = () => ({
  allState,
});

export const mutations = {
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
        localStorage.setItem("cart", JSON.stringify(state.allState.cart));
        state.allState.cartMail.push(product.name);
      }
    } else {
      state.allState.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(state.allState.cart));
      state.allState.cartMail.push(product.name);
    }
  },
  REMOVE_FROM_CART(state, index) {
    state.allState.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(state.allState.cart));
    state.allState.cartMail.splice(index, 1);
  },
  INCREMENT(state, index) {
    state.allState.cart[index].quantity++;
  },
  DECREMENT(state, index) {
    if (state.allState.cart[index].quantity > 1) {
      state.allState.cart[index].quantity--;
    }
  },
  SET_LOCAL_CART(state) {
    state.allState.cart = JSON.parse(localStorage.getItem("cart"));
    JSON.parse(localStorage.getItem("cart")).map(function (item) {
      if (!state.allState.cartMail.includes(item.name)) {
        state.allState.cartMail.push(item.name);
      }
    });

    state.allState.cartMail;
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
  SET_SHOW_POPUP_ITEM(state, item) {
    state.allState.popupItem = item;
  },
  // SET_SHOW_AND_QANTITY(state) {
  //   console.log("START");
  //   state.allState.catalog.map(function (item) {
  //     if (!item.show) {
  //     item.show = false;
  //     }
  //     if (!item.quantity) {
  //     item.quantity = 1;
  //     }
  //   });
  //   console.log(state.allState.catalog);
  //   return state.allState.catalog;
  // },
};

export const actions = {
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
  GET_LOCAL_CART({ commit }) {
    commit("SET_LOCAL_CART");
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
  GET_SHOW_POPUP_ITEM({ commit }, item) {
    commit("SET_SHOW_POPUP_ITEM", item);
  },
  // GET_SHOW_AND_QANTITY({ commit }) {
  //   commit("SET_SHOW_AND_QANTITY");
  // },
};

export const getters = {
  tests: (s) => s.tests,
  CART: (s) => s.allState.cart,
  CATALOG: (s) => s.allState.catalog,
  SEACH_VALUE: (s) => s.allState.searchValue,
  WEEK: (s) => s.allState.week,
  POPULAR: (s) => s.allState.popular,
  QUERY: (s) => s.allState.query,
  MENU: (s) => s.allState.menu,
  PRODUCT: (s) => s.allState.product,
  CART_MAIL: (s) => s.allState.cartMail,
  POPUP_ITEM: (s) => s.allState.popupItem,
};
