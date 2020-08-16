<template>
  <li class="bookmarks-item" :title="titleHelp">
    <div class="bookmarks-item__favicon">
      <img
        :src="favicon"
        alt="favicon-icon"
      />
    </div>
    <a
      @click="incrementHits(index)"
      class="bookmarks-item__link"
      :href="url"
      target="_blank"
    >
      {{ name }}
    </a>
    <p class="bookmarks-item__description">
      {{ url }}
    </p>
    <div class="bookmarks-item__slot" >
      <slot />
    </div>
  </li>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: null,
    },
    addingDate: {
      type: String,
      default: '',
    },
    hits: {
      type: Number,
      default: null,
    },

  },

  computed: {
    favicon() {
      return `http://www.google.com/s2/favicons?domain_url=${this.url}`;
    },
    titleHelp() {
      return `date: ${this.addingDate} chart: ${this.hits / (new Date() - new Date(this.addingDate))}`;
    },
  },

  methods: {
    incrementHits(index) {
      this.$emit('increment-hits', index);
    },
  },
};
</script>
<style lang="scss" scoped>
.bookmarks-item {
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  color: $gray;
  transition: .3s;

  @include mobile {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: $blueTransparent;
  }

  &:hover > .bookmarks-item__description {
    opacity: .7;
  }

  &__favicon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-right: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: $lightGray;

    @include mobile {
      width: 3.5rem;
      height: 3.5rem;
    }
  }

  &__link {
    @include a-reset;
    overflow: hidden;
  }

  &__description {
    padding-left: 2rem;
    overflow: hidden;
    font-size: 1.5rem;
    opacity: 0;
    transition: .3s;
    cursor: default;

    @include mobile {
      display: none;
    }
  }

  &__slot {
    margin-left: auto;
  }
}
</style>
