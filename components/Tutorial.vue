<template>
  <body>
    <div class="catalog_block">
      <div class="catalog_button">Диодная лента</div>
      <div class="catalog_button">Розетки и выключатели</div>
      <div class="catalog_button">Светильники и прожекторы</div>
      <div class="catalog_button">Автоматы, УЗО, рубильники</div>
      <div class="catalog_button">Лампочки</div>
      <div class="catalog_button">Вентиляция</div>
      <div class="catalog_button">Тёплый пол</div>
      <div class="catalog_button">Умный дом</div>
      <div class="del_menu" v-on:click="toggleMenu">
        <img src="../static/img/del.png" />
      </div>
    </div>
    <div class="img">
      <img src="../static/img/bg.jpg" />
    </div>
    <div class="categories_container">
      <div class="categories_title">Популярные категории</div>
      <div class="categories_items">
        <div class="categories_item">
          <div class="cat_item_title">Кабель-провод</div>
          <div class="cat_item_img">
            <img src="../static/img/1.png" />
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">Тёплый пол</div>
          <div class="cat_item_img">
            <img src="../static/img/2.png" />
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">Вентиляция</div>
          <div class="cat_item_img">
            <img src="../static/img/3.png" />
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">Умный дом</div>
          <div class="cat_item_img">
            <img src="../static/img/4.png" />
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">Автоматы, УЗО, рубильники</div>
          <div class="cat_item_img">
            <img src="../static/img/5.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="categories_container">
      <div class="categories_title">Товары недели</div>
      <div class="categories_items">
        <div class="categories_item">
          <div class="cat_item_title">
            Кабель силовой алюминиевый бронированный 4х16 мм
          </div>
          <div class="cat_item_img">
            <img src="../static/img/11.png" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">222,30 ₽</div>
            <div class="price_basket">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">
            Таймер розеточный, 7-дневная программа 16 А TDM
          </div>
          <div class="cat_item_img">
            <img src="../static/img/12.png" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">779,00 ₽</div>
            <div class="price_basket">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">Реле контроля напряжения RBUZ D63t</div>
          <div class="cat_item_img">
            <img src="../static/img/13.png" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">3705,00 ₽</div>
            <div class="price_basket">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">
            Лампа LED "груша" Е27 11Вт (990Лм) 4000К 230В IEK ECO
          </div>
          <div class="cat_item_img">
            <img src="../static/img/14.png" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">84,55 ₽</div>
            <div class="price_basket">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">
            Реле контроля напряжения АЗМ LED-63А-220В TDM
          </div>
          <div class="cat_item_img">
            <img src="../static/img/15.png" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">1681,50 ₽</div>
            <div class="price_basket">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
        <div class="categories_item">
          <div class="cat_item_title">
            Розетка 2P+E, 16А, белый ATLAS DESIGN
          </div>
          <div class="cat_item_img">
            <img src="../static/img/16.png" />
          </div>
          <div class="cat_item_price">
            <div class="price_number">137,75 ₽</div>
            <div class="price_basket">
              <b-icon icon="cart3" scale="0.9"></b-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="partner_container">
      <div class="categories_title">Бренды</div>
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
<style scoped>
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
  z-index: 1000;
  width: 350px;
  border: 1px solid #fed700;
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
  flex: 1;
  margin: 25px 0;
  flex-direction: column;
}
.categories_items {
  display: flex;
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
.del_menu {
  display: none;
}
@media (max-width: 1200px) {
  .catalog_block {
    top: 0;
    left: -100%;
    width: 100%;
    position: fixed;
  }
  .catalog_block.active {
    left: 0;
  }
  .catalog_button {
    margin: 1px 70px;
  }
  .del_menu {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .del_menu img {
    height: 100%;
    width: 100%;
  }
  .img {
    height: 400px;
  }
  .categories_container,
  .partner_container {
    margin: 10px;
    height: 100%;
  }
  .categories_items {
    flex-direction: column;
  }
  .partner_items {
    flex-wrap: wrap;
    height: 100%;
  }
  .partner_item {
    width: 45%;
    margin: 10px;
  }
  .partner_item img {
    width: 100%;
  }
}
</style>
<script>
export default {
  // mounted() {
  // },
  methods: {
    toggleMenu: function () {
      let element = document.querySelector(".catalog_block");
      element.classList.toggle("active");
    },
  },
};
</script>
