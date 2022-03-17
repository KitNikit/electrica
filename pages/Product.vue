<template>
  <div class="product">
    <notification :messages="messages"> </notification>
    <div class="product_cart" v-for="item in product" :key="item.name">
      <img class="product_cart_img" :src="`${item.src}`" />
      <div class="product_cart_content">
        <div>{{ item.name }}</div>
        <div>{{ item.price | toFix | spacePrice }}</div>
      </div>
    </div>
    <button class="product_basket" @click="addToCart(product)">
      В корзину
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toFix from "../filters/toFix";
import spacePrice from "../filters/spacePrice";
export default {
  data() {
    return {
      product: [],
      messages: [],
    };
  },
  name: "product",
  filters: {
    toFix,
    spacePrice,
  },
  computed: {
    ...mapGetters(["PRODUCT", "CATALOG"]),
  },
  methods: {
    ...mapActions(["ADD_TO_CART"]),
    addToCart(product) {
      console.log(product[0]);
      this.ADD_TO_CART(product[0])
        .then(() => {
          let timeStamp = Date.now().toLocaleString();
          this.messages.unshift({
            name: "Товар добавлен в корзину",
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
  },
  mounted() {
    if (this.PRODUCT.length) {
      this.product = this.PRODUCT;
    } else {
      let vm = this;
      this.product = this.CATALOG.filter(function (item) {
        return item.name == vm.$route.query.name;
      });
    }
  },
};
</script>

<style>
.product_cart {
  display: flex;
  justify-content: center;
  margin: 50px;
}
.product_cart_img {
  width: 300px;
}
.product_cart_content {
  margin: 20px;
  font-size: 20px;
}
.product_cart_content div {
  margin-bottom: 20px;
}
.product_basket {
  margin: 50px auto;
  display: block;
  background: #fed700;
  border-radius: 6px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  box-shadow: 5px 5px 10px #c6c6c6;
}
.product_basket:hover {
  color: #df3737;
}
</style>
