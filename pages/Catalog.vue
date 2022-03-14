<template>
  <div class="catalog">
    <h1>Каталог товаров</h1>
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
            <div class="price_number">
              {{ item.price | toFix | spacePrice }}
            </div>
          </popup>
          <div class="cat_item_title">
            <a href="#" @click.prevent="openPopup(index)">
              {{ item.name }}
            </a>
          </div>
          <div class="cat_item_img">
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

export default {
  data() {
    return {
      products: [],
    };
  },
  filters: {
    toFix,
    spacePrice,
  },
  methods: {
    ...mapActions(["ADD_TO_CART", "SHOW_POPUP", "CLOSE_POPUP"]),
    addToCart(item) {
      this.ADD_TO_CART(item);
    },
    openPopup(index) {
      this.SHOW_POPUP(index);
    },
    closePopup(index) {
      this.CLOSE_POPUP(index);
    },
    sortProducts(value) {
      if (value) {
        this.products = this.CATALOG.filter(function (item) {
          return item.name.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        this.products = this.CATALOG;
      }
    },
  },
  computed: {
    ...mapGetters(["CATALOG", "SEACH_VALUE"]),
  },
  watch: {
    SEACH_VALUE() {
      this.sortProducts(this.SEACH_VALUE);
    },
  },
  mounted() {
    this.sortProducts(this.SEACH_VALUE);
    let vm = this;
    this.CATALOG.map(function (item) {
      if (!item.show) {
        vm.$set(item, "show", false);
      }
    });
  },
};
</script>

<style>
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
