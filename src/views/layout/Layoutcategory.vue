<template>
  <div>
    <app-main style="margin-top:90px;"></app-main>
  </div>
</template>

<script>
import { AppMain } from './components'

export default {
  name: 'layoutcategory',
  components: {
    AppMain,
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
