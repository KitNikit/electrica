<template>
  <div>
    <header>
      <header-top class="header_top w-100">
        <div class="header_title">Welcome to Electronics Store</div>
        <div class="header_button">
          <a href="tel:555-555-5555">
            Позвонить нам <b-icon icon="telephone" aria-hidden="true"></b-icon>
          </a>
          <a href="mailto: abc@example.com">
            Написать нам
            <b-icon icon="envelope-open" aria-hidden="true"></b-icon>
          </a>
          <NuxtLink to="/Map"
            >Открыть карту<b-icon icon="geo-alt" aria-hidden="true"></b-icon
          ></NuxtLink>
        </div>
      </header-top>
      <header-center class="header_center w-100">
        <div class="header_center_box">
          <div class="header_logo">
            <NuxtLink to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08zRreql-8J1tiafBtEa8TKxoqEjLRcNOPg&usqp=CAU"
              />
            </NuxtLink>
          </div>
          <div class="header_center_button">
            <NuxtLink to="/" exact>Главная</NuxtLink>
            <NuxtLink to="/map">О нас</NuxtLink>
            <NuxtLink to="/map">Контакты</NuxtLink>
            <NuxtLink to="/map">Статьи</NuxtLink>
            <NuxtLink to="/map">FAQ</NuxtLink>
          </div>
        </div>
      </header-center>
      <header-bottom class="header_bottom w-100">
        <div class="header_bottom_logo">
          <NuxtLink to="/">
            <img src="../static/img/logo.png" />
          </NuxtLink>
        </div>
        <div class="header_catalog" @click="clearQuery">
          <NuxtLink to="/catalog">Каталог товаров</NuxtLink>
        </div>
        <input
          v-model="searchValue"
          placeholder="Введите название товара"
          class="header_input"
          v-on:keyup.enter="search(searchValue)"
        />
        <div class="search" @click="search(searchValue)">
          <b-icon
            stacked
            icon="search"
            variant="white"
            scale="0.5"
            shift-v="2"
          ></b-icon>
        </div>
        <nuxt-link to="/Cart">
          <div class="header_bottom_button">
            <b-icon icon="cart3" aria-hidden="true"></b-icon>
            <span class="header_bottom_basket">Корзина</span>
            <span class="header_bottom_quantity" v-if="CART.length > 0">{{
              CART.length
            }}</span>
          </div>
        </nuxt-link>
        <div class="burger_menu" @click="toggleMenu"></div>
      </header-bottom>
    </header>
    <Nuxt />
    <footer>
      <footer-top class="footer_top w-100">
        <div class="footer_top_title">
          <b-icon icon="lightning" aria-hidden="true"></b-icon> Следите за
          нашими новинками в социальных сетях
        </div>
        <input
          v-model="searchValue"
          placeholder="Введите название товара"
          class="footer_input"
          v-on:keyup.enter="search(searchValue)"
        />
        <div class="search" @click="search(searchValue)">
          <b-icon
            stacked
            icon="search"
            variant="white"
            scale="0.5"
            shift-v="2"
          ></b-icon>
        </div>
      </footer-top>
      <footer-center class="footer_center w-100">
        <div class="footer_container">
          <div class="footer_phone">
            <h3>
              <b-icon
                icon="headphones"
                scale="1.5"
                aria-hidden="true"
                variant="warning"
              ></b-icon>
              Телефон для связи
            </h3>
            <a href="tel:89100000000">8 (910) 000 00 00</a>
          </div>
          <div class="footer_social">
            <div class="social_btn">
              <b-icon icon="instagram" scale="1.5"></b-icon>
            </div>
            <div class="social_btn">
              <b-icon icon="facebook" scale="1.5"></b-icon>
            </div>
            <div class="social_btn">
              <b-icon icon="twitter" scale="1.5"></b-icon>
            </div>
            <div class="social_btn">
              <b-icon icon="youtube" scale="1.5"></b-icon>
            </div>
            <div class="social_btn">
              <b-icon icon="google" scale="1.5"></b-icon>
            </div>
            <div class="social_btn">
              <b-icon icon="twitch" scale="1.5"></b-icon>
            </div>
          </div>
        </div>
      </footer-center>
    </footer>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    // ...mapActions(["GET_SEARCH_VALUE", "GET_QUERY", "GET_LOCAL_CART"]),
    toggleMenu() {
      let element = document.querySelector(".header_center");
      let burger = document.querySelector(".burger_menu");
      element.classList.toggle("active");
      burger.classList.toggle("active");
    },
    search(value) {
      if (value) {
        this.$store.dispatch("GET_SEARCH_VALUE", value);
        // this.$router.push("/catalog");
      } else {
        this.$store.dispatch("GET_SEARCH_VALUE");
      }
    },
    clearQuery() {
      this.$store.dispatch("GET_QUERY");
      this.searchValue = "";
      this.$store.dispatch("GET_SEARCH_VALUE");
    },
  },
  computed: {
    // ...mapGetters(["CART", "SEACH_VALUE", "QUERY"]),
    CART() {
      return this.$store.getters.CART;
    },
    SEACH_VALUE() {
      return this.$store.getters.SEACH_VALUE;
    },
    QUERY() {
      return this.$store.getters.QUERY;
    },
  },
  watch: {
    // SEACH_VALUE() {
    //   this.searchValue = this.SEACH_VALUE;
    // },
    QUERY() {
      this.searchValue = "";
      this.$store.dispatch("GET_SEARCH_VALUE");
    },
  },
  // beforeMount() {
  //   if (!localStorage.cart) {
  //     localStorage.setItem("cart", JSON.stringify([]));
  //   } else if (
  //     !this.CART.length &&
  //     JSON.parse(localStorage.getItem("cart")).length
  //   ) {
  //     this.GET_LOCAL_CART();
  //   }
  // },
  mounted() {
    if (!localStorage.cart) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else if (
      !this.CART.length &&
      JSON.parse(localStorage.getItem("cart")).length
    ) {
      this.$store.dispatch("GET_LOCAL_CART");
    }
    document.addEventListener("click", function (item) {
      let element = document.querySelector(".header_center");
      let burger = document.querySelector(".burger_menu");
      if (item.target != burger && burger.classList.contains("active")) {
        element.classList.toggle("active");
        burger.classList.toggle("active");
      }
    });
  },
};
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
}
body {
  color: #333e48;
}
.nuxt-link-active {
  font-weight: bold;
  color: #df3737;
}
.header_title {
  margin-left: 400px;
}

