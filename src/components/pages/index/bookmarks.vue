<template>
  <app-container class="bookmarks">
    <div class="bookmarks__utilities">
      <searching-panel class="bookmarks__searching-panel"/>
      <sorting-panel class="bookmarks__sorting-panel" />
    </div>
    <ul class="bookmarks__list">
      <slot />
    </ul>
  </app-container>
</template>

<script>
import AppContainer from '@/components/general/AppContainer.vue';
import searchingPanel from '@/components/pages/index/searchingPanel.vue';
import sortingPanel from '@/components/pages/index/sortingPanel.vue';

export default {
  components: {
    AppContainer,
    searchingPanel,
    sortingPanel,
  },
};

</script>

<style lang="scss" scoped>
.bookmarks {

  &__utilities {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 10% 0 15%;
  }

  &__searching-panel {

  }

  &__sorting-panel {
    //margin-left: auto;
    //margin-right: 10%;

    @include mobile {
      //margin-right: auto;
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
