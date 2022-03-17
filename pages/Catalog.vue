<template>
  <div class="catalog">
    <notification :messages="messages"> </notification>
    <div class="menu_list">
      <div class="menu_list_item" v-for="value in MENU">
        <div
          v-if="
            (QUERY == value && !SEACH_VALUE) ||
            ($route.query.category == value && !SEACH_VALUE)
          "
          style="color: #df3737"
        >
          {{ value }}
        </div>
        <div v-else @click="categorySort(value)">{{ value }}</div>
      </div>
    </div>
    <div class="categories_container">
      <div class="categories_items">
        <div
          class="categories_item"
          v-for="(item, index) in products"
          :key="item.name"
        >
          <popup
            v-if="item.show"
            @closePopup="closePopup(index)"
            rightButton="В корзину"
            @rightButtonAction="addToCart(item)"
          >
            <img :src="`${item.src}`" />
            <div class="cat_item_title">
              {{ item.name }}
            </div>
            <div class="cat_item_price">
              {{ item.price | toFix | spacePrice }}
            </div>
          </popup>
          <div class="cat_item_title" @click.prevent="openProduct(item)">
            {{ item.name }}
          </div>
          <div class="cat_item_img" @click.prevent="openPopup(index)">
            <img :src="`${item.src}`" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">
              {{ item.price | toFix | spacePrice }}
            </div>
            <div class="price_basket" @click="addToCart(item)">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toFix from "../filters/toFix";
import spacePrice from "../filters/spacePrice";
import notification from "../components/notification.vue";

export default {
  components: { notification },
  data() {
    return {
      products: [],
      messages: [],
    };
  },
  filters: {
    toFix,
    spacePrice,
  },
  methods: {
    ...mapActions([
      "ADD_TO_CART",
      "SHOW_POPUP",
      "CLOSE_POPUP",
      "GET_MENU",
      "GET_QUERY",
      "GET_SEARCH_VALUE",
      "GET_PRODUCT",
    ]),
    addToCart(item) {
      this.ADD_TO_CART(item)
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
    openPopup(index) {
      if (this.products[index].show === false) {
        this.products[index].show = true;
      }
    },
    closePopup(index) {
      if (this.products[index].show === true) {
        this.products[index].show = false;
      }
      // this.CLOSE_POPUP(index);
    },
    sortProducts(value) {
      this.products = this.CATALOG.filter(function (item) {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      this.setShowProp();
    },
    categorySort(value) {
      if (this.QUERY == value) {
        this.GET_QUERY().then(() => {
          this.GET_QUERY(value);
        });
      } else {
        this.GET_QUERY(value);
      }
      this.$router.push("?category=" + value);
    },
    sortCategory() {
      let vm = this;
      this.products = this.CATALOG.filter(function (item) {
        return item.category == vm.QUERY;
      });
      this.setShowProp();
    },
    sortRoute() {
      let vm = this;
      this.products = this.CATALOG.filter(function (item) {
        return item.category == vm.$route.query.category;
      });
      this.setShowProp();
    },
    setShowProp() {
      let vm = this;
      this.products.map(function (item) {
        if (!item.show) {
          vm.$set(item, "show", false);
        }
      });
    },
    openProduct(item) {
      this.GET_PRODUCT(item);
      this.$router.push({ path: "/product", query: { name: item.name } });
    },
  },
  computed: {
    ...mapGetters(["CATALOG", "SEACH_VALUE", "QUERY", "MENU"]),
  },
  watch: {
    SEACH_VALUE() {
      if (this.SEACH_VALUE) {
        this.sortProducts(this.SEACH_VALUE);
      } else {
        this.products = this.CATALOG;
      }
    },
    QUERY() {
      if (this.QUERY) {
        this.sortCategory();
      } else {
        this.products = this.CATALOG;
      }
    },
  },
  mounted() {
    if (this.SEACH_VALUE) {
      this.sortProducts(this.SEACH_VALUE);
    } else if (this.QUERY) {
      this.sortCategory();
    } else if (this.$route.query.category) {
      this.sortRoute();
    } else {
      this.products = this.CATALOG;
      this.setShowProp();
    }
    if (!this.MENU.length) {
      this.GET_MENU();
    }
  },
};
</script>

<style>
.menu_list {
  display: flex;
  margin: 0 50px;
  justify-content: center;
  flex-wrap: wrap;
}
.menu_list_item {
  padding: 15px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
}
.menu_list_item:hover {
  color: #df3737;
}
.categories_container {
  margin: 50px 200px;
  /* height: 350px; */
  display: flex;
  flex-direction: column;
}
.categories_item {
  display: flex;
  border-right: 1px solid #fed700;
  border-radius: 5px;
  width: 16.6%;
  margin: 25px 0;
  flex-direction: column;
}
.categories_items {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
}
.cat_item_title {
  font-size: 18px;
  font-weight: 700;
  color: #0062bd;
  align-self: center;
  margin: 10px;
}
.cat_item_img {
  height: 100%;
  display: flex;
  cursor: pointer;
  padding: 20px 0;
}
.cat_item_img img {
  object-fit: cover;
  height: 100%;
  margin: 0 auto;
}

.categories_item:hover {
  border-color: #dddddd;
  box-shadow: 5px 5px 10px #c6c6c6;
}
.categories_item:hover .cat_item_title {
  color: gold;
}
.catalog_button:nth-last-child(1),
.categories_item:nth-last-child(1) {
  border: none;
}
.cat_item_price {
  font-size: 26px;
  font-weight: 700;
  color: #ee0000;
  margin: 10px 30px;
  display: flex;
  justify-content: space-between;
}
.price_basket {
  background: #fed700;
  border-radius: 50%;
  width: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.price_basket:hover {
  box-shadow: 0 4px 11px rgb(254 215 0 / 35%);
  cursor: pointer;
  color: #334141;
  transform: translateY(-3px);
  transition: all 0.2s ease-in-out;
}
</style>
