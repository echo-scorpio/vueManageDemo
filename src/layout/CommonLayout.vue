<template>
  <div class="common-layout-container">
    <div class="common-side-box">
      <div class="logo-box">中后台</div>
      <CommonSide></CommonSide>
    </div>
    <div class="common-main-box">
      <div class="common-header-container">
        <div class="common-header-box">
          <div></div>
          <div class="header-right-box"></div>
        </div>
      </div>
      <div class="common-content-container">
        <TabsView></TabsView>
        <AppMain></AppMain>
      </div>
    </div>
  </div>
</template>

<script>
import CommonSide from './components/CommonSide'
import TabsView from './components/TabsView'
import AppMain from './components/AppMain'

export default {
  name: 'CommonLayout',
  components: {
    CommonSide, TabsView, AppMain
  }
}
</script>

<style scoped lang="scss">
@import '~@/style/variables';

.common-layout-container {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  .common-side-box {
    .logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $width-side-bar;
      height: $height-header;
      font-size: 24px;
      font-weight: bold;
      color: #FFFFFF;
      background: $bg-common-side;
    }
  }
  .common-main-box {
    width: calc(100vw - #{$width-side-bar});
    .common-header-container {
      width: 100%;
      height: $height-header;
    }
    .common-content-container {
      width: 100%;
      height: calc(100vh - #{$height-header});
    }
  }
}
</style>
