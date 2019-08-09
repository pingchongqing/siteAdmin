<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <Topbar></Topbar>
    <div class="main-container">
      <Sidebar></Sidebar>
      <tags-view></tags-view>
      <app-main style="margin-top:90px;"></app-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, TagsView, Topbar } from './components'
import Sticky from '@/components/Sticky'

export default {
  name: 'layout',
  components: {
    Topbar,
    Sidebar,
    AppMain,
    TagsView,
    Sticky
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
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
