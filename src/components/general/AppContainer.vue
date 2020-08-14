<template>
  <div
    class="app-container"
    :class="mod"
  >
    <slot />
  </div>
</template>

<script>
export default {

  props: {
    mod: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
.app-container {
  margin: 0 auto;
  max-width: 176rem;
}
</style>
