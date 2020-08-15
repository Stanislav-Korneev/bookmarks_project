<template>
  <app-container class="bookmarks">
    <sorting-panel class="bookmarks__sorting-panel" />
    <ul class="bookmarks__list">
      <slot />
    </ul>
  </app-container>
</template>

<script>
import AppContainer from '@/components/general/AppContainer.vue';
import sortingPanel from '@/components/pages/index/sortingPanel.vue';

export default {
  components: {
    AppContainer,
    sortingPanel,
  },
};

</script>

<style lang="scss" scoped>
.bookmarks {

  &__sorting-panel {
    margin-left: auto;
    margin-right: 10%;

    @include mobile {
      margin-right: auto;
    }
  }

  &__list {
    @include ul-reset;
    padding: 3rem 10% 17rem 10%;

    @include mobile {
      padding: 2.5rem 5% 10rem 5%;
    }
  }
}
</style>
