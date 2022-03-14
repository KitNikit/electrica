<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="CART.length">
      <span class="cart_title">Товары:</span>
      <div class="cart_item" v-for="(item, index) in CART" :key="item.name">
        <div class="cat_item_img">
          <img :src="`${item.src}`" />
        </div>
        <div class="cart_name">{{ item.name }}</div>
        <div class="cart_price">{{ item.price | toFix | spacePrice }}</div>
        <div class="cart_quantity">
          <div>Количество:</div>
          <div class="cart_quantity_number">
            <span @click="decrementItem(index)">-</span>
            {{ item.quantity }}
            <span @click="incrementItem(index)">+</span>
          </div>
        </div>
        <button @click="deleteFromCart(index)">Удалить</button>
      </div>
    </div>
    <div v-else>В корзине нет товаров</div>
    <div class="cart_total">
      <p>Всего:</p>
      <span class="cart_total_value">
        <p>{{ cartTotal | toFix | spacePrice }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toFix from "../filters/toFix";
import spacePrice from "../filters/spacePrice";

export default {
  data() {
    return {};
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    toFix,
    spacePrice,
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM",
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    incrementItem(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrementItem(index) {
      this.DECREMENT_CART_ITEM(index);
    },
  },
  computed: {
    ...mapGetters(["CART"]),
    cartTotal() {
      let result = [];
      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    },
  },
  mounted() {
    let vm = this;
    this.CART.map(function (item) {
      if (!item.quantity) {
        vm.$set(item, "quantity", 1);
      }
    });
  },
};
</script>

<style scoped>
.cart_title {
  margin-left: 30px;
}
.cart_item {
  height: 150px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 5px 5px 10px #c6c6c6;
}
.cart_name {
  flex-basis: 25%;
}
.cat_item_img {
  flex-basis: 10%;
}
.cart_quantity_number {
  text-align: center;
}
.cart_total {
  font-size: 20px;
  margin-left: 30px;
}
.cart_total_value {
  display: flex;
}
.cart_quantity_number span {
  margin: 0 10px;
  cursor: pointer;
}
</style>
