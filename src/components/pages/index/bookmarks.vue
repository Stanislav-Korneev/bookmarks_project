<template>
  <app-container class="bookmarks">
    <div class="bookmarks__utilities">
      <searching-panel class="bookmarks__searching-panel"/>
      <sorting-panel class="bookmarks__sorting-panel" />
    </div>
    <app-transition-group
      name="change-list"
      tag="ul"
      class="bookmarks__list"
    >
      <slot />
    </app-transition-group>
  </app-container>
</template>

<script>
import AppContainer from '@/components/general/AppContainer.vue';
import AppTransitionGroup from '@/components/general/AppTransitionGroup.vue';
import searchingPanel from '@/components/pages/index/searchingPanel.vue';
import sortingPanel from '@/components/pages/index/sortingPanel.vue';

export default {
  components: {
    AppContainer,
    AppTransitionGroup,
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
    padding: 2rem 10% 0 calc(10% + 2rem);

    @include mobile() {
      flex-direction: column-reverse;
      align-items: flex-start;
      padding: 2rem 2rem 0 2rem;
    }

    .bookmarks__sorting-panel {
      @include mobile {
        align-self: flex-end;
      }
    }
  }

  &__list {
    @include ul-reset;
    padding: 3rem 10% 17rem 10%;

    @include mobile {
      padding: 1rem 5% 10rem 5%;
    }
  }
}
</style>
