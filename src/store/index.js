import Vue from 'vue';
import Vuex from 'vuex';

import BOOKMARKS_STORE from '../mock/bookmarks.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarks: BOOKMARKS_STORE,
    bookmarksLength: BOOKMARKS_STORE.length,
    bookmarksSorted: false,
    addMode: false,
    editMode: false,
    errorMessageVisible: false,
    bookmarkName: '',
    bookmarkUrl: '',
    bookmarkId: null,
  },

  mutations: {
    sortBookmarksByName(state) {
      if (state.bookmarksSorted === true && state.bookmarks.length === state.bookmarksLength) {
        state.bookmarks.reverse();
      } else {
        state.bookmarks.sort((a, b) => {
          state.bookmarksLength = state.bookmarks.length;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
      }
      state.bookmarksSorted = true;
    },

    // togglers
    toggleErrorMessage(state) {
      state.errorMessageVisible = !state.errorMessageVisible;
    },

    toggleAddMode(state) {
      state.addMode = !state.addMode;
    },

    toggleEditMode(state) {
      state.editMode = !state.editMode;
    },

    // setters
    updateBookmarkName(state, name) {
      state.bookmarkName = name;
    },

    updateBookmarkUrl(state, url) {
      state.bookmarkUrl = url;
    },

    // adding and editing index
    setNameUrlId(state, n) {
      state.bookmarkName = state.bookmarks[n].name;
      state.bookmarkUrl = state.bookmarks[n].url;
      state.bookmarkId = n;
    },

    resetNameUrlId(state) {
      state.bookmarkName = '';
      state.bookmarkUrl = '';
      state.bookmarkId = null;
    },

    checkHttp(state) {
      const check = /^http:\/\/|^https:\/\//i;
      const check2 = /\/$/;
      if (!check.test(state.bookmarkUrl)) {
        state.bookmarkUrl = `http://${state.bookmarkUrl}`;
      }
      if (!check2.test(state.bookmarkUrl)) {
        state.bookmarkUrl = `${state.bookmarkUrl}/`;
      }
    },

    addBookmarkObj(state, n) {
      const bookmarksObj = {
        name: state.bookmarkName,
        url: state.bookmarkUrl.trim(),
      };
      if (state.editMode) {
        state.bookmarks.splice(n, 1, bookmarksObj);
      }
      if (state.addMode) {
        state.bookmarks.unshift(bookmarksObj);
      }
    },
  },

  actions: {
    // Button actions
    deleteBookmark(context, n) {
      context.state.bookmarks.splice(n, 1);
    },

    copyUrl(context, n) {
      navigator.clipboard.writeText(context.state.bookmarks[n].url);
    },

    addBookmark(context) {
      if (!context.state.addMode && !context.state.editMode) {
        if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        context.commit('toggleAddMode');
        context.commit('resetNameUrlId');
      }
    },

    editBookmark(context, n) {
      if (!context.state.addMode && !context.state.editMode) {
        if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        context.commit('toggleEditMode');
        context.commit('setNameUrlId', n);
      }
    },

    // Main Action(add or edit)
    submitBookmark(context, n) {
      if (!context.state.bookmarkName || !context.state.bookmarkUrl) {
        if (!context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        return;
      }
      context.commit('checkHttp');
      context.commit('addBookmarkObj', n);
      context.commit('resetNameUrlId');
      if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
      if (context.state.editMode) context.commit('toggleEditMode');
      if (context.state.addMode) context.commit('toggleAddMode');
    },
  },
});
