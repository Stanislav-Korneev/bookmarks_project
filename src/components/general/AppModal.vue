<template>
  <div class="app-modal" @keyup.esc="closeModal">
    <div
      @click="closeModal"
      class="app-modal__backdrop"
    />
    <slot />
  </div>
</template>
<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>
<style lang="scss" scoped>
.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 20;

  &__backdrop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(128, 128, 128, .5);
  }
}
</style>
