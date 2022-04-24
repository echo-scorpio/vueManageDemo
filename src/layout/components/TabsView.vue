<template>
  <div class="tabs-view-container">
    <el-scrollbar class="tabs-view-scroll">
      <div class="tabs-view-wrapper">
        <router-link
                v-for="tab in visitedViews"
                :key="tab.name"
                :class="`tabs-view-item ${isActive(tab) ? 'active' : ''}`"
                ref="tab"
                :to="tab.fullPath"
                tag="span"
                @contextmenu.prevent.native="openMenu($event, tab)"
        >
          {{tab.title}}
          <i class="el-icon-close" @click.prevent.stop="closeSelectedTab(tab)" />
        </router-link>
      </div>
    </el-scrollbar>
    <ul v-show="menuVisible" :style="menuPos" class="contextmenu">
      <li @click="refreshSelectedTab">重置当前</li>
      <li @click="closeSelectedTab(selectedTab)">关闭当前</li>
      <li @click="closeOthersTabs">关闭其他</li>
      <li :class="{'not-allowed': menuConfig.left}" @click="closeDirTabs('left')">关闭左侧</li>
      <li :class="{'not-allowed': menuConfig.right}" @click="closeDirTabs('right')">关闭右侧</li>
      <li @click="closeAllTabs">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TabsView',
  data() {
    return {
      selectedTab: {}, // 记录当前 tab
      menuVisible: false, // 控制右键菜单显示
      menuPos: {}, // 菜单位置
      menuConfig: { // 是否可以：关闭左侧、关闭右侧
        left: true,
        right: true,
      },
      menuMinWidth: 100, // tab DOM 宽度的最小值
    }
  },
  computed: {
    ...mapState('cache', ['visitedViews']),
  },
  watch: {
    $route() {
      this.addTabs()
    },
    menuVisible(boolean) {
      if (boolean) document.body.addEventListener('click', this.closeMenu)
      else document.body.removeEventListener('click', this.closeMenu)
    }
  },
  created() {
    this.addTabs()
  },
  methods: {
    ...mapActions('cache', ['addView', 'delView', 'delCachedView', 'delOthersViews', 'delAllViews', 'delDirViews']),
    isActive(route) {
      return route.name === this.$route.name
    },
    // 打开 缓存页签 右键菜单
    openMenu(e, tab) {
      this.menuConfig = {
        left: this.visitedViews[0].name === tab.name,
        right: this.visitedViews.slice(-1)[0].name === tab.name
      }
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - this.menuMinWidth // 右键菜单 left 最大值
      const left = e.clientX - 200
      const top = e.offsetY

      this.menuVisible = true
      this.menuPos = {
        left: `${left > maxLeft ? maxLeft : left}px`,
        top: `${top}px`
      }
      this.selectedTab = tab
    },
    // 关闭 缓存页签 右键菜单
    closeMenu() {
      this.menuVisible = false
    },
    // 添加 缓存页
    addTabs() {
      if (this.$route.name) {
        this.addView(this.$route)
        this.selectedTab = this.$route
      }
      return false
    },
    // 重新加载目标页
    reloadPage(tab) {
      this.$router.replace({
        path: `/transfer${tab.fullPath}`,
        query: {
          ...tab.params,
        }
      })
    },
    // 更新视图
    toUpdateView(tab) {
      const latestView = this.visitedViews.slice(-1)[0]
      if (latestView) { // 当前还存在访问过的页面
        // 删除项的name 和 当前路由的name 一致时，需要切换当前激活的 tab 为最后一项；反之，则不需要进行额外操作。
        if (tab.name === this.$route.name) this.$router.push(latestView.fullPath)
      } else {
        // 当最后一个删除的项是概览页时，需要 "重新加载" 概览页，不能直接跳转
        if (tab.name === 'Dashboard') this.reloadPage(tab) // 重新加载
        else this.$router.push('/common')
      }
    },
    // 重置当前页
    refreshSelectedTab() {
      let tab = this.selectedTab
      this.delCachedView(tab)
      this.reloadPage(tab)
    },
    // 关闭当前页
    closeSelectedTab(tab) {
      this.delView(tab)
      this.toUpdateView(tab)
    },
    // 关闭其他 缓存页
    closeOthersTabs() {
      let tab = this.selectedTab
      this.delOthersViews(tab)
      if (this.$route.name !== tab.name) this.$router.push(tab.fullPath)
    },
    // 删除 左侧/右侧 缓存页
    closeDirTabs(dir) {
      if (this.menuConfig[dir]) return
      let tab = this.selectedTab
      this.delDirViews({
        view: tab,
        dir: dir
      })
      let needUpdateVisited = true
      for (const [, v] of this.visitedViews.entries()) {
        if (this.$route.name === v.name) {
          needUpdateVisited = false
          break
        }
      }
      if (needUpdateVisited) this.$router.push(this.visitedViews.slice(-1)[0].fullPath)
    },
    // 关闭所有 缓存页
    closeAllTabs() {
      this.delAllViews()
      this.reloadPage({ fullPath: '/common' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/style/variables';
.tabs-view-container {
  position: relative;
  width: 100%;
  background: #FFFFFF;
  .tabs-view-scroll {
    width: 100%;
    .tabs-view-wrapper {
      white-space: nowrap;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 1px;
        background-color: #d8dce5;
      }
      .tabs-view-item {
        display: inline-block;
        position: relative;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        color: #303133;
        cursor: pointer;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid #d8dce5;
        background: #FFFFFF;
        & + .tabs-view-item{
          border-left: none;
        }
        &:first-of-type {
          border-top-left-radius: 4px;
          margin-left: 15px;
        }
        &:last-of-type {
          border-top-right-radius: 4px;
          margin-right: 15px;
        }
        &.active {
          color: $primary-color;
          border-bottom-color: #FFFFFF;
        }
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    z-index: 3000;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    background: #FFFFFF;
    border-radius: 4px;
    list-style-type: none;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
  .not-allowed {
    cursor: not-allowed !important;
    color: #999 !important;
    background: #FFFFFF !important;
  }
}
</style>
