<template>
<div class="sorting-panel">
  Sort by:
  <button
    @click="sortBookmarks('sortBookmarksByName')"
    class="sorting-panel__button"
    :class="{'sorting-panel__button_selected': sortMode === 'sortBookmarksByName'}"
  >
    Name
  </button>
  <button
    @click="sortBookmarks('sortBookmarksByDate')"
    class="sorting-panel__button"
    :class="{'sorting-panel__button_selected': sortMode === 'sortBookmarksByDate'}"
  >
    Date
  </button>
  <button
    @click="sortBookmarks('sortBookmarksByActivity')"
    class="sorting-panel__button"
    :class="{'sorting-panel__button_selected': sortMode === 'sortBookmarksByActivity'}"
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
      return store.state.bookmarksSorted.name;
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
  padding: .5rem 2rem;
  width: 35rem;
  height: 5rem;
  border-radius: 2rem;
  border: .2rem solid $blue;
  font-size: 1.5rem;
  font-weight: bold;
  color: $darkBlue;

  @include mobile {
    margin-bottom: 1rem;
    padding: .5rem 1rem;
    width: 100%;
    max-width: 35rem;
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
      width: 6.5rem;
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
