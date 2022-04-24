<template>
  <div class="common-side-container">
    <el-menu
            :unique-opened="true"
            :default-active="defaultActive"
            background-color="#3a3e4b"
            text-color="#c3c4c8"
            active-text-color="#fff"
            @select="handleSelect"
    >
      <template v-for="menuItem in menuList">
        <el-submenu
                v-if="menuItem.children && menuItem.children.length"
                :key="menuItem.key"
                :index="menuItem.key"
        >
          <template slot="title">
            <span>{{ menuItem.title }}</span>
          </template>
          <el-menu-item
                  v-for="menuSubItem in menuItem.children"
                  :key="menuSubItem.key"
                  :index="menuSubItem.key"
          >
            {{ menuSubItem.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
                v-else
                :key="menuItem.key"
                :index="menuItem.key"
        >
          {{ menuItem.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import commonMenu from './side-data/common-side'

export default {
  name: 'CommonSide',
  data() {
    return {
      menuList: commonMenu,
    }
  },
  computed: {
    defaultActive () {
      return this.$route.name.replace('/', '')
    }
  },
  created() {
  },
  methods: {
    handleSelect (index, indexPath) {
      let menu = this.menuList.find(item => item.key === indexPath[0])
      if (indexPath.length > 1) {
        indexPath.slice(1).forEach(path => {
          menu = menu.children.find(item => item.key === path)
        })
      }
      if (menu.link) {
        this.$router.push(menu.link)
      } else if (this.$route.name !== menu.key) {
        this.$router.push({
          name: menu.key
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variables';

.common-side-container {
  height: calc(100vh - #{$height-header});
  background: $bg-common-side;
  .el-menu {
    width: $width-side-bar;
    border-right: initial;
  }
}
</style>
