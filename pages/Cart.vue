<template>
  <div class="cart">
    <notification :messages="messages"> </notification>
    <div class="cart_page" v-if="CART.length">
      <span class="cart_title">Товары:</span>
      <div class="cart_item" v-for="(item, index) in CART" :key="item.name">
        <div class="cat_item_img">
          <img :src="`${item.src}`" />
        </div>
        <div class="cart_info">
          <div class="cart_name">{{ item.name }}</div>
          <div class="cart_price">
            Цена: {{ item.price | toFix | spacePrice }}
          </div>
          <div class="cart_quantity">
            Количество:
            <div class="cart_quantity_number">
              <span @click="decrementItem(index)">-</span>
              {{ item.quantity }}
              <span @click="incrementItem(index)">+</span>
            </div>
          </div>
        </div>
        <button @click="deleteFromCart(index)">Удалить</button>
      </div>
    </div>
    <div class="cart_null" v-else>В корзине нет товаров</div>
    <div class="cart_total">
      <p>Всего:</p>
      <span class="cart_total_value">
        <p>{{ cartTotal | toFix | spacePrice }}</p>
      </span>
    </div>
    <!-- <button @click.prevent="send">Отправить запрос</button> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toFix from "../filters/toFix";
import spacePrice from "../filters/spacePrice";

export default {
  data() {
    return {
      messages: [],
    };
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
      this.DELETE_FROM_CART(index)
        .then(() => {
          let timeStamp = Date.now().toLocaleString();
          this.messages.unshift({
            name: "Товар удалён из корзины",
            id: timeStamp,
          });
        })
        .then(() => {
          let vm = this;
          setTimeout(function () {
            vm.messages.splice(vm.messages.length - 1, 1);
          }, 3000);
        });
    },
    incrementItem(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrementItem(index) {
      this.DECREMENT_CART_ITEM(index);
    },
    send() {
      this.$mail.send({
        name: "test",
        subject: "Incredible",
        text: "This is an incredible test message",
      });
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
.cart_page {
  padding-top: 70px;
}
.cart_null {
  padding: 70px 30px 20px;
  font-size: 20px;
}
.cart_title {
  font-size: 20px;
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
.cart_item button {
  background: #fed700;
  border-radius: 6px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  box-shadow: 5px 5px 10px #c6c6c6;
  margin: 0 5px;
}
.cart_item button:hover {
  color: #df3737;
}
.cart_name,
.cart_price,
.cart_quantity {
  margin: 5px 50px;
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
  padding: 0 15px;
  cursor: pointer;
}
.cart_info {
  flex-basis: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart_name {
  flex-basis: 50%;
}
@media (max-width: 768px) {
  .cart_item {
    margin: 30px 10px;
    height: auto;
  }
  .cart_quantity {
    display: flex;
    align-items: center;
  }
  .cat_item_img img {
    width: 70px;
    object-fit: contain;
  }
  .cart_info {
    display: block;
  }
  .cart_name,
  .cart_price,
  .cart_quantity {
    margin: 5px;
  }
  .cart_quantity_number span {
    padding: 0 7px;
  }
}
</style>
