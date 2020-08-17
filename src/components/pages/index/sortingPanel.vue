<template>
<div class="sorting-panel">
  Sort by:
  <button
    @click="sortBookmarks('sortBookmarksByName')"
    class="sorting-panel__button"
  >
    Name
  </button>
  <button
    @click="sortBookmarks('sortBookmarksByDate')"
    class="sorting-panel__button"
  >
    Date
  </button>
  <button
    @click="sortBookmarks('sortBookmarksByActivity')"
    class="sorting-panel__button"
  >
    Activity
  </button>
</div>
</template>

<script>
import store from '@/store/index';

export default {
  methods: {
    sortBookmarks(mode) {
      store.commit(mode);
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
    width: 30rem;
    font-size: 1.2rem;
  }

  &__button {
    @include button-reset;

    width: 7.5rem;
    height: 3rem;
    border-radius: 3rem;
    background-color: $blueTransparent;
    color: $darkBlue;

    @include mobile {
      width: 6.5rem;
    }

    &:focus {
      outline: none;
      background-color: $blue;
      color: $white;
    }

    &:active {
      transform: scale(.97);
    }
  }
}
</style>
