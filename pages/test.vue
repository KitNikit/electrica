<template>
  <div class="test">
    <button @click="readFromRealtimeDb()">FIREBASE получить</button>
    <button @click="writeToRealtimeDb()">FIREBASE отправить</button>
    <!-- <div>{{ firebase_data }}</div>
    <div>{{ firebase_data.name }}</div> -->
    <div v-for="item of firebase_data" :key="item.id">
      <div>item: {{ item }}</div>
      <div>item name: {{ item.name }}</div>
      <div>item price: {{ item.price }}</div>
    </div>
    <h1>Pagination</h1>
    <div class="el">
      <div v-for="el in paginatedItems">
        <div>{{ el }}</div>
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
        PAGE {{ page }}
      </div>
    </div>
    <!-- <div>{{ localStorage.test }}</div> -->
    <button @click="addLocalStore">LocalStore</button>
    <button>setStates</button>
    <div>CATALOG: {{ CATALOG[0].quantity }}</div>
    <button @click="test2">CATALOG</button>
    <div>{{ products }}</div>
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
          </popup>
          <div class="cat_item_title" @click.prevent="openPopup(index)">
            {{ item.name }}
          </div>
          <div>{{ item.quantity }}</div>
          <div>{{ item.show }}</div>
          <div class="cat_item_img" @click.prevent="openPopup(index)">
            <img :src="`${item.src}`" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">
              {{ item.price }}
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
// import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      inPage: 3,
      pageNumber: 1,
      cartStorage: "",
      products: [],
      firebase_data: [],
    };
  },
  computed: {
    // ...mapGetters(["CART", "CATALOG"]),
    pages() {
      return Math.ceil(this.data.length / this.inPage);
    },
    paginatedItems() {
      let from = (this.pageNumber - 1) * this.inPage;
      let to = from + this.inPage;
      return this.data.slice(from, to);
    },
    CATALOG() {
      return this.$store.getters.CATALOG;
    },
    SEACH_VALUE() {
      return this.$store.getters.SEACH_VALUE;
    },
    getDB() {
      // const messageRef = this.$fire.database.ref("test");
      // try {
      //   const snapshop = await messageRef.once("value");
      //   console.log(snapshop.val().message);
      // } catch (e) {
      //   console.log(e);
      // }
    },
  },
  methods: {
    async writeToRealtimeDb() {
      const messageRef = this.$fire.database.ref("week");
      try {
        await messageRef.set([
          {
            name: "Кабель силовой алюминиевый бронированный 4х16 мм",
            src: "/img/11.png",
            price: "222.30",
            show: false,
            quantity: 1,
          },
          {
            name: "Таймер розеточный, 7-дневная программа 16 А TDM",
            src: "/img/12.png",
            price: "779.00",
            show: false,
            quantity: 1,
          },
          {
            name: "Реле контроля напряжения RBUZ D63t",
            src: "/img/13.png",
            price: "3705.00",
            show: false,
            quantity: 1,
          },
          {
            name: `Лампа LED "груша" Е27 11Вт (990Лм) 4000К 230В IEK ECO`,
            src: "/img/14.png",
            price: "84.55",
            show: false,
            quantity: 1,
          },
          {
            name: "Реле контроля напряжения АЗМ LED-63А-220В TDM",
            src: "/img/15.png",
            price: "1681.50",
            show: false,
            quantity: 1,
          },
          {
            name: "Розетка 2P+E, 16А, белый ATLAS DESIGN",
            src: "/img/16.png",
            price: "137.75",
            show: false,
            quantity: 1,
          },
        ]);
      } catch (e) {
        alert(e);
        return;
      }
      alert("Success.");
    },
    async readFromRealtimeDb() {
      const messageRef = this.$fire.database.ref("week");
      try {
        const snapshot = await messageRef.once("value");
        this.firebase_data = snapshot.val();
      } catch (e) {
        console.log(e);
      }
    },
    test2() {
      // this.CATALOG[0].quantity++;
      // console.log(this.CATALOG[0]);
      // return this.CATALOG[0].quantity;
      // this.$store.dispatch("TEST2");
    },
    // ...mapActions(["GET_FROM_API"]),
    openPopup(index) {
      // if (this.products[index].show === false) {
      // this.products[0].quantity = "TEST";
      // console.log(this.CATALOG[index].show);
      // }
      this.$store.dispatch("SHOW_POPUP", index);
      //   .then(() => (this.products = this.CATALOG))
      //   .then(() => {
      //     console.log(this.products);
      //   });
    },
    closePopup(index) {
      // if (this.products[index].show === true) {
      //   this.products[index].show = false;
      // }
      this.$store.dispatch("CLOSE_POPUP", index);
    },
    pageClick(page) {
      this.pageNumber = page;
    },
    addLocalStore() {
      localStorage.test = 2;
      console.log(localStorage.test);
      // localStorage.setItem("cart", JSON.stringify(this.CATALOG[0]));
      // this.cartStorage = JSON.parse(localStorage.getItem("cart"));
      // console.log(this.cartStorage);
      // localStorage.removeItem("name");
      // localStorage.clear();
    },
    addToCart(item) {
      this.$store.dispatch("ADD_TO_CART", item);
    },
    sortProducts(value) {
      this.products = this.CATALOG.filter(function (item) {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      // this.setShowProp();
    },
    // setShowProp() {
    //   let vm = this;
    //   this.products.map(function (item) {
    //     console.log(item);
    //     this.$store.dispatch("GET_SHOW_AND_QANTITY");
    //     vm.item.push("quantity");
    //     if (!item.show) {
    //       vm.$set(item, "show", false);
    //     }
    //     if (!item.quantity) {
    //       vm.$set(item, "quantity", 123);
    //     }
    //   }
    //   );
    // },
  },
  watch: {
    SEACH_VALUE() {
      if (this.SEACH_VALUE) {
        this.sortProducts(this.SEACH_VALUE);
      } else {
        this.products = this.CATALOG;
      }
    },
  },
  mounted() {
    this.products = this.CATALOG;

    // this.products.map((item) => {
    //   console.log(item.quantity);
    //   item.quantity = 222;
    // });
    // this.setprod();
    // this.readFromRealtimeDb();
    // this.$store.dispatch("GET_SHOW_AND_QANTITY");
    // .then(() => {
    // this.products = this.CATALOG;
    // });
    // this.products = this.CATALOG;
    // this.GET_FROM_API();
  },
};
</script>

<style>
.el {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.page {
  margin: 20px;
  display: flex;
  justify-content: center;
}
.page div {
  margin-right: 10px;
}
.page-selected {
  font-weight: bold;
}
</style>
