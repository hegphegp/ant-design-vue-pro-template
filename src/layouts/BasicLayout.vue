<template>
  <pro-layout
    :title="title"
    :collapsed="collapsed"
    :menus="menus"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
    v-bind="settings"
  >
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapState } from 'vuex'
import { SettingDrawer } from '@ant-design-vue/pro-layout'

import antDesignUiSettings from '@/config/ui.config'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import LogoSvg from '../assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter
  },
  data () {
    return {
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: antDesignUiSettings.title,
      settings: {
        // 布局类型
        layout: antDesignUiSettings.layout, // 'sidemenu', 'topmenu'
        contentWidth: antDesignUiSettings.layout === 'sidemenu' ? 'Fluid' : 'Fixed',
        // 主题 'dark' | 'light'
        theme: antDesignUiSettings.navTheme,
        // 主色调
        primaryColor: antDesignUiSettings.primaryColor,
        fixedHeader: true,
        fixSiderbar: true,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {}
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    })
  },
  created () {
    const mainMenu = this.$store.getters.routers
    const routes = mainMenu.find(item => item.path === '/')
    this.menus = routes.children || []
  },
  methods: {
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = 'Fluid'
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    logoRender () {
      return <LogoSvg />
    }
  }
}
</script>

<style lang="less">
@import "~ant-design-vue/es/style/themes/default.less";

.ant-pro-global-header-index-right {
  margin-right: 8px;

  &.ant-pro-global-header-index-dark {
    .ant-pro-global-header-index-action {
      color: hsla(0, 0%, 100%, .85);

      &:hover {
        background: #1890ff;
      }
    }
  }

  .ant-pro-account-avatar {
    .antd-pro-global-header-index-avatar {
      margin: ~'calc((@{layout-header-height} - 24px) / 2)' 0;
      margin-right: 8px;
      color: @primary-color;
      vertical-align: top;
      background: rgba(255, 255, 255, 0.85);
    }
  }

  .menu {
    .anticon {
      margin-right: 8px;
    }
  }
}
</style>
