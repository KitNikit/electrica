<template>
  <div class="test">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      inPage: 3,
      pageNumber: 1,
      cartStorage: "",
    };
  },
  computed: {
    ...mapGetters(["CART", "CATALOG"]),
    pages() {
      return Math.ceil(this.data.length / this.inPage);
    },
    paginatedItems() {
      let from = (this.pageNumber - 1) * this.inPage;
      let to = from + this.inPage;
      return this.data.slice(from, to);
    },
  },
  methods: {
    // ...mapActions(["GET_FROM_API"]),
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
  },
  //   mounted() {
  //     this.GET_FROM_API();
  //   },
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
