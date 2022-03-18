<template>
  <div class="notification">
    <transition-group name="transition-animate" class="messages_list">
      <div
        class="notofocation_content"
        v-for="message in messages"
        :key="message.id"
      >
        <div class="notofocation_content_text">
          <span>{{ message.name }}</span>
          <!-- <i class="material-icons">check_circle</i> -->
          <i class="done"><img src="../static/img/done.png" /></i>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style>
.notification {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 2;
}
.notofocation_content {
  padding: 16px;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background: green;
}
.notofocation_content_text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.notofocation_content_text .done img {
  margin-left: 10px;
  width: 40px;
}
.material-icons {
  margin-left: 16px;
}
.transition-animate-enter {
  transform: translateX(120px);
  opacity: 0;
}
.transition-animate-enter-active {
  transition: all 0.6s ease;
}
.transition-animate-enter-to {
  opacity: 1;
}
.transition-animate-leave {
  opacity: 1;
}
.transition-animate-leave-active {
  transition: transform 0.6s ease, opacity 0.6s;
}
.transition-animate-leave-to {
  transform: translateX(120px);
  opacity: 0;
}
.transition-animate-move {
  transition: transform 0.6s ease;
}
</style>
