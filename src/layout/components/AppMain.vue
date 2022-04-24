<template>
  <section class="app-main">
    <div class="app-main-scroll">
      <div class="app-main-content">
        <transition name="fade" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    ...mapState('cache', ['cachedViews']),
    key() {
      return this.$route.fullPath
    }
  },
}
</script>

<style scoped lang="scss">
@import '~@/style/variables';

.app-main {
  position: relative;
  padding: 16px;
  width: calc(100vw - #{$width-side-bar});
  height: calc(100% - 40px);
  background-color: #F0F2F5;
  .app-main-scroll {
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    .app-main-content {
      min-width: 1200px;
      height: 100%;
    }
  }
}

</style>
