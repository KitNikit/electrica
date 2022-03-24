<template>
  <body>
    <div class="catalog_block">
      <div
        class="catalog_button"
        v-for="value in MENU"
        @click="categoryLink(value)"
      >
        {{ value }}
      </div>
    </div>
    <div class="img">
      <img src="../static/img/bg.jpg" />
    </div>
    <div class="categories_container">
      <div class="categories_title">Популярные категории</div>
      <div class="categories_items">
        <div
          class="categories_item"
          v-for="item in POPULAR"
          :key="item.name"
          @click="categoryLink(item.name)"
        >
          <div class="cat_item_title">
            {{ item.name }}
          </div>
          <div class="cat_item_img">
            <img :src="`${item.src}`" />
          </div>
        </div>
      </div>
    </div>
    <div class="categories_container">
      <notification :messages="messages"> </notification>
      <popup
        v-if="showPopup"
        @closePopup="closePopup(index)"
        rightButton="В корзину"
        @rightButtonAction="addToCart(POPUP_ITEM)"
      >
        <img :src="`${POPUP_ITEM.src}`" />
        <div class="cat_item_title">
          {{ POPUP_ITEM.name }}
        </div>
        <!-- <div class="price_number">
              {{ POPUP_ITEM.price | toFix | spacePrice }}
            </div> -->
      </popup>
      <div class="categories_title two">Товары недели</div>
      <div class="categories_items">
        <div
          class="categories_item"
          v-for="(item, index) in firebase_data_week"
          :key="item.name"
        >
          <div class="cat_item_title" @click.prevent="openPopup(item)">
            {{ item.name }}
          </div>
          <div class="cat_item_img" @click.prevent="openPopup(item)">
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
    <div class="partner_container">
      <div class="categories_title three">Бренды</div>
      <div class="partner_items">
        <div class="partner_item"><img src="../static/img/abb.png" /></div>
        <div class="partner_item"><img src="../static/img/dkc.png" /></div>
        <div class="partner_item"><img src="../static/img/ekf.png" /></div>
        <div class="partner_item">
          <img src="../static/img/hyperline.png" />
        </div>
        <div class="partner_item"><img src="../static/img/iek.png" /></div>
        <div class="partner_item"><img src="../static/img/legrand.png" /></div>
        <div class="partner_item"><img src="../static/img/philips.png" /></div>
      </div>
    </div>
  </body>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import toFix from "../filters/toFix";
import spacePrice from "../filters/spacePrice";
export default {
  data() {
    return {
      messages: [],
      showPopup: false,
      firebase_data_week: [],
    };
  },
  filters: {
    toFix,
    spacePrice,
  },
  methods: {
    async readFromRealtimeDb() {
      const messageRef = this.$fire.database.ref("week");
      try {
        const snapshot = await messageRef.once("value");
        this.firebase_data_week = snapshot.val();
      } catch (e) {
        console.log(e);
      }
    },
    // ...mapActions([
    //   "ADD_TO_CART",
    //   "SHOW_POPUP_WEEK",
    //   "CLOSE_POPUP_WEEK",
    //   "GET_QUERY",
    //   "GET_MENU",
    // ]),
    // toggleMenu: function () {
    //   let element = document.querySelector(".catalog_block");
    //   element.classList.toggle("active");
    // },
    addToCart(item) {
      this.$store
        .dispatch("ADD_TO_CART", item)
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
    openPopup(item) {
      this.$store.dispatch("GET_SHOW_POPUP_ITEM", item);
      if (this.showPopup === false) {
        this.showPopup = true;
      }
      // if (this.firebase_data_week[index].show === false) {
      //   this.firebase_data_week[index].show = true;
      // }
      // this.$store.dispatch("SHOW_POPUP_WEEK", index);
    },
    closePopup(index) {
      if (this.showPopup === true) {
        this.showPopup = false;
      }
      // if (this.firebase_data_week[index].show === true) {
      //   this.firebase_data_week[index].show = false;
      // }
      // this.$store.dispatch("CLOSE_POPUP_WEEK", index);
    },
    categoryLink(value) {
      this.$store.dispatch("GET_QUERY", value);
      this.$router.push("/catalog?category=" + value);
    },
  },
  computed: {
    // ...mapGetters(["WEEK", "POPULAR", "MENU"]),
    POPUP_ITEM() {
      return this.$store.getters.POPUP_ITEM;
    },
    WEEK() {
      return this.$store.getters.WEEK;
    },
    POPULAR() {
      return this.$store.getters.POPULAR;
    },
    MENU() {
      return this.$store.getters.MENU;
    },
  },
  mounted() {
    // let vm = this;
    // this.WEEK.map(function (item) {
    //   if (!item.show) {
    //     vm.$set(item, "show", false);
    //   }
    //   if (!item.quantity) {
    //     vm.$set(item, "quantity", 1);
    //   }
    // });
    if (!this.MENU.length) {
      this.$store.dispatch("GET_MENU");
    }
    this.readFromRealtimeDb();
  },
};
</script>

<style>
.img {
  height: 450px;
}
.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.catalog_block {
  position: absolute;
  left: 360px;
  top: 215px;
  background-color: #fff;
  border-bottom-right-radius: 0.4375rem;
  border-bottom-left-radius: 0.4375rem;
  z-index: 1;
  width: 350px;
  border: 1px solid #fed700;
  transition: all 0.4s ease-out;
}
.catalog_button {
  height: 50px;
  border-bottom: 1px solid #fed700;
  margin: 1px 30px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
}
.catalog_button:hover {
  background-color: #f5f5f5;
  padding-left: 5px;
}
.catalog_button a {
  color: inherit;
  text-decoration: none;
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
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.categories_title {
  font-size: 26px;
  margin: 10px 0;
  border-bottom: 1px solid #dddddd;
}
.categories_title::before {
  content: "";
  width: 275px;
  height: 40px;
  border-bottom: 4px solid #fed700;
  position: absolute;
}
.categories_title.two::before {
  width: 182px;
}
.categories_title.three::before {
  width: 92px;
}
.cat_item_title {
  font-size: 18px;
  font-weight: 700;
  color: #0062bd;
  align-self: center;
  margin: 10px;
  cursor: pointer;
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
.partner_container {
  margin: 50px 200px;
  height: 200px;
}
.partner_items {
  display: flex;
  height: 100px;
  margin-top: 40px;
}
.partner_item {
  width: 230px;
  margin: 0 10px;
  background: #f6f6f6;
  align-items: center;
  justify-content: center;
  display: flex;
}
.partner_item img {
  height: 100%;
}
@media (max-width: 768px) {
  .catalog_block {
    top: -100%;
    left: 0;
    width: 100%;
    position: fixed;
  }
  .catalog_block.active {
    top: 0;
  }
  .catalog_button {
    margin: 1px 70px;
  }
  .img {
    height: 250px;
  }
  .categories_container,
  .partner_container {
    margin: 10px;
    height: 100%;
  }
  .categories_items {
    flex-direction: column;
  }
  .categories_item,
  .categories_item:nth-last-child(1) {
    border: 1px solid #fed700;
    width: 100%;
  }
  .partner_items {
    flex-wrap: wrap;
    height: 100%;
  }
  .partner_item {
    width: 48%;
    margin: 1%;
  }
  .partner_item img {
    width: 100%;
  }
}
</style>
