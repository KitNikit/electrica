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
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      inPage: 3,
      pageNumber: 1,
    };
  },
  computed: {
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
