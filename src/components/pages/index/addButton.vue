<template>
  <button class="add-button" @click="click">
    <img
      class="add-button__icon"
      src="../../../assets/ico/add_button.png"
      alt="add-button-image"
    />
  </button>
</template>
<script>
export default {
  methods: {
    click() {
      this.$emit('button-click');
    },
  },
};
</script>
<style lang="scss" scoped>
.add-button {
  @include button-reset;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 15rem;
  background-color: $whiteGray;
  box-shadow: 0 .5rem 2rem $blueGray;
  transition: .3s;

  &:hover {
    background-color: $lightGray
  }

  &:active > .add-button__icon {
    transform: scale(.9);
  }

  @include mobile {
    height: 8rem;
    background-color: $lightGray;
  }

  .add-button__icon {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    transition: scale .3s;

    @include mobile {
      width: 6.5rem;
      height: 6.5rem;
    }
  }
}
</style>
