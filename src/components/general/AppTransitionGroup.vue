<template>
  <transition-group :name="name" :tag="tag">
    <slot />
  </transition-group>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
