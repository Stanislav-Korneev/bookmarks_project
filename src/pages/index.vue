<template>
  <div class="index-page">
    <app-modal
      v-if="addMode || editMode"
      @close-modal="closeModal"
    >
      <bookmarks-form @close-modal="closeModal" />
    </app-modal>
    <layout-header />
    <bookmarks class="index-page__bookmarks">
      <template v-for="item in bookmarks">
        <bookmarks-item
          @increment-hits="incrementHits"
          v-if="item"
          :key="item.id"
          v-bind="item"
        >
          <app-transition name="pop-menu">
            <bookmarks-item-menu
              @menu-click="executeMenuButton"
              :id="item.id"
            />
          </app-transition>
        </bookmarks-item>
      </template>
    </bookmarks>
    <add-button
      class="index-page__add-button"
      @button-click="addBookmark"
    />
  </div>
</template>

<script>
/* eslint-disable max-len */

import store from '@/store/index';

import layoutHeader from '@/components/layout/header/layoutHeader.vue';
import AppModal from '@/components/general/AppModal.vue';
import AppTransition from '@/components/general/AppTransition.vue';

import bookmarksForm from '@/components/pages/index/bookmarkForm.vue';
import bookmarks from '@/components/pages/index/bookmarks.vue';
import bookmarksItem from '@/components/pages/index/bookmarksItem.vue';
import bookmarksItemMenu from '@/components/pages/index/bookmarksItemMenu.vue';
import addButton from '@/components/pages/index/addButton.vue';

export default {
  // name: 'Home',
  components: {
    layoutHeader,
    AppModal,
    AppTransition,
    bookmarksForm,
    bookmarks,
    bookmarksItem,
    bookmarksItemMenu,
    addButton,
  },

  computed: {
    bookmarks() {
      return (store.state.searchInput.length > 0) ? store.state.bookmarksForSearch : store.state.bookmarks;
    },
    addMode() {
      return store.state.addMode;
    },
    editMode() {
      return store.state.editMode;
    },
  },

  methods: {
    addBookmark() {
      if (!this.addMode) store.dispatch('addBookmark');
    },

    incrementHits(id) {
      store.commit('incrementHits', id);
    },

    executeMenuButton(action) {
      store.dispatch(action[0], action[1]);
    },

    closeModal() {
      if (this.addMode) store.commit('toggleAddMode');
      if (this.editMode) store.commit('toggleEditMode');
    },
  },
};
</script>
<style lang="scss" scoped>
.index-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__bookmarks {
    width: 100%;
  }

  &__add-button {
    position: fixed;
    bottom: 0;
  }
}
</style>
