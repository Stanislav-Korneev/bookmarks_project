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
      @keyup="search"
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
  methods: {
    search() {
      store.commit('searchBookmark');
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
    border-radius: 50%;
    border: .2rem solid $darkBlue;
    outline: none;
    background-color: $blueTransparent;
    background-size: 2rem;
    background-position: center;
    background-image: url("../../../assets/ico/search.png");
    background-repeat: no-repeat;
    color: transparent;
    font-size: 1.7rem;
    letter-spacing: .1rem;
    transition: width .7s, background-color 1s, border-radius .1s;
    transition-timing-function: ease-out;

    &:hover,
    &:focus {
      padding-left: 3.5rem;
      width: 30rem;
      border-radius: 3rem;
      background-color: $darkBlue;
      background-position: 1rem, center;
      color: $white;
      //transition: width 1s, background-color 1s, border-radius 10s;
    }
  }
}
</style>
