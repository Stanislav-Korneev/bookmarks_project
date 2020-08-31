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
    searchInput: '',
    addMode: false,
    editMode: false,
    errorMessageVisible: false,
    bookmarkCache: {
      name: '',
      url: '',
      hits: 0,
      addingDate: '',
      id: null,
    },
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
    updateSearchInput(state, text) {
      state.searchInput = text;
    },

    updateBookmarkName(state, name) {
      state.bookmarkCache.name = name;
    },

    updateBookmarkUrl(state, url) {
      state.bookmarkCache.url = url;
    },

    // incrementing hits of an item when its link is hit
    incrementHits(state, n) {
      state.bookmarks.find((item) => item.id === parseInt(n, 10)).id += 1;
    },

    // adding and resetting item-cash properties
    setBookmarkCache(state, n) {
      state.bookmarkCache = { ...state.bookmarks.find((item) => item.id === parseInt(n, 10)) };
    },

    resetBookmarkCache(state) {
      state.bookmarkCache = {
        name: '',
        url: '',
        hits: 0,
        AddingDate: '',
        id: null,
      };
    },

    // correcting url if need be
    checkHttp(state) {
      const check = /^http:\/\/|^https:\/\//i;
      const check2 = /\/$/;
      if (!check.test(state.bookmarkCache.url)) {
        state.bookmarkCache.url = `http://${state.bookmarkCache.url}`;
      }
      if (!check2.test(state.bookmarkCache.url)) {
        state.bookmarkCache.url = `${state.bookmarkCache.url}/`;
      }
    },

    // adding new or edited bookmark to array
    addBookmarkObj(state, n) {
      // function to get first free id
      function getId(id) {
        const nextId = id + 1;
        const check = state.bookmarks.find((item) => item.id === id);
        return (check === undefined) ? id : getId(nextId);
      }
      // creating object from cache
      const bookmarksObj = { ...state.bookmarkCache };

      if (state.editMode) {
        const itemPlace = state.bookmarks.findIndex((item) => item.id === parseInt(n, 10));
        state.bookmarks = state.bookmarks.filter((item) => item.id !== parseInt(n, 10));
        state.bookmarks.splice(itemPlace, 0, bookmarksObj);
      }
      if (state.addMode) {
        bookmarksObj.id = getId(0);
        bookmarksObj.addingDate = new Date().toJSON();
        state.bookmarks.unshift(bookmarksObj);
      }
    },

    // sorting algorithms
    resetSorting(state) {
      if (state.bookmarksSorted.name) state.bookmarksSorted.name = '';
    },

    sortBookmarks(state, mode) {
      // remove reverse-mode if sorting option was altered
      if (state.bookmarksSorted.name.length > 0 && state.bookmarksSorted.name !== mode) {
        state.bookmarksSorted.reverse = false;
      }

      // chek if array has been already sorted and only reversing is needed
      if (state.bookmarksSorted.name === mode) {
        state.bookmarks.reverse();
        state.bookmarksSorted.reverse = !state.bookmarksSorted.reverse;
      } else {
        // sorting array
        switch (mode) {
          case 'sortBookmarksByName':
            state.bookmarksSorted.name = 'sortBookmarksByName';
            state.bookmarks.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            });
            break;
          case 'sortBookmarksByDate':
            state.bookmarksSorted.name = 'sortBookmarksByDate';
            state.bookmarks.sort((a, b) => {
              const first = new Date(a.addingDate);
              const second = new Date(b.addingDate);
              return first - second;
            });
            break;
          case 'sortBookmarksByActivity':
            state.bookmarksSorted.name = 'sortBookmarksByActivity';
            state.bookmarks.sort((a, b) => {
              const first = (new Date() - new Date(a.addingDate) / a.hits);
              const second = (new Date() - new Date(b.addingDate) / b.hits);
              return second - first;
            });
            break;
          default:
            break;
        }
      }
    },

    deleteBookmark(state, n) {
      state.bookmarks = state.bookmarks.filter((item) => item.id !== parseInt(n, 10));
    },
  },

  actions: {
    // item-menu button actions

    deleteBookmark(context, n) {
      context.commit('deleteBookmark', n);
    },

    copyUrl(context, n) {
      navigator.clipboard.writeText(context.state.bookmarks
        .find((item) => item.id === parseInt(n, 10)).url);
    },

    editBookmark(context, n) {
      if (!context.state.addMode && !context.state.editMode) {
        if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        context.commit('toggleEditMode');
        context.commit('setBookmarkCache', n);
      }
    },

    addBookmark(context) {
      if (!context.state.addMode && !context.state.editMode) {
        if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        context.commit('toggleAddMode');
        context.commit('resetBookmarkCache');
      }
    },

    // Main Action(add or edit)
    submitBookmark(context, n) {
      // input validation
      if (!context.state.bookmarkCache.name || !context.state.bookmarkCache.url) {
        if (!context.state.errorMessageVisible) context.commit('toggleErrorMessage');
        return;
      }
      context.commit('checkHttp');

      // adding object to array
      context.commit('addBookmarkObj', n);

      // resetting errors and modes
      context.commit('resetBookmarkCache');
      if (context.state.errorMessageVisible) context.commit('toggleErrorMessage');
      if (context.state.editMode) context.commit('toggleEditMode');
      if (context.state.addMode) context.commit('toggleAddMode');

      // resorting array if need be with exited filter
      if (context.state.bookmarksSorted.name) {
        const sortMode = context.state.bookmarksSorted.name;
        context.commit('resetSorting');
        context.commit('sortBookmarks', sortMode);
      }
    },
  },
});