.header_button {
  margin-right: 200px;
  margin-left: auto;
}
.header_button a {
  margin-left: 30px;
  padding-right: 30px;
  color: #334141;
  border-right: 1px solid #e8e8e8;
}
.header_button a:nth-last-child(1) {
  border: none;
}

.header_top {
  padding: 10px 0;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
}
.header_center {
  padding: 10px 0;
  color: #333e48;
  display: flex;
}
.header_center_box {
  display: flex;
}
.header_logo {
  height: 100px;
}
.header_logo img {
  height: 100%;
}
.header_center_box {
  margin-left: 350px;
  align-items: center;
}
.header_center_button {
  margin-left: 200px;
}
.header_center_button a {
  font-size: 20px;
  font-weight: bold;
  margin: 0 30px;
  /* color: #333e48; */
}

.header_bottom,
.footer_top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #fed700;
}
.header_bottom a {
  text-decoration: none;
}
.header_catalog {
  font-size: 20px;
  font-weight: bold;
  position: relative;
}

.header_input {
  border: none;
  margin-left: 50px;
  width: 700px;
  border-radius: 50px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 41px;
  padding-left: 10px;
  font-size: 20px;
  outline: none;
}
.search {
  height: 41px;
  width: 50px;
  background: #333e48;
  border-radius: 50px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  cursor: pointer;
}
.search:hover {
  box-shadow: 4px 4px 11px rgb(51 62 72 / 35%);
}
.header_bottom_button {
  margin-left: 40px;
  color: #333e48;
  width: 110px;
}
.header_bottom_button:hover {
  color: #df3737;
}
.header_bottom_quantity {
  margin-left: 5px;
}
.footer_top_title {
  font-size: 24px;
}
.footer_input {
  border: none;
  margin-left: 50px;
  width: 400px;
  border-radius: 50px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 41px;
  padding-left: 10px;
  font-size: 20px;
  outline: none;
}
.footer_center {
  height: 300px;
  display: block;
}
.footer_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
}
.footer_phone a {
  font-size: 26px;
  font-weight: bold;
}
.social_btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333e48;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-right: 10px;
}
.footer_social {
  display: flex;
  margin-top: 20px;
}
.social_btn:hover {
  background: #333e48;
  color: white;
}
.burger_menu,
.header_bottom_logo {
  display: none;
}
@media (max-width: 768px) {
  .header_top,
  .header_bottom_basket,
  .header_logo,
  .header_bottom input,
  .header_bottom .search,
  .footer_top_title {
    display: none;
  }
  .header_bottom_logo {
    display: block;
    margin: 0 10px;
  }
  .header_bottom_logo img {
    height: 45px;
  }
  .header_center {
    transition: all 0.4s ease-out;
    position: fixed;
    background: #fff;
    top: -100%;
    z-index: 2;
    box-shadow: 4px 4px 11px rgb(51 62 72 / 35%);
  }
  .header_center.active {
    top: 50px;
  }
  .header_center_box {
    margin-left: 0;
  }
  .header_center_button {
    margin-left: 0;
    display: flex;
    flex-direction: column;
  }
  .header_center_button a {
    margin: 10px 30px;
  }
  .header_bottom {
    position: fixed;
    justify-content: start;
    z-index: 2;
  }
  .header_bottom_button {
    font-size: 24px;
    width: auto;
    margin-left: 0;
  }
  .header_catalog {
    margin: 0 10px;
  }
  .burger_menu {
    display: block;
    height: 40px;
    width: 40px;
    position: absolute;
    right: 15px;
    cursor: pointer;
    z-index: 2;
    transition: all 0.2s ease-out;
    background: center / contain no-repeat url("../static/img/menu.png");
  }
  .burger_menu.active {
    position: fixed;
    right: 15px;
    background: center / contain no-repeat url("../static/img/cancel.png");
  }
  .footer_input {
    margin-left: 0;
    width: 300px;
  }
}
</style>
