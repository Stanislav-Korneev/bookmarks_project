<template>
  <div class="bookmark-form" tabindex="0">
    <button
      @click="closeModal"
      class="bookmark-form__close-button"
    />
    <h2 class="bookmark-form__header">
      {{ addOrEdit }} your bookmark
    </h2>
    <form
      @submit.prevent="submitBookmark(bookmarkId)"
      class="bookmark-form__form"
    >
      <label
        for="name"
        class="bookmark-form__label"
      >
        Name
      </label>
      <input
        @keyup="resetError"
        @keyup.enter="submitBookmark(bookmarkId)"
        v-model="bookmarkName"
        v-focus
        class="bookmark-form__item"
        type="text"
        id="name"
        placeholder="Name"
      />
      <label
        for="url"
        class="bookmark-form__label"
      >
        URL
      </label>
      <input
        @keyup="resetError"
        @keyup.enter="submitBookmark(bookmarkId)"
        v-model.trim="bookmarkUrl"
        class="bookmark-form__item"
        type="text"
        id="url"
        placeholder="URL"
      />
      <p class="bookmark-form__error"
        :class="(errorMessageVisible) ? 'bookmark-form__error_active' : '' "
      >
        Please, fill in both Name and Url!
      </p>
      <button
        type="submit"
        class="bookmark-form__button"
      >
        {{ addOrEdit }}
      </button>
    </form>
  </div>
</template>
<script>

import store from '@/store';

export default {
  computed: {
    addOrEdit() {
      return (store.state.addMode) ? 'Add' : 'Edit';
    },
    errorMessageVisible() {
      return store.state.errorMessageVisible;
    },
    addMode() {
      return store.state.addMode;
    },
    editMode() {
      return store.state.editMode;
    },
    bookmarkId() {
      return store.state.bookmarkCache.id;
    },
    bookmarkName: {
      get() {
        return store.state.bookmarkCache.name;
      },
      set(value) {
        store.commit('updateBookmarkName', value);
      },
    },
    bookmarkUrl: {
      get() {
        return store.state.bookmarkCache.url;
      },
      set(value) {
        store.commit('updateBookmarkUrl', value);
      },
    },
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    resetError() {
      if (this.errorMessageVisible) store.commit('toggleErrorMessage');
    },
    submitBookmark(n) {
      if (!this.errorMessageVisible) store.dispatch('submitBookmark', n);
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.bookmark-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 25;
  padding: 2rem;
  width: 25%;
  min-width: 40rem;
  min-height: 35rem;
  border-radius: 1.5rem;
  background-color: $white;
  box-shadow: 0 .5rem 2rem $blueGray;
  font-size: 2rem;

  @include mobile{
    width: 90%;
    min-width: 20rem;
    max-width: 40rem;
    min-height: 25rem;
    font-size: 1.5rem;
  }

  &__close-button {
    @include button-reset;

    position: absolute;
    top: -7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .3rem solid $gray;
    background-position: center;
    background-image: url("../../../assets/ico/close.svg");
    background-repeat: no-repeat;
    transition: .3s;

    &:hover,
    &:focus {
      border-color: $grayBG;
      background-image: url("../../../assets/ico/close_dark.svg");
      transform: rotate(90deg);
    }

    @include mobile {
      background-color: $white;
      width: 4.5rem;
      height: 4.5rem;
    }
  }

  &__header {
    margin-top: 3rem;
    color: $gray;

    @include mobile {
      margin-bottom: 3rem;
    }
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__label {
    @include visually-hidden;
  }

  &__item {
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    width: 80%;
    height: 3rem;
    border-radius: .5rem;
    border: .1rem solid $blueGray;
    font-family: inherit;

    @include mobile {
      width: 90%;
    }
  }

  &__error {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: $red;
    opacity: 0;
    transition: .3s;
    cursor: default;

    &_active {
      opacity: 1;
    }
  }

  &__button {
    @include button-reset;

    width: 85%;
    height: 3rem;
    border-radius: .5rem;
    background-color: $blue;
    box-shadow: 0 .2rem 1rem $blueGray;
    font-family: inherit;
    font-size: 1.5rem;
    color: $whiteGray;

    &:active {
      background-color: $darkBlue;
      transform: scale(.99);
    }

    @include mobile {
      width: 90%;
    }
  }

}
</style>
