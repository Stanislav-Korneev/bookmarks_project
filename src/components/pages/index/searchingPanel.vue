<template>
  <div class="searching-panel">
    <label
      for="searching-input"
      class="searching-panel__label"
    >
      search input
    </label>
    <input
      v-model="searchInput"
      id="searching-input"
      class="searching-panel__input"
      type="text"
    />
  </div>
</template>

<script>
import store from '@/store';

export default {
  computed: {
    searchInput: {
      get() {
        return store.state.searchInput;
      },
      set(value) {
        store.commit('updateSearchInput', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.searching-panel {

  &__label {
    @include visually-hidden;
  }

  &__input {
    padding: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    border: .2rem solid $darkBlue;
    outline: none;
    background-color: $blueTransparent;
    background-size: 2rem;
    background-position: .8rem, center;
    background-image: url("../../../assets/ico/search.png");
    background-repeat: no-repeat;
    color: transparent;
    font-size: 1.7rem;
    letter-spacing: .1rem;
    transition: width 1s, background-color 1.5s, background-position 0s;

    @include mobile {
      width: 3.5rem;
      height: 3.5rem;
      background-position: .6rem center;
      font-size: 1.4rem;
    }

    &:hover,
    &:focus {
      padding-left: 3.5rem;
      width: 25rem;
      border-radius: 2rem;
      border: none;
      background-color: $darkBlue;
      background-position: 1rem, center;
      color: $white;

      @include mobile {
        width: 100%;
      }
    }
  }
}
</style>
