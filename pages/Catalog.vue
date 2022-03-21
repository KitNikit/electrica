<template>
  <div class="catalog">
    <notification :messages="messages"> </notification>
    <div class="catalog_menu">
      <div class="menu_show">
        <div class="menu_show_btn" @click="showMenu">
          Категории<img src="../static/img/arrow-top.png" />
        </div>
      </div>
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
    </div>
    <div class="categories_container">
      <div class="categories_items">
        <div
          class="categories_item"
          v-for="(item, index) in paginatedItems"
          :key="item.name"
        >
          <popup
            v-if="item.show"
            @closePopup="closePopup(index)"
            rightButton="В корзину"
            @rightButtonAction="addToCart(item)"
          >
            <img :src="`${item.src}`" />
            <!-- <div class="cat_item_title">
              {{ item.name }}
            </div>
            <div class="cat_item_price">
              {{ item.price | toFix | spacePrice }}
            </div> -->
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
      <div class="page">
        <div
          v-if="pages > 1"
          v-for="page in pages"
          :key="page"
          :class="{ 'page-selected': page === pageNumber }"
          @click="pageClick(page)"
        >
          {{ page }}
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
      inPage: 6,
      pageNumber: 1,
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
    showMenu() {
      let menu = document.querySelector(".catalog_menu");
      menu.classList.toggle("active");
    },
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
        if (!item.quantity) {
          vm.$set(item, "quantity", 1);
        }
      });
    },
    openProduct(item) {
      this.GET_PRODUCT(item);
      this.$router.push({ path: "/product", query: { name: item.name } });
    },
    pageClick(page) {
      this.pageNumber = page;
    },
  },
  computed: {
    ...mapGetters(["CATALOG", "SEACH_VALUE", "QUERY", "MENU"]),
    pages() {
      return Math.ceil(this.products.length / this.inPage);
    },
    paginatedItems() {
      let from = (this.pageNumber - 1) * this.inPage;
      let to = from + this.inPage;
      return this.products.slice(from, to);
    },
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
.catalog .categories_container {
  margin-top: 0;
}
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
.menu_show {
  display: none;
}
.page {
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.page div {
  font-weight: bold;
  color: #0062bd;
  cursor: pointer;
  margin-right: 10px;
  padding: 10px 20px;
  border: 1px solid #fed700;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #c6c6c6;
}
.page .page-selected {
  color: #fed700;
}
@media (max-width: 768px) {
  .menu_show {
    padding-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu_show_btn {
    margin: 15px;
    font-size: 20px;
    cursor: pointer;
  }
  .menu_show_btn img {
    height: 30px;
    margin-left: 15px;
    transition: all 0.2s ease-in-out;
    transform: rotate(180deg);
  }
  .catalog_menu.active .menu_show img {
    transform: rotate(0);
  }
  .menu_list {
    margin: 0 10px;
    margin-top: -100%;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
  .catalog_menu.active .menu_list {
    margin-top: 0;
    visibility: visible;
    opacity: 1;
  }
}
</style>
