import Vue from 'vue';
import Vuex from 'vuex';

import BOOKMARKS_STORE from '../mock/bookmarks.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarks: BOOKMARKS_STORE,
    bookmarksSorted: {
      name: '',
      reverse: false,
    },
    addMode: false,
    editMode: false,
    errorMessageVisible: false,
    bookmarkName: '',
    bookmarkUrl: '',
    bookmarkHits: 0,
    bookmarkAddingDate: '',
    bookmarkId: null,
  },

  mutations: {

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

    // incrementing hits of an item when its link is hit
    incrementHits(state, index) {
      state.bookmarks[index].hits += 1;
    },

    // adding and resetting item-cash properties
    setNameUrlId(state, n) {
      state.bookmarkName = state.bookmarks[n].name;
      state.bookmarkUrl = state.bookmarks[n].url;
      state.bookmarkHits = state.bookmarks[n].hits;
      state.bookmarkAddingDate = state.bookmarks[n].addingDate;
      state.bookmarkId = n;
    },

    resetNameUrlId(state) {
      state.bookmarkName = '';
      state.bookmarkUrl = '';
      state.bookmarkHits = 0;
      state.bookmarkAddingDate = '';
      state.bookmarkId = null;
    },

    // correcting url
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

    // adding new or edited bookmark to array
    addBookmarkObj(state, n) {
      const bookmarksObj = {
        name: state.bookmarkName,
        url: state.bookmarkUrl.trim(),
        hits: state.bookmarkHits,
      };
      if (state.editMode) {
        bookmarksObj.addingDate = state.bookmarkAddingDate;
        state.bookmarks.splice(n, 1, bookmarksObj);
      }
      if (state.addMode) {
        bookmarksObj.addingDate = new Date().toJSON();
        state.bookmarks.unshift(bookmarksObj);
      }
    },

    // sorting algorithms
    resetSorting(state) {
      if (state.bookmarksSorted.name) state.bookmarksSorted.name = '';
    },

    sortBookmarksByName(state) {
      // remove reverse-mode if sorting option was altered
      if (state.bookmarksSorted.name.length > 0 && state.bookmarksSorted.name !== 'sortBookmarksByName') {
        state.bookmarksSorted.reverse = false;
      }

      // check if array has been already sorted by name and only reversing is needed
      if (state.bookmarksSorted.name === 'sortBookmarksByName') {
        state.bookmarks.reverse();
        state.bookmarksSorted.reverse = !state.bookmarksSorted.reverse;
      } else {
        // sorting array
        state.bookmarksSorted.name = 'sortBookmarksByName';
        state.bookmarks.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });

        // if array was altered during reversed sorting, implement reversed filter again
        if (state.bookmarksSorted.reverse) state.bookmarks.reverse();
      }
    },

    sortBookmarksByDate(state) {
      if (state.bookmarksSorted.name.length > 0 && state.bookmarksSorted.name !== 'sortBookmarksByDate') {
        state.bookmarksSorted.reverse = false;
      }

      // check if array has been already sorted by date and only reversing is needed
      if (state.bookmarksSorted.name === 'sortBookmarksByDate') {
        state.bookmarks.reverse();
        state.bookmarksSorted.reverse = !state.bookmarksSorted.reverse;
      } else {
        // sorting array
        state.bookmarksSorted.name = 'sortBookmarksByDate';
        state.bookmarks.sort((a, b) => {
          const first = new Date(a.addingDate);
          const second = new Date(b.addingDate);
          return first - second;
        });

        // if array was altered during reversed sorting, implement reversed filter again
        if (state.bookmarksSorted.reverse) state.bookmarks.reverse();
      }
    },

    sortBookmarksByActivity(state) {
      if (state.bookmarksSorted.name.length > 0 && state.bookmarksSorted.name !== 'sortBookmarksByActivity') {
        state.bookmarksSorted.reverse = false;
      }

      // check if array has been already sorted by date and only reversing is needed
      if (state.bookmarksSorted.name === 'sortBookmarksByActivity') {
        state.bookmarks.reverse();
        state.bookmarksSorted.reverse = !state.bookmarksSorted.reverse;
      } else {
        // sorting array
        state.bookmarksSorted.name = 'sortBookmarksByActivity';
        state.bookmarks.sort((a, b) => {
          const first = (new Date() - new Date(a.addingDate) / a.hits);
          const second = (new Date() - new Date(b.addingDate) / b.hits);
          return second - first;
        });

        // if array was altered during reversed sorting, implement reversed filter again
        if (state.bookmarksSorted.reverse) state.bookmarks.reverse();
      }
    },
  },

  actions: {
    // item-menu button actions
    deleteBookmark(context, n) {
      context.state.bookmarks.splice(n, 1);
    },

    copyUrl(context, n) {
      navigator.clipboard.writeText(context.state.bookmarks[n].url);
    },

    editBookmark(context, n) {
      if (!context.state.addMode && !context.state.editMode) {
        if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        context.commit('toggleEditMode');
        context.commit('setNameUrlId', n);
      }
    },

    addBookmark(context) {
      if (!context.state.addMode && !context.state.editMode) {
        if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        context.commit('toggleAddMode');
        context.commit('resetNameUrlId');
      }
    },

    // Main Action(add or edit)
    submitBookmark(context, n) {
      // input validation
      if (!context.state.bookmarkName || !context.state.bookmarkUrl) {
        if (!context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        return;
      }
      context.commit('checkHttp');

      // adding object to array
      context.commit('addBookmarkObj', n);

      // resetting errors and modes
      context.commit('resetNameUrlId');
      if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
      if (context.state.editMode) context.commit('toggleEditMode');
      if (context.state.addMode) context.commit('toggleAddMode');

      // resorting array if need be with exited filter
      if (context.state.bookmarksSorted.name) {
        const sortMode = context.state.bookmarksSorted.name;
        context.commit('resetSorting');
        context.commit(sortMode);
      }
    },
  },
});
