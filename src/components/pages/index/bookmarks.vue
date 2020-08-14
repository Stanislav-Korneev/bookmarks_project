<template>
  <app-container class="bookmarks">
    <ul class="bookmarks__list">
      <slot />
    </ul>
  </app-container>
</template>

<script>
import AppContainer from '@/components/general/AppContainer.vue';

export default {
  components: {
    AppContainer,
  },
};

</script>

<style lang="scss" scoped>
.bookmarks {

  &__list {
    @include ul-reset;
    padding: 3rem 10% 17rem 10%;

    @include mobile {
      padding: 2.5rem 5% 10rem 5%;
    }
  }
}
</style>
