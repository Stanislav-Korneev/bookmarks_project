<template>
  <div class="menu">
    <div class="menu__wrapper">
      <button
        @keyup.esc="closeMenu"
        @click="toggleMenu"
        class="menu__button"
      />
      <ul
        v-if="menuVisible"
        class="menu__content"
      >
        <li>
          <button
            @keyup.esc="closeMenu"
            @click="menuClick(['deleteBookmark', `${id}`])"
            class="menu__item"
          >
            delete
          </button>
        </li>
        <li>
          <button
            @keyup.esc="closeMenu"
            @click="menuClick(['editBookmark', `${id}`])"
            class="menu__item"
          >
            edit
          </button>
        </li>
        <li>
          <button
            @keyup.esc="closeMenu"
            @click="menuClick(['copyUrl', `${id}`])"
            class="menu__item"
          >
            copy url
          </button>
        </li>
      </ul>
    </div>
    <div
      v-if="menuVisible"
      @click="toggleMenu"
      class="menu__backdrop"
      tabindex="0"
      @focus="closeMenu"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      menuVisible: false,
    };
  },

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenu() {
      this.menuVisible = false;
    },
    menuClick(action) {
      this.$emit('menu-click', action);
      this.toggleMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {

  &__backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 10;
  }

  &__wrapper {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }

  &__button {
    @include button-reset;

    //position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-position: center;
    background-image: url("../../../assets/ico/menu.png");
    background-repeat: no-repeat;
    transition: .5s;

    &:hover,
    &:focus {
      background-image: url("../../../assets/ico/menu_hover.png");
    }
  }

  &__content {
    @include ul-reset;

    position: absolute;
    top: -.1rem;
    right: 1.6rem;
    width: 10rem;
    z-index: 15;
    border-radius: .5rem;
    border: .1rem solid $blueGray;
    background-color: $white;
  }

  &__item {
    @include button-reset;

    padding: .5rem 1rem;
    width: 100%;
    height: 3rem;
    font-size: 1.5rem;
    text-transform: capitalize;
    transition: .3s;

    @include mobile {
      font-size: 1.2rem;
    }

    &:hover,
    &:focus {
      background-color: $blueTransparent;
    }
  }
}
</style>
