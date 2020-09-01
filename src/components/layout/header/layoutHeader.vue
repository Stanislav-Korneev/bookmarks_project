<template>
  <h1 class="header">
    Bookmarks
  </h1>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  padding-left: 2.5rem;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  min-height: 7rem;
  background-color: $blue;
  font-size: 4rem;
  font-weight: normal;
  box-shadow: 0 .2rem 2rem $blueGray;
  color: $white;
  cursor: default;

  @include mobile {
    min-height: 6rem;
    box-shadow: 0 .2rem 1rem $blueGray;
    font-size: 3rem;
  }

}

</style>
