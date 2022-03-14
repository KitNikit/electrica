<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup_header">
        <span>Название</span>
        <span class="material-icons" @click="closePopup">close</span>
      </div>
      <div class="popup_content">
        <slot></slot>
      </div>
      <div class="popup_footer">
        <button @click="rightButtonAction">{{ rightButton }}</button>
        <button @click="closePopup">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightButton: {
      type: String,
      default: "Добавить",
    },
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    rightButtonAction() {
      this.$emit("rightButtonAction");
    },
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs["popup_wrapper"]) {
        vm.closePopup();
      }
    });
  },
};
</script>

<style>
.popup_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(64, 64, 64, 0.4);
}
.popup {
  z-index: 1;
  padding: 20px;
  position: fixed;
  width: 400px;
  box-shadow: 5px 5px 10px #c6c6c6;
  background: #fff;
}
.popup_header,
.popup_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup_content {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
