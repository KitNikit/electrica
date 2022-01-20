<template>
  <div>
    <header>
      <header-top class="header_top w-100">
        <div class="header_title">Welcome to Electronics Store</div>
        <div class="header_button">
          <NuxtLink to="/tel">Позвонить нам</NuxtLink>
          <NuxtLink to="/mail">Написать нам</NuxtLink>
          <NuxtLink to="/map">Открыть карту</NuxtLink>
        </div>
      </header-top>
      <header-center class="header_center w-100">
        <div class="header_center_box">
          <div class="header_logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08zRreql-8J1tiafBtEa8TKxoqEjLRcNOPg&usqp=CAU"
            />
          </div>
          <div class="header_center_button">
            <NuxtLink to="/" exact>Главная</NuxtLink>
            <NuxtLink to="/mail">О нас</NuxtLink>
            <NuxtLink to="/map">Контакты</NuxtLink>
            <NuxtLink to="/map">Статьи</NuxtLink>
            <NuxtLink to="/map">FAQ</NuxtLink>
          </div>
        </div>
      </header-center>
      <header-bottom class="header_bottom w-100">
        <div class="header_catalog">Каталог товаров</div>
        <input placeholder="Введите название товара" class="header_input" />
        <div class="search"></div>
        <div class="header_bottom_button">Избранное</div>
        <div class="header_bottom_button">Корзина</div>
      </header-bottom>
    </header>
    <Nuxt />
    <footer>
      <footer-top class="footer_top"></footer-top>
    </footer>
  </div>
</template>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  color: #333e48;
}
.header_title {
  margin-left: 400px;
}
.nuxt-link-active {
  font-weight: bold;
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
  color: #333e48;
}
.header_bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #fed700;
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
}
</style>
<script>
export default {};
</script>
