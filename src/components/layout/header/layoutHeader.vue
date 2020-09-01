<template>
  <div class="header">
    <h1>
      Bookmarks
    </h1>
  </div>
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
  box-shadow: 0 .2rem 2rem $blueGray;
  cursor: default;

  h1 {
    font-size: 4rem;
    font-weight: normal;
    color: $white;

    @include mobile {
      font-size: 3rem;
    }
  }

  @include mobile {
    min-height: 6rem;
    box-shadow: 0 .2rem 1rem $blueGray;
  }

}
</style>
