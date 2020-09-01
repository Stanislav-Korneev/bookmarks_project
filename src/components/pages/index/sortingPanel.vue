<template>
<div
  class="sorting-panel"
  :class="{'sorting-panel_sorted' : sortMode.name, 'sorting-panel_reverse' : sortMode.reverse}"
>
  Sort by:
  <button
    @click="sortBookmarks('sortBookmarksByName')"
    class="sorting-panel__button"
    :class="{'sorting-panel__button_selected': sortMode.name === 'sortBookmarksByName'}"
  >
    Name
  </button>
  <button
    @click="sortBookmarks('sortBookmarksByDate')"
    class="sorting-panel__button"
    :class="{'sorting-panel__button_selected': sortMode.name === 'sortBookmarksByDate'}"
  >
    Date
  </button>
  <button
    @click="sortBookmarks('sortBookmarksByActivity')"
    class="sorting-panel__button"
    :class="{'sorting-panel__button_selected': sortMode.name === 'sortBookmarksByActivity'}"
  >
    Activity
  </button>
</div>
</template>

<script>
import store from '@/store/index';

export default {
  computed: {
    sortMode() {
      return store.state.bookmarksSorted;
    },
  },

  methods: {
    sortBookmarks(mode) {
      store.commit('sortBookmarks', mode);
    },
  },
};
</script>

<style lang="scss" scoped>
.sorting-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 2rem .5rem 3.5rem;
  width: 36rem;
  height: 5rem;
  border-radius: 2rem;
  border: .2rem solid $blue;
  font-size: 1.5rem;
  font-weight: bold;
  color: $darkBlue;
  transition: .3s;

  &_sorted {
    background-position: left 1rem center;
    background-image: url("../../../assets/ico/arrow-down.svg");
    background-repeat: no-repeat;
  }

  &_reverse {
    background-image: url("../../../assets/ico/arrow-up.svg");
  }

  @include mobile {
    margin-bottom: 1rem;
    padding: .5rem 1rem .5rem 3.5rem;
    width: 100%;
    max-width: 36rem;
    font-size: 1.2rem;
  }

  &__button {
    @include button-reset;

    width: 7.5rem;
    height: 3rem;
    border-radius: 3rem;
    background-color: $blueTransparent;
    color: $darkBlue;

    &_selected {
      background-color: $blue;
      color: $white;
    }

    @include mobile {
      width: 5.5rem;
    }

    &:focus {
      outline: none;
      border: .1rem solid $blue;
    }

    &:active {
      transform: scale(.97);
    }
  }
}
</style>
