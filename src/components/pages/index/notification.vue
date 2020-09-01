<template>
  <transition name="notify">
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
  </transition>
</template>

<script>
import store from '@/store/index';

export default {
  computed: {
    notification() {
      return store.state.notification;
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  width: 30rem;
  height: 4rem;
  border-radius: 2rem;
  background-color: $whiteTransparent;
  background-position: left 1rem center;
  background-size: 2.5rem;
  background-image: url("../../../assets/ico/check-mark.svg");
  background-repeat: no-repeat;
  font-size: 1.6rem;
  color: $darkBlue;
  cursor: default;

  @include mobile {
    z-index: 20;
    border: .2rem solid $darkBlue;
    background-color: $white;
  }
}

.notify-enter-active {
  animation: 1s notification forwards;
}

.notify-leave-active {
  animation: 1s notification reverse;
}

@keyframes notification {
  from {
    opacity: 0;
    transform: translateY(-5rem);
  }
  to {
    opacity: 1;
  }
}
</style>
